import React, { useEffect, useState } from 'react';
import { dummyStoriesData } from '../assets/assets';
import { Plus } from 'lucide-react';
import './StoriesBar.css';
import moment from 'moment';
import StoryModel from './StoryModel';
import StoryViewer from './StoryViewer';

const StoriesBar = () => {
  const [stories, setStories] = useState([]);
  const[showModel,setShowModel]=useState(false);
  const[viewStory,setViewStory]=useState(false);

  const fetchStories=async()=>{
    setStories(dummyStoriesData)
  }

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div  className="flex gap-3 overflow-x-auto p-2 no-scrollbar">
      {/* Add story card */}
      <div onClick={()=>setShowModel(true)} className="flex-shrink-0 create-story-card story-card flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white">
          <Plus size={24} />
        </div>
        <p className="text-sm mt-2 text-center">Create Story</p>
      </div>

      {/* Render all stories */}
      {stories.map((story, index) => (
        <div onClick={()=>{ setViewStory(story)}}
          key={index}
          className="flex-shrink-0 story-card relative rounded-lg overflow-hidden cursor-pointer shadow"
        >
          {/* Story media */}
          {story.media_type && story.media_type !== 'text' ? (
            story.media_type === "image" ? (
              <img
                src={story.media_url}
                alt="story media"
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={story.media_url}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
              />
            )
          ) : (
            <img
              src={story.user.profile_picture}
              alt={story.user.username}
              className="w-full h-full object-cover"
            />
          )}

          {/* Small circular user avatar */}
          <div className="absolute top-2 left-2 w-10 h-10 rounded-full border-2 border-blue-500 overflow-hidden">
            <img
              src={story.user.profile_picture}
              alt={story.user.username}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Username and timestamp */}
          <div className="absolute bottom-2 left-0 w-full text-center text-white text-xs">
            <p className="font-medium">{story.user.username}</p>
            <p className="text-[10px]">{moment(story.createdAt).fromNow()}</p>
          </div>
        </div>
      ))}

     {/*Add story model */}
      {
        showModel && <StoryModel setShowModel={setShowModel} fetchStories={fetchStories}/>
      }

      {/*view story model */}

      {
        viewStory && <StoryViewer viewStory={viewStory} setViewStory={setViewStory} />
      }
      
    </div>
  );
};

export default StoriesBar;
