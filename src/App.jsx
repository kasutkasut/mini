import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

// 页面组件
const Home = React.lazy(() => import('./pages/Home'));
const Chat = React.lazy(() => import('./pages/Chat'));
const ChatHistory = React.lazy(() => import('./pages/ChatHistory'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Recharge = React.lazy(() => import('./pages/Recharge'));

// 创建主题
const theme = createTheme({
  palette: {
    mode: window.Telegram.WebApp.colorScheme,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh' }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:characterId" element={<Chat />} />
            <Route path="/history" element={<ChatHistory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recharge" element={<Recharge />} />
          </Routes>
        </React.Suspense>
      </Box>
    </ThemeProvider>
  );
}

export default App; 