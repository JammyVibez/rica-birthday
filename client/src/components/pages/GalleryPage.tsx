import { useState } from "react";
import { useBirthdayContext } from "../../contexts/BirthdayContext";

export default function GalleryPage() {
  const { customization, isLoading, updateGalleryItem } = useBirthdayContext();
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="text-xl text-[var(--text-muted)]">Loading...</div>
      </div>
    );
  }

  // Ensure we have exactly 6 gallery items
  const galleryItems = Array.from({ length: 6 }, (_, i) => {
    const existing = customization?.galleryItems?.[i];
    return existing || { imageUrl: "", caption: `Memory #${i + 1}` };
  });

  const openLightbox = (imageIndex: number) => {
    const item = galleryItems[imageIndex];
    if (item.imageUrl) {
      setLightboxImage(item.imageUrl);
    }
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <div>
      <h2 className="page-title">Little Things You Love</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {galleryItems.map((item, i) => (
          <div
            key={i}
            data-testid={`gallery-item-${i + 1}`}
            className="aspect-square bg-gradient-to-br from-[var(--primary-cream)] to-[var(--primary-lavender)] rounded-2xl cursor-pointer transition-all duration-300 shadow-lg flex flex-col items-center justify-center text-xl text-[var(--text-muted)] text-center p-5 hover:transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl group"
            onClick={() => {
              if (item.imageUrl) {
                openLightbox(i);
              } else {
                const newImageUrl = prompt("Enter image URL:", item.imageUrl || "");
                if (newImageUrl !== null) {
                  updateGalleryItem(i, newImageUrl, item.caption);
                }
              }
            }}
          >
            {item.imageUrl ? (
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end justify-center pb-2">
                  <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to view
                  </span>
                </div>
              </div>
            ) : (
              <>
                🖼️<br/>
                <span className="text-sm">Click to add photo</span>
              </>
            )}
            <div 
              className="mt-2 text-sm cursor-pointer hover:text-[var(--primary-rose)] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                const newCaption = prompt("Edit caption:", item.caption);
                if (newCaption !== null) {
                  updateGalleryItem(i, item.imageUrl, newCaption);
                }
              }}
              data-testid={`caption-edit-${i}`}
            >
              {item.caption}
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-center mt-8 italic text-[var(--text-muted)]">
        💝 Click on empty slots to add photos, or click captions to edit them!
      </p>

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
