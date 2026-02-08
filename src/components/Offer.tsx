import { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, Play, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface SampleEditVideo {
  id: string;
  position: number;
  video_name: string;
  video_url: string;
}

interface OfferProps {
  onOpenPopup: () => void;
}

export default function Offer({ onOpenPopup }: OfferProps) {
  const [videos, setVideos] = useState<SampleEditVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const bullets = [
    '1 free edited video (your footage, your style)',
    'Up to 3 revisions',
    '48-hour delivery',
    'Clear workflow and updates in one place',
  ];

  const steps = [
    'Let us know how to get in touch with you',
    'Upload your video clips',
    'We edit with professional software',
    'Receive your edited sample',
    'Request changes and we fix them within 48 hours'
  ];

  useEffect(() => {
    loadSampleEditVideos();
  }, []);

  const loadSampleEditVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('sample_edit_videos')
        .select('*')
        .order('position', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        setVideos(data);
      }
    } catch (error) {
      console.error('Error loading sample edit videos:', error);
    }
  };

  return (
    <section id="offer" className="bg-[#B89B4F] py-16 md:py-24">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-4">
            Free Sample Edit
          </h2>
          <p className="text-xl md:text-2xl text-white font-semibold">
            <span className="relative inline-block">
              (Delivered in 48 hours)
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {videos.length > 0 ? (
            videos.map((video) => (
              <div
                key={video.id}
                className="relative aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden group cursor-pointer mx-auto w-full max-w-sm"
                onClick={() => setSelectedVideo(video.video_url)}
              >
                <video
                  src={video.video_url}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-gray-900 fill-current" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="relative aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden group cursor-pointer mx-auto w-full max-w-sm">
              <img
                src="https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Example edited reel"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-gray-900 fill-current" />
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col justify-center">
            <div className="space-y-4 mb-8">
              {bullets.map((bullet, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <p className="text-lg text-white leading-relaxed">{bullet}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/15 backdrop-blur-sm rounded-lg p-6 mb-8">
              <p className="text-white mb-4 text-sm">How it works:</p>
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <span className="text-white text-lg">{index + 1}.</span>
                    <p className="text-white text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenPopup}
              className="bg-white text-[#B89B4F] px-8 py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl w-full"
            >
              Get My Free Sample Edit
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-white/80 text-sm mt-6 text-center italic">
              If you love the edit, we can talk about working together. If not — no pressure.
            </p>
          </div>
        </div>
      </div>

      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-2xl w-full aspect-[9/16]">
            <video
              src={selectedVideo}
              className="w-full h-full object-contain"
              controls
              autoPlay
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
