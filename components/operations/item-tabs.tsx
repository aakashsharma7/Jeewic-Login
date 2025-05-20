"use client"

export function ItemTabs({
  tabs,
  setActiveTab,
  activeTab,
}: Readonly<{
  tabs: ICategoryData[];
  setActiveTab: (tab: string) => void;
  activeTab: string;
}>) {
  if (!tabs) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex items-center justify-center w-16 h-16 border-4 border-gray-200 border-t-4 border-t-blue-500 rounded-full animate-spin">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="border-b mb-6">
      <div className="flex space-x-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`pb-2 px-1 font-medium text-sm whitespace-nowrap ${
              activeTab === tab.id
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-black hover:text-gray-800"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name} <span className="ml-1 text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">{tab.count}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
