import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

class SupabaseService {
  constructor() {
    this.supabase = supabase;
    this.bucketName = 'character-avatars';
  }

  // 获取角色头像URL
  async getAvatarUrl(characterId) {
    try {
      const { data, error } = await this.supabase
        .storage
        .from(this.bucketName)
        .createSignedUrl(`${characterId}.jpg`, 60 * 60); // 1小时有效期

      if (error) {
        console.error('Error getting avatar URL:', error);
        return null;
      }

      return data.signedUrl;
    } catch (error) {
      console.error('Error in getAvatarUrl:', error);
      return null;
    }
  }

  // 上传角色头像
  async uploadAvatar(characterId, file) {
    try {
      const { data, error } = await this.supabase
        .storage
        .from(this.bucketName)
        .upload(`${characterId}.jpg`, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.error('Error uploading avatar:', error);
        return null;
      }

      return await this.getAvatarUrl(characterId);
    } catch (error) {
      console.error('Error in uploadAvatar:', error);
      return null;
    }
  }

  // 删除角色头像
  async deleteAvatar(characterId) {
    try {
      const { error } = await this.supabase
        .storage
        .from(this.bucketName)
        .remove([`${characterId}.jpg`]);

      if (error) {
        console.error('Error deleting avatar:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteAvatar:', error);
      return false;
    }
  }
}

export const supabaseService = new SupabaseService(); 