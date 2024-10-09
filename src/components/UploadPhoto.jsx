import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const UploadPhoto = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  // Convert the image to base64
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]); // Get base64 part only
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Preview the image
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file first.');
      return;
    }

    setUploading(true);

    try {
      const base64Image = await toBase64(selectedFile);

      // Send the base64-encoded image directly in the body
      const response = await axios.post(
        'https://u4e6ufildk.execute-api.us-east-1.amazonaws.com/deployment/upload-image',
        base64Image, // Directly sending the base64 string in the request body
        {
          headers: {
            'Content-Type': 'application/json', // Ensure it's set as JSON
          },
        }
      );

      setMessage(response.data.message); // Display success message
    } catch (error) {
      setMessage('Error uploading the image. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-800">Photo App</div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/')}
                className="text-md font-medium px-3 py-2 text-gray-800 hover:text-blue-500"
              >
                View All Users
              </button>
              <button
                onClick={() => navigate('/view-all-photos')}
                className="text-md font-medium px-3 py-2 text-gray-800 hover:text-blue-500"
              >
                View All Photos
              </button>
              <button
                className="text-md font-medium px-3 py-2 text-blue-500 hover:text-blue-600"
                disabled
              >
                Upload a Photo
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto mt-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold mb-2 text-gray-700">Upload a Photo</h3>
          <p className="text-gray-600 mb-4">Select an image to upload.</p>

          {/* Image Preview */}
          {preview && <img src={preview} alt="Selected" className="mb-4 max-w-xs" />}

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
          />

          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>

          {/* Message Section */}
          {message && <p className="mt-4 text-gray-700">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default UploadPhoto;
