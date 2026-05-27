import React from 'react'
import { Route,Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home  from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div>
      <Toaster/>
      <Navbar/>
      <Routes>
        <Route path='/'element ={<Home/>}/>
        <Route path='/login'element ={<Login/>}/>
        <Route path='/signup'element ={<Signup/>}/>
        <Route path='/profile'element ={<Profile/>}/>

      </Routes>
    </div>
  )
}
