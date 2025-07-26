import { useEffect, useState } from 'react';

export function usePets() {
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`api/animals`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        const petsData = Array.isArray(data?.items) ? data.items : [];
        setPets(petsData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching pets:', err);
        setError('Error al cargar mascotas');
        setPets([]);
        setLoading(false);
      });
  }, []);

  return { pets, loading, error };
}
