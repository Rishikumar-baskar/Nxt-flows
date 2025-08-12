import React, { useState } from 'react';

const Sidebar = ({ onFlowSelect }) => {
  const flows = [
    {
      id: 1,
      name: 'sampletry',
      icon: '🤖',
      description: 'A sample workflow for testing and demonstration purposes. This flow processes basic data transformations.'
    },
    {
      id: 2,
      name: 'multipefry',
      icon: '🔄',
      description: 'A multi-step workflow that handles complex data processing with multiple validation stages.'
    },
    {
      id: 3,
      name: 'api flowstry',
      icon: '🌐',
      description: 'An API-focused workflow that manages external service integrations and data synchronization.'
    }
  ];

  const [selectedFlow, setSelectedFlow] = useState(flows[0]);

  const handleFlowSelect = (flow) => {
    setSelectedFlow(flow);
    onFlowSelect(flow);
  };

  return (
    <div className="w-48 sm:w-56 md:w-60 lg:w-64 bg-gray-50 border-r border-gray-200 h-full pt-6 sm:pt-8 lg:pt-11 pb-5 font-sans overflow-y-auto">
      <div className="px-3 sm:px-4 mb-4">
        <h3 className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-3">
          PROJECTS
        </h3>
      </div>
      
      <div className="px-3 sm:px-4 space-y-1">
        {flows.map((flow) => (
          <div 
            key={flow.id}
            className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedFlow.id === flow.id 
                ? 'bg-white shadow-sm border border-gray-200 text-gray-900' 
                : 'hover:bg-gray-100 hover:shadow-sm'
            }`}
            onClick={() => handleFlowSelect(flow)}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-yellow-100 rounded-lg flex items-center justify-center text-sm sm:text-base lg:text-lg flex-shrink-0">
              {flow.icon}
            </div>
            <span className="text-xs sm:text-sm lg:text-base font-medium truncate">{flow.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;