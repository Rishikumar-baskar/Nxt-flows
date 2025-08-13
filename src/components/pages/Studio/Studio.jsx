import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import { Plus, Search, Grid3X3, List, MoreVertical, Play, Calendar, Clock } from 'lucide-react';

const Studio = () => {
  const navigate = useNavigate();
  const [containers, setContainers] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewAppModal, setShowNewAppModal] = useState(false);
  const [newAppName, setNewAppName] = useState('');
  const [workspaces] = useState([
    { id: 1, name: 'Personal Workspace', initial: 'P' },
    { id: 2, name: 'Team Workspace', initial: 'T' },
    { id: 3, name: 'Company Workspace', initial: 'C' }
  ]);
  const [currentWorkspace, setCurrentWorkspace] = useState(workspaces[0]);

  useEffect(() => {
    const stored = localStorage.getItem('containers');
    if (stored) {
      setContainers(JSON.parse(stored));
    }
  }, []);

  const handleNewApp = () => {
    setShowNewAppModal(true);
  };

  const createNewApp = () => {
    if (newAppName.trim()) {
      const newApp = {
        id: Date.now(),
        name: newAppName.trim(),
        description: 'New workflow application',
        lastModified: new Date().toISOString(),
        status: 'draft',
        runs: 0
      };
      
      const updatedContainers = [...containers, newApp];
      setContainers(updatedContainers);
      localStorage.setItem('containers', JSON.stringify(updatedContainers));
      
      setNewAppName('');
      setShowNewAppModal(false);
      navigate(`/studio/${newApp.id}`);
    }
  };

  const handleAppClick = (app) => {
    navigate(`/studio/${app.id}`);
  };

  const filteredContainers = containers.filter(container =>
    container.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onNewApp={handleNewApp}
        workspaces={workspaces}
        currentWorkspace={currentWorkspace}
        handleWorkspaceSelect={setCurrentWorkspace}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Studio</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Build and manage your workflow applications</p>
          </div>
          
          <button
            onClick={handleNewApp}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            New App
          </button>
        </div>

        {/* Search and View Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 sm:p-3 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Grid3X3 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 sm:p-3 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <List className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Apps Grid/List */}
        {filteredContainers.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">No apps yet</h3>
            <p className="text-sm sm:text-base text-gray-500 mb-6">Create your first workflow application to get started</p>
            <button
              onClick={handleNewApp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="w-4 h-4" />
              Create New App
            </button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'
              : 'space-y-3'
          }>
            {filteredContainers.map((container) => (
              <div
                key={container.id}
                onClick={() => handleAppClick(container)}
                className={`bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer ${
                  viewMode === 'grid' ? 'p-4 sm:p-6' : 'p-4'
                }`}
              >
                {viewMode === 'grid' ? (
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                      </div>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base truncate">
                      {container.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mb-4 line-clamp-2">
                      {container.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(container.lastModified)}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        container.status === 'published' 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {container.status}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Play className="w-5 h-5 text-blue-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">
                        {container.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        {container.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(container.lastModified)}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        container.status === 'published' 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {container.status}
                      </span>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New App Modal */}
      {showNewAppModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Create New App</h2>
            </div>
            
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                App Name
              </label>
              <input
                type="text"
                value={newAppName}
                onChange={(e) => setNewAppName(e.target.value)}
                placeholder="Enter app name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>
            
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  setShowNewAppModal(false);
                  setNewAppName('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createNewApp}
                disabled={!newAppName.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Create App
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Studio;