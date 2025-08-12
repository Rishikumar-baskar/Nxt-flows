import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Settings,
  Square,
  Layers,
  BookOpen,
  Plus,
  ChevronDown,
} from "lucide-react";

const Navbar = ({
  onNewApp,
  workspaces = [],
  currentWorkspace,
  handleWorkspaceSelect,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("Flows");
  const [containers, setContainers] = useState([]);
  const [currentApp, setCurrentApp] = useState(null);
  const [showStudioDropdown, setShowStudioDropdown] = useState(false);
  const [showWorkspaceDropdown, setShowWorkspaceDropdown] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("containers");
    const parsed = stored ? JSON.parse(stored) : [];
    setContainers(parsed);
    
    if (location.pathname.startsWith("/studio/")) {
      const appId = location.pathname.split("/")[2];
      const foundApp = parsed.find(app => app.id.toString() === appId);
      if (foundApp) {
        setCurrentApp(foundApp);
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/studio")) setActiveTab("Studio");
    else if (path.startsWith("/Exploreflow")) setActiveTab("Flows");
    else if (path.startsWith("/knowledge")) setActiveTab("Knowledge");
    else if (path.startsWith("/settings")) setActiveTab("Settings");
    else setActiveTab("Flows");
  }, [location.pathname]);

  const handleAppSelect = (app) => {
    setCurrentApp(app);
    setShowStudioDropdown(false);
    navigate(`/studio/${app.id}`, { replace: true });
  };

  const handleNewApp = () => {
    setShowStudioDropdown(false);
    onNewApp?.();
  };

  return (
    <nav className="flex items-center justify-between h-14 sm:h-16 bg-gray-50 border-b border-gray-200 px-3 sm:px-4 lg:px-6 relative z-50 font-sans text-sm">
      {/* Left Section */}
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="font-bold text-base sm:text-lg">Flows</div>
        <div className="text-gray-400 font-medium text-base mx-1">/</div>

        {/* Workspace Selector */}
        <div className="relative">
          <div
            className="flex items-center gap-1 sm:gap-2 px-1 py-1 rounded-lg cursor-pointer transition-colors hover:bg-gray-100"
            onClick={() => setShowWorkspaceDropdown(!showWorkspaceDropdown)}
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 text-white rounded-md flex items-center justify-center text-xs font-semibold">
              {currentWorkspace?.initial || "W"}
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:block">
              {currentWorkspace?.name || "Workspace"}
            </span>
            <ChevronDown className="w-3 h-3 text-gray-500" />
          </div>

          {showWorkspaceDropdown && (
            <div className="absolute top-full left-0 w-48 sm:w-60 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 overflow-hidden z-50">
              <div className="px-2 py-2 text-xs font-medium text-gray-500 bg-gray-50 border-b border-gray-200">
                WORKSPACES
              </div>
              {workspaces.map((workspace) => (
                <div
                  key={workspace.id}
                  className={`flex items-center gap-2 px-2 py-1 cursor-pointer transition-colors text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                    currentWorkspace?.id === workspace.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => {
                    handleWorkspaceSelect(workspace);
                    setShowWorkspaceDropdown(false);
                  }}
                >
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-md flex items-center justify-center text-xs font-semibold">
                    {workspace.initial}
                  </div>
                  <span>{workspace.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 text-white border-none rounded-md flex items-center justify-center cursor-pointer text-sm sm:text-lg font-medium ml-1 hover:bg-blue-600 transition-colors">
          +
        </button>
      </div>

      {/* Center Section - Hidden on mobile, shown as bottom nav */}
      <div className="hidden md:flex gap-1 lg:gap-2 mr-4 lg:mr-20">
        <div
          className={`flex items-center gap-2 px-3 lg:px-4 py-2 cursor-pointer rounded-full transition-all font-medium text-sm ${
            activeTab === "Flows"
              ? "text-blue-600 bg-white border border-gray-200 rounded-lg shadow-sm font-semibold"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          }`}
          onClick={() => {
            setActiveTab("Flows");
            navigate("/Exploreflow");
          }}
        >
          <Square size={16} />
          <span className="hidden lg:inline">Explore</span>
        </div>

        <div
          className={`flex items-center gap-2 px-3 lg:px-4 py-2 cursor-pointer rounded-full transition-all font-medium text-sm relative ${
            activeTab === "Studio"
              ? "text-blue-600 bg-white border border-gray-200 rounded-lg shadow-sm font-semibold"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          }`}
          onClick={() => {
            setActiveTab("Studio");
            navigate(currentApp ? `/studio/${currentApp.id}` : "/studio");
          }}
        >
          <Layers size={16} />
          <span className="hidden lg:inline">Studio</span>
          {currentApp && <span className="text-gray-400 mx-1 hidden lg:inline">/</span>}
          {currentApp && (
            <>
              <span className="font-medium text-sm hidden lg:inline">{currentApp.name}</span>
              <ChevronDown
                className="w-4 h-4 cursor-pointer ml-1 transition-transform hover:rotate-180"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowStudioDropdown(!showStudioDropdown);
                }}
              />
            </>
          )}

          {showStudioDropdown && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 min-w-48 bg-white rounded-lg shadow-lg z-50 py-2 mt-2">
              {containers.map((container) => (
                <div
                  key={container.id}
                  className={`flex items-center px-3 py-2 cursor-pointer text-sm hover:bg-gray-50 ${
                    currentApp?.id === container.id ? "bg-blue-50 font-medium" : ""
                  }`}
                  onClick={() => handleAppSelect(container)}
                >
                  <Layers size={16} className="mr-2" />
                  <span>{container.name}</span>
                </div>
              ))}
              <div className="h-px bg-gray-200 my-2" />
              <div 
                className="flex items-center px-3 py-2 cursor-pointer text-sm text-blue-600 font-medium hover:bg-gray-50" 
                onClick={handleNewApp}
              >
                <Plus size={14} className="mr-2" />
                New App
              </div>
            </div>
          )}
        </div>

        <div
          className={`flex items-center gap-2 px-3 lg:px-4 py-2 cursor-pointer rounded-full transition-all font-medium text-sm ${
            activeTab === "Knowledge"
              ? "text-blue-600 bg-white border border-gray-200 rounded-lg shadow-sm font-semibold"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          }`}
          onClick={() => {
            setActiveTab("Knowledge");
            navigate("/knowledge");
          }}
        >
          <BookOpen size={16} />
          <span className="hidden lg:inline">Knowledge</span>
        </div>

        <div
          className={`flex items-center gap-2 px-3 lg:px-4 py-2 cursor-pointer rounded-full transition-all font-medium text-sm ${
            activeTab === "Settings"
              ? "text-blue-600 bg-white border border-gray-200 rounded-lg shadow-sm font-semibold"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          }`}
          onClick={() => {
            setActiveTab("Settings");
            navigate("/settings");
          }}
        >
          <Settings size={16} />
          <span className="hidden lg:inline">Tools</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center">
        <div className="w-7 h-7 sm:w-9 sm:h-9 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold cursor-pointer text-sm">
          U
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white flex justify-around md:hidden py-2 border-t border-gray-200 z-50">
        <div
          className={`flex flex-col items-center p-1 cursor-pointer text-xs gap-1 ${
            activeTab === "Flows" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => {
            setActiveTab("Flows");
            navigate("/Exploreflow");
          }}
        >
          <Square size={20} />
          <span>Explore</span>
        </div>

        <div
          className={`flex flex-col items-center p-1 cursor-pointer text-xs gap-1 ${
            activeTab === "Studio" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => {
            setActiveTab("Studio");
            navigate(currentApp ? `/studio/${currentApp.id}` : "/studio");
          }}
        >
          <Layers size={20} />
          <span>Studio</span>
        </div>

        <div
          className={`flex flex-col items-center p-1 cursor-pointer text-xs gap-1 ${
            activeTab === "Knowledge" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => {
            setActiveTab("Knowledge");
            navigate("/knowledge");
          }}
        >
          <BookOpen size={20} />
          <span>Knowledge</span>
        </div>

        <div
          className={`flex flex-col items-center p-1 cursor-pointer text-xs gap-1 ${
            activeTab === "Settings" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => {
            setActiveTab("Settings");
            navigate("/settings");
          }}
        >
          <Settings size={20} />
          <span>Tools</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;