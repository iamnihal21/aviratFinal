
'use client'

import Image from 'next/image'
import { motion,type Variants } from 'framer-motion'
import { Button } from '@/app/(frontend)/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/(frontend)/components/ui/card'
import {
  ArrowRight, BookOpen, Cpu, Heart, Leaf, Rocket, Zap, Globe2, Microscope, 
  ExternalLink, GraduationCap, Sparkles, Beaker
} from 'lucide-react'
import { useScrollAnimation } from '@/app/(frontend)/hooks/use-scroll-animation'

export default function ResearchClient({ areas, faculty, publications }: any) {
  const { ref: headerRef } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const { ref: heroRef } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  
  const getIcon = (type: string) => {
    const icons: any = { 
      cpu: Cpu, heart: Heart, leaf: Leaf, rocket: Rocket, zap: Zap, globe: Globe2 
    }
    return icons[type] || Microscope
  }

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  }

   const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  }
  
  const stagger = { 
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } } 
  }

  return (
    <main className="min-h-screen bg-white text-gray-950">
      {/* Premium Hero Section */}
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
              <Beaker className="w-4 h-4 text-primary animate-bounce" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Innovation Lab 2026
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85]"
            >
              Architects of <br />
              <span className="text-primary italic">Tomorrow.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-500 leading-relaxed mb-12 max-w-2xl mx-auto font-medium"
            >
              Driving data-driven research and scalable systems in Computer Engineering to solve real-world challenges.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Research Areas - Bento Grid Style */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Core Specializations</h2>
              <p className="text-gray-500 font-medium">Focused research that defines the future of technology and society.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {areas.map((area: any, i: number) => {
              const Icon = getIcon(area.iconType)
              return (
                <motion.div 
                  key={area.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="group h-full bg-white border-2 border-gray-50 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-[3rem] overflow-hidden flex flex-col">
                    <div className={`h-1.5 bg-gradient-to-r ${area.colorTheme}`} />
                    <CardHeader className="p-10 flex-grow">
                      <div className={`w-16 h-16 rounded-[1.5rem] bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-2xl font-black tracking-tight mb-4">{area.title}</CardTitle>
                      <CardDescription className="text-gray-500 font-medium text-base leading-relaxed">
                        {area.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-10 pt-0">
                      <Button variant="ghost" className="p-0 font-black uppercase tracking-widest text-[10px] text-primary hover:bg-transparent group/link">
                        Explore Domain <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}