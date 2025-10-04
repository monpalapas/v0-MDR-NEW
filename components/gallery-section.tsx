"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GalleryHorizontal, Video } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';

interface GalleryImage {
  id: number;
  title: string;
  image_url: string;
  category: string;
}

const GallerySection = () => {
  const [galleryImages, setGalleryImages] = useState(false);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('id, title, image_url, category')
        .order('created_at', { ascending: false })
        .limit(12);

      if (error) {
        console.error('Error fetching gallery images:', error);
        return;
      }

      setImages(data || []);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  const duplicatedItems = images.length > 0
    ? [...images, ...images, ...images]
    : [];

  return (
    <div className="flex flex-col justify-center items-center bg-blue-950">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Poppins', sans-serif;
          overflow-x: hidden;
        }
        
        .compact-scrolling-wrapper {
          animation: scroll 30s linear infinite;
          width: fit-content;
        }
        
        .compact-scrolling-wrapper:hover {
          animation-play-state: paused;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .compact-gallery-item {
          transition: all 0.3s ease;
        }
        
        .compact-gallery-item:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 20px rgba(1, 33, 132, 0.25);
        }
        
        .compact-fade-overlay {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 60px;
          z-index: 10;
          pointer-events: none;
        }
        
        .compact-fade-left {
          left: 0;
          background: linear-gradient(to right, white, transparent);
        }
        
        .compact-fade-right {
          right: 0;
          background: linear-gradient(to left, white, transparent);
        }
      `}</style>

      {/* Compact Widget Container */}
      <div 
        className="w-full shadow-xl overflow-hidden"
        style={{ maxWidth: 'auto', height: '480px' }}
      >
        {/* Header Section */}
        <div className="flex flex-col">
          {/* Top yellow line */}
          <div className="h-2 w-full bg-yellow-500" />

          {/* Main content */}
        <div className="bg-white text-white p-6 flex flex-col items-center justify-center">
            <h1 className="section-title text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Activities & Events
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Photos from disaster preparedness activities
            </p>
          </div>
        </div>

        {/* Infinity Scrolling Gallery */}
        <div
          className="relative bg-white p-4"
          style={{ height: '300px' }}
          onMouseEnter={() => setGalleryImages(true)}
          onMouseLeave={() => setGalleryImages(false)}
        >
          <div className="compact-fade-overlay compact-fade-left"></div>
          <div className="compact-fade-overlay compact-fade-right"></div>
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-950"></div>
            </div>
          ) : duplicatedItems.length > 0 ? (
            <div className={`compact-scrolling-wrapper flex space-x-4 h-full items-center ${galleryImages ? 'opacity-90' : 'opacity-100'} transition-opacity duration-300`}>
              {duplicatedItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="compact-gallery-item flex-shrink-0 w-48 h-70 rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>No images available. Add images through the admin panel.</p>
            </div>
          )}
        </div>

        {/* Call to Action Section */}
  <div className="relative flex inset-0 bg-gray-200 py-2 px-6 flex justify-center items-center gap-6">
          <Link href="/resources/gallery" passHref>
            <button className="flex items-center gap-4 bg-[#012184] hover:bg-blue-900 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 shadow-md text-sm">
              <GalleryHorizontal size={18} />
              Visit Gallery
            </button>
          </Link>
          <Link href="/resources/video-gallery" passHref>
            <button className="flex items-center gap-2 bg-[#fcd530] hover:bg-yellow-600 text-[#012184] font-medium py-2 px-6 rounded-lg transition-colors duration-300 shadow-md text-sm">
              <Video size={18} />
              Visit Videos
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
