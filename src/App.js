import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Test from './components/Client/Test';
import Category from './components/Client/Category';
import Admin from './components/Admin/Admin';
import AdminCategory from './components/Admin/AdminCategory';
import NotFound from './components/Client/NotFound';
import Login from './components/Client/Login';
import AdminMain from './components/Admin/AdminMain';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomePage from './pages/HomePage';
import LoginPage from './pages/HomePage';
import Navbar from './components/Client/Navbar';
import AdminPromo from './components/Admin/AdminPromo';


function App() {
  const location = useLocation()
  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path='/admin/:res' element={<Admin />} >
          <Route path='main' element={<AdminMain />} />
          <Route path='menu' element={<AdminCategory />} />
          <Route path='promo' element={<AdminPromo />} />
        </Route>

        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Login />} />
        <Route path='navbar' element={<Navbar />} />
        <Route path='home' element={<HomePage />} />
        <Route path='login' element={<LoginPage />} />

        <Route path='vendor/:res' element={<Test />} >
        </Route>

      </Routes >


      <ToastContainer />
    </>
  );
}

export default App;
