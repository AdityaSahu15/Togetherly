import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react';  
import { dummyUserData } from '../assets/assets';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';

const Layout = () => {
  const user = useSelector((state)=>state.user.value)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return user ? (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 p-4 ml-16 md:ml-64 transition-all">
        <Outlet />
      </div>

      {/* Toggle button */}
      <button
        className="fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X /> : <Menu />}
      </button>
    </div>
  ) : (
    <Loading />
  )
}

export default Layout
