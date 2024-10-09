import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('users');
  const navigate = useNavigate();

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
            onClick={() => navigate('/view-all-photos')}
                className={`text-md font-medium px-3 py-2 ${
                  activeTab === 'photos' ? 'text-blue-500' : 'text-gray-800'
                } hover:text-blue-500`}
              >
                View All Photos
              </button>
              <button
                onClick={() => navigate('/upload-photo')} 
                className={`text-md font-medium px-3 py-2 ${
                  activeTab === 'upload' ? 'text-blue-500' : 'text-gray-800'
                } hover:text-blue-500`}
              >
                Upload a Photo
              </button>
              <button
                onClick={() => navigate('/')} 
                className={`text-md font-medium px-3 py-2 ${
                  activeTab === 'upload' ? 'text-blue-500' : 'text-gray-800'
                } hover:text-blue-500`}
              >
                Signout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto mt-10">
        {renderContent()}
      </div>
    </div>
  );
};


const ViewUsers = () => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchEmails = async () => {
        try {
          const response = await axios.get(
            'https://9ltev5mdm1.execute-api.us-east-1.amazonaws.com/deployment/get-list-of-user'
          );
          
          console.log('API Response:', response);
  
          if (response.status === 200 && response.data && response.data.emails) {
            setEmails(response.data.emails);
          } else {
            setError('Unexpected response format or no emails found');
          }
        } catch (err) {
          console.error('Error fetching emails:', err); 
          setError('Failed to fetch emails. Please check the console for more details.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchEmails();
    }, []); 
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold mb-2 text-gray-700">All Users</h3>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4">{email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

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
