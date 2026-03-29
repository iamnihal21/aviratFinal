'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/app/(frontend)/components/ui/card'
import { Quote, User, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react'

interface TestimonialsProps {
  data?: any[]
}

export function Testimonials({ data }: TestimonialsProps) {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const testimonials = data || []

  // 1. Auto-play Logic
  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [isPaused, next, testimonials.length])

  if (testimonials.length === 0) return null

  return (
    <section className="py-24 bg-secondary/20 relative overflow-hidden">
      {/* Background Decorative Quote */}
      <div className="absolute top-10 right-10 text-slate-50 pointer-events-none">
        <MessageSquareQuote size={400} strokeWidth={0.5} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
              Success Stories
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6">
              What our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                community says.
              </span>
            </h2>
            <p className="text-gray-500 text-lg max-w-md mb-10 leading-relaxed">
              Real feedback from students who transformed their careers through our industry-aligned curriculum.
            </p>

            {/* Custom Navigation Controls */}
            <div className="flex gap-4">
              <button 
                onClick={prev}
                className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={next}
                className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>

          {/* Right Side: The Animated Card Stack */}
          <div 
            className="relative h-[450px] flex items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.9, x: 50, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -50, rotate: -5 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="w-full max-w-[500px] z-20"
              >
                <Card className="border-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-[3rem] bg-white overflow-hidden">
                  <CardContent className="p-10 md:p-14 relative">
                    <Quote className="absolute top-10 right-10 w-16 h-16 text-primary/5 -scale-x-100" />
                    
                    <div className="relative z-10">
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="w-4 h-4 bg-yellow-400 rounded-full scale-75" 
                          />
                        ))}
                      </div>

                      <blockquote className="text-xl md:text-2xl font-medium text-gray-800 leading-snug mb-10 italic">
                        {testimonials[active].quote}
                      </blockquote>

                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center border border-gray-100">
                          <User className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <p className="font-black text-gray-900 text-lg uppercase tracking-tight">
                            {testimonials[active].name}
                          </p>
                          <p className="text-sm font-bold text-primary uppercase tracking-widest">
                            {testimonials[active].role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Decorative Static Cards for "Stack" effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[460px] h-[380px] bg-slate-50 border border-gray-100 rounded-[3rem] translate-x-6 translate-y-6 -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] h-[340px] bg-slate-100/50 border border-gray-100 rounded-[3rem] translate-x-12 translate-y-12 -z-20" />
          </div>
        </div>
      </div>
    </section>
  )
}