import React, { useEffect, useRef, useState } from 'react'
import { dummyMessagesData, dummyUserData } from '../assets/assets'
import { ImageIcon, SendHorizonal } from 'lucide-react'

const ChatBox = () => {
  const messages = dummyMessagesData
  const [text, setText] = useState('')
  const [image, setImage] = useState(null)
  const [user, setUser] = useState(dummyUserData)

  const messagesEndRef = useRef(null)

  const sendMessage = async () => {
    if (!text && !image) return
    // fake send
    setText('')
    setImage(null)
  }

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

        {/* Messages (scrollable area) */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages
            .toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((message, index) => {
              const isMe = message.to_user_id !== user._id
              return (
                <div
                  key={index}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow ${
                      isMe
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {message.message_type === 'image' && (
                      <img
                        src={message.media_url}
                        className="w-60 h-auto rounded-lg mb-2 shadow-sm"
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

        {/* Input (fixed at bottom) */}
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
