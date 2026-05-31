import { useCallback, useMemo, useState } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";

export default function Gallery({ favourites = [], dispatch }) {
  const { photos = [], loading, error } = useFetchPhotos(30);
  const [query, setQuery] = useState("");

  const handleSearch = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return photos;
    return photos.filter((p) => p.author?.toLowerCase().includes(q));
  }, [photos, query]);

  return (
    <div className="gallery-wrapper">
      {/* Structural overrides to guarantee 4 columns on full-screen displays */}
      <style>{`
        body, #root, .gallery-wrapper {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box;
          margin: 0 !important;
          padding: 0 !important;
        }

        .gallery-wrapper { 
          min-height: 100vh; 
          background-color: #f9fafb; 
          padding: 24px !important; 
          font-family: system-ui, -apple-system, sans-serif; 
        }
        
        .gallery-inner { 
          width: 100% !important;
          max-width: 100% !important; /* FIXED: Removed the 1200px lock so it fills your main screen */
          margin: 0 auto !important; 
          display: block !important;
        }

        .search-input { 
          width: 100%; 
          padding: 14px; 
          border: 1px solid #d1d5db; 
          border-radius: 8px; 
          margin-bottom: 24px; 
          box-sizing: border-box; 
          font-size: 16px; 
        }
        
        /* ======================================================== */
        /* FORCED RESPONSIVE GRID LAYOUT RULES                       */
        /* ======================================================== */
        
        /* Mobile: 1 Column */
        .photo-grid { 
          display: grid !important; 
          grid-template-columns: repeat(1, minmax(0, 1fr)) !important; 
          gap: 24px !important; 
          width: 100% !important;
        }
        
        /* Tablet Dimension (Screens wider than 600px): 2 Columns */
        @media screen and (min-width: 600px) { 
          .photo-grid { 
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important; 
          } 
        }
        
        /* Main Screen & Laptop Dimension (Screens wider than 992px up to 4K): FORCED 4 COLUMNS */
        @media screen and (min-width: 992px) { 
          .photo-grid { 
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important; 
          } 
        }
        
        /* ======================================================== */

        .photo-card { 
          background: #ffffff; 
          border-radius: 12px; 
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); 
          overflow: hidden; 
          display: flex !important;
          flex-direction: column !important; 
          width: 100% !important;
          box-sizing: border-box;
        }

        .image-wrapper { 
          width: 100% !important; 
          aspect-ratio: 4 / 3 !important; 
          position: relative !important; 
          background-color: #e5e7eb; 
          overflow: hidden; 
        }

        .image-wrapper img { 
          position: absolute !important; 
          top: 0 !important; 
          left: 0 !important; 
          width: 100% !important; 
          height: 100% !important; 
          object-fit: cover !important; 
        }

        .card-footer { 
          padding: 14px 16px; 
          display: flex !important; 
          justify-content: space-between !important; 
          align-items: center !important; 
          gap: 12px; 
          background: #ffffff;
        }

        .author-name { 
          font-size: 15px; 
          font-weight: 600; 
          color: #1f2937; 
          margin: 0; 
          white-space: nowrap; 
          overflow: hidden; 
          text-overflow: ellipsis; 
        }

        .heart-button { 
          background: none; 
          border: none; 
          cursor: pointer; 
          font-size: 26px; 
          padding: 4px; 
          line-height: 1; 
          user-select: none; 
        }
      `}</style>

      <div className="gallery-inner">
        <input 
          type="text" 
          placeholder="Search by author..." 
          value={query} 
          onChange={handleSearch} 
          className="search-input" 
        />
        
        {loading && <div style={{textAlign: 'center', color: '#6b7280'}}>Loading photos...</div>}
        {error && <div style={{textAlign: 'center', color: '#dc2626'}}>Error loading photos.</div>}

        {!loading && !error && (
          <div className="photo-grid">
            {filtered.map((photo) => {
              const isFav = favourites.some(favId => String(favId) === String(photo.id));
              return (
                <div key={photo.id} className="photo-card">
                  <div className="image-wrapper">
                    <img 
                      src={`https://picsum.photos/id/${photo.id}/400/300`} 
                      alt={photo.author || "Gallery item"} 
                      onError={(e) => { e.target.src = `https://picsum.photos/400/300?random=${photo.id}`; }}
                    />
                  </div>
                  <div className="card-footer">
                    <p className="author-name">{photo.author}</p>
                    <button 
                      onClick={() => dispatch({ type: "TOGGLE_FAVOURITE", payload: String(photo.id) })} 
                      className="heart-button"
                    >
                      {isFav ? "❤️" : "🤍"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}