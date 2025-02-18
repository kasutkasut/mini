import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Fade
} from '@mui/material';
import { 
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { CHARACTERS, generateResponse } from '../data/characters';
import CharacterIntro from './CharacterIntro';

const Chat = ({ characterId }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const character = CHARACTERS[characterId];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // 添加用户消息
    const userMessage = {
      text: inputValue,
      type: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // 模拟角色思考时间
    setTimeout(() => {
      // 生成角色回复
      const response = generateResponse(character, inputValue);
      const characterMessage = {
        text: response.text,
        type: 'character',
        timestamp: new Date().toISOString(),
        mood: response.mood
      };

      setMessages(prev => [...prev, characterMessage]);
      setIsTyping(false);
    }, Math.random() * 1000 + 500); // 随机延迟500-1500ms
  };

  const handleStartChat = () => {
    setShowIntro(false);
    // 添加角色的问候语
    const greetingMessage = {
      text: character.greeting,
      type: 'character',
      timestamp: new Date().toISOString()
    };
    setMessages([greetingMessage]);
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 顶部导航栏 */}
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setShowIntro(true)}>
            <ArrowBackIcon />
          </IconButton>
          <Avatar 
            src={character.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${character.name}`}
            sx={{ width: 40, height: 40, mx: 2 }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {character.name}
          </Typography>
          <IconButton color="inherit" onClick={() => setShowIntro(true)}>
            <InfoIcon />
          </IconButton>
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
                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                gap: 2
              }}
            >
              {message.type === 'character' && (
                <Avatar
                  src={character.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${character.name}`}
                  sx={{ width: 40, height: 40 }}
                />
              )}
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  maxWidth: '70%',
                  bgcolor: message.type === 'user' ? 'primary.main' : 'background.paper',
                  color: message.type === 'user' ? 'white' : 'text.primary',
                  borderRadius: message.type === 'user' ? '20px 20px 0 20px' : '20px 20px 20px 0'
                }}
              >
                <Typography variant="body1">
                  {message.text}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block',
                    mt: 1,
                    color: message.type === 'user' ? 'rgba(255,255,255,0.7)' : 'text.secondary'
                  }}
                >
                  {new Date(message.timestamp).toLocaleTimeString()}
                </Typography>
              </Paper>
              {message.type === 'user' && (
                <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                  你
                </Avatar>
              )}
            </Box>
          </Fade>
        ))}
        {isTyping && (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Avatar
              src={character.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${character.name}`}
              sx={{ width: 40, height: 40 }}
            />
            <Paper
              elevation={1}
              sx={{
                p: 2,
                maxWidth: '70%',
                bgcolor: 'background.paper',
                borderRadius: '20px 20px 20px 0'
              }}
            >
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                正在输入...
              </Typography>
            </Paper>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Container>

      {/* 输入区域 */}
      <Paper 
        elevation={3}
        sx={{
          p: 2,
          bgcolor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider'
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
              placeholder={`给${character.name}发消息...`}
              variant="outlined"
              size="small"
              inputRef={inputRef}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3
                }
              }}
            />
            <IconButton 
              color="primary"
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark'
                },
                '&.Mui-disabled': {
                  bgcolor: 'action.disabledBackground',
                  color: 'action.disabled'
                }
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Container>
      </Paper>
    </Box>
  );
};

export default Chat; 