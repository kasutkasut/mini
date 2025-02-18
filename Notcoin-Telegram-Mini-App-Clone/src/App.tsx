import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import FilterTabs from './components/FilterTabs'; // 添加导入语句
import DOMPurify from "dompurify"; // 防止XSS攻击
import { useImmer } from "use-immer"; // 优化性能

interface User {
  id: string;
  first_name: string;
}

interface Character {
  id: string;
  name: string;
  description: string;
}

interface Message {
  text: string;
  user: "me" | "ai";
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [messages, updateMessages] = useImmer<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [activeTab, setActiveTab] = useState("精选");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe) {
      setUser(window.Telegram.WebApp.initDataUnsafe.user as User);
    }

    fetch(process.env.REACT_APP_API_URL + "/api/characters") // 提取硬编码URL
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch characters");
        return res.json();
      })
      .then(setCharacters)
      .catch((err) => {
        console.error("Error fetching characters:", err);
        setError("无法获取角色列表，请稍后再试。");
      });
  }, []);

  const handleSearch = (query: string) => {
    console.log("搜索内容：", query);
  };

  const sendMessage = async () => {
    if (!input || !selectedCharacter || !user) return;

    try {
      const res = await fetch(process.env.REACT_APP_API_URL + "/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": getCsrfToken(), // 引入CSRF令牌
        },
        body: JSON.stringify({
          user_id: user.id,
          character_id: selectedCharacter.id,
          message: input,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      const data = await res.json();
      updateMessages((draft) => {
        draft.push({ text: DOMPurify.sanitize(input), user: "me" });
        draft.push({ text: DOMPurify.sanitize(data.reply), user: "ai" });
      });
      setInput("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("发送消息失败，请稍后再试。");
    }
  };

  if (!user) {
    return (
      <div className="bg-gray-900 text-white min-h-screen p-6 flex flex-col items-center">
        <p>请先登录。</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6 flex flex-col items-center">
      <Navbar />
      <Searchbar onSearch={handleSearch} />
      <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <h1 className="text-2xl font-bold mb-4">AI 角色扮演</h1>
      <p className="mb-4">欢迎, {user.first_name}!</p>

      {error && <p className="text-red-500">{error}</p>}

      {!selectedCharacter ? (
        <div className="grid grid-cols-2 gap-4">
          {characters.map((char) => (
            <button
              key={char.id}
              onClick={async () => {
                const conversation = await chatService.initializeChat(char.id, user.id);
                setSelectedCharacter(char);
                if (conversation && conversation.messages.length > 0) {
                  updateMessages([{
                    text: conversation.messages[0].content,
                    user: "ai"
                  }]);
                }
              }}
              className="bg-blue-600 p-3 rounded-lg hover:bg-blue-700"
            >
              {char.name}
            </button>
          ))}
        </div>
      ) : (
        <div className="w-full max-w-md">
          <h2 className="text-xl font-semibold">聊天 {selectedCharacter.name}</h2>
          <div className="bg-gray-800 p-4 rounded-lg h-60 overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <p
                key={index}
                className={msg.user === "me" ? "text-right text-blue-400" : "text-left text-green-400"}
              >
                {msg.text}
              </p>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 bg-gray-700 rounded-lg"
            />
            <button
              onClick={sendMessage}
              className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
            >
              发送
            </button>
          </div>
          <button
            onClick={() => setSelectedCharacter(null)}
            className="mt-4 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
          >
            返回角色选择
          </button>
        </div>
      )}
    </div>
  );

  function getCsrfToken() {
    // 实现获取CSRF令牌的逻辑
    return "your-csrf-token";
  }
};

export default App;