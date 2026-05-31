import { useEffect, useState } from "react";

export default function useFetchPhotos(limit = 30) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://picsum.photos/v2/list?limit=${limit}`
        );

        const data = await res.json();
        setPhotos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [limit]);

  return { photos, loading, error };
}