'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { ArrowUpRight, Expand } from 'lucide-react'
import { useScrollAnimation } from '@/app/(frontend)/hooks/use-scroll-animation'

export function HomeGallery({ images }: { images: any[] }) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  
  const displayImages = images?.slice(0, 4) || []

  // ✅ FIXED Variants typing (no animation change)
  const imageReveal: Variants = {
    hidden: { clipPath: "inset(100% 0% 0% 0%)", scale: 1.2 },
    visible: (i: number) => ({
      clipPath: "inset(0% 0% 0% 0%)",
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.19, 1, 0.22, 1] as any,
        delay: i * 0.1,
      }
    })
  }

  return (
    <section ref={ref} className="py-24 bg-secondary/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-3 block">
              Visual Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
              Life at <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Avirat</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            <Link 
              href="/gallery" 
              className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-primary transition-colors"
            >
              Explore Full Gallery
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[800px] md:h-[600px]">
          {displayImages.map((image, index) => (
            <motion.div
              key={image.id}
              custom={index}
              variants={imageReveal}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className={`relative overflow-hidden group rounded-[2rem] bg-gray-100 ${
                index === 0 ? 'md:col-span-2 md:row-span-2' :
                index === 1 ? 'md:col-span-2 md:row-span-1' :
                'md:col-span-1 md:row-span-1'
              }`}
            >
              <Image
                src={image.image.url}
                alt={image.alt || 'Campus Life'}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
              />
              
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}