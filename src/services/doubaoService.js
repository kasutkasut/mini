import axios from 'axios';
import { API_CONFIG } from '../data/characters';

class DoubaoService {
  constructor() {
    this.apiKey = process.env.ARK_API_KEY;
    this.baseUrl = "https://ark.cn-beijing.volces.com/api/v3";
    this.model = "ep-20250212184643-ngb5x";
    this.systemPrompt = {
      role: "system",
      content: "你是豆包，一个专门负责角色扮演和场景设定的AI助手。你擅长：\n1. 根据角色背景创造生动的场景\n2. 设计符合角色性格的对话和互动\n3. 营造独特的氛围和情感体验\n4. 为每个用户提供个性化的剧情发展"
    };
  }

  async generatePersonalizedScene(character, userId) {
    try {
      const prompt = `请为以下角色生成一个独特的开场场景：

角色背景：
${character.characterSettings.background}

角色性格：
${character.characterSettings.personality}

要求：
1. 场景要独特且符合角色设定
2. 要考虑用户ID: ${userId} 的独特性
3. 要包含具体的场景描述、情绪状态和可能的互动话题

请用JSON格式返回，包含以下字段：
scene: 场景描述
mood: 当前情绪
topics: 可能的互动话题（数组）`;

      const response = await axios.post(`${this.baseUrl}/chat/completions`, {
        model: this.model,
        messages: [
          this.systemPrompt,
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 1000
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      const result = response.data.choices[0].message.content;
      try {
        return JSON.parse(result);
      } catch (error) {
        console.error('Error parsing API response:', error);
        return {
          scene: character.storySettings.mainScenario,
          mood: character.storySettings.initialContext.mood,
          topics: character.storySettings.plotPoints
        };
      }
    } catch (error) {
      console.error('Error generating personalized scene:', error);
      // 如果API调用失败，返回默认场景
      return {
        scene: character.storySettings.mainScenario,
        mood: character.storySettings.initialContext.mood,
        topics: character.storySettings.plotPoints
      };
    }
  }
}

export const doubaoService = new DoubaoService();