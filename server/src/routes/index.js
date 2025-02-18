import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// 更新角色的点赞状态
router.post('/api/characters/:id/like', async (req, res) => {
  const { id } = req.params;
  const { user_id, isLiked } = req.body;

  try {
    // 更新或插入点赞记录
    const { data, error } = await supabase
      .from('character_likes')
      .upsert([
        {
          character_id: id,
          user_id,
          liked: isLiked
        }
      ]);

    if (error) throw error;

    // 获取最新的点赞数
    const { count } = await supabase
      .from('character_likes')
      .select('*', { count: 'exact' })
      .eq('character_id', id)
      .eq('liked', true);

    res.json({ success: true, likes: count });
  } catch (error) {
    console.error('Error updating like status:', error);
    res.status(500).json({ error: '更新点赞状态失败' });
  }
});

// 获取用户的点赞状态
router.get('/api/characters/:id/like', async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.query;

  try {
    const { data, error } = await supabase
      .from('character_likes')
      .select('liked')
      .eq('character_id', id)
      .eq('user_id', user_id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    res.json({ isLiked: data?.liked || false });
  } catch (error) {
    console.error('Error fetching like status:', error);
    res.status(500).json({ error: '获取点赞状态失败' });
  }
});

export default router;