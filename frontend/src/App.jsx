import React, { useEffect } from 'react'
import { Navigate, Route,Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home  from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import { useAuthStore } from './store/useAuthStore';
import {Loader} from 'lucide-react'
export default function App() {

  const {authUser,checkAuth, isCheckingAuth}=useAuthStore()
useEffect(function(){
  checkAuth();
},[checkAuth])

if(isCheckingAuth && !authUser) return(
  <div className='flex items-center justify-center h-screen'> 
  <Loader className='size-10 animate-spin text-white'/>
  </div>
)

  return (
    <div>
      <Toaster/>
      <Navbar/>
      <Routes>
        <Route path='/'element ={authUser ?<Home/>:<Navigate to={"/login"}/>}/>
        <Route path='/login'element ={!authUser ?<Login/>:<Navigate to={"/"}/>}/>
        <Route path='/signup'element ={!authUser ?<Signup/>:<Navigate to={"/"}/>}/>
        <Route path='/profile'element ={authUser ?<Profile/>:<Navigate to={"/login"}/>}/>

      </Routes>
    </div>
  )
}
