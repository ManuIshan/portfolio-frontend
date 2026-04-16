import { useState } from 'react';
import './CustomGallery.css';

export default function CustomGallery({ items = [] }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  if (!items.length) return null;

  const getGridClass = (index, total) => {
    // Optimized layout for 5 items
    if (total === 1) return 'gallery-item grid-full';
    if (total === 2) return index === 0 ? 'gallery-item grid-1-2' : 'gallery-item grid-2-2';
    if (total === 3) return index === 0 ? 'gallery-item grid-full' : (index === 1 ? 'gallery-item grid-1-2' : 'gallery-item grid-2-2');
    if (total === 4) return index < 2 ? 'gallery-item grid-1-2' : 'gallery-item grid-2-2';
    if (total === 5) return index === 0 ? 'gallery-item grid-full' : 'gallery-item grid-1-2';
  };

  return (
    <div className="custom-gallery">
      <div className="gallery-grid">
        {items.map((item, idx) => (
          <div
            key={item.id || idx}
            className={`${getGridClass(idx, items.length)}`}
            onMouseEnter={() => setHoveredId(item.id || idx)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setSelectedId(item.id || idx)}
            role="button"
            tabIndex={0}
          >
            <div className="gallery-item-inner">
              <img
                src={item.img}
                alt={`Gallery ${idx + 1}`}
                className="gallery-image"
              />
              <div className="gallery-overlay" />
              <div
                className={`gallery-hover-effect ${
                  hoveredId === (item.id || idx) ? 'active' : ''
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedId !== null && (
        <div
          className="gallery-lightbox"
          onClick={() => setSelectedId(null)}
        >
          <div className="lightbox-content">
            <button
              className="lightbox-close"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId(null);
              }}
            >
              ✕
            </button>
            <img
              src={items.find(i => (i.id || items.indexOf(i)) === selectedId)?.img}
              alt="Full view"
              className="lightbox-image"
            />
          </div>
        </div>
      )}
    </div>
  );
}
