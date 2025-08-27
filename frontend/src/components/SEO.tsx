import { NextSeo, NextSeoProps } from 'next-seo';

interface SEOProps extends NextSeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    images?: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
}

export function SEO({
  title = 'MaqOn - Productos Industriales por Cotización',
  description = 'Descubre nuestra selección de productos industriales de alta calidad. Solicita tu cotización personalizada y obtén la mejor solución para tus necesidades.',
  canonical,
  openGraph,
  ...props
}: SEOProps) {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={canonical || siteUrl}
      openGraph={{
        title: openGraph?.title || title,
        description: openGraph?.description || description,
        url: openGraph?.url || canonical || siteUrl,
        siteName: 'MaqOn',
        images: openGraph?.images || [
          {
            url: `${siteUrl}/og-image.jpg`,
            width: 1200,
            height: 630,
            alt: 'MaqOn - Productos Industriales',
          },
        ],
        locale: 'es_ES',
        type: 'website',
      }}
      twitter={{
        handle: '@maqon',
        site: '@maqon',
        cardType: 'summary_large_image',
      }}
      additionalMetaTags={[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        },
        {
          name: 'theme-color',
          content: '#2563eb',
        },
        {
          name: 'msapplication-TileColor',
          content: '#2563eb',
        },
      ]}
      {...props}
    />
  );
}
