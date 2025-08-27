'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'primary',
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const colorClasses = {
    primary: 'text-primary-500',
    white: 'text-white',
    gray: 'text-secondary-600',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}
        style={{
          border: '2px solid currentColor',
          borderTop: '2px solid transparent',
          borderRadius: '50%',
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

// Componente de loading para páginas completas
export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50">
      <div className="text-center">
        <LoadingSpinner size="xl" color="primary" />
        <p className="mt-4 text-secondary-600 text-lg">Cargando...</p>
      </div>
    </div>
  );
}

// Componente de loading para secciones
export function SectionLoader() {
  return (
    <div className="py-16 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" color="primary" />
        <p className="mt-3 text-secondary-600">Cargando contenido...</p>
      </div>
    </div>
  );
}
