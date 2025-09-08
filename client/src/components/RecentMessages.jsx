import React, { useEffect, useState } from 'react'
import { dummyRecentMessagesData } from '../assets/assets'
import { Link } from 'react-router-dom'
import moment from 'moment'

const RecentMessages = () => {
  const [messages, setMessages] = useState([])

  const fetchRecentMessages = async () => {
    setMessages(dummyRecentMessagesData)
  }

  useEffect(() => {
    fetchRecentMessages()
  }, [])

  return (
    <div className="bg-white shadow rounded-2xl p-4 mt-4">
      <h3 className="text-lg font-semibold mb-3">Recent Messages</h3>
      <div className="space-y-3">
        {messages.map((message, index) => (
          <Link
            to={`/messages/${message.from_user_id._id}`}
            key={index}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition"
          >
            {/* Profile Picture */}
            <img
              src={message.from_user_id.profile_picture}
              alt={message.from_user_id.full_name}
              className="w-10 h-10 rounded-full object-cover"
            />

            {/* Message Details */}
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">{message.from_user_id.full_name}</p>
                <p className="text-xs text-gray-500">{moment(message.createdAt).fromNow()}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 truncate">
                  {message.text ? message.text : 'media'}
                </p>
                {!message.seen && (
                  <span className="text-xs bg-blue-500 text-white rounded-full px-2 py-0.5">
                    1
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RecentMessages
