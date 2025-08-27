'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'shimmer';
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) {
  const baseClasses = 'bg-secondary-200 dark:bg-secondary-700';
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse',
    shimmer: 'animate-pulse bg-gradient-to-r from-secondary-200 via-secondary-300 to-secondary-200 dark:from-secondary-700 dark:via-secondary-600 dark:to-secondary-700',
  };

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    animationClasses[animation],
    className
  );

  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <motion.div
      className={classes}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
}

// Skeleton components for common use cases
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <Skeleton className="h-48 w-full" variant="rounded" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" variant="text" />
        <Skeleton className="h-4 w-full" variant="text" />
        <Skeleton className="h-4 w-2/3" variant="text" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-24" variant="rounded" />
          <Skeleton className="h-10 w-32" variant="rounded" />
        </div>
      </div>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <Skeleton className="h-48 w-full" variant="rounded" />
      <div className="p-6 space-y-4">
        <div className="flex space-x-4">
          <Skeleton className="h-4 w-20" variant="text" />
          <Skeleton className="h-4 w-16" variant="text" />
        </div>
        <Skeleton className="h-6 w-full" variant="text" />
        <Skeleton className="h-4 w-3/4" variant="text" />
        <Skeleton className="h-4 w-1/2" variant="text" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-24" variant="text" />
          <Skeleton className="h-8 w-20" variant="rounded" />
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#030303] via-secondary-800 to-[#030303]">
      <div className="container-custom text-center space-y-8">
        <Skeleton className="h-16 w-3/4 mx-auto" variant="text" />
        <Skeleton className="h-6 w-2/3 mx-auto" variant="text" />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Skeleton className="h-12 w-48" variant="rounded" />
          <Skeleton className="h-12 w-48" variant="rounded" />
        </div>
      </div>
    </div>
  );
}
