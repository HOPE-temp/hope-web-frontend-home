import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

export function usePetById(id: string | number) {
  const [pet, setPet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetch(`${API_URL}/animals/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('No encontrado');
        return res.json();
      })
      .then(data => {
        const petData = data?.items ? data.items[0] : data;
        setPet(petData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching pet:', err);
        setError('No se pudo cargar la mascota');
        setPet(null);
        setLoading(false);
      });
  }, [id]);

  return { pet, loading, error };
}
