const GALLERY_VIDEOS = [
  {
    id: 1,
    embedCode: `<script src="https://fast.wistia.com/player.js" async></script><script src="https://fast.wistia.com/embed/lgw7lxmn51.js" async type="module"></script><style>wistia-player[media-id='lgw7lxmn51']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/lgw7lxmn51/swatch'); display: block; filter: blur(5px); padding-top:177.78%; }</style> <wistia-player media-id="lgw7lxmn51" aspect="0.5625"></wistia-player>`,
  },
  {
    id: 2,
    embedCode: `<script src="https://fast.wistia.com/player.js" async></script><script src="https://fast.wistia.com/embed/hc1rqua2j3.js" async type="module"></script><style>wistia-player[media-id='hc1rqua2j3']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/hc1rqua2j3/swatch'); display: block; filter: blur(5px); padding-top:177.78%; }</style> <wistia-player media-id="hc1rqua2j3" aspect="0.5625"></wistia-player>`,
  },
  {
    id: 3,
    embedCode: `<script src="https://fast.wistia.com/player.js" async></script><script src="https://fast.wistia.com/embed/hc1rqua2j3.js" async type="module"></script><style>wistia-player[media-id='hc1rqua2j3']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/hc1rqua2j3/swatch'); display: block; filter: blur(5px); padding-top:177.78%; }</style> <wistia-player media-id="hc1rqua2j3" aspect="0.5625"></wistia-player>`,
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
                className="w-full h-full [&_iframe]:w-full [&_iframe]:h-full [&_wistia-player]:w-full [&_wistia-player]:h-full"
                dangerouslySetInnerHTML={{ __html: video.embedCode }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
