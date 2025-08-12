import React, { useState } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../Navbar/Navbar';
import { ThumbsUp, Search } from 'lucide-react';

const Exploreflow = () => {
  const [activeCategory, setActiveCategory] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFlow, setSelectedFlow] = useState({
    id: 1,
    name: 'sampletry',
    icon: '🤖',
    description: 'A sample workflow for testing and demonstration purposes. This flow processes basic data transformations.'
  });

  const handleFlowSelect = (flow) => {
    setSelectedFlow(flow);
  };

  const categories = [
    { id: 'recent', label: 'Recent', icon: ThumbsUp },
    { id: '', label: 'AI Coding' },
    { id: 'customer-service', label: 'Customer Service & Operations' },
  ];

  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className="flex h-[calc(100vh-56px)] sm:h-[calc(100vh-64px)]">
        <Sidebar onFlowSelect={handleFlowSelect} />
        <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-600 mb-2 sm:mb-4 tracking-tight">
                Explore Apps
              </h1>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Use these template apps instantly or customize your own apps based on the templates.
              </p>
            </div>

            {/* Categories and Search */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
                {/* Category Buttons */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {categories.map((category) => {
                    const isActive = activeCategory === category.id;
                    const IconComponent = category.icon;

                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`flex items-center gap-2 h-8 sm:h-9 px-3 sm:px-4 rounded-full font-medium text-xs sm:text-sm transition-all duration-200 ${
                          isActive
                            ? 'bg-white text-blue-600 border border-gray-200 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        {IconComponent && (
                          <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                        <span className="whitespace-nowrap">{category.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Search Input */}
                <div className="relative w-full lg:w-auto lg:max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 h-8 sm:h-9 bg-gray-100 border border-gray-200 rounded-full text-xs sm:text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Content Area - Placeholder for future content */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 text-center">
              <div className="text-gray-400 mb-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                No apps found
              </h3>
              <p className="text-sm sm:text-base text-gray-500">
                Try adjusting your search or browse different categories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exploreflow;