import React from 'react'
import { assets, dummyUserData } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import MenuItems from './MenuItems'
import { CirclePlus, LogOut } from 'lucide-react'
import { UserButton, useClerk } from '@clerk/clerk-react'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate()

  const user = dummyUserData
  const { signOut } = useClerk()

  return (
    <div
      className={`${sidebarOpen ? 'translate-x-0' : 'max-sm:translate-x-full'}
      fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out`}
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
          <img src={assets.logo} alt="Logo" className="w-16" />
          <h1 className="text-xl font-semibold text-gray-800">Togetherly</h1>
        </div>

        <hr className="border-gray-300" />

        {/* Menu Items */}
        <MenuItems setSidebarOpen={setSidebarOpen} />

        {/* Full-width Create Post button */}
        <Link
          to="/create-post"
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 shadow-md transition w-full"
          onClick={() => setSidebarOpen(false)}
        >
          <CirclePlus size={18} />
          Create Post
        </Link>

        {/* Push user info & logout to bottom */}
        <div className="flex-grow" />

        <div className="flex items-center justify-between p-2 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <UserButton afterSignOutUrl="/" />
            <div>
              <h1 className="text-sm font-medium">{user.full_name}</h1>
              <p className="text-xs text-gray-500">@{user.username}</p>
            </div>
          </div>
          <LogOut
            size={20}
            className="cursor-pointer text-gray-600 hover:text-red-500"
            onClick={signOut}
          />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
