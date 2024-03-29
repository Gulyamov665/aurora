import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Test from './components/Test';
import Category from './components/Category';
import Admin from './components/Admin/Admin';
import AdminCategory from './components/Admin/AdminCategory';
import NotFound from './components/NotFound';
import Login from './components/Login';
import AdminMain from './components/Admin/AdminMain';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomePage from './pages/HomePage';
import LoginPage from './pages/HomePage';
import Navbar from './components/Navbar';
import AdminPromo from './components/Admin/AdminPromo';
import Promo from './components/Promo';

function App() {
  return (
    <>
      <Routes>
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
          <Route index element={<Category />} />
          <Route path='test' element={<Promo />} />
        </Route>

      </Routes >


      <ToastContainer />
    </>
  );
}

export default App;
