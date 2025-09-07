import React, { useEffect, useState } from 'react'
import { dummyPostsData } from '../assets/assets';
import Loading from '../components/Loading';
import StoriesBar from '../components/StoriesBar';

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 ">
      {/* Left: Stories + Feed */}
      <div className="md:col-span-2">
        <StoriesBar />
        <div>
          List of post
        </div>
      </div>

      {/* Right: Sidebar */}
      <div>
        <h1>Sponsored</h1>
        <h1>Recent messages</h1>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
