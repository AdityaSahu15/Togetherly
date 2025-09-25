import React from 'react'
import { dummyUserData } from '../assets/assets'
import { MapPin, MessageCircle, Plus, UserPlus } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { fetchUser } from '../features/user/userSlice.js'

const UserCard = ({ user }) => {
  const currentUser = useSelector((state)=>state.user.value)

  const {getToken}=useAuth()
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleFollow = async () => {
    try {
      const {data}=await api.post('/api/user/follow',{id:user._id},{
        headers:{Authorization:`Bearer ${await getToken()}`}
      })
      if(data.success)
      {
        toast.success(data.message)
        dispatch(fetchUser(await getToken()))
      }
      else 
      {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleConnectionRequest = async () => {
    if(currentUser.connections.includes(user._id))
    {
      return navigate('/messages/'+user._id)
    }
    try {
        const {data}=await api.post('/api/user/connect',{id:user._id},{
        headers:{Authorization:`Bearer ${await getToken()}`}
      })
      if(data.success)
      {
        toast.success(data.message)
      }
      else 
      {
        toast.error(data.message)
      }
    } catch (error) {
      
    }
  }

  return (
    <div
      key={user._id}
      className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-3 hover:shadow-lg transition border border-gray-100"
    >
      {/* User info */}
      <div className="flex items-center gap-3">
        <img
          src={user.profile_picture}
          alt={user.full_name}
          className="w-14 h-14 rounded-full object-cover border"
        />
        <div>
          <p className="font-semibold text-gray-800">{user.full_name}</p>
          {user.username && (
            <p className="text-sm text-gray-500">@{user.username}</p>
          )}
          {user.bio && (
            <p className="text-xs text-gray-400 line-clamp-1">{user.bio}</p>
          )}
        </div>
      </div>

      {/* Location + followers */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <MapPin size={16} className="text-blue-500" /> {user.location}
        </div>
        <div>
          <span className="font-medium text-gray-800">
            {user.followers.length}
          </span>{' '}
          Followers
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        {/* Follow button */}
        <button
          disabled={currentUser?.following.includes(user._id)}
          onClick={handleFollow}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition
            ${
              currentUser?.following.includes(user._id)
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
        >
          <UserPlus size={16} />
          {currentUser?.following.includes(user._id) ? 'Following' : 'Follow'}
        </button>

        {/* Connection/Message */}
        <button
          onClick={handleConnectionRequest}
          className="flex items-center justify-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
        >
          {currentUser?.connections.includes(user._id) ? (
            <MessageCircle size={18} />
          ) : (
            <Plus size={18} />
          )}
        </button>
      </div>
    </div>
  )
}

export default UserCard
