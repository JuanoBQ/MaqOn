'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

interface IndustrySlide {
  id: string
  name: string
  tagline: string
  description: string
  image: string
  ctaText: string
  ctaLink: string
  accentColor: string
}

const industrySlides: IndustrySlide[] = [
  {
    id: 'importacion',
    name: 'Importación a Colombia',
    tagline: 'Conectando Colombia con el mundo',
    description: 'Especialistas en importación de maquinaria y equipos industriales de alta calidad. Facilitamos el acceso a tecnología de vanguardia para impulsar tu industria.',
    image: '/images/industries/construction.jpg',
    ctaText: 'Conocer Nuestros Servicios',
    ctaLink: '/servicios',
    accentColor: '#f7b34b'
  },
  {
    id: 'construccion',
    name: 'Construcción',
    tagline: 'Construyendo el futuro de Colombia',
    description: 'Importamos equipos de construcción de última generación: excavadoras, grúas, hormigoneras y maquinaria pesada para proyectos civiles e industriales.',
    image: '/images/industries/construction.jpg',
    ctaText: 'Ver Equipos de Construcción',
    ctaLink: '/productos/construccion',
    accentColor: '#007AFF'
  },
  {
    id: 'agro',
    name: 'Sector Agroindustrial',
    tagline: 'Potenciando el campo colombiano',
    description: 'Tecnología agrícola importada: tractores, sistemas de riego, procesadoras y equipos agroindustriales para modernizar la agricultura colombiana.',
    image: '/images/industries/agro.jpg',
    ctaText: 'Explorar Equipos Agrícolas',
    ctaLink: '/productos/agro',
    accentColor: '#34C759'
  }
]

// Variantes de animación estilo Apple
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
}

const textVariants = {
  hidden: { 
    opacity: 0, 
    y: 30
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

export function IndustrialSlidesBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Debug: Log cuando el componente se monta
  useEffect(() => {
    console.log('🍎 Apple-Style Banner montado correctamente')
    console.log('📊 Total de slides:', industrySlides.length)
    console.log('🖼️ Imágenes a cargar:', industrySlides.map(s => s.image))
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentSlide((prev) => (prev + 1) % industrySlides.length)
    }, 8000) // Change slide every 8 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    const newDirection = index > currentSlide ? 1 : -1
    setDirection(newDirection)
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 15000)
  }

  const goToPrevious = () => {
    const newIndex = currentSlide === 0 ? industrySlides.length - 1 : currentSlide - 1
    goToSlide(newIndex)
  }

  const goToNext = () => {
    const newIndex = (currentSlide + 1) % industrySlides.length
    goToSlide(newIndex)
  }

  const currentIndustry = industrySlides[currentSlide]

  return (
    <div className="relative w-full h-screen bg-black group">
      
      {/* Main Hero Section - Apple Style */}
      <div className="relative w-full h-screen overflow-hidden">
        
        {/* Background Video - Naviera (Fijo y Estático) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          style={{ objectPosition: 'center' }}
        >
          <source src="/videos/naviera-shipping.mp4" type="video/mp4" />
        </video>
        
        {/* Background Image Container */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 w-full h-full"
          >

            
            {/* Gradient Overlay - Apple Style */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
            
            {/* Content Container - Apple Style Layout with Company Description */}
            <div className="relative h-full flex flex-col lg:flex-row items-center px-8 sm:px-12 lg:px-16">
              
              {/* Company Description - Left Side */}
              <div className="w-full lg:w-2/5 lg:pr-12 space-y-6 mb-8 lg:mb-0 text-center lg:text-left lg:ml-16">
                <motion.div
                  key={`company-${currentSlide}`}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                  className="space-y-4 bg-black/70 backdrop-blur-lg rounded-2xl p-6 lg:p-8 shadow-2xl border border-white/20"
                >
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-white leading-tight">
                    Importación de maquinaria industrial a Colombia
                  </h2>
                  <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-white/90 leading-relaxed font-light">
                    Conectamos a las empresas colombianas con la mejor tecnología industrial del mundo. 
                    Facilitamos la importación de maquinaria y equipos para impulsar tu negocio.
                  </p>
                  <div className="pt-4 space-y-3">
                    <div className="flex items-center justify-center lg:justify-start space-x-2 text-white text-sm sm:text-base">
                      <div className="w-2 h-2 bg-[#f7b34b] rounded-full flex-shrink-0"></div>
                      <span>Importación directa desde fabricantes</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start space-x-2 text-white text-sm sm:text-base">
                      <div className="w-2 h-2 bg-[#f7b34b] rounded-full flex-shrink-0"></div>
                      <span>Gestión completa de trámites aduaneros</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start space-x-2 text-white text-sm sm:text-base">
                      <div className="w-2 h-2 bg-[#f7b34b] rounded-full flex-shrink-0"></div>
                      <span>Entrega en toda Colombia</span>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Main Content - Right Side */}
              <div className="w-full lg:w-3/5 text-center space-y-8 lg:pl-12">
                
                                 {/* Tagline - Apple Style */}
                 <motion.div
                   key={`tagline-${currentSlide}`}
                   variants={textVariants}
                   initial="hidden"
                   animate="visible"
                   className="mb-4"
                 >
                   <p 
                     className="text-lg sm:text-xl lg:text-2xl font-medium text-white tracking-wide uppercase"
                     style={{ color: currentIndustry.accentColor }}
                   >
                     {currentIndustry.tagline}
                   </p>
                 </motion.div>
                 
                 {/* Industry Name - Apple Style */}
                 <motion.h1
                   key={`title-${currentSlide}`}
                   variants={textVariants}
                   initial="hidden"
                   animate="visible"
                   transition={{ delay: 0.2 }}
                   className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-none tracking-tight"
                 >
                   {currentIndustry.name}
                 </motion.h1>
                 
                 {/* Description - Apple Style */}
                 <motion.p
                   key={`desc-${currentSlide}`}
                   variants={textVariants}
                   initial="hidden"
                   animate="visible"
                   transition={{ delay: 0.4 }}
                   className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white max-w-3xl mx-auto leading-relaxed font-light"
                 >
                   {currentIndustry.description}
                 </motion.p>
                
                {/* CTA Button - Apple Style */}
                <motion.div
                  key={`button-${currentSlide}`}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.6 }}
                  className="mt-12"
                >
                  <Link 
                    href={currentIndustry.ctaLink}
                    className="group inline-flex items-center px-8 py-4 bg-white text-black font-medium text-lg rounded-full transition-all duration-300 hover:bg-white/90 hover:scale-105"
                  >
                    <span className="mr-2">{currentIndustry.ctaText}</span>
                    <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows - Apple Style */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full transition-all duration-300 hover:scale-110 z-10 group"
          aria-label="Slide anterior"
        >
          <ChevronLeftIcon className="w-6 h-6 mx-auto group-hover:-translate-x-0.5 transition-transform duration-300" />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full transition-all duration-300 hover:scale-110 z-10 group"
          aria-label="Slide siguiente"
        >
          <ChevronRightIcon className="w-6 h-6 mx-auto group-hover:translate-x-0.5 transition-transform duration-300" />
        </button>

        {/* Slide Indicators - Apple Style */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {industrySlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      </div>



      {/* Auto-play Status - Apple Style */}
      <div className="absolute top-8 right-8">
        <div className="inline-flex items-center space-x-2 text-sm text-white/60 bg-black/20 backdrop-blur-sm px-3 py-2 rounded-full">
          <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-white' : 'bg-white/40'}`}></div>
          <span className="font-medium">{isAutoPlaying ? 'Auto-play' : 'Pausado'}</span>
        </div>
      </div>
    </div>
  )
}
