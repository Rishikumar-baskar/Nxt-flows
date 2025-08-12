import React, { useState } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../Navbar/Navbar';
import MainContent from '../../Maincontent/Maincontent';

const Index = () => {
  const [selectedFlow, setSelectedFlow] = useState({
    id: 1,
    name: 'sampletry',
    icon: '🤖',
    description: 'A sample workflow for testing and demonstration purposes. This flow processes basic data transformations.'
  });

  const handleFlowSelect = (flow) => {
    setSelectedFlow(flow);
  };

  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className="flex h-[calc(100vh-60px)]">
        <Sidebar onFlowSelect={handleFlowSelect} />
        <MainContent selectedFlow={selectedFlow} />
      </div>
    </div>
  );
};

export default Index;