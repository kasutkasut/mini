import React from 'react';
import { 
  Box,
  Button, 
  Typography, 
  IconButton,
  Stack,
  Chip
} from '@mui/material';
import { 
  Message as MessageIcon,
  ArrowBack as ArrowBackIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon
} from '@mui/icons-material';
import useUserStore from '../store/userStore';

const CharacterIntro = ({ character, onStartChat, onBack }) => {
  const { characterStats, toggleLike, toggleFavorite } = useUserStore();
  const stats = characterStats[character.id] || { likes: 0, favorites: 0, isLiked: false, isFavorited: false };
  const user = useUserStore((state) => state.user);
  const handleLike = async (event) => {
    event.stopPropagation();
    if (!user || !user.id) {
      console.error('User not authenticated');
      return;
    }
    
    // 乐观更新UI
    toggleLike(character.id);
    
    try {
      const response = await fetch(`/api/characters/${character.id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user.id,
          isLiked: !stats.isLiked
        })
      });
    
      if (!response.ok) {
        throw new Error('Failed to update like status');
      }
    
      const data = await response.json();
      if (data.success) {
        // 更新本地状态中的点赞数
        useUserStore.setState(state => ({
          characterStats: {
            ...state.characterStats,
            [character.id]: {
              ...state.characterStats[character.id],
              likes: data.likes
            }
          }
        }));
      } else {
        throw new Error('Failed to update like count');
      }
    } catch (error) {
      console.error('Error updating like status:', error);
      // 如果API调用失败，回滚本地状态
      toggleLike(character.id);
    }
  };
  const handleCollect = (event) => {
    event.stopPropagation();
    toggleFavorite(character.id);
  };
  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#1A1B1E',
      color: 'white'
    }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        p: 2,
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{ 
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              color: 'white',
              bgcolor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          Back
        </Button>
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 0 }}>
        {/* Character Image */}
        <Box sx={{ 
          width: '100%',
          height: '70vh',
          position: 'relative'
        }}>
          <Box
            component="img"
            src={character.avatar}
            alt={character.name}
            sx={{ 
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </Box>

        {/* Character Info */}
        <Box sx={{ p: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            mb: 2
          }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                {character.name}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Author: {character.author}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <IconButton 
                  onClick={handleLike} 
                  sx={{ 
                    color: stats.isLiked ? '#ff4081' : 'rgba(255, 255, 255, 0.7)',
                    p: 1
                  }}
                >
                  {stats.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    minHeight: '16px'
                  }}
                >
                  {stats.likes}
                </Typography>
              </Box>
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <IconButton 
                  onClick={handleCollect} 
                  sx={{ 
                    color: stats.isFavorited ? '#ffd700' : 'rgba(255, 255, 255, 0.7)',
                    p: 1
                  }}
                >
                  {stats.isFavorited ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    minHeight: '16px'
                  }}
                >
                  {stats.favorites}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1, 
            mb: 2
          }}>
            {character.tags?.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '4px',
                  height: '24px',
                  maxWidth: '150px',
                  '& .MuiChip-label': {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }
                }}
              />
            ))}
          </Box>

          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 3 }}>
            {character.description}
          </Typography>

          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<MessageIcon />}
            onClick={onStartChat}
            sx={{
              bgcolor: '#7C3AED',
              borderRadius: 2,
              py: 1.5,
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#6D28D9'
              }
            }}
          >
            Start a private chat
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CharacterIntro;