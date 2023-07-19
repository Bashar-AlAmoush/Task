import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './page/Home';
import Login from './page/Login';
import Profile from './page/Profile';
import AboutUs from './page/AboutUs';
import ContactUs from './page/ContactUs';
import { UserProvider } from './Context/UserContext';
import React from 'react'; 

function App() {


  return (
    
    <Router>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="AboutUs" element={<AboutUs />} />
          <Route path="ContactUs" element={<ContactUs />} />
        </Routes>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
