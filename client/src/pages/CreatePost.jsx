import React, { useState } from 'react'
import { dummyUserData } from '../assets/assets'
import { Image, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useAuth } from '@clerk/clerk-react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const navigate=useNavigate();

  const [content, setContent] = useState('')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const user = useSelector((state)=>state.user.value)

  const {getToken} =useAuth()
const handleSubmit = async () => {
  if (!images.length && !content) {
    toast.error('Add at least one image/text');
    return Promise.reject(new Error('Validation failed'));
  }
  setLoading(true);

  const postType = images.length && content
    ? 'text-with-image'
    : images.length
    ? 'image'
    : 'text';

  try {
    const formData = new FormData(); 
    formData.append('content', content);
    formData.append('post_type', postType);
    images.forEach((image) => {
      formData.append('images', image);
    });

    const { data } = await api.post(`/api/post/add`, formData, {
      headers: { Authorization: `Bearer ${await getToken()}` },
    });

    if (data.success) {
      navigate(`/`);
      return data; 
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log(error.message);
    throw error; 
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Create Post</h1>
          <p className="text-gray-500">Share your thoughts with the world!</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-4">
            <img
              src={user.profile_picture}
              alt="profile"
              className="w-14 h-14 rounded-full object-cover border"
            />
            <div>
              <h2 className="font-semibold text-gray-800">{user.full_name}</h2>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </div>

          {/* Text area */}
          <textarea
            className="w-full p-5 rounded-lg border border-gray-400 resize-none shadow-sm focus:outline-none focus:ring-0
"
            placeholder="What's happening?"
            rows={6}
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />

          {/* Images Preview */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from(images).map((image, i) => (
                <div key={i} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    className="w-full h-48 object-cover rounded-xl shadow-sm"
                  />
                  <button
                    onClick={() =>
                      setImages(images.filter((_, index) => index !== i))
                    }
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition"
                  >
                    <X className="w-5 h-5 cursor-pointer text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Bottom bar */}
          <div className="flex items-center justify-between pt-4">
            <div>
              <label
                htmlFor="images"
                className="cursor-pointer flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                <Image className="w-5 h-5" />
                Add Images
              </label>
              <input
                type="file"
                id="images"
                accept="image/*"
                hidden
                multiple
                onChange={(e) =>
                  setImages([...images, ...Array.from(e.target.files)])
                }
              />
            </div>

            <button
              disabled={loading}
              onClick={() =>
                toast.promise(handleSubmit(), {
                  loading: 'Uploading...',
                  success: <p>Post Added</p>,
                  error: <p>Post not added</p>,
                })
              }
              className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition disabled:opacity-50 cursor-pointer hover:scale-105"
            >
              {loading ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
