import React, { useState } from 'react';

const LandingPage = () => {
  // State to track the current tab
  const [activeTab, setActiveTab] = useState('users');

  // Function to render content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <ViewUsers />;
      case 'photos':
        return <ViewPhotos />;
      case 'upload':
        return <UploadPhoto />;
      default:
        return <ViewUsers />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-800">
              Photo App
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('users')}
                className={`text-md font-medium px-3 py-2 ${
                  activeTab === 'users' ? 'text-blue-500' : 'text-gray-800'
                } hover:text-blue-500`}
              >
                View All Users
              </button>
              <button
                onClick={() => setActiveTab('photos')}
                className={`text-md font-medium px-3 py-2 ${
                  activeTab === 'photos' ? 'text-blue-500' : 'text-gray-800'
                } hover:text-blue-500`}
              >
                View All Photos
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`text-md font-medium px-3 py-2 ${
                  activeTab === 'upload' ? 'text-blue-500' : 'text-gray-800'
                } hover:text-blue-500`}
              >
                Upload a Photo
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto mt-10">
        {/* Render content based on activeTab */}
        {renderContent()}
      </div>
    </div>
  );
};

// Dummy components for each tab
const ViewUsers = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h3 className="text-lg font-bold mb-2 text-gray-700">All Users</h3>
    <p className="text-gray-600 mb-4">List of all users will be shown here.</p>
  </div>
);

const ViewPhotos = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h3 className="text-lg font-bold mb-2 text-gray-700">All Photos</h3>
    <p className="text-gray-600 mb-4">All the photos will be displayed here.</p>
  </div>
);

const UploadPhoto = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h3 className="text-lg font-bold mb-2 text-gray-700">Upload a Photo</h3>
    <p className="text-gray-600 mb-4">Form for uploading a photo will appear here.</p>
  </div>
);

export default LandingPage;
