import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [input, setInput] = useState("");

  return (
    <div className="flex items-center bg-gray-800 p-2 rounded-lg mx-4 mt-2">
      <Search className="text-gray-400" size={20} />
      <input
        type="text"
        placeholder="搜索角色名称、关键词或标签"
        className="bg-transparent flex-1 text-white ml-2 focus:outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="ml-2 bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
        onClick={() => onSearch(input)}
      >
        搜索
      </button>
    </div>
  );
};

export default SearchBar;
