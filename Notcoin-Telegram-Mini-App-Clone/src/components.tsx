import React, { useState } from "react";

const tags = ["精选", "热门", "上新", "群聊"];
const characters = [
  {
    id: 1,
    name: "武则天",
    image: "https://example.com/wuzetian.jpg",
    description: "步入唐朝宫廷，体验权力与亲情的终极较量。",
    tags: ["女性向", "剧情", "古代", "历史"]
  },
  {
    id: 2,
    name: "刘继国",
    image: "https://example.com/liujiguo.jpg",
    description: "年轻朴实的农村小伙刘继国，虽然外表朴素，内心却充满魅力。",
    tags: ["女性向", "处男", "大叔", "状态栏"]
  }
];

export default function App() {
  const [selectedTag, setSelectedTag] = useState("精选");

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* 顶部导航栏 */}
      <header className="p-4 flex justify-between items-center bg-gray-800 shadow-md">
        <h1 className="text-xl font-bold">LULU AI 伴侣</h1>
        <input
          type="text"
          placeholder="搜索角色名称 / 关键词 / 标签"
          className="bg-gray-700 text-white p-2 rounded-md w-1/3 focus:outline-none"
        />
      </header>
      
      {/* 标签筛选 */}
      <div className="flex space-x-4 p-4 overflow-x-auto">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`px-4 py-2 rounded-md ${
              selectedTag === tag ? "bg-purple-500" : "bg-gray-700"
            }`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      
      {/* 角色列表 */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {characters.map((char) => (
          <div key={char.id} className="bg-gray-800 p-4 rounded-lg shadow-lg flex">
            <img src={char.image} alt={char.name} className="w-24 h-24 rounded-lg" />
            <div className="ml-4">
              <h2 className="text-lg font-semibold">{char.name}</h2>
              <p className="text-sm text-gray-400">{char.description}</p>
              <div className="flex flex-wrap mt-2">
                {char.tags.map((tag, index) => (
                  <span key={index} className="bg-purple-500 px-2 py-1 text-xs rounded-full mr-2 mb-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
