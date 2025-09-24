import React from 'react'
import { assets, dummyUserData } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import MenuItems from './MenuItems'
import { CirclePlus, LogOut, Menu } from 'lucide-react'
import { UserButton, useClerk } from '@clerk/clerk-react'
import { useSelector } from 'react-redux'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate()
  const user = useSelector((state)=>state.user.value)
  const { signOut } = useClerk()

  return (
    <>
      {/* Hamburger for small screens */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu size={22} className="text-gray-800" />
      </button>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full p-4 space-y-6">
          {/* Logo + App Name */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              navigate('/')
              setSidebarOpen(false)
            }}
          >
            <img src={assets.logo} alt="Logo" className="w-14 sm:w-16" />
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
              Togetherly
            </h1>
          </div>

          <hr className="border-gray-300" />

          {/* Menu Items */}
          <MenuItems setSidebarOpen={setSidebarOpen} />

          {/* Full-width Create Post button */}
          <Link
            to="/create-post"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 shadow-md transition w-full text-sm sm:text-base"
            onClick={() => setSidebarOpen(false)}
          >
            <CirclePlus size={18} />
            Create Post
          </Link>

          {/* Push user info & logout to bottom */}
          <div className="flex-grow" />

          <div className="flex items-center justify-between p-2 border-t border-gray-200">
            <div className="flex items-center gap-2 overflow-hidden">
              <UserButton afterSignOutUrl="/" />
              <div className="truncate">
                <h1 className="text-sm font-medium truncate">
                  {user.full_name}
                </h1>
                <p className="text-xs text-gray-500 truncate">
                  @{user.username}
                </p>
              </div>
            </div>
            <LogOut
              size={20}
              className="cursor-pointer text-gray-600 hover:text-red-500 flex-shrink-0"
              onClick={signOut}
            />
          </div>
        </div>
      </div>

      {/* Overlay for small screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar
