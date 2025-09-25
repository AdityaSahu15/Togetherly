import React, { useState } from 'react'
import { Users, UserPlus, UserCheck, UserRoundPen, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { useSelector,useDispatch } from 'react-redux'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { fetchConnections } from '../features/connections/connectionsSlice.js'
import api from '../api/axios.js'
import toast from 'react-hot-toast'

const Connections = () => {
  const [currentTab, setCurrentTab] = useState('Followers')
  const navigate = useNavigate()

  const {getToken}=useAuth();
  const dispatch=useDispatch()

  const {connections,pendingConnections,followers,following}=useSelector((state)=>state.connections)

  const dataArray = [
    { label: 'Followers', value: followers, icon: Users },
    { label: 'Following', value: following, icon: UserCheck },
    { label: 'Pending', value: pendingConnections, icon: UserRoundPen },
    { label: 'Connections', value: connections, icon: UserPlus },
  ]

  const handleUnfollow=async(userId)=>{
    try {
      const {data}=await api.post('api/user/unfollow',{id:userId},{
        headers:{Authorization:`Bearer ${await getToken()}`}
      })
      if(data.success)
      {
        toast.success(data.message)
        dispatch(fetchConnections(await getToken()))
      }
      else
      {
        toast(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }



    const acceptConnection=async(userId)=>{
    try {
      const {data}=await api.post('api/user/accept',{id:userId},{
        headers:{Authorization:`Bearer ${await getToken()}`}
      })
      if(data.success)
      {
        toast.success(data.message)
        dispatch(fetchConnections(await getToken()))
      }
      else
      {
        toast(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }





 useEffect(()=>{
  getToken().then((token)=>{
    dispatch(fetchConnections(token))
  })
 },[])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Connections</h1>
          <p className="text-gray-500">Manage your network and discover new connections</p>
        </div>

        {/* Counts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {dataArray.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition"
            >
              <b className="text-xl text-indigo-600">{item.value.length}</b>
              <p className="text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {dataArray.map((tab) => (
            <button
              onClick={() => setCurrentTab(tab.label)}
              key={tab.label}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition cursor-pointer ${
                currentTab === tab.label
                  ? 'bg-indigo-500 text-white border-indigo-500'
                  : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Connections */}
        <div className="space-y-4">
          {dataArray
            .find((item) => item.label === currentTab)
            .value.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <img
                  src={user.profile_picture}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{user.full_name}</p>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                  <p className="text-xs text-gray-400">{user.bio.slice(0, 30)}...</p>
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => navigate(`/profile/${user._id}`)}
                      className="px-3 py-1 text-sm bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition cursor-pointer"
                    >
                      View Profile
                    </button>
                    {currentTab === 'Following' && (
                      <button onClick={()=>handleUnfollow(user._id)} className="px-3 py-1 text-sm bg-red-500 text-white rounded-full hover:bg-red-600 transition cursor-pointer">
                        Unfollow
                      </button>
                    )}
                    {currentTab === 'Pending' && (
                      <button onClick={()=>acceptConnection(user._id)} className="px-3 py-1 text-sm bg-green-500 text-white rounded-full hover:bg-green-600 transition cursor-pointer">
                        Accept
                      </button>
                    )}
                    {currentTab === 'Connections' && (
                      <button
                        onClick={() => navigate(`/messages/${user._id}`)}
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Message
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Connections
