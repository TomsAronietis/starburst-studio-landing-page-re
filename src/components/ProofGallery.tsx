import { Play } from 'lucide-react';
import { useState, useEffect } from 'react';

interface VideoSlot {
  id: string;
  embedCode?: string;
  thumbnailUrl?: string;
}

const VIDEOS: VideoSlot[] = [
  {
    id: 'video-1',
    embedCode: '', // Paste Wistia/Vimeo/YouTube embed code here
    thumbnailUrl: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'video-2',
    embedCode: '', // Paste Wistia/Vimeo/YouTube embed code here
    thumbnailUrl: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'video-3',
    embedCode: '', // Paste Wistia/Vimeo/YouTube embed code here
    thumbnailUrl: 'https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function ProofGallery() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  useEffect(() => {
    VIDEOS.forEach((video) => {
      if (video.embedCode) {
        const scriptMatch = video.embedCode.match(/<script[^>]*src="([^"]+)"[^>]*>/);
        if (scriptMatch) {
          const existingScript = document.querySelector(`script[src="${scriptMatch[1]}"]`);
          if (!existingScript) {
            const script = document.createElement('script');
            script.src = scriptMatch[1];
            script.async = true;
            document.body.appendChild(script);
          }
        }
      }
    });
  }, []);

  const renderContent = (video: VideoSlot, index: number) => {
    if (video.embedCode) {
      const htmlWithoutScript = video.embedCode.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
      return (
        <div
          className="w-full h-full [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:absolute [&_iframe]:inset-0 [&>div]:w-full [&>div]:h-full"
          dangerouslySetInnerHTML={{ __html: htmlWithoutScript }}
        />
      );
    }

    return (
      <>
        <img
          src={video.thumbnailUrl}
          alt="Featured video"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
          <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
            <Play className="w-8 h-8 text-[#B89B4F] fill-current" />
          </div>
        </div>
      </>
    );
  };

  return (
    <section id="proof-gallery" className="bg-white py-16 md:py-24">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {VIDEOS.map((video, index) => (
            <div
              key={video.id}
              className="relative aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden group cursor-pointer"
              onClick={() => !video.embedCode && setActiveVideo(index)}
            >
              {renderContent(video, index)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
