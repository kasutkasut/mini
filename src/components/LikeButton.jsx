import React, { useState, useEffect } from 'react';
import { IconButton, Snackbar } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const LikeButton = ({ characterId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // 获取当前用户ID
  const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
  const userId = user?.id;

  useEffect(() => {
    if (userId && characterId) {
      fetchLikeStatus();
    }
  }, [userId, characterId]);

  const fetchLikeStatus = async () => {
    try {
      const response = await fetch(`/api/characters/${characterId}/like?user_id=${userId}`);
      const data = await response.json();
      setIsLiked(data.isLiked);
    } catch (error) {
      console.error('获取点赞状态失败:', error);
    }
  };

  const handleLike = async () => {
    if (!userId) {
      setSnackbarMessage('请先登录后再点赞');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await fetch(`/api/characters/${characterId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          isLiked: !isLiked
        })
      });

      const data = await response.json();
      if (data.success) {
        setIsLiked(!isLiked);
        setSnackbarMessage(isLiked ? '已取消点赞' : '点赞成功');
      } else {
        throw new Error(data.error || '操作失败');
      }
    } catch (error) {
      console.error('点赞操作失败:', error);
      setSnackbarMessage('点赞失败，请稍后重试');
    }
    setSnackbarOpen(true);
  };

  return (
    <>
      <IconButton
        onClick={handleLike}
        color="primary"
        aria-label={isLiked ? '取消点赞' : '点赞'}
      >
        {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </>
  );
};

export default LikeButton;