import { useState, useEffect } from 'react';
import { strapiClient, StrapiResponse, StrapiItem } from '@/lib/strapi';

export function useProductos() {
  const [productos, setProductos] = useState<StrapiItem<any>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProductos() {
      try {
        setLoading(true);
        const response = await strapiClient.getProductos();
        console.log('Respuesta completa de Strapi:', response);
        
        // Verificar si la respuesta tiene estructura data o es directa
        if (response && response.data) {
          console.log('Usando response.data');
          setProductos(response.data);
        } else if (Array.isArray(response)) {
          console.log('Usando response directo (array)');
          setProductos(response);
        } else {
          console.log('Respuesta inesperada:', response);
          setProductos([]);
        }
      } catch (err) {
        console.error('Error en useProductos:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar productos');
      } finally {
        setLoading(false);
      }
    }

    fetchProductos();
  }, []);

  return { productos, loading, error };
}

export function useTestimonios() {
  const [testimonios, setTestimonios] = useState<StrapiItem<any>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonios() {
      try {
        setLoading(true);
        const response = await strapiClient.getTestimonios();
        setTestimonios(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar testimonios');
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonios();
  }, []);

  return { testimonios, loading, error };
}

export function useServicios() {
  const [servicios, setServicios] = useState<StrapiItem<any>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServicios() {
      try {
        setLoading(true);
        const response = await strapiClient.getServicios();
        setServicios(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar servicios');
      } finally {
        setLoading(false);
      }
    }

    fetchServicios();
  }, []);

  return { servicios, loading, error };
}
