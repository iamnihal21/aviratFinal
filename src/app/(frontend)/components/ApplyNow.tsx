'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/app/(frontend)/components/ui/button'
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { useScrollAnimation } from '@/app/(frontend)/hooks/use-scroll-animation'

export function ApplyNow() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })

  const benefits = [
    "Industry-Led Curriculum",
    "100% Placement Support",
    "Modern Tech Stack Labs"
  ]

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative group">
          
          {/* 1. Animated Background Mesh */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative bg-gray-900 rounded-[3rem] p-12 md:p-20 overflow-hidden">
            
            {/* 2. Radial Spotlight Effect */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary-foreground/80 mb-8">
                  <Sparkles className="w-4 h-4 text-gray-200 animate-bounce" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white">Admissions Open 2026</span>
                </div>

                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-[1.1]">
                  Your Future <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Starts Here.</span>
                </h2>

                <div className="space-y-4 mb-10">
                  {benefits.map((benefit, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                      className="flex items-center gap-3 text-gray-400"
                    >
                      <CheckCircle2 className="w-5 h-5 text-gray-400" />
                      <span className="text-sm font-medium">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right Action Area */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col items-center lg:items-end"
              >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] w-full max-w-md text-center lg:text-left">
                  <p className="text-white/60 text-lg mb-8">
                    Join a community of innovators, leaders, and creators at Avirat College.
                  </p>
                  
                  <Button
                    size="lg"
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-white py-8 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all group"
                  >
                    <Link href="/admissions" className="flex items-center justify-center gap-3">
                      Begin Application
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  
                  <p className="mt-6 text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] text-center">
                    Estimated Time: 5 Minutes
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}