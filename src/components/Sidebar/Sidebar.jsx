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
    <div className="w-48 sm:w-56 md:w-60 bg-gray-50 border-r border-gray-200 h-full pt-8 sm:pt-11 pb-5 font-sans overflow-y-auto">
      <div className="px-2 sm:px-3 mb-4">
        <h3 className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
          PROJECTS
        </h3>
      </div>
      
      <div className="px-2 sm:px-3 space-y-1">
        {flows.map((flow) => (
          <div 
            key={flow.id}
            className={`flex items-center gap-2 sm:gap-3 p-1 sm:p-2 rounded-lg cursor-pointer transition-colors ${
              selectedFlow.id === flow.id 
                ? 'bg-gray-200 text-gray-900' 
                : 'hover:bg-gray-100'
            }`}
            onClick={() => handleFlowSelect(flow)}
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-sm sm:text-base flex-shrink-0">
              {flow.icon}
            </div>
            <span className="text-xs sm:text-sm font-medium truncate">{flow.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;