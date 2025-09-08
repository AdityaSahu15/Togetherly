import { BadgeCheck, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const StoryViewer = ({ viewStory, setViewStory }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!viewStory) return;

    let timer, progressInterval;

    if (viewStory.media_type !== 'video') {
      setProgress(0);

      const duration = 10000; // 10 seconds
      const stepTime = 100;
      let elapsed = 0;

      progressInterval = setInterval(() => {
        elapsed += stepTime;
        setProgress((elapsed / duration) * 100);
      }, stepTime);

      // auto-close after 10s
      timer = setTimeout(() => {
        setViewStory(null);
      }, duration);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [viewStory, setViewStory]);

  const handleClose = () => {
    setViewStory(null);
  };

  if (!viewStory) return null;

  const renderContent = () => {
    switch (viewStory.media_type) {
      case 'image':
        return (
          <div className="flex items-center justify-center w-full h-full bg-black">
            <img
              src={viewStory.media_url}
              alt=""
              className="max-h-full max-w-full object-contain rounded-lg"
            />
          </div>
        );
      case 'video':
        return (
          <div className="flex items-center justify-center w-full h-full bg-black">
            <video
              src={viewStory.media_url}
              className="max-h-full max-w-full object-contain rounded-lg"
              autoPlay
              muted
              onEnded={() => setViewStory(null)}
              controls
            />
          </div>
        );
      case 'text':
        return (
          <div
            className="flex items-center justify-center w-full h-full p-6"
            style={{ backgroundColor: viewStory.backgroundColor || '#333' }}
          >
            <p className="text-white text-lg font-medium text-center whitespace-pre-wrap">
              {viewStory.content}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black"
      style={{
        backgroundColor:
          viewStory.media_type === 'text'
            ? viewStory.backgroundColor || '#333'
            : '#000'
      }}
    >
      {/* Progress bar */}
      {viewStory.media_type !== 'video' && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
          <div
            className="h-full bg-white transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* User info */}
      <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full">
        <img
          src={viewStory.user?.profile_picture}
          alt=""
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-sm font-medium text-white">
          {viewStory.user?.full_name}
        </span>
        <BadgeCheck size={16} className="text-blue-500" />
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white cursor-pointer"
      >
        <X size={20} />
      </button>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default StoryViewer;
