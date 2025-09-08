import { BadgeCheck, Heart, MessageCircle, Share2 } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react';
import { dummyUserData } from '../assets/assets';

const PostCard = ({ post }) => {
  const postWithHashTags = post.content.replace(
    /(#\w+)/g,
    '<span class="text-indigo-600 font-medium">$1</span>'
  );

  const [likes, setLikes] = useState(post.likes_count);
  const currentUSer = dummyUserData;

  const handleLike = async () => {
    // like logic here
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md border border-gray-200 dark:border-zinc-800 p-4 mb-5 w-full transition hover:shadow-lg">
      {/* User info */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={post.user.profile_picture}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-800 dark:text-white">
              {post.user.full_name}
            </span>
            <BadgeCheck className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            @{post.user.username} · {moment(post.createdAt).fromNow()}
          </div>
        </div>
      </div>

      {/* Content */}
      {post.content && (
        <div
          className="mb-3 text-gray-800 dark:text-gray-200 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: postWithHashTags }}
        />
      )}

      {/* Images */}
      {post.image_urls.length > 0 && (
        <div
          className={`grid gap-2 mb-3 ${
            post.image_urls.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
          }`}
        >
          {post.image_urls.map((img, index) => (
            <img
              src={img}
              key={index}
              className={`rounded-xl w-full h-64 object-cover ${
                post.image_urls.length === 1 ? 'h-auto max-h-[500px]' : ''
              }`}
            />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-6 pt-2 border-t border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400">
        {/* Like */}
        <div
          className="flex items-center gap-1 cursor-pointer select-none hover:text-red-500 transition"
          onClick={handleLike}
        >
          <Heart
            className={`w-5 h-5 ${
              likes.includes(currentUSer._id) ? 'text-red-500 fill-red-500' : ''
            }`}
          />
          <span className="text-sm">{likes.length}</span>
        </div>

        {/* Comment */}
        <div className="flex items-center gap-1 cursor-pointer select-none hover:text-blue-500 transition">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">{12}</span>
        </div>

        {/* Share */}
        <div className="flex items-center gap-1 cursor-pointer select-none hover:text-green-500 transition">
          <Share2 className="w-5 h-5" />
          <span className="text-sm">{7}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
