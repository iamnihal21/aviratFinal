'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, animate, type Variants } from 'framer-motion'
import { Card, CardContent } from '@/app/(frontend)/components/ui/card'
import { BookOpen, Users, Briefcase, GraduationCap, Globe, Award } from 'lucide-react'

interface StatsProps {
  data?: any[]
}

// 1. Icon mapping for CMS data
const iconMap: Record<string, any> = {
  Courses: BookOpen,
  Students: Users,
  Placements: Briefcase,
  Awards: Award,
  Global: Globe
}

// 2. Animated Counter Component
function Counter({ value, suffix = "" }: { value: string, suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, numericValue, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1] as const, // ✅ FIX
        onUpdate: (latest) => setDisplayValue(Math.floor(latest))
      })
      return () => controls.stop()
    }
  }, [isInView, numericValue])

  return <span ref={ref}>{displayValue}{suffix || value.replace(/[0-9]/g, '')}</span>
}

export function Stats({ data }: StatsProps) {
  const stats = data || []

  // ✅ FIX: Explicit Variants typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring" as const, // ✅ FIX
        stiffness: 100, 
        damping: 15 
      }
    }
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-40">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = iconMap[stat.label] || GraduationCap
            
            return (
              <motion.div key={index} variants={cardVariants}>
                <Card className="group relative bg-white border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 rounded-[2.5rem] overflow-hidden">
                  <CardContent className="p-10 flex flex-col items-center text-center">
                    
                    {/* Floating Icon with Glow */}
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
                      <div className="relative w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-500">
                        <Icon className="h-10 w-10 text-primary" />
                      </div>
                    </div>

                    {/* Stat Number with Counter */}
                    <div className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter mb-2">
                      <Counter value={stat.value} />
                    </div>

                    <div className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">
                      {stat.label}
                    </div>
                    
                    <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
                      {stat.description}
                    </p>

                    {/* Bottom Progress Accent */}
                    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent w-0 group-hover:w-full transition-all duration-700" />
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}