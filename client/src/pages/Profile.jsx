import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyPostsData, dummyUserData } from '../assets/assets';
import Loading from '../components/Loading';
import UserProfileInfo from '../components/UserProfileInfo';
import PostCard from '../components/PostCard';
import moment from 'moment';

const Profile = () => {
  const { profileId } = useParams()
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [showEdit, setShowEdit] = useState(false);

  const fetchUser = async () => {
    setUser(dummyUserData)
    setPosts(dummyPostsData)
  }

  useEffect(() => {
    fetchUser();
  }, [])

  return user ? (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        {/*Profile card*/}
        <div className="relative">
          {/*Cover photo */}
          <div className="h-48 bg-gray-200">
            {user.cover_photo && (
              <img
                src={user.cover_photo}
                alt=""
                className="w-full h-48 object-cover"
              />
            )}
          </div>
          {/*User info */}
          <UserProfileInfo
            user={user}
            posts={posts}
            profileId={profileId}
            setShowEdit={setShowEdit}
          />
        </div>

        {/* Tabs */}
        <div className="mt-6 px-6">
          <div className="flex gap-6 border-b border-gray-200">
            {["posts", "media", "likes"].map((tab) => (
              <button
                onClick={() => setActiveTab(tab)}
                key={tab}
                className={`pb-3 text-sm font-medium transition cursor-pointer ${
                  activeTab === tab
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Posts */}
          {activeTab === "posts" && (
            <div className="mt-6 space-y-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}

          {/* Media */}
          {activeTab === "media" && (
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts
                .filter((post) => post.image_urls.length > 0)
                .map((post) => (
                  <div
                    key={post._id}
                    className="bg-gray-50 rounded-xl shadow-sm p-3 hover:shadow-md transition"
                  >
                    {post.image_urls.map((image, index) => (
                      <Link
                        target="_blank"
                        to={image}
                        key={index}
                        className="block"
                      >
                        <img
                          src={image}
                          alt=""
                          className="w-full h-40 object-cover rounded-lg mb-2"
                        />
                      </Link>
                    ))}
                    <p className="text-xs text-gray-500">
                      Posted {moment(post.createdAt).fromNow()}
                    </p>
                  </div>
                ))}
            </div>
          )}

          {/* Likes */}
          {activeTab === "likes" && (
            <div className="mt-6 text-gray-500 text-sm">
              <p>No liked posts yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit profile modal placeholder */}
      {showEdit && <p> show profile edit</p>}
    </div>
  ) : (
    <Loading />
  )
}

export default Profile
