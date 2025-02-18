import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Security as SecurityIcon,
  Help as HelpIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import useUserStore from '../store/userStore';
import NavBar from '../components/NavBar';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ru', name: 'Русский' },
  { code: 'ar', name: 'العربية' },
  { code: 'pt', name: 'Português' },
  { code: 'it', name: 'Italiano' },
  { code: 'th', name: 'ไทย' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'ko', name: '한국어' },
  { code: 'vi', name: 'Tiếng Việt' }
];

const Profile = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user, setUser, logout } = useUserStore();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false);

  useEffect(() => {
    // 获取Telegram WebApp用户数据
    const tg = window.Telegram?.WebApp;
    if (tg.initDataUnsafe?.user) {
      const telegramUser = tg.initDataUnsafe.user;
      setUser({
        id: telegramUser.id,
        name: telegramUser.first_name + (telegramUser.last_name ? ' ' + telegramUser.last_name : ''),
        username: telegramUser.username,
        photoUrl: telegramUser.photo_url,
        isPremium: false
      });
    }
  }, [setUser]);

  const handleLanguageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    handleLanguageClose();
  };

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutDialog(false);
    navigate('/');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#1A1B1E',
      color: 'white',
      pb: 4
    }}>
      <NavBar title={t('profile.title')} showBack={true} />

      <Container maxWidth="sm">
        {/* 用户信息卡片 */}
        <Paper sx={{ 
          p: 3, 
          mb: 3, 
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 2
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2, 
            mb: 2 
          }}>
            <Avatar
              src={user?.photoUrl}
              sx={{ 
                width: 80, 
                height: 80,
                bgcolor: '#7C3AED'
              }}
            >
              {user?.name?.[0] || 'T'}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ color: 'white' }}>
                {user?.name || t('profile.username')}
              </Typography>
              {user?.username && (
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  @{user.username}
                </Typography>
              )}
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                ID: {user?.id || '-'}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* 设置列表 */}
        <Paper sx={{ 
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 2,
          '& .MuiListItemText-primary': {
            color: 'white'
          },
          '& .MuiListItemText-secondary': {
            color: 'rgba(255, 255, 255, 0.7)'
          },
          '& .MuiSwitch-root': {
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: '#7C3AED',
              '& + .MuiSwitch-track': {
                backgroundColor: '#7C3AED'
              }
            }
          }
        }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <NotificationsIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
              </ListItemIcon>
              <ListItemText 
                primary={t('profile.settings.notification')}
              />
              <Switch />
            </ListItem>
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            
            <ListItem button onClick={handleLanguageClick}>
              <ListItemIcon>
                <LanguageIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
              </ListItemIcon>
              <ListItemText 
                primary={t('profile.settings.language')}
                secondary={LANGUAGES.find(lang => lang.code === i18n.language)?.name}
              />
            </ListItem>
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

            <ListItem>
              <ListItemIcon>
                <SecurityIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
              </ListItemIcon>
              <ListItemText 
                primary={t('profile.settings.privacy')}
              />
            </ListItem>
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

            <ListItem>
              <ListItemIcon>
                <HelpIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
              </ListItemIcon>
              <ListItemText 
                primary={t('profile.settings.help')}
              />
            </ListItem>

            {/* 只有在用户登录时才显示退出登录按钮 */}
            {user && (
              <>
                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                <ListItem button onClick={handleLogout}>
                  <ListItemIcon>
                    <ExitToAppIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={t('profile.settings.logout')}
                  />
                </ListItem>
              </>
            )}
          </List>
        </Paper>

        {/* 语言选择菜单 */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleLanguageClose}
          PaperProps={{
            sx: {
              bgcolor: '#1A1B1E',
              color: 'white',
              '& .MuiMenuItem-root': {
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)'
                },
                '&.Mui-selected': {
                  bgcolor: 'rgba(124, 58, 237, 0.2)',
                  '&:hover': {
                    bgcolor: 'rgba(124, 58, 237, 0.3)'
                  }
                }
              }
            }
          }}
        >
          {LANGUAGES.map((lang) => (
            <MenuItem 
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              selected={i18n.language === lang.code}
            >
              {lang.name}
            </MenuItem>
          ))}
        </Menu>

        {/* 退出登录确认对话框 */}
        <Dialog
          open={showLogoutDialog}
          onClose={() => setShowLogoutDialog(false)}
          PaperProps={{
            sx: {
              bgcolor: '#1A1B1E',
              color: 'white',
              '& .MuiDialogTitle-root': {
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }
            }
          }}
        >
          <DialogTitle>
            {t('profile.settings.logout')}
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ mt: 2, color: 'rgba(255, 255, 255, 0.7)' }}>
              {t('profile.logoutConfirmation')}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setShowLogoutDialog(false)}
              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              {t('cancel')}
            </Button>
            <Button 
              onClick={confirmLogout}
              sx={{ 
                color: '#ff4444',
                '&:hover': {
                  bgcolor: 'rgba(255, 68, 68, 0.1)'
                }
              }}
            >
              {t('profile.settings.logout')}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Profile; 