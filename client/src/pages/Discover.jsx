import React, { useState } from 'react'
import { dummyConnectionsData } from '../assets/assets'
import { Search } from 'lucide-react'
import UserCard from '../components/UserCard'
import Loading from '../components/Loading'
import api from '../api/axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../features/user/userSlice.js'

const Discover = () => {

  const dispatch=useDispatch()

  const [input, setInput] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const {getToken}=useAuth()

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
        try {
          setUsers([])
          setLoading(true)
          const {data} = await api.post('/api/user/discover',{input},{
            headers:{Authorization:`Bearer ${await getToken()}`}
          })
          data.success ? setUsers(data.users) : toast.error(data.message)
          setLoading(false);
          setInput('')

        } catch (error) {
          toast.error(error.message)
        }
        setLoading(false);
    }
  }

  useEffect(()=>{
    getToken().then((token)=>{
      dispatch(fetchUser(token))
    })
  },[])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Discover People</h1>
          <p className="text-gray-500">
            Connect with people and grow your network!
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyUp={handleSearch}
              type="text"
              placeholder="Search people by name, username, bio, or location..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
          </div>
        </div>

        {/* Users list */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <UserCard user={user} key={user._id} />
          ))}
        </div>

        {/* Loading */}
        {loading && <Loading height="60vh" />}
      </div>
    </div>
  )
}

export default Discover
