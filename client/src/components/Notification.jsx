import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Notification = ({ t, message }) => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-between bg-white shadow-lg rounded-lg p-3 w-80 max-w-full border border-gray-200">
      {/* Left: Profile + message */}
      <div className="flex items-start gap-3">
        <img
          src={message.from_user_id.profile_picture}
          alt="profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <p className="font-semibold text-gray-800">{message.from_user_id.full_name}</p>
          <p className="text-gray-600 text-sm line-clamp-2">
            {message.text ? message.text.slice(0, 50) : ''}
          </p>
        </div>
      </div>

      {/* Right: Reply button */}
      <div>
        <button
          onClick={() => {
            navigate(`/messages/${message.from_user_id._id}`)
            toast.dismiss(t.id)
          }}
          className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700 transition"
        >
          Reply
        </button>
      </div>
    </div>
  )
}

export default Notification
