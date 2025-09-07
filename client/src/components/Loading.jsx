import React from 'react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-gradient-to-br from-indigo-200 via-white to-blue-100">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

export default Loading
