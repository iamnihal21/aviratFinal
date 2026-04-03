'use client'

import { motion, type Variants } from 'framer-motion'
import { useScrollAnimation } from '@/app/(frontend)/hooks/use-scroll-animation'
import { Sparkles } from 'lucide-react'

interface MessageSectionProps {
  sanskritQuote?: string
  quoteTranslation?: string
}

export function MessageSection({ sanskritQuote, quoteTranslation }: MessageSectionProps) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.2, triggerOnce: true })

  // Split text for staggered reveal
  const words = sanskritQuote?.split(" ") || []
 const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  }

  // ✅ FIX: Cast transition properly (NO UI CHANGE)
  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "circOut" as any }
    },
  }

  return (
    <section ref={ref} className="relative py-32 bg-secondary/20 overflow-hidden">
      {/* 1. Background Sacred Geometry (Animated SVG) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <motion.svg
          width="800"
          height="800"
          viewBox="0 0 200 200"
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M100 10 L110 90 L190 100 L110 110 L100 190 L90 110 L10 100 L90 90 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </motion.svg>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-8"
        >
          <Sparkles className="w-5 h-5 text-primary animate-bounce" />
        </motion.div>

        {/* 2. Staggered Sanskrit Reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={childVariants}
                className="text-3xl md:text-5xl lg:text-6xl font-serif text-gray-900 tracking-tight"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* 3. Translation with Elegant Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-[1px] bg-primary/30 mb-6" />
          <p className="text-lg md:text-xl text-gray-500 italic max-w-2xl font-light leading-relaxed">
            {quoteTranslation}
          </p>
        </motion.div>
      </div>
    </section>
  )
}