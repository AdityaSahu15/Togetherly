import { useAuth } from '@clerk/clerk-react';
import { ArrowLeft, Sparkle, TextIcon, Upload } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';

const StoryModel = ({ setShowModel, fetchStories }) => {

    const bgColors = [
        '#FF6B6B','#FFD93D','#6BCB77','#4D96FF',
        '#845EC2','#FF9671','#2EC4B6','#FF6F91',
    ];

    const [mode, setMode] = useState("text");
    const [background, setBackground] = useState(bgColors[0]);
    const [text, setText] = useState("");
    const [media, setMedia] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const {getToken}=useAuth();

    const MAX_VIDEO_DURATION=60;//seconds
    const MAX_VIDEO_SIZE_MB=50; // MB

    const handleMediaUpload = async (e) => {
        const file = e.target.files?.[0];
        if (file) 
        {
            if(file.type.startsWith('video'))
            {
                if(file.size > MAX_VIDEO_SIZE_MB * 1024*1024)
                {
                    toast.error(`Video size cannot exceed ${MAX_VIDEO_SIZE_MB} MB`)
                    setMedia(null);
                    setPreviewUrl(null);
                    return;
                }
                const video=document.createElement('video');

                video.preload='metadata';
                video.onloadedmetadata=()=>{
                    window.URL.revokeObjectURL(video.src)

                    if(video.duration > MAX_VIDEO_DURATION)
                    {
                        toast.error(`Video length cannot exceed ${MAX_VIDEO_DURATION} `)
                        setMedia(null);
                        setPreviewUrl(null);
                    }
                    else
                    {
                        setMedia(file);
                        setPreviewUrl(URL.createObjectURL(file))
                        setText('');
                        setMode('media')
                    }
                }
                video.src=URL.createObjectURL(file)
            }
            else if(file.type.startsWith('image'))
            {
                setMedia(file);
                setPreviewUrl(URL.createObjectURL(file))
                setText('');
                setMode('media')
            }
        }
    };

    const handleCreateStory = async () => {
        const media_type=mode === 'media' ? media?.type.startsWith('image') ? 'image' : 'video' :'text'

        if(media_type === 'text' && !text)
        {
            throw new Error("please enter some text")
        }

        let formData=new FormData();
        formData.append('content',text);
        formData.append('media_type',media_type);
        formData.append('media',media);
        formData.append('background_color',background);

        const token=await getToken();

        try {
            const {data}=await api.post(`/api/story/create`,formData,{
                headers:{Authorization:`Bearer ${token}`}
            })

            if(data.success)
            {
                setShowModel(false);
                toast.success("Story created successfully")
                fetchStories()
            }
            else 
            {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
            {/* Modal container */}
            <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl w-full max-w-md shadow-2xl border border-gray-200 overflow-hidden">
                
                {/* Header */}
                <div className="flex items-center px-5 py-4 border-b border-gray-300">
                    <button
                        onClick={() => setShowModel(false)}
                        className="p-2 hover:bg-gray-200 rounded-full transition cursor-pointer"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="flex-1 text-center text-lg font-semibold text-gray-800">Create Story</h2>
                </div>

                {/* Story Preview */}
                <div
                    className="relative w-full h-72 mx-auto my-4 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden"
                    style={{
                        background: mode === 'text' ? background : '#f3f3f3'
                    }}
                >
                    {/* Text Mode */}
                    {mode === 'text' && (
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="What's on your mind?"
                            className="w-full h-full bg-transparent text-white text-center text-lg font-medium p-5 resize-none outline-none placeholder-white/80"
                        />
                    )}

                    {/* Media Mode */}
                    {mode === 'media' && previewUrl && (
                        media?.type.startsWith('image') ? (
                            <img src={previewUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <video
                                src={previewUrl}
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                            />
                        )
                    )}
                </div>

                {/* Background Selector */}
                {mode === 'text' && (
                    <div className="flex justify-center flex-wrap gap-3 px-5 mb-4">
                        {bgColors.map((color) => (
                            <button
                                key={color}
                                className={`w-9 h-9 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                                    background === color ? 'border-white scale-110 shadow-lg' : 'border-gray-300'
                                }`}
                                style={{ backgroundColor: color }}
                                onClick={() => setBackground(color)}
                            />
                        ))}
                    </div>
                )}

                {/* Mode Selection */}
                <div className="flex justify-center gap-3 px-5 mb-4">
                    <button
                        onClick={() => { setMode('text'); setMedia(null); setPreviewUrl(null); }}
                        className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition shadow-md cursor-pointer ${
                            mode === 'text' ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'
                        } hover:scale-105`}
                    >
                        <TextIcon size={16} /> Text
                    </button>

                    <label
                        className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition shadow-md cursor-pointer ${
                            mode === 'media' ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'
                        } hover:scale-105`}
                    >
                        <input
                            type="file"
                            accept="image/*,video/*"
                            onChange={handleMediaUpload}
                            className="hidden"
                        />
                        <Upload size={16} /> Photo/Video
                    </label>
                </div>

                {/* Create Story Button */}
                <div className="px-5 pb-5">
                    <button
                        onClick={() => toast.promise(handleCreateStory(), {
                            loading: 'Saving...',
                        })}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    >
                        <Sparkle size={18} /> Create Story
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StoryModel;
