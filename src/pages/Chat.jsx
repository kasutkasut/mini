import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  IconButton, 
  Avatar, 
  AppBar, 
  Toolbar,
  Container,
  Fade,
  CircularProgress,
  Chip
} from '@mui/material';
import { 
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
  VolumeUp as VolumeUpIcon
} from '@mui/icons-material';
import { CHARACTERS, generateInitialScenario as generateScenarioAPI } from '../data/characters';
import CharacterIntro from '../components/CharacterIntro';
import useUserStore from '../store/userStore';

const Chat = () => {
  const navigate = useNavigate();
  const { characterId } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [initialScenario, setInitialScenario] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const audioRef = useRef(null);
  const { addChatMessage, getChatHistory } = useUserStore();

  const character = CHARACTERS[characterId];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!character) {
      navigate('/');
      return;
    }
  }, [character, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // 加载历史聊天记录
    const history = getChatHistory(characterId);
    if (history.length > 0) {
      setMessages(history);
    }
  }, [characterId]);

  // 生成初始场景
  const generateInitialScenario = async (character) => {
    try {
      const result = await generateScenarioAPI(character);
      if (result) {
        setInitialScenario(result.mainScenario);
        return result;
      }
      return null;
    } catch (error) {
      console.error('Error generating scenario:', error);
      return null;
    }
  };

  // 生成AI回复和语音
  const generateResponse = async (character, userInput, { previousMessages }) => {
    const maxRetries = 3;
    let retryCount = 0;
    
    while (retryCount < maxRetries) {
      try {
        // 调用 OpenAI API 生成回复
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: `You are ${character.name}. ${JSON.stringify(character.characterSettings)}`
              },
              ...previousMessages.map(message => ({
                role: message.role,
                content: message.text
              })),
              {
                role: "user",
                content: userInput
              }
            ],
            temperature: 0.7,
            max_tokens: 1000
          })
        });

        if (!openaiResponse.ok) {
          throw new Error(`OpenAI API error: ${openaiResponse.status}`);
        }

        const openaiData = await openaiResponse.json();
        if (!openaiData.choices || !openaiData.choices[0]) {
          throw new Error('Invalid response from OpenAI API');
        }

        const responseText = openaiData.choices[0].message.content;

        // 调用 ElevenLabs API 生成语音
        try {
          const voiceResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${import.meta.env.VITE_ELEVENLABS_VOICE_ID}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'xi-api-key': import.meta.env.VITE_ELEVENLABS_API_KEY
            },
            body: JSON.stringify({
              text: responseText,
              voice_settings: {
                stability: 0.5,
                similarity_boost: 0.5
              }
            })
          });

          if (!voiceResponse.ok) {
            console.warn('Voice generation failed, continuing without audio');
            return {
              response: {
                text: responseText,
                status: character.storySettings.initialContext.mood,
                location: character.storySettings.initialContext.location,
                mood: character.emotionalSettings.baseEmotions[0],
                action: character.storySettings.initialContext.currentSituation
              }
            };
          }

          const audioBlob = await voiceResponse.blob();
          const audioUrl = URL.createObjectURL(audioBlob);

          return {
            response: {
              text: responseText,
              status: character.storySettings.initialContext.mood,
              location: character.storySettings.initialContext.location,
              mood: character.emotionalSettings.baseEmotions[0],
              action: character.storySettings.initialContext.currentSituation
            },
            audioUrl
          };
        } catch (voiceError) {
          console.error('Error generating voice:', voiceError);
          // 返回没有语音的响应
          return {
            response: {
              text: responseText,
              status: character.storySettings.initialContext.mood,
              location: character.storySettings.initialContext.location,
              mood: character.emotionalSettings.baseEmotions[0],
              action: character.storySettings.initialContext.currentSituation
            }
          };
        }
      } catch (error) {
        console.error(`Attempt ${retryCount + 1} failed:`, error);
        retryCount++;
        
        if (retryCount === maxRetries) {
          console.error('All retry attempts failed');
          return {
            response: {
              text: character.dialogueSettings.responseTemplates.thinking,
              status: character.storySettings.initialContext.mood,
              location: character.storySettings.initialContext.location,
              mood: character.emotionalSettings.baseEmotions[0],
              action: character.storySettings.initialContext.currentSituation
            }
          };
        }
        
        // 等待一段时间后重试
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
      }
    }
  };

  const handleSendMessage = async (text) => {
    // 添加用户消息
    const userMessage = {
      role: 'user',
      text,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    addChatMessage(characterId, userMessage);

    try {
      // 生成角色回复
      const response = await generateResponse(character, text, {
        previousMessages: messages
      });

      // 添加角色回复
      const characterMessage = {
        role: 'assistant',
        ...response,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, characterMessage]);
      addChatMessage(characterId, characterMessage);
    } catch (error) {
      console.error('Error generating response:', error);
    }
  };

  const handleStartChat = async () => {
    setShowIntro(false);
    setIsTyping(true);

    try {
      // 调用API生成初始场景
      const scenarioResult = await generateInitialScenario(character);
      
      if (scenarioResult) {
        const scenarioMessage = {
          text: scenarioResult.mainScenario,
          type: 'scenario',
          timestamp: new Date().toISOString(),
          context: scenarioResult.initialContext,
          topics: scenarioResult.possibleTopics
        };
        
        // 添加角色的第一条消息
        const characterMessage = {
          text: character.dialogueSettings.responseTemplates.greeting,
          type: 'character',
          timestamp: new Date().toISOString(),
          status: scenarioResult.initialContext.mood,
          location: scenarioResult.initialContext.location,
          mood: character.emotionalSettings.baseEmotions[0],
          action: scenarioResult.initialContext.situation
        };
        
        setMessages([scenarioMessage, characterMessage]);
      } else {
        // 如果API调用失败，使用预设场景作为后备
        const fallbackScenarioMessage = {
          text: character.storySettings.mainScenario,
          type: 'scenario',
          timestamp: new Date().toISOString(),
          context: character.storySettings.initialContext,
          topics: character.storySettings.plotPoints
        };
        
        const fallbackCharacterMessage = {
          text: character.dialogueSettings.responseTemplates.greeting,
          type: 'character',
          timestamp: new Date().toISOString(),
          status: character.storySettings.initialContext.mood,
          location: character.storySettings.initialContext.location,
          mood: character.emotionalSettings.baseEmotions[0],
          action: character.storySettings.initialContext.currentSituation
        };
        
        setMessages([fallbackScenarioMessage, fallbackCharacterMessage]);
      }
    } catch (error) {
      console.error('Error starting chat:', error);
      // 使用默认问候语作为最后的后备方案
      const greetingMessage = {
        text: character.dialogueSettings.responseTemplates.greeting,
        type: 'character',
        timestamp: new Date().toISOString()
      };
      
      setMessages([greetingMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePlayAudio = async (audioUrl) => {
    if (audioRef.current && audioUrl) {
      setIsPlayingAudio(true);
      audioRef.current.src = audioUrl;
      await audioRef.current.play();
      setIsPlayingAudio(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  if (!character) return null;
  if (showIntro) {
    return (
      <Fade in={true}>
        <div>
          <CharacterIntro 
            character={character} 
            onStartChat={handleStartChat}
            onBack={handleBack}
          />
        </div>
      </Fade>
    );
  }

  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: '#1A1B1E'
    }}>
      {/* 顶部导航栏 */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          bgcolor: 'rgba(26, 27, 30, 0.8)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setShowIntro(true)}>
            <ArrowBackIcon />
          </IconButton>
          <Avatar 
            src={character.avatar}
            sx={{ width: 40, height: 40, mx: 2 }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
            {character.name}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 消息列表 */}
      <Container 
        maxWidth="md" 
        sx={{ 
          flex: 1, 
          overflow: 'auto', 
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        {messages.map((message, index) => (
          <Fade in={true} key={index}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                gap: 2,
                width: '100%'
              }}
            >
              {message.role === 'assistant' && (
                <Avatar
                  src={character.avatar}
                  sx={{ width: 40, height: 40 }}
                />
              )}
              <Box sx={{ maxWidth: message.type === 'scenario' ? '100%' : '70%' }}>
                {message.type === 'scenario' && (
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      bgcolor: 'rgba(0, 0, 0, 0.3)',
                      color: 'white',
                      borderRadius: 2,
                      mb: 2
                    }}
                  >
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        color: '#7C3AED',
                        mb: 1,
                        fontWeight: 500
                      }}
                    >
                      Initial Scenario:
                    </Typography>
                    <Typography variant="body1">
                      {message.text}
                    </Typography>
                    {message.context && (
                      <Box 
                        sx={{ 
                          mt: 2,
                          p: 1,
                          bgcolor: 'rgba(0, 0, 0, 0.3)',
                          borderRadius: 1,
                          fontSize: '0.875rem',
                          color: 'rgba(255, 255, 255, 0.7)'
                        }}
                      >
                        {message.context.location && <div>Location: {message.context.location}</div>}
                        {message.context.mood && <div>Mood: {message.context.mood}</div>}
                        {message.context.situation && <div>Situation: {message.context.situation}</div>}
                      </Box>
                    )}
                    {message.topics && message.topics.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography 
                          variant="subtitle2" 
                          sx={{ 
                            color: '#7C3AED',
                            mb: 1
                          }}
                        >
                          Suggested Topics:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {message.topics.map((topic, i) => (
                            <Chip
                              key={i}
                              label={topic}
                              size="small"
                              sx={{
                                bgcolor: 'rgba(124, 58, 237, 0.2)',
                                color: 'white',
                                '&:hover': {
                                  bgcolor: 'rgba(124, 58, 237, 0.3)'
                                }
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Paper>
                )}
                {message.role !== 'user' && (
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      bgcolor: message.role === 'user' 
                        ? '#7C3AED' 
                        : 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      borderRadius: message.role === 'user' 
                        ? '20px 20px 0 20px' 
                        : '20px 20px 20px 0'
                    }}
                  >
                    <Typography variant="body1">
                      {message.text}
                    </Typography>
                  </Paper>
                )}
              </Box>
              {message.role === 'user' && (
                <Avatar sx={{ bgcolor: '#7C3AED', width: 40, height: 40 }}>
                  You
                </Avatar>
              )}
            </Box>
          </Fade>
        ))}
        {isTyping && (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Avatar
              src={character.avatar}
              sx={{ width: 40, height: 40 }}
            />
            <Paper
              elevation={1}
              sx={{
                p: 2,
                maxWidth: '70%',
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                borderRadius: '20px 20px 20px 0'
              }}
            >
              <Typography variant="body1">
                Typing...
              </Typography>
            </Paper>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Container>

      {/* 输入区域 */}
      <Paper 
        elevation={0}
        sx={{
          p: 2,
          bgcolor: 'rgba(26, 27, 30, 0.8)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              variant="outlined"
              size="small"
              inputRef={inputRef}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 3,
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#7C3AED'
                  }
                },
                '& .MuiOutlinedInput-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.5)'
                }
              }}
            />
            <IconButton 
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              sx={{
                bgcolor: '#7C3AED',
                color: 'white',
                '&:hover': {
                  bgcolor: '#6D28D9'
                },
                '&.Mui-disabled': {
                  bgcolor: 'rgba(124, 58, 237, 0.2)',
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Container>
      </Paper>

      {/* 隐藏的音频播放器 */}
      <audio ref={audioRef} style={{ display: 'none' }} />
    </Box>
  );
};

export default Chat; 