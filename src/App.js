import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Register from './components/Register';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import UploadPhoto from './components/UploadPhoto';
import ViewAllPhotos from './components/ViewAllPhotos';

const App = () => {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/upload-photo" element={<UploadPhoto />} />
          <Route path="/view-all-photos" element={<ViewAllPhotos />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
