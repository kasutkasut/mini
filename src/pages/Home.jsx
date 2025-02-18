import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  InputAdornment,
  Button,
  Container,
  Paper,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useUserStore from '../store/userStore';
import { CHARACTERS } from '../data/characters';
import { useTranslation } from 'react-i18next';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const FILTERS = ['featured', 'popular', 'new', 'group'];

// 修改标签系统
const INITIAL_VISIBLE_TAGS = [
  'virtual',  // 最常用的标签
  'modern',
  'art',
  'music',
  'entertainment',
  'tech',
  'gaming',
  'fashion',
  'ai',
  'fantasy',
  'historical',
  'adventure',
  'romance',
  'drama',
  'trendsetter',
  'animation',
  'social media',
  'influencer',
  'popCulture'
];

const ALL_TAGS = [
  // 基础标签
  ...INITIAL_VISIBLE_TAGS,
  // 更多标签
  'martialArts',
  'cultivation',
  'supernatural',
  'magic',
  'timeTravel',
  'gaming',
  'sports',
  'art',
  'food',
  'travel',
  'business',
  'politics',
  'military',
  'medical',
  'detective',
  'cyberpunk',
  'postApocalyptic',
  'steampunk',
  'mythology',
  'folklore',
  'superpower',
  'ai',
  'robot',
  'space',
  'kingdom',
  'empire',
  'academy',
  'university',
  'family',
  'friendship',
  'socialMedia',
  'popCulture',
  'trendsetter'
];

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const [filter, setFilter] = useState('featured');
  const [searchText, setSearchText] = useState('');
  const [showAllTags, setShowAllTags] = useState(false);
  const { 
    remainingFreeChats, 
    resetChatCount,
    characterStats,
    initCharacterStats,
    toggleLike,
    toggleFavorite
  } = useUserStore();
  
  const [selectedTags, setSelectedTags] = useState([]);

  // 初始化角色统计数据
  useEffect(() => {
    initCharacterStats(CHARACTERS);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    switch (newValue) {
      case 0: // AI Avatar
        navigate('/');
        break;
      case 1: // Chat
        navigate('/history');
        break;
      case 2: // Recharge
        navigate('/recharge');
        break;
      case 3: // Profile
        navigate('/profile');
        break;
    }
  };

  // 根据当前路径设置活动标签
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setTab(0);
    else if (path === '/history') setTab(1);
    else if (path === '/recharge') setTab(2);
    else if (path === '/profile') setTab(3);
  }, [location]);

  const handleCharacterClick = (id) => {
    navigate(`/chat/${id}`);
  };

  const handleTagClick = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleLike = (characterId, event) => {
    event.stopPropagation();
    // 检查用户是否已登录
    const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (!user) {
      // 如果用户未登录，显示提示信息
      window.Telegram.WebApp.showAlert('请先登录后再进行点赞操作');
      return;
    }
    toggleLike(characterId);
  };

  const handleFavorite = (characterId, event) => {
    event.stopPropagation();
    toggleFavorite(characterId);
  };

  const visibleTags = showAllTags ? ALL_TAGS : INITIAL_VISIBLE_TAGS;

  const formatNumber = (num) => {
    if (num >= 10000) {
      return `${Math.floor(num / 1000)}k`;
    }
    return num.toString();
  };

  // 过滤和排序角色列表
  const filteredCharacters = Object.entries(CHARACTERS)
    .filter(([id, character]) => {
      // 搜索过滤
      if (searchText) {
        const searchLower = searchText.toLowerCase();
        return (
          character.name.toLowerCase().includes(searchLower) ||
          character.description.toLowerCase().includes(searchLower)
        );
      }
      // 标签过滤
      if (selectedTags.length > 0) {
        return selectedTags.every(tag => character.tags.includes(tag));
      }
      return true;
    })
    .sort((a, b) => {
      // 排序逻辑
      switch (filter) {
        case 'popular':
          return (characterStats[b[0]]?.likes || 0) - (characterStats[a[0]]?.likes || 0);
        case 'new':
          return new Date(characterStats[b[0]]?.createdAt || 0) - new Date(characterStats[a[0]]?.createdAt || 0);
        default:
          return 0;
      }
    })
    .map(([id, character]) => ({ id, ...character }));

  return (
    <Box sx={{ 
      pb: 2, 
      bgcolor: '#1A1B1E',
      minHeight: '100vh',
      color: 'white'
    }}>
      {/* 顶部导航 */}
      <Paper elevation={0} sx={{ 
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        bgcolor: 'rgba(26, 27, 30, 0.95)'
      }}>
        <Tabs 
          value={tab} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.7)',
              '&.Mui-selected': {
                color: 'white',
                fontWeight: 600
              }
            },
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0',
              bgcolor: '#7C3AED'
            }
          }}
        >
          <Tab label={t('nav.aiAvatar')} />
          <Tab label={t('nav.chat')} />
          <Tab label={t('nav.recharge')} />
          <Tab label={t('nav.profile')} />
        </Tabs>
      </Paper>

      <Container maxWidth="sm" sx={{ pt: 2 }}>
        {/* 搜索栏 */}
        <TextField
          fullWidth
          placeholder={t('search.placeholder')}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          variant="outlined"
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.15)'
              },
              '& fieldset': {
                border: 'none'
              }
            },
            '& .MuiInputBase-input::placeholder': {
              color: 'rgba(255, 255, 255, 0.5)'
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
              </InputAdornment>
            ),
          }}
        />

        {/* 过滤器 */}
        <Box sx={{ mb: 3 }}>
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(e, v) => v && setFilter(v)}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              mb: 2,
              '& .MuiToggleButton-root': {
                border: 'none',
                borderRadius: '20px !important',
                px: 3,
                py: 1,
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-selected': {
                  bgcolor: '#7C3AED',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#6D28D9'
                  }
                },
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.15)'
                }
              }
            }}
          >
            {FILTERS.map((label) => (
              <ToggleButton key={label} value={label}>
                {t(`filters.${label}`)}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          {/* 标签云 */}
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1
          }}>
            {visibleTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => handleTagClick(tag)}
                sx={{
                  bgcolor: selectedTags.includes(tag) ? '#7C3AED' : 'rgba(255, 255, 255, 0.1)',
                  color: selectedTags.includes(tag) ? 'white' : 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '16px',
                  '&:hover': {
                    bgcolor: selectedTags.includes(tag) ? '#6D28D9' : 'rgba(255, 255, 255, 0.15)'
                  }
                }}
              />
            ))}
            <Chip
              label={showAllTags ? t('tags.showLess') : t('tags.showMore')}
              onClick={() => setShowAllTags(!showAllTags)}
              sx={{
                bgcolor: 'transparent',
                border: '1px dashed rgba(255, 255, 255, 0.3)',
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            />
          </Box>
        </Box>

        {/* 角色列表 */}
        <Box sx={{ mb: 3 }}>
          {filteredCharacters.map((character) => (
            <Card 
              key={character.id} 
              sx={{ 
                mb: 2,
                cursor: 'pointer',
                borderRadius: 2,
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
                }
              }}
              onClick={() => handleCharacterClick(character.id)}
            >
              <Box sx={{ display: 'flex', p: 2 }}>
                <CardMedia
                  component="img"
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: 2,
                    objectFit: 'cover'
                  }}
                  image={character.avatar}
                  alt={t(`characters.${character.id}.name`)}
                />
                <CardContent sx={{ flex: 1, p: 2 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'row',
                    mb: 1,
                    gap: 2
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      gap: 1,
                      flexShrink: 0,
                      order: 2,
                      ml: 'auto'
                    }}>
                      <Box
                        onClick={(e) => handleLike(character.id, e)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          height: '28px',
                          padding: '0 10px',
                          borderRadius: '14px',
                          cursor: 'pointer',
                          bgcolor: 'rgba(255, 255, 255, 0.05)',
                          color: characterStats[character.id]?.isLiked ? '#ff4081' : 'rgba(255, 255, 255, 0.7)',
                          transition: 'all 0.2s',
                          minWidth: '52px',
                          justifyContent: 'center',
                          border: '1px solid',
                          borderColor: characterStats[character.id]?.isLiked ? '#ff4081' : 'rgba(255, 255, 255, 0.1)',
                          '&:hover': {
                            bgcolor: characterStats[character.id]?.isLiked ? 'rgba(255, 64, 129, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                            borderColor: characterStats[character.id]?.isLiked ? '#ff4081' : 'rgba(255, 255, 255, 0.3)',
                          }
                        }}
                      >
                        {characterStats[character.id]?.isLiked ? (
                          <FavoriteIcon sx={{ fontSize: 14 }} />
                        ) : (
                          <FavoriteBorderIcon sx={{ fontSize: 14 }} />
                        )}
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 500,
                            fontSize: '0.75rem',
                            lineHeight: 1
                          }}
                        >
                          {formatNumber(characterStats[character.id]?.likes || 0)}
                        </Typography>
                      </Box>

                      <Box
                        onClick={(e) => handleFavorite(character.id, e)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          height: '28px',
                          padding: '0 10px',
                          borderRadius: '14px',
                          cursor: 'pointer',
                          bgcolor: 'rgba(255, 255, 255, 0.05)',
                          color: characterStats[character.id]?.isFavorited ? '#ffd700' : 'rgba(255, 255, 255, 0.7)',
                          transition: 'all 0.2s',
                          minWidth: '52px',
                          justifyContent: 'center',
                          border: '1px solid',
                          borderColor: characterStats[character.id]?.isFavorited ? '#ffd700' : 'rgba(255, 255, 255, 0.1)',
                          '&:hover': {
                            bgcolor: characterStats[character.id]?.isFavorited ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                            borderColor: characterStats[character.id]?.isFavorited ? '#ffd700' : 'rgba(255, 255, 255, 0.3)',
                          }
                        }}
                      >
                        {characterStats[character.id]?.isFavorited ? (
                          <StarIcon sx={{ fontSize: 14 }} />
                        ) : (
                          <StarBorderIcon sx={{ fontSize: 14 }} />
                        )}
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 500,
                            fontSize: '0.75rem',
                            lineHeight: 1
                          }}
                        >
                          {formatNumber(characterStats[character.id]?.favorites || 0)}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600,
                        color: 'white',
                        flex: 1,
                        order: 1,
                        wordBreak: 'break-word'
                      }}
                    >
                      {t(`characters.${character.id}.name`)}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 2,
                      color: 'rgba(255, 255, 255, 0.7)'
                    }}
                  >
                    {t(`characters.${character.id}.description`)}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {character.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          bgcolor: selectedTags.includes(tag) ? '#7C3AED' : 'rgba(124, 58, 237, 0.2)',
                          color: 'white',
                          fontWeight: 500,
                          '&:hover': {
                            bgcolor: selectedTags.includes(tag) ? '#6D28D9' : 'rgba(124, 58, 237, 0.3)'
                          }
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTagClick(tag);
                        }}
                      />
                    ))}
                  </Box>
                  {filter === 'new' && (
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block',
                        mt: 1,
                        color: 'rgba(255, 255, 255, 0.5)'
                      }}
                    >
                      {new Date(characterStats[character.id]?.createdAt || 0).toLocaleDateString()}
                    </Typography>
                  )}
                </CardContent>
              </Box>
            </Card>
          ))}
        </Box>

        {/* 剩余对话次数提示 */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 1,
              color: 'white',
              fontWeight: 600
            }}
          >
            {t('chat.remainingFreeChats', { count: remainingFreeChats() })}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/chat/${character.id}`)}
              sx={{
                width: '100%',
                maxWidth: 200,
                borderRadius: '20px'
              }}
            >
              开始聊天
            </Button>
          </Box>
          <Button 
            variant="outlined"
            size="large"
            onClick={resetChatCount}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
                bgcolor: 'rgba(255, 255, 255, 0.05)'
              }
            }}
          >
            {t('chat.resetCounter')}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default Home;