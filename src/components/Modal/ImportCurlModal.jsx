import React, { useState } from 'react';
import './ImportCurlModal.css';

  const [curlString, setCurlString] = useState('');

  const handleSave = () => {
    onSave(curlString);
    onClose();
  };

  const handleCancel = () => {
    setCurlString('');
    onClose();
  };



  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Import from cURL</h2>
        </div>
        
        <div className="p-6">
          <div className="relative">
            <textarea
              value={curlString}
              onChange={(e) => setCurlString(e.target.value)}
              placeholder="Paste cURL string here"
              className="w-full min-h-48 p-4 border border-gray-300 rounded-lg text-sm font-mono leading-relaxed text-gray-700 bg-gray-50 resize-vertical outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:shadow-md"
              rows={8}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors" onClick={handleCancel}>
            Cancel
          </button>
          <button className="px-5 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportCurlModal;