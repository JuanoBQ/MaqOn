import { motion } from 'framer-motion'

export function ProductSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
    >
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-200 animate-pulse"></div>
      
      {/* Content Skeleton */}
      <div className="p-5">
        {/* Category Badge */}
        <div className="mb-3">
          <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        
        {/* Title */}
        <div className="mb-3">
          <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        {/* Description */}
        <div className="mb-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-16 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </motion.div>
  )
}

export function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  )
}
