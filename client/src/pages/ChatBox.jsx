import React, { useEffect, useRef, useState } from 'react'
import { ImageIcon, SendHorizonal } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import api from '../api/axios'
import { addMessage, fetchMessages, resetMessages } from '../features/messages/messagesSlice.js'
import toast from 'react-hot-toast'

const ChatBox = () => {
  const { messages } = useSelector((state) => state.messages)
  const { userId } = useParams()
  const { getToken, userId: currentUserId } = useAuth()
  const dispatch = useDispatch()

  const [text, setText] = useState('')
  const [image, setImage] = useState(null)
  const [user, setUser] = useState(null)

  const messagesEndRef = useRef(null)
  const connections = useSelector((state) => state.connections.connections)

  const fetchUserMessages = async () => {
    try {
      const token = await getToken()
      dispatch(fetchMessages({ token, userId }))
    } catch (error) {
      toast.error(error.message)
    }
  }

  const sendMessage = async () => {
    try {
      if (!text && !image) return

      const token = await getToken()
      const formData = new FormData()
      formData.append('to_user_id', userId)
      formData.append('text', text)
      if (image) formData.append('image', image)

      const { data } = await api.post('/api/message/send', formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (data.success) {
        setText('')
        setImage(null)
        dispatch(addMessage(data.message))
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchUserMessages()
    return () => {
      dispatch(resetMessages())
    }
  }, [userId])

  useEffect(() => {
    if (connections.length > 0) {
      const foundUser = connections.find((connection) => connection._id === userId)
      setUser(foundUser)
    }
  }, [connections, userId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    user && (
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Header */}
        <div className="flex items-center gap-3 bg-white shadow-sm px-4 py-3">
          <img
            src={user.profile_picture}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-800">{user.full_name}</p>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages
            .toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((message, index) => {
              const isMe = message.from_user_id === currentUserId
              const isImage = message.message_type === 'image'

              return (
                <div
                  key={index}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow ${
                      isImage
                        ? 'bg-transparent p-0 shadow-none'
                        : isMe
                        ? 'bg-indigo-500 text-white rounded-br-none' // lighter purple
                        : 'bg-white text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {isImage && (
                      <img
                        src={message.media_url}
                        className="w-60 h-auto rounded-lg shadow-sm"
                        alt="sent-img"
                      />
                    )}
                    {message.text && (
                      <p className="whitespace-pre-wrap leading-relaxed">
                        {message.text}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white px-4 py-3 shadow-sm sticky bottom-0">
          <div className="flex items-center gap-3">
            {/* Image Upload */}
            <label
              htmlFor="image"
              className="cursor-pointer p-2 text-gray-500 hover:text-indigo-600 transition"
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-10 h-10 object-cover rounded-lg shadow"
                />
              ) : (
                <ImageIcon className="w-6 h-6" />
              )}
              <input
                type="file"
                id="image"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>

            {/* Text Input */}
            <input
              type="text"
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              onChange={(e) => setText(e.target.value)}
              value={text}
              className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-0 shadow-sm"
            />

            {/* Send Button */}
            <button
              onClick={sendMessage}
              className="cursor-pointer p-3 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition shadow hover:scale-105"
            >
              <SendHorizonal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  )
}

export default ChatBox
