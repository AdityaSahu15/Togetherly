import React from 'react'
import { menuItemsData } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const MenuItems = ({ setSidebarOpen }) => {
  return (
    <div className="flex flex-col space-y-4">
      {menuItemsData.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 
            ${
              isActive
                ? 'bg-indigo-100 text-indigo-600 font-medium'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-800'
            }`
          }
        >
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </NavLink>
      ))}
    </div>
  )
}

export default MenuItems
