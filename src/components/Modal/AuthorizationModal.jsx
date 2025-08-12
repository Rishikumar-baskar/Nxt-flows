import React, { useState } from 'react';
import './AuthorizationModal.css';
const AuthorizationModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    authorizationType: 'None', // initially 'None'
    authType: 'Custom',
    header: '',
    apiKey: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (

  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
    <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Authorization</h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Authorization Type Buttons */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Authorization Type</label>
            <div className="flex gap-2">
              <button
                className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                  formData.authorizationType === 'None' 
                    ? 'bg-white border-blue-500 text-blue-600' 
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
                onClick={() =>
                  setFormData({
                    authorizationType: 'None',
                    authType: 'Custom',
                    header: '',
                    apiKey: ''
                  })
                }
              >
                None
              </button>
              <button
                className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                  formData.authorizationType === 'API-Key' 
                    ? 'bg-white border-blue-500 text-blue-600' 
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    authorizationType: 'API-Key',
                    authType: 'Basic', // default to Basic
                    header: '',
                    apiKey: ''
                  })
                }
              >
                API-Key
              </button>
            </div>
          </div>

          {/* Show Auth Type only when API-Key is selected */}
          {formData.authorizationType === 'API-Key' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Auth Type</label>
              <div className="flex gap-2">
                <button
                  className={`flex-1 px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                    formData.authType === 'Basic' 
                      ? 'bg-white border-blue-500 text-blue-600' 
                      : 'bg-gray-50 border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                  onClick={() => handleInputChange('authType', 'Basic')}
                >
                  Basic
                </button>
                <button
                  className={`flex-1 px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                    formData.authType === 'Bearer' 
                      ? 'bg-white border-blue-500 text-blue-600' 
                      : 'bg-gray-50 border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                  onClick={() => handleInputChange('authType', 'Bearer')}
                >
                  Bearer
                </button>
                <button
                  className={`flex-1 px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                    formData.authType === 'Custom' 
                      ? 'bg-white border-blue-500 text-blue-600' 
                      : 'bg-gray-50 border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                  onClick={() => handleInputChange('authType', 'Custom')}
                >
                  Custom
                </button>
              </div>
            </div>
          )}

          {/* Show Header only when Auth Type is Custom */}
          {formData.authorizationType === 'API-Key' && formData.authType === 'Custom' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Header *</label>
              <input
                type="text"
                value={formData.header}
                onChange={(e) => handleInputChange('header', e.target.value)}
                placeholder="Please enter"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          )}

          {/* Show API Key input only when API-Key is selected */}
          {formData.authorizationType === 'API-Key' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">API Key *</label>
              <input
                type="text"
                value={formData.apiKey}
                onChange={(e) => handleInputChange('apiKey', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors" onClick={handleCancel}>
            Cancel
          </button>
          <button className="px-5 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-200" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorizationModal;
