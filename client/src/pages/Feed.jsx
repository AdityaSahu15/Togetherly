import React, { useEffect, useState } from 'react'
import { assets, dummyPostsData } from '../assets/assets';
import Loading from '../components/Loading';
import StoriesBar from '../components/StoriesBar';
import PostCard from '../components/PostCard';
import RecentMessages from '../components/RecentMessages';

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeeds = () => {
    setFeeds(dummyPostsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return !loading ? (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 ">
      {/* Left: Stories + Feed */}
      <div className="md:col-span-2">
        <StoriesBar />
        <div>
          {feeds.map((post)=>(
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>


{/* Right: Sidebar */}
<div className="md:col-span-1 self-start sticky top-0 space-y-4">
  <div className="bg-white shadow rounded-2xl p-4">
    <h3 className="text-lg font-semibold mb-2">Sponsored</h3>
    <img src={assets.sponsored_img} alt="" className="rounded-lg mb-2" />
    <p className="font-medium">Email Marketing</p>
    <p className="text-sm text-gray-600">
      Boost your business with a smart, simple platform designed to drive success.
    </p>
  </div>

  <RecentMessages />
</div>




    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
