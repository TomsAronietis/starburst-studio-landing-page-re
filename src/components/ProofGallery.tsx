import { Play } from 'lucide-react';
import { useState } from 'react';

export default function ProofGallery() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const videos = [
    {
      label: 'Raw → Final',
      thumbnail: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      label: 'Before / After',
      thumbnail: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      label: 'Raw → Final',
      thumbnail: 'https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  return (
    <section id="proof-gallery" className="bg-white py-16 md:py-24">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {videos.map((video, index) => (
            <div
              key={index}
              className="relative aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden group cursor-pointer"
              onClick={() => setActiveVideo(index)}
            >
              <img
                src={video.thumbnail}
                alt={video.label}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-[#B89B4F] fill-current" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md text-sm font-semibold text-black inline-block">
                  {video.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
