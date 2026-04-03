'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import Image from 'next/image'

interface HeroProps {
  data?: any[]
}

export function Hero({ data }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const slides = data || []

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const moveX = (clientX - window.innerWidth / 2) / 50
    const moveY = (clientY - window.innerHeight / 2) / 50
    setMousePosition({ x: moveX, y: moveY })
  }

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setDirection(1)
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  const handleSlideChange = (index: number) => {
    setDirection(index > activeSlide ? 1 : -1)
    setActiveSlide(index)
  }

  // ✅ FIXED TYPES
  const slideVariants: Variants = {
    enter: () => ({
      scale: 1.2,
      opacity: 0,
      filter: 'blur(10px)',
    }),
    center: {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number], // ✅ FIX
      },
    },
    exit: () => ({
      scale: 0.9,
      opacity: 0,
      filter: 'blur(10px)',
      transition: { duration: 0.8 },
    }),
  }

  const contentVariants: Variants = {
    initial: { opacity: 0, y: 40, rotateX: 20 },
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring' as const, // ✅ FIX
        stiffness: 100,
        damping: 20,
        delay: 0.4,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  }

  if (!slides.length) return null

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden bg-[#050505] perspective-1000"
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={activeSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              x: -mousePosition.x,
              y: -mousePosition.y,
              scale: 1.05,
            }}
            transition={{ type: 'tween', ease: 'linear', duration: 0.2 }}
          >
            {slides[activeSlide]?.image?.url && (
              <Image
                src={slides[activeSlide].image.url}
                alt={slides[activeSlide].title || 'Hero Slide'}
                fill
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
          </motion.div>

          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full flex items-center justify-center z-10">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeSlide}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center"
            >
              <motion.span
                initial={{ opacity: 0, letterSpacing: '0.5em' }}
                animate={{ opacity: 1, letterSpacing: '0.2em' }}
                className="text-white font-bold text-xs md:text-sm uppercase mb-4 block"
              >
                {slides[activeSlide].highlight}
              </motion.span>

              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter mb-6">
                {slides[activeSlide].title}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r to-primary from-accent">
                  {slides[activeSlide].subtitle}
                </span>
              </h1>

              <p className="max-w-xl mx-auto text-base md:text-lg text-gray-200 font-medium leading-relaxed mb-10">
                {slides[activeSlide].description}
              </p>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-12 right-12 z-20 flex flex-col gap-4">
        {slides.map((_, index) => (
          <button key={index} onClick={() => handleSlideChange(index)} className="flex items-center gap-4 group">
            <span className={`text-[10px] font-bold ${index === activeSlide ? 'text-primary' : 'text-white/20'}`}>
              0{index + 1}
            </span>
            <div className={`h-[2px] ${index === activeSlide ? 'w-12 bg-primary' : 'w-4 bg-white/20'}`} />
          </button>
        ))}
      </div>
    </section>
  )
}