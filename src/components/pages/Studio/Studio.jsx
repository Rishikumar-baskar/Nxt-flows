import React, { useState, useEffect } from "react";
import {
  LayoutGrid,
  Clock,
  Share2,
  FolderOpen,
  ChevronDown,
  Search,
  Tag,
  File,
  FileText,
  Import,
  X,
} from "lucide-react";
import { MdCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";

const CreateOption = ({ icon: Icon, title, onClick }) => (
  <button onClick={onClick} className="flex items-center px-4 sm:px-6 py-2 sm:py-3 border-none rounded-lg bg-white text-gray-400 text-xs sm:text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-gray-50">
    <Icon className="w-4 h-4 mr-3" />
    <span>{title}</span>
  </button>
);

const Studio = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isCreatedByMeChecked, setIsCreatedByMeChecked] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [containerName, setContainerName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [containers, setContainers] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("containers");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();
  const tagOptions = ["Design", "Development", "Marketing", "Research", "Planning"];

  useEffect(() => {
    localStorage.setItem("containers", JSON.stringify(containers));
  }, [containers]);

  const handleCreateContainer = () => {
    if (containerName.trim()) {
      const newContainer = {
        id: Date.now(),
        name: containerName,
        project: projectName,
        description: editDescription || "sample flow to test login flow",
        createdAt: new Date().toISOString(),
      };
      setContainers((prev) => [...prev, newContainer]);
      setContainerName("");
      setProjectName("");
      setEditDescription("");
      setShowCreateModal(false);
    }
  };

  const handleDeleteContainer = (id) => {
    setContainers((prev) => prev.filter((container) => container.id !== id));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleSaveEdit = () => {
    setContainers((prev) =>
      prev.map((container) =>
        container.id === editId
          ? { ...container, name: editName, description: editDescription }
          : container
      )
    );
    setShowEditModal(false);
  };

  const tabs = [
    { id: "all", label: "All", icon: <LayoutGrid className="icon" /> },
    { id: "recent", label: "Recently Viewed", icon: <Clock className="icon" /> },
    { id: "flows", label: "Shared Flows", icon: <Share2 className="icon" /> },
    { id: "projects", label: "Shared Projects", icon: <FolderOpen className="icon" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onNewApp={() => setShowCreateModal(true)} />

      <div className="p-3 sm:p-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 lg:mb-8 gap-4">
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                      ? "bg-white text-blue-600 border border-blue-200 shadow-sm" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium">
              <div
                className="flex items-center cursor-pointer text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsCreatedByMeChecked(!isCreatedByMeChecked)}
              >
                {isCreatedByMeChecked ? (
                  <MdCheckBox className="w-4 h-4 mr-2" />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank className="w-4 h-4 mr-2" />
                )}
                <span>Created by me</span>
              </div>

              <div className="relative">
                <button
                  onClick={() => setIsTagsOpen(!isTagsOpen)}
                  className="flex items-center px-3 py-2 text-xs sm:text-sm font-medium border border-gray-300 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Tag className="w-4 h-4 mr-2" />
                  All Tags
                  <ChevronDown
                    className={`w-4 h-4 ml-2 transition-transform ${isTagsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isTagsOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">All Tags</button>
                    {tagOptions.map((tag) => (
                      <button key={tag} className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 sm:px-6 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
            <div className="bg-gray-50 rounded-xl p-6 sm:p-8 h-48 sm:h-52 flex flex-col">
              <div className="mb-6">
                <h1 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">CREATE APP</h1>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                <CreateOption
                  icon={File}
                  title="Create from Blank"
                  onClick={() => setShowCreateModal(true)}
                />
                <CreateOption
                  icon={FileText}
                  title="Create from Template"
                  onClick={() => {}}
                />
                <CreateOption
                  icon={Import}
                  title="Import DSL file"
                  onClick={() => {}}
                />
              </div>
            </div>

          {containers.map((container) => (
            <div
              key={container.id}
              className="bg-white rounded-xl p-4 sm:p-6 h-48 sm:h-52 flex flex-col justify-between shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer relative group"
              onClick={() => navigate(`/studio/${container.id}`)}
              onMouseLeave={() => setOpenMenuId(null)}
            >
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{container.name}</h3>
                {container.project && (
                  <p className="text-sm text-gray-600 mb-2">Project: {container.project}</p>
                )}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{container.description}</p>
                <small className="text-xs text-gray-500">
                  Created on: {new Date(container.createdAt).toLocaleString()}
                </small>
              </div>
              <div
                className="absolute top-4 right-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="p-1 rounded hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() =>
                    setOpenMenuId(
                      openMenuId === container.id ? null : container.id
                    )
                  }
                >
                  <HiOutlineDotsHorizontal className="w-5 h-5 text-gray-400" />
                </button>
                {openMenuId === container.id && (
                  <div className="absolute right-0 top-8 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <button
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => {
                        setEditId(container.id);
                        setEditName(container.name);
                        setEditDescription(container.description);
                        setShowEditModal(true);
                        setOpenMenuId(null);
                      }}
                    >
                      Edit Info
                    </button>
                    <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">Duplicate</button>
                    <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">Export DSL</button>
                    <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">Open in Explore</button>
                    <button
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => {
                        setDeleteId(container.id);
                        setShowDeleteModal(true);
                        setOpenMenuId(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-100 flex items-center justify-center z-50 p-4 sm:p-8">
          <div className="flex w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-xl shadow-xl overflow-hidden">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex-1 p-8 sm:p-12 lg:p-16">
              <div className="mb-8">
                <h3>Create From Blank</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                  <input
                    type="text"
                    placeholder="Give your project a name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">App Name</label>
                  <input
                    type="text"
                    placeholder="Give your app a name"
                    value={containerName}
                    onChange={(e) => setContainerName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    placeholder="Enter the description of the app"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateContainer}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create
                </button>
              </div>
            </div>
            <div className="hidden lg:block w-1/2 bg-gray-50"></div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete this app?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Deleting the app is irreversible. Users will no longer
                be able to access your app, and all prompt
                configurations and logs will be permanently
                deleted.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-red-600 rounded-lg hover:bg-red-700 transition-colors"
                onClick={() => {
                  handleDeleteContainer(deleteId);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative">
            <div className="flex items-center justify-between mb-6">
              <h3>Edit App Info</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">App Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button onClick={handleSaveEdit} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Studio;