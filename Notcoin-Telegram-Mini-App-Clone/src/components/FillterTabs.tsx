const FilterTabs = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
    const tabs = ["精选", "热门", "上新", "群聊"];
  
    return (
      <div className="flex gap-2 p-4 text-white">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-1 rounded-lg ${activeTab === tab ? "bg-blue-500" : "bg-gray-700"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  };
  
  export default FilterTabs;
  