import React from 'react'
import { dummyConnectionsData } from '../assets/assets'
import { Eye, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Messages = () => {
  const {connections}=useSelector((state)=>state.connections)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6">
        {/* title */}
        <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
        <p className="text-gray-500 mb-6">Talk to your friends and family</p>

        <div>
          {/* connected users */}
          <div className="space-y-4">
            {connections.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between bg-gray-100 rounded-xl p-4 hover:bg-gray-200 transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={user.profile_picture}
                    alt=""
                    className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {user.full_name}
                    </p>
                    <p className="text-md text-gray-500">@{user.username}</p>
                    <p className="text-sm text-gray-400">{user.bio}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/messages/${user._id}`)}
                    className="p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full transition"
                  >
                    <MessageSquare className="w-5 h-4 cursor-pointer" />
                  </button>
                  <button
                    onClick={() => navigate(`/profile/${user._id}`)}
                    className="p-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full transition"
                  >
                    <Eye className="w-5 h-4 cursor-pointer" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages
