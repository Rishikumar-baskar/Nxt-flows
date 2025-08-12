import React, { useState } from "react";
import { Play, Copy, Expand, Home, Code, Flag, CheckCircle } from "lucide-react";
import { CgOptions } from "react-icons/cg";
import { GoVerified } from "react-icons/go";

const MainContent = ({ selectedFlow }) => {
  const [activeTab, setActiveTab] = useState("run-once");
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  const [detailTab, setDetailTab] = useState("result");

  const data = {
    "sys.user_id": "7c23f049-ed47-4138-837e-6527b23119f4",
    "sys.app_id": "9ba50e48-73c6-4615-b282-99a92404b573",
    "sys.workflow_id": "05dedaad-105b-484e-8089-071b60880766",
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    alert("Copied to clipboard");
  };

  const handleExpand = () => {
    alert("Expand view clicked");
  };

  const steps = [
    {
      id: 'start',
      name: 'START',
      icon: <Home className="step-icon" />,
      duration: '67.463 ms',
      status: 'success'
    },
    {
      id: 'code',
      name: 'CODE',
      icon: <Code className="step-icon" />,
      duration: '96.533 ms',
      status: 'success'
    },
    {
      id: 'end',
      name: 'END',
      icon: <Flag className="step-icon" />,
      duration: '26.847 ms',
      status: 'success'
    }
  ];
 
  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };
 
  const getIconBgColor = (step) => {
    if (step.name === 'START') return 'bg-blue-100 text-blue-600';
    if (step.name === 'CODE') return 'bg-purple-100 text-purple-600';
    if (step.name === 'END') return 'bg-orange-100 text-orange-600';
    return 'bg-gray-100 text-gray-600';
  };

  const renderJsonLines = (jsonObj) => {
    return Object.entries(jsonObj).map(([key, value], index) => (
      <div className="flex" key={index}>
        <div className="w-8 text-right pr-3 text-gray-400 text-sm select-none">{index + 1}</div>
        <div className="flex-1">
          <span className="text-blue-600">"{key}"</span>
          <span className="text-gray-600">:</span>
          <span className="text-green-600">"{value}"</span>
          <span className="text-gray-600">,</span>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex-1 bg-white flex flex-col">
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Left Panel */}
        <div className="flex-1 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6 -ml-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-lg">{selectedFlow.icon}</div>
              <h2>{selectedFlow.name}</h2>
            </div>
            <div className="text-gray-400 hover:bg-gray-100 p-1 rounded cursor-pointer transition-colors">
              <CgOptions className="w-5 h-5" />
            </div>
          </div>

          <div className="flex mb-6 border-b border-gray-200">
            <button
              className={`px-0 py-3 mr-8 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "run-once" 
                  ? "text-gray-900 border-blue-500" 
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
              onClick={() => {
                setActiveTab("run-once");
                setSelectedHistoryItem(null);
              }}
            >
              Run Once
            </button>
            <button
              className={`px-0 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "history" 
                  ? "text-gray-900 border-blue-500" 
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("history")}
            >
              History
            </button>
          </div>

          <div>
            {activeTab === "run-once" && (
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Clear
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors ml-auto">
                  <Play size={16} fill="white" />
                  Execute
                </button>
              </div>
            )}

            {activeTab === "history" && (
              <div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div
                      key={index}
                      className="flex flex-col p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() =>
                        setSelectedHistoryItem({
                          status: "passed",
                          timestamp: `2025-07-01 10:0${index}:00`,
                        })
                      }
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <GoVerified className="w-4 h-4 text-green-600" />
                        <span>Test Run: 2025-07-01 10:0{index}:00</span>
                      </div>
                      <span className="text-sm text-gray-600 ml-6">Dify · 3 days ago</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-96 xl:w-[500px] border-l border-gray-200 bg-gray-50">
          {selectedHistoryItem ? (
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-gray-200 bg-white">
                <h1 className="text-lg font-medium text-gray-900 mb-4">
                  Test Run ({selectedHistoryItem.timestamp})
                </h1>
                <div className="flex gap-6 text-sm border-b border-gray-200">
                  {["result", "detail", "tracing"].map((tab) => (
                    <button
                      key={tab}
                      className={`pb-3 font-medium transition-colors ${
                        detailTab === tab 
                          ? "text-blue-600 border-b-2 border-blue-600" 
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      onClick={() => setDetailTab(tab)}
                    >
                      {tab.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto">
                {detailTab === "result" && (
                  <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <div
                      className={`text-4xl mb-4 ${selectedHistoryItem.status === "passed" ? "text-green-600" : "text-red-600"}`}
                    >
                      {selectedHistoryItem.status === "passed" ? "✓" : "✗"}
                    </div>
                    <div className="text-gray-700 font-medium mb-2">
                      Test {selectedHistoryItem.status} successfully
                    </div>
                    <div className="text-sm text-gray-600">
                      Run completed at {selectedHistoryItem.timestamp}
                    </div>
                  </div>
                )}

                {detailTab === "detail" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="text-center">
                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Status</div>
                        <div className="text-sm font-medium text-green-600">● SUCCESS</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Elapsed Time</div>
                        <div className="text-sm font-medium text-gray-900">0.140s</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Total Tokens</div>
                        <div className="text-sm font-medium text-gray-900">0 Tokens</div>
                      </div>
                    </div>

                    {/* INPUT */}
                    <div className="bg-gray-100 border border-gray-200 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
                        <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">INPUT</span>
                        <div className="flex gap-2">
                          <button
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            onClick={() =>
                              handleCopy(JSON.stringify(data, null, 2))
                            }
                          >
                            <Copy className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            onClick={handleExpand}
                          >
                            <Expand className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                      <div className="bg-white font-mono text-sm overflow-x-auto">
                        <div className="p-4">
                          <div className="space-y-1">
                            {renderJsonLines(data)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* OUTPUT */}
                    <div className="bg-gray-100 border border-gray-200 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
                        <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">OUTPUT</span>
                        <div className="flex gap-2">
                          <button
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            onClick={() => handleCopy("{}")}
                          >
                            <Copy className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            onClick={handleExpand}
                          >
                            <Expand className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                      <div className="bg-white font-mono text-sm overflow-x-auto">
                        <div className="p-4 min-h-20">
                          <div className="flex">
                            <div className="w-8 text-right pr-3 text-gray-400 select-none">1</div>
                            <div className="text-gray-600">
                              {"{}"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {detailTab === "tracing" && (
                  <div className="bg-gray-100 rounded-lg p-4 space-y-2">
                    {steps.map((step) => (
                      <div key={step.id} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                          <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="9,18 15,12 9,6"></polyline>
                            </svg>
                          </button>
                          
                          <div className={`p-2 rounded-lg ${getIconBgColor(step)}`}>
                            {step.icon}
                          </div>
                          
                          <span className="font-medium text-gray-900">{step.name}</span>
                        </div>
 
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600 font-mono">
                            {step.duration}
                          </span>
                          <CheckCircle className={`w-5 h-5 ${getStatusColor(step.status)}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-2 p-4 bg-green-100 border border-green-200 rounded-t-lg">
                  <div className="w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                  <span className="text-sm font-medium text-green-800">Workflow Process</span>
                </div>
                <div className="p-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">JSON OUTPUT</span>
                      <div className="flex gap-2">
                        <button
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                          title="Copy"
                          onClick={() => handleCopy("{}")}
                        >
                          📋
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                          title="Expand"
                          onClick={handleExpand}
                        >
                          ⤢
                        </button>
                      </div>
                    </div>
                    <div className="font-mono text-sm">
                      <div>
                        <span className="text-pink-600 font-bold">{"{}"}</span>
                      </div>
                    </div>
                    <div className="h-5" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;