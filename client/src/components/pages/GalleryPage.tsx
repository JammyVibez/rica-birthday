import { useState } from "react";

const placeholderImages = [
  'https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  'https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
];

export default function GalleryPage() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const openLightbox = (imageIndex: number) => {
    setLightboxImage(placeholderImages[imageIndex]);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <div>
      <h2 className="page-title">Little Things You Love</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            data-testid={`gallery-item-${i + 1}`}
            onClick={() => openLightbox(i)}
            className="aspect-square bg-gradient-to-br from-[var(--primary-cream)] to-[var(--primary-lavender)] rounded-2xl cursor-pointer transition-all duration-300 shadow-lg flex items-center justify-center text-xl text-[var(--text-muted)] text-center p-5 hover:transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
          >
            🖼️<br/>Memory #{i + 1}<br/>[Replace with photo]
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          data-testid="lightbox"
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <span
            data-testid="close-lightbox"
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white text-3xl cursor-pointer bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
          >
            ×
          </span>
          <img
            src={lightboxImage}
            alt="Gallery Image"
            className="max-w-[90%] max-h-[90%] rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
