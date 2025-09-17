import { Calendar, MapPin, PenBox, Verified } from 'lucide-react'
import React from 'react'
import moment from 'moment'

const UserProfileInfo = ({ user, posts, profileId, setShowEdit }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 max-w-5xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center md:gap-6">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <img
            src={user.profile_picture}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500"
          />
        </div>

        {/* Right section */}
        <div className="flex-1 mt-4 md:mt-0">
          {/* Name + Verified + Edit button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-800">{user.full_name}</h1>
              <Verified className="w-5 h-5 text-blue-500" />
            </div>
            {!profileId && (
              <button
                onClick={() => setShowEdit(true)}
                className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition cursor-pointer hover:scale-105"
              >
                <PenBox className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>

          {/* Username */}
          <p className="text-gray-500 mt-1">
            {user.username ? `@${user.username}` : 'Add a username'}
          </p>

          {/* Bio */}
          {user.bio && (
            <p className="mt-3 text-gray-700 leading-relaxed">{user.bio}</p>
          )}

          {/* Extra info */}
          <div className="flex flex-wrap gap-4 mt-4 text-gray-600 text-sm">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {user.location ? user.location : 'Add Location'}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Joined <span>{moment(user.createdAt).fromNow()}</span>
            </span>
          </div>

          {/* Stats Section */}
          <div className="flex justify-around mt-6 pt-4 text-center">
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-700">{posts.length}</span>
              <span className="text-sm text-gray-500">Posts</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-700">{user.followers.length}</span>
              <span className="text-sm text-gray-500">Followers</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-700">{user.following.length}</span>
              <span className="text-sm text-gray-500">Following</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfileInfo
