import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewAllPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To navigate between pages

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          'https://cjzaivgqjc.execute-api.us-east-1.amazonaws.com/deployment/view-all-photos'
        );
        setPhotos(response.data.photos);
      } catch (err) {
        setError('Failed to fetch photos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return <div>Loading photos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-800">Photo App</div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/landing')}
                className="text-md font-medium px-3 py-2 text-gray-800 hover:text-blue-500"
              >
                View All Users
              </button>
              <button
                className="text-md font-medium px-3 py-2 text-blue-500 hover:text-blue-600"
                disabled
              >
                View All Photos
              </button>
              <button
                onClick={() => navigate('/upload-photo')}
                className="text-md font-medium px-3 py-2 text-gray-800 hover:text-blue-500"
              >
                Upload a Photo
              </button>
              <button
                onClick={() => navigate('/')}
                className="text-md font-medium px-3 py-2 text-gray-800 hover:text-blue-500"
              >
                Signout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={photo.url}
                alt=""
                className="w-full h-auto rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewAllPhotos;
