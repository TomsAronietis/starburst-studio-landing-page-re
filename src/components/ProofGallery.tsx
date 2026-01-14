import { Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface FeaturedVideo {
  id: string;
  position: number;
  video_name: string;
  video_url: string;
  embed_code?: string | null;
}

const DEFAULT_VIDEOS: FeaturedVideo[] = [
  {
    id: 'p1',
    position: 1,
    video_name: 'placeholder-1',
    video_url: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'p2',
    position: 2,
    video_name: 'placeholder-2',
    video_url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'p3',
    position: 3,
    video_name: 'placeholder-3',
    video_url: 'https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function ProofGallery() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [videos, setVideos] = useState<FeaturedVideo[]>(DEFAULT_VIDEOS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedVideos();

    const subscription = supabase
      .channel('featured_videos_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'featured_videos',
        },
        () => {
          loadFeaturedVideos();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadFeaturedVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('featured_videos')
        .select('*')
        .order('position', { ascending: true });

      if (error) {
        console.error('Query error:', error);
        setVideos(DEFAULT_VIDEOS);
        return;
      }

      if (data && data.length > 0) {
        const merged = DEFAULT_VIDEOS.map(p =>
          data.find(d => d.position === p.position) || p
        );
        setVideos(merged);
      } else {
        setVideos(DEFAULT_VIDEOS);
      }
    } catch (error) {
      console.error('Error loading featured videos:', error);
      setVideos(DEFAULT_VIDEOS);
    } finally {
      setLoading(false);
    }
  };

  const isVideoFile = (url: string) => {
    return url.includes('/storage/v1/object/public/videos/') ||
           url.match(/\.(mp4|mov|webm|ogg)$/i);
  };

  const renderEmbedCode = (embedCode: string) => {
    return (
      <div
        className="w-full h-full"
        dangerouslySetInnerHTML={{ __html: embedCode }}
      />
    );
  };

  if (loading) {
    return (
      <section id="proof-gallery" className="bg-white py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[9/16] bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="proof-gallery" className="bg-white py-16 md:py-24">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="relative aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden group cursor-pointer"
              onClick={() => setActiveVideo(index)}
            >
              {video.embed_code ? (
                <div className="w-full h-full [&_iframe]:w-full [&_iframe]:h-full">
                  {renderEmbedCode(video.embed_code)}
                </div>
              ) : isVideoFile(video.video_url) ? (
                <video
                  src={video.video_url}
                  className="w-full h-full object-cover"
                  poster={video.video_url.replace(/\.(mp4|mov|webm|ogg)$/i, '-poster.jpg')}
                />
              ) : (
                <img
                  src={video.video_url}
                  alt="Featured video"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-[#B89B4F] fill-current" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
