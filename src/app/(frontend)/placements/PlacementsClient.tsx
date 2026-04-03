'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { Card, CardContent } from '@/app/(frontend)/components/ui/card'
import {
  Briefcase,
  TrendingUp,
  DollarSign,
  Building2,
  MapPin,
  Award,
  Sparkles,
  ChevronRight,
} from 'lucide-react'
import { useScrollAnimation } from '@/app/(frontend)/hooks/use-scroll-animation'

export default function PlacementsClient({
  settings,
  recruiters,
}: {
  settings: any
  recruiters: any[]
}) {
  const { ref: headerRef } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const { ref: statsRef, isInView: statsInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  })
  const { ref: recruitersRef, isInView: recruitersInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  })
  const { ref: heroRef } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const getIcon = (type: string) => {
    const icons: any = {
      trending: TrendingUp,
      dollar: DollarSign,
      award: Award,
      building: Building2,
      briefcase: Briefcase,
      'map-pin': MapPin,
    }
    return icons[type] || Award
  }

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  }

  return (
    <main className="min-h-screen bg-white text-gray-950 ">
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
              <Briefcase className="w-4 h-4 text-primary animate-bounce" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Career Excellence
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85]"
            >
              Launching <br />
              <span className="text-primary italic">Champions.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-500 leading-relaxed mb-12 max-w-2xl mx-auto font-medium"
            >
              A testament to the relentless pursuit of greatness by our institution and students
              across every domain.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Floating Cards */}
      <section ref={statsRef} className="relative -mt-16 z-10 mb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={statsInView ? 'visible' : 'hidden'}
            variants={staggerChildren}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {settings?.stats?.map((stat: any, i: number) => {
              const Icon = getIcon(stat.iconType)
              return (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="bg-white/80 backdrop-blur-xl border-none shadow-2xl rounded-[2.5rem] group hover:bg-white transition-all duration-500">
                    <CardContent className="p-10 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="text-4xl font-black tracking-tighter mb-1">{stat.value}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Highlights Section - High Contrast */}
      <section className="py-32 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
              Placement <span className="text-secondary italic">Metrics.</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {settings?.highlights?.map((item: any, index: number) => {
              const Icon = getIcon(item.iconType)
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden group hover:bg-white/10 hover:border-primary/50 transition-all duration-500 h-full">
                    <div className={`h-1.5 bg-gradient-to-r ${item.colorTheme}`} />
                    <CardContent className="p-10">
                      <div className="flex justify-between items-start mb-8">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                          <Icon className="h-8 w-8 text-secondary" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 italic">
                          #{index + 1}
                        </span>
                      </div>
                      <div className="text-5xl font-black text-white tracking-tighter mb-4">
                        {item.count}
                      </div>
                      <h3 className="text-xl font-black text-white mb-4 group-hover:text-secondary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Top Recruiters - Minimalist Bento Grid */}
      <section ref={recruitersRef} className="py-32 bg-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                Industry Partners
              </h2>
              <p className="text-gray-500 font-medium">
                Top-tier organizations where our alumni are making an impact today.
              </p>
            </div>
          </div>

          <motion.div
            initial="hidden"
            animate={recruitersInView ? 'visible' : 'hidden'}
            variants={staggerChildren}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            {recruiters.map((recruiter, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="bg-gray-50 border-transparent rounded-[2.5rem] hover:bg-secondary/5 hover:shadow-3xl hover:shadow-primary/5 transition-all duration-500 group border-2 hover:border-primary/10 h-full">
                  <CardContent className="p-8 text-center flex flex-col items-center justify-center min-h-[220px]">
                    <div className="h-20 w-20 mx-auto mb-6 bg-white rounded-[1.5rem] flex items-center justify-center group-hover:shadow-lg transition-all duration-500 overflow-hidden border border-text-secondary p-2">
                      {/* Check if logo exists AND has a URL */}
                      {recruiter.logo &&
                      typeof recruiter.logo === 'object' &&
                      recruiter.logo.url ? (
                        <Image
                          src={recruiter.logo.url}
                          alt={recruiter.name}
                          width={60}
                          height={60}
                          className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                          unoptimized // Use this if Supabase URLs are causing Next.js loader issues
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <Building2 className="w-6 h-6 text-primary mb-1" />
                          <span className="text-[10px] font-black text-primary uppercase">
                            {recruiter.name?.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm font-black tracking-tight mb-2 group-hover:text-primary transition-colors">
                      {recruiter.name}
                    </h3>
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                      {recruiter.industry}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
