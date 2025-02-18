import { CHARACTERS, generateResponse } from '../data/characters';
import { doubaoService } from './doubaoService';

class ChatService {
  constructor() {
    this.conversations = new Map();
  }

  // 初始化新的对话
  async initializeChat(characterId, userId) {
    const character = CHARACTERS[characterId];
    if (!character) {
      throw new Error('Character not found');
    }

    const conversationId = `${userId}-${characterId}`;
    if (!this.conversations.has(conversationId)) {
      // 使用豆包AI生成个性化场景
      const personalizedScene = await doubaoService.generatePersonalizedScene(character, userId);
      
      this.conversations.set(conversationId, {
        messages: [{
          role: 'assistant',
          content: personalizedScene.scene,
          mood: personalizedScene.mood,
          topics: personalizedScene.topics,
          timestamp: Date.now()
        }],
        character: character,
        userId: userId
      });
    }

    return this.conversations.get(conversationId);
  }

  // 发送消息并获取回复
  async sendMessage(characterId, userId, message) {
    const conversationId = `${userId}-${characterId}`;
    let conversation = this.conversations.get(conversationId);

    if (!conversation) {
      conversation = this.initializeChat(characterId, userId);
    }

    // 添加用户消息
    conversation.messages.push({
      role: 'user',
      content: message,
      timestamp: Date.now()
    });

    // 生成AI回复
    const response = generateResponse(conversation.character, message);

    // 添加AI回复
    conversation.messages.push({
      role: 'assistant',
      content: response.text,
      timestamp: Date.now(),
      mood: response.mood
    });

    // 更新对话历史
    this.conversations.set(conversationId, conversation);

    return {
      message: response.text,
      mood: response.mood,
      conversation: conversation
    };
  }

  // 获取对话历史
  getConversationHistory(characterId, userId) {
    const conversationId = `${userId}-${characterId}`;
    return this.conversations.get(conversationId)?.messages || [];
  }

  // 清除对话历史
  clearConversation(characterId, userId) {
    const conversationId = `${userId}-${characterId}`;
    this.conversations.delete(conversationId);
  }
}

export const chatService = new ChatService();