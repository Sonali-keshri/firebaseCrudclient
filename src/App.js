import './App.css';

import React from 'react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Edit from './components/Edit';
import Details from './components/Details'
import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Signup from './components/Signup';
import Login from './components/Login';
import { UserAuthContextPorvider } from './context/userAuthContext';
import ProtectedRoutes from './components/ProtectedRoutes';

const App = () => {
  return (
    <>
     <Navbar/>
     <UserAuthContextPorvider>
     <Routes>
      <Route path="/" element={<ProtectedRoutes><Home/></ProtectedRoutes>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/register" element={<ProtectedRoutes><Register/></ProtectedRoutes>} />
      <Route path="/edit/:id" element={<ProtectedRoutes><Edit/></ProtectedRoutes>} />
      <Route path="/view/:id" element={<ProtectedRoutes><Details/></ProtectedRoutes>} />
     </Routes>
     </UserAuthContextPorvider>
     <ToastContainer/>
    </>
     
  )
}

export default App
