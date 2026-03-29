'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Button } from '@/app/(frontend)/components/ui/button'
import { Card } from '@/app/(frontend)/components/ui/card'
import { X, Camera, Building2, Trophy, PartyPopper, Maximize2, Calendar, LayoutGrid } from 'lucide-react'
import { useScrollAnimation } from '@/app/(frontend)/hooks/use-scroll-animation'

const categories = [
  { id: 'all', label: 'All Archives', icon: LayoutGrid },
  { id: 'infrastructure', label: 'Architecture', icon: Building2 },
  { id: 'events', label: 'Campus Life', icon: PartyPopper },
  { id: 'achievements', label: 'Milestones', icon: Trophy },
]

export default function GalleryClient({ items }: { items: any[] }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<any | null>(null)
  const { ref: headerRef } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const { ref: heroRef } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
    


  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory)

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  }

  return (
    <main className="min-h-screen bg-white text-gray-950">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-gradient-to-b from-background to-secondary/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-4xl"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-8 border border-gray-200 shadow-sm"
            >
              <Trophy className="w-4 h-4 text-primary animate-bounce" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                 Visual Narrative
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85]"
            >
              Capture the <br />
              <span className="text-primary italic">Legacy.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-500 leading-relaxed mb-12 max-w-2xl mx-auto font-medium"
            >
              A curated collection of snapshots defining our journey, from state-of-the-art labs to vibrant campus festivities.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter Categories - Sticky Navigation */}
      <nav className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-y border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-wrap justify-center gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                  isActive 
                  ? 'bg-gray-950 text-white shadow-xl shadow-gray-950/20 scale-105' 
                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : ''}`} />
                {cat.label}
              </button>
            )
          })}
        </div>
      </nav>

      {/* Gallery Grid - Masonry-like feel */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
              variants={staggerChildren}
              className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  onClick={() => setSelectedImage(item)}
                  className="relative break-inside-avoid group cursor-none"
                >
                  <Card className="overflow-hidden border-none rounded-[2.5rem] bg-gray-100 shadow-none hover:shadow-2xl transition-all duration-700">
                    <div className="relative overflow-hidden">
                      <Image
                        src={item.image.url}
                        alt={item.alt}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gray-950/60 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex flex-col justify-end p-10">
                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                           <div className="flex items-center gap-3 mb-4">
                              <span className="px-3 py-1 bg-primary rounded-full text-[8px] font-black uppercase tracking-widest text-white italic">
                                {item.category}
                              </span>
                              <div className="h-px flex-grow bg-white/20" />
                           </div>
                           <h3 className="text-2xl font-black text-white tracking-tight mb-2 leading-none">{item.title}</h3>
                           <div className="flex items-center gap-2 text-white/60 text-[10px] font-bold uppercase tracking-widest">
                              <Calendar className="w-3 h-3" /> {item.date}
                           </div>
                        </div>
                        
                        <div className="absolute top-10 right-10">
                           <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-md">
                              <Maximize2 className="w-5 h-5" />
                           </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox - Dark Room Experience */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/98 backdrop-blur-2xl p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              className="absolute top-10 right-10 z-[110] w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors"
            >
              <X className="h-6 w-6" />
            </motion.button>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative max-w-6xl w-full h-full flex flex-col justify-center" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-grow w-full max-h-[75vh]">
                <Image
                  src={selectedImage.image.url}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain rounded-[2rem]"
                />
              </div>
              
              <div className="mt-12 text-center max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="h-px w-12 bg-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">{selectedImage.category}</span>
                  <div className="h-px w-12 bg-primary" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">{selectedImage.title}</h2>
                <p className="text-gray-400 text-lg font-medium leading-relaxed italic">{selectedImage.description}</p>
                <div className="mt-8 text-gray-600 text-[10px] font-black uppercase tracking-widest">
                  Archived on {selectedImage.date}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}