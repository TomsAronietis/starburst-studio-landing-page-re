import { Play } from 'lucide-react';

const GALLERY_VIDEOS = [
  {
    id: 1,
    embedCode: `<script src="https://fast.wistia.com/player.js" async></script><script src="https://fast.wistia.com/embed/dp8z1jbu7a.js" async type="module"></script><style>wistia-player[media-id='dp8z1jbu7a']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/dp8z1jbu7a/swatch'); display: block; filter: blur(5px); padding-top:177.78%; }</style><wistia-player media-id="dp8z1jbu7a" aspect="0.5625"></wistia-player>`,
  },
  {
    id: 2,
    embedCode: `<iframe src="https://fast.wistia.net/embed/iframe/REPLACE_WITH_YOUR_VIDEO_ID_2" allow="autoplay; fullscreen" style="width:100%;height:100%;position:absolute;left:0;top:0;overflow:hidden;"></iframe>`,
  },
  {
    id: 3,
    embedCode: `<iframe src="https://fast.wistia.net/embed/iframe/REPLACE_WITH_YOUR_VIDEO_ID_3" allow="autoplay; fullscreen" style="width:100%;height:100%;position:absolute;left:0;top:0;overflow:hidden;"></iframe>`,
  },
];

export default function ProofGallery() {
  return (
    <section id="proof-gallery" className="bg-white py-16 md:py-24">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {GALLERY_VIDEOS.map((video) => (
            <div
              key={video.id}
              className="relative aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden"
            >
              <div
                className="w-full h-full [&_iframe]:w-full [&_iframe]:h-full"
                dangerouslySetInnerHTML={{ __html: video.embedCode }}
              />
              <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none opacity-0 hover:opacity-100">
                <div className="bg-white/90 rounded-full p-4">
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
