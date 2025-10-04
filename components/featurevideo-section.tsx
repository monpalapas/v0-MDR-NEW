"use client";
import React, { useState, useEffect } from 'react';
import { Play, Clock, X } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';

type Video = {
  id: number;
  title: string;
  thumbnail_url: string;
  duration: string;
  video_url: string;
  views: number;
};

const FeatureVideo = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('id, title, thumbnail_url, duration, video_url, views')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching videos:', error);
        return;
      }

      setVideos(data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getEmbedUrl = (url: string) => {
    const youtubeId = extractYoutubeId(url);
    if (youtubeId) {
      return `https://www.youtube.com/embed/${youtubeId}`;
    }
    return url.replace('watch?v=', 'embed/');
  };

  const getThumbnail = (video: Video) => {
    if (video.thumbnail_url) {
      return video.thumbnail_url;
    }
    const youtubeId = extractYoutubeId(video.video_url);
    if (youtubeId) {
      return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
    }
    return 'https://placehold.co/640x360/012184/ffffff?text=Video';
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    }
    return `${views} views`;
  };

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="w-full bg-blue-950 py-8" style={{ fontFamily: 'Poppins, sans-serif', height: '400px' }}>
      <div className="max-w-7xl mx-auto px-4 h-full flex flex-col">
        <h2 className="text-2xl font-bold text-yellow-500 mb-6 text-center">Featured Videos</h2>

        <div className="flex-1 overflow-x-auto scrollbar-hide">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
            </div>
          ) : videos.length > 0 ? (
            <div className="flex space-x-4 md:space-x-6 pb-4">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="flex-shrink-0 w-64 md:w-72 cursor-pointer group"
                  onClick={() => handleVideoClick(video)}
                >
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={getThumbnail(video)}
                      alt={video.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-20 transition-all">
                      <div className="w-12 h-12 bg-yellow-500 bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="text-blue-950 ml-1" size={20} />
                      </div>
                    </div>
                    {video.duration && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center">
                        <Clock size={12} className="mr-1" />
                        {video.duration}
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <h3 className="text-white font-medium text-sm line-clamp-2 group-hover:text-yellow-500 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-blue-300 text-xs mt-1">{formatViews(video.views)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-blue-300">
              <p>No videos available. Add videos through the admin panel.</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-center">
          <button 
            className="bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-semibold py-3 px-8 rounded-lg transition-colors flex items-center"
            onClick={() => window.location.href = '/resources/video-gallery'}
          >
            More Videos
          </button>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-full overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-blue-950">{selectedVideo.title}</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={getEmbedUrl(selectedVideo.video_url)}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={selectedVideo.title}
              ></iframe>
            </div>
            <div className="p-4">
              <p className="text-gray-600 text-sm">{formatViews(selectedVideo.views)} • {selectedVideo.duration}</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default FeatureVideo;
