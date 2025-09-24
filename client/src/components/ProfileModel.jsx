import React, { useState, useEffect } from 'react'
import { Pencil } from 'lucide-react'
import { useSelector,useDispatch } from 'react-redux'
import { updateUser } from '../features/user/userSlice'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

const ProfileModel = ({ setShowEdit }) => {

  const dispatch=useDispatch()
  const {getToken}=useAuth()
  const user =useSelector((state)=>state.user.value)

  const [editForm, setEditForm] = useState({
    username: user.username,
    bio: user.bio,
    location: user.location,
    profile_picture: null,
    full_name: user.full_name,
    cover_photo: null,
  })

  const handleSaveProfile = async (e) => {
    e.preventDefault()

    const userData=new FormData();
    const {full_name,username,bio,location,profile_picture,cover_photo}=editForm

    userData.append('username',username);
    userData.append('bio',bio);
    userData.append('location',location);
    userData.append('full_name',full_name);
    profile_picture && userData.append('profile_picture',profile_picture);
    cover_photo && userData.append('cover_photo',cover_photo);

    const token=await getToken();
    // Return dispatch promise for toast.promise
    return dispatch(updateUser({userData,token})).unwrap();
  }

  // Disable background scroll when modal opens
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl h-[90vh] mx-4 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h1 className="text-xl font-semibold text-gray-800">Edit Profile</h1>
          <button
            onClick={() => setShowEdit(false)}
            className="text-gray-500 hover:text-red-500 transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) =>
            toast.promise(handleSaveProfile(e), {
              loading: 'Saving...',
              success: () => {
                setShowEdit(false)
              },
              error: (err) => err.message || 'Error saving profile',
            })
          }
          className="p-6 space-y-6 overflow-y-auto flex-1"
        >
          {/* Profile Picture */}
          <div>
            <label htmlFor="profile_picture" className="block text-sm font-medium text-gray-600">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              id="profile_picture"
              className="hidden"
              onChange={(e) =>
                setEditForm({ ...editForm, profile_picture: e.target.files[0] })
              }
            />
            <div className="relative w-28 h-28 mt-2">
              <img
                src={
                  editForm.profile_picture
                    ? URL.createObjectURL(editForm.profile_picture)
                    : user.profile_picture
                }
                alt="profile"
                className="w-28 h-28 rounded-full object-cover border border-gray-200 shadow-sm"
              />
              <label
                htmlFor="profile_picture"
                className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100"
              >
                <Pencil className="w-4 h-4 text-gray-600" />
              </label>
            </div>
          </div>

          {/* Cover Photo */}
          <div>
            <label htmlFor="cover_photo" className="block text-sm font-medium text-gray-600">
              Cover Photo
            </label>
            <input
              type="file"
              accept="image/*"
              id="cover_photo"
              className="hidden"
              onChange={(e) =>
                setEditForm({ ...editForm, cover_photo: e.target.files[0] })
              }
            />
            <div className="relative w-full h-40 mt-2 rounded-xl overflow-hidden border border-gray-200">
              <img
                src={
                  editForm.cover_photo
                    ? URL.createObjectURL(editForm.cover_photo)
                    : user.cover_photo
                }
                alt="cover"
                className="w-full h-full object-cover object-center shadow-sm"
              />
              <label
                htmlFor="cover_photo"
                className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100"
              >
                <Pencil className="w-4 h-4 text-gray-600" />
              </label>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
              value={editForm.full_name}
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none shadow-sm"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              placeholder="Enter a username"
              onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
              value={editForm.username}
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none shadow-sm"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Bio</label>
            <textarea
              rows={3}
              placeholder="Enter bio"
              onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
              value={editForm.bio}
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none shadow-sm resize-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Location</label>
            <input
              type="text"
              placeholder="Enter location"
              onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
              value={editForm.location}
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none shadow-sm"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setShowEdit(false)}
              className="px-5 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition shadow cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileModel
