'use client';

import { useEffect } from 'react';

export function FaviconDefinitive() {
  useEffect(() => {
    // Función para limpieza DEFINITIVA de favicons
    const definitiveCleanup = () => {
      // 1. Limpiar TODOS los links de favicon existentes
      const allLinks = document.querySelectorAll('link');
      allLinks.forEach(link => {
        const rel = link.getAttribute('rel') || '';
        const href = link.getAttribute('href') || '';
        
        if (rel.includes('icon') || href.includes('favicon') || href.includes('.ico')) {
          link.remove();
        }
      });

      // 2. Limpiar por selectores específicos
      const iconSelectors = [
        'link[rel="icon"]',
        'link[rel="shortcut icon"]',
        'link[rel="apple-touch-icon"]',
        'link[rel="mask-icon"]',
        'link[rel="msapplication-TileImage"]',
        'link[href*="favicon"]',
        'link[href*=".ico"]'
      ];

      iconSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.remove());
      });

      // 3. Limpiar meta tags relacionados
      const metaTags = document.querySelectorAll('meta');
      metaTags.forEach(meta => {
        const name = meta.getAttribute('name') || '';
        const property = meta.getAttribute('property') || '';
        
        if (name.includes('msapplication') || property.includes('msapplication')) {
          meta.remove();
        }
      });

      // 4. Limpiar manifest.json si existe
      const manifestLinks = document.querySelectorAll('link[rel="manifest"]');
      manifestLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        if (href.includes('manifest.json')) {
          link.remove();
        }
      });
    };

    // Función para crear favicon NUEVO con cache busting agresivo
    const createNewFavicon = () => {
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(7);
      const faviconUrl = `/favicon.ico?v=${timestamp}&r=${randomId}`;
      
      // Crear icon principal
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = faviconUrl;
      link.type = 'image/x-icon';
      link.setAttribute('data-favicon', 'new');
      document.head.appendChild(link);
      
      // Crear shortcut icon
      const shortcutLink = document.createElement('link');
      shortcutLink.rel = 'shortcut icon';
      shortcutLink.href = faviconUrl;
      shortcutLink.type = 'image/x-icon';
      shortcutLink.setAttribute('data-favicon', 'new');
      document.head.appendChild(shortcutLink);
      
      // Crear apple touch icon
      const appleLink = document.createElement('link');
      appleLink.rel = 'apple-touch-icon';
      appleLink.href = faviconUrl;
      appleLink.type = 'image/x-icon';
      appleLink.setAttribute('data-favicon', 'new');
      document.head.appendChild(appleLink);
    };

    // Función para forzar actualización del navegador
    const forceBrowserUpdate = () => {
      // Forzar actualización del favicon en el navegador
      const links = document.querySelectorAll('link[data-favicon="new"]');
      links.forEach(link => {
        if (link instanceof HTMLLinkElement) {
          // Cambiar href temporalmente para forzar actualización
          const originalHref = link.href;
          link.href = originalHref + '&force=' + Date.now();
          setTimeout(() => {
            link.href = originalHref;
          }, 10);
        }
      });
    };

    // Función para limpieza completa
    const completeCleanup = () => {
      // Limpieza inmediata
      definitiveCleanup();
      
      // Crear nuevo favicon
      createNewFavicon();
      
      // Forzar actualización del navegador
      forceBrowserUpdate();
    };

    // Ejecutar limpieza completa INMEDIATAMENTE
    completeCleanup();
    
    // Limpieza adicional con delays progresivos para asegurar
    const aggressiveDelays = [5, 10, 25, 50, 100, 200, 500, 1000, 2000];
    
    aggressiveDelays.forEach(delay => {
      setTimeout(() => {
        completeCleanup();
      }, delay);
    });

    // Limpieza en eventos del navegador
    const events = ['DOMContentLoaded', 'load', 'focus', 'visibilitychange'];
    events.forEach(event => {
      window.addEventListener(event, completeCleanup, { once: true });
    });

    // Cleanup final
    return () => {
      definitiveCleanup();
    };
  }, []);

  return null;
}
