import React, { useState } from 'react';

const ImportCurlModal = ({ isOpen, onClose, onImport }) => {
  const [curlCommand, setCurlCommand] = useState('');

  const handleImport = () => {
    if (curlCommand.trim()) {
      onImport(curlCommand);
      setCurlCommand('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Import cURL Command</h2>
        </div>

        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Paste your cURL command here:
          </label>
          <textarea
            value={curlCommand}
            onChange={(e) => setCurlCommand(e.target.value)}
            placeholder="curl -X POST https://api.example.com/data..."
            className="w-full h-40 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
          />
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button 
            className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-200" 
            onClick={handleImport}
            disabled={!curlCommand.trim()}
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportCurlModal;