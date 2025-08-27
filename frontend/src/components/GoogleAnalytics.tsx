'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

interface GoogleAnalyticsProps {
  measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Cargar Google Analytics
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    // Inicializar gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    });

    return () => {
      document.head.removeChild(script);
    };
  }, [measurementId]);

  useEffect(() => {
    // Track page views cuando cambia la ruta
    if (window.gtag) {
      window.gtag('config', measurementId, {
        page_path: pathname + searchParams.toString(),
        page_title: document.title,
      });
    }
  }, [pathname, searchParams, measurementId]);

  return null;
}

// Hook para tracking de eventos personalizados
export function useAnalytics() {
  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  const trackPageView = (title: string, path: string) => {
    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_title: title,
        page_path: path,
      });
    }
  };

  const trackConversion = (conversionId: string, conversionLabel: string) => {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: `${conversionId}/${conversionLabel}`,
      });
    }
  };

  const trackFormSubmission = (formName: string, formType: 'contact' | 'quote' | 'newsletter') => {
    trackEvent('form_submit', 'engagement', formName, 1);
    
    // Track específico por tipo de formulario
    if (window.gtag) {
      window.gtag('event', 'form_submit', {
        event_category: 'engagement',
        event_label: `${formType}_form`,
        custom_parameter: formName,
      });
    }
  };

  const trackProductView = (productId: string, productName: string, category: string) => {
    trackEvent('view_item', 'ecommerce', productName, 1);
    
    if (window.gtag) {
      window.gtag('event', 'view_item', {
        event_category: 'ecommerce',
        event_label: productName,
        custom_parameter: {
          product_id: productId,
          product_category: category,
        },
      });
    }
  };

  const trackQuoteRequest = (productId?: string, productName?: string) => {
    trackEvent('quote_request', 'ecommerce', productName || 'general', 1);
    
    if (window.gtag) {
      window.gtag('event', 'quote_request', {
        event_category: 'ecommerce',
        event_label: productName || 'general_quote',
        custom_parameter: {
          product_id: productId,
          product_name: productName,
        },
      });
    }
  };

  return {
    trackEvent,
    trackPageView,
    trackConversion,
    trackFormSubmission,
    trackProductView,
    trackQuoteRequest,
  };
}
