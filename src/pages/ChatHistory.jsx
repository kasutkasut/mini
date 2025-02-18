import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Chip,
  Container,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { CHARACTERS } from '../data/characters';
import useUserStore from '../store/userStore';
import NavBar from '../components/NavBar';

const ChatHistory = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { chatHistory, clearChatHistory } = useUserStore();

  const handleChatClick = (characterId) => {
    navigate(`/chat/${characterId}`);
  };

  const handleDeleteChat = (characterId, event) => {
    event.stopPropagation();
    clearChatHistory(characterId);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#1A1B1E',
      color: 'white',
      pb: 4
    }}>
      <NavBar title={t('nav.chat')} />

      <Container maxWidth="sm">
        {Object.entries(chatHistory || {}).map(([characterId, history]) => {
          const character = CHARACTERS[characterId];
          if (!character) return null;

          const lastMessage = history.messages[history.messages.length - 1];
          
          return (
            <Card
              key={characterId}
              onClick={() => handleChatClick(characterId)}
              sx={{
                mb: 2,
                cursor: 'pointer',
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  bgcolor: 'rgba(255, 255, 255, 0.08)'
                }
              }}
            >
              <CardContent sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: '16px !important'
              }}>
                <Avatar
                  src={character.avatar}
                  sx={{ width: 50, height: 50 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1
                  }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {character.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        {formatTimestamp(lastMessage?.timestamp)}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => handleDeleteChat(characterId, e)}
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.5)',
                          '&:hover': {
                            color: '#ff4444',
                            bgcolor: 'rgba(255, 68, 68, 0.1)'
                          }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.5)',
                          '&:hover': {
                            color: 'white',
                            bgcolor: 'rgba(255, 255, 255, 0.1)'
                          }
                        }}
                      >
                        <ArrowForwardIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {lastMessage?.text || t('chat.startNewChat')}
                  </Typography>
                  <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                    {character.tags?.slice(0, 3).map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(124, 58, 237, 0.2)',
                          color: 'white',
                          height: '20px',
                          '& .MuiChip-label': {
                            px: 1,
                            fontSize: '0.75rem'
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Container>
    </Box>
  );
};

export default ChatHistory; 