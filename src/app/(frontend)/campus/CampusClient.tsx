'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Button } from '@/app/(frontend)/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/(frontend)/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/(frontend)/components/ui/tabs'
import {
  ArrowRight,
  Building2,
  Coffee,
  Dumbbell,
  Home,
  Library,
  Music,
  Palette,
  Users,
  Utensils,
  Sparkles,
  Heart,
  Calendar,
  Clock,
  Star,
  Wifi,
  Shield,
  Wind,
  Plus,
  MapPin
} from 'lucide-react'
import { useScrollAnimation } from '@/app/(frontend)/hooks/use-scroll-animation'

export default function CampusClient({ settings, gallery }: { settings: any; gallery: any[] }) {
  const [activeTab, setActiveTab] = useState(settings?.facilities?.[0]?.category || 'Academic')
  const { ref: heroRef } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const { ref: statsRef, isInView: statsInView } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const { ref: galleryRef, isInView: galleryInView } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const { ref: amenitiesRef, isInView: amenitiesInView } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })

  const getIcon = (type: string) => {
    const icons: any = {
      users: Users, dumbbell: Dumbbell, heart: Heart, palette: Palette,
      library: Library, building: Building2, home: Home, utensils: Utensils,
      coffee: Coffee, music: Music, wifi: Wifi, shield: Shield,
      wind: Wind, calendar: Calendar, clock: Clock, star: Star,
    }
    return icons[type] || Building2
  }

  const fadeInUp: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }
  const staggerChildren: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }

  return (
    <main className="min-h-screen bg-white text-gray-950">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-gradient-to-b from-background to-secondary/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
          <motion.div ref={heroRef} initial="hidden" animate="visible" variants={staggerChildren} className="max-w-4xl">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-8 border border-gray-200 shadow-sm">
              <Sparkles className="w-4 h-4 text-primary animate-bounce" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Experience Campus Life at Avirat</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85]">
              Where Life<br />
              <span className="text-primary italic">Happens.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl text-gray-500 leading-relaxed mb-12 max-w-2xl mx-auto font-medium">
              Step into a dynamic ecosystem designed for more than just studying. A space built for collaboration, wellness, and lifelong memories.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Modern Stats Bar */}
      <section className="relative -mt-12 z-10 mb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            ref={statsRef}
            initial="hidden"
            animate={statsInView ? 'visible' : 'hidden'}
            variants={staggerChildren}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {settings?.stats?.map((stat: any, i: number) => {
              const Icon = getIcon(stat.iconType)
              return (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="bg-white border-gray-100 shadow-2xl rounded-[2.5rem] overflow-hidden group hover:border-primary/20 transition-all duration-500">
                    <CardContent className="p-10 text-center relative">
                       <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:scale-150 transition-transform duration-700">
                        <Icon className="w-24 h-24" />
                      </div>
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-50 mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="text-4xl font-black tracking-tighter mb-1">{stat.count}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Bento Photo Gallery */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Campus Canvas</h2>
              <p className="text-gray-500 font-medium">Glances of daily life across our silent-zone campus.</p>
            </div>
            <Button variant="ghost" asChild className="rounded-full px-8 py-6 bg-gray-100 font-black uppercase tracking-widest text-[10px] hover:bg-primary hover:text-white transition-all">
              <Link href="/gallery" className="flex items-center">
                Explore All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <motion.div
            ref={galleryRef}
            initial="hidden"
            animate={galleryInView ? 'visible' : 'hidden'}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]"
          >
            {gallery?.slice(0, 5).map((img, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className={`relative group overflow-hidden rounded-[2.5rem] ${img.span || 'md:col-span-1'}`}
              >
                <Image
                  src={img.image.url}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-black text-xl uppercase tracking-tighter">{img.alt}</p>
                    <div className="w-8 h-1 bg-primary mt-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Amenities Marquee / High Contrast Section */}
      <section className="py-32 bg-gray-950 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-20"
          >
            Essential <span className="text-secondary italic">Comforts.</span>
          </motion.h2>

          <motion.div
            ref={amenitiesRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {settings?.amenities?.map((amenity: any, i: number) => {
              const Icon = getIcon(amenity.iconType)
              return (
                <motion.div key={i} variants={fadeInUp}>
                  <div className="group p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-secondary/50 transition-all duration-500 h-full flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="text-white font-black uppercase tracking-widest text-[10px] mb-2">{amenity.label}</div>
                    <div className="text-gray-500 text-[10px] font-medium leading-tight">{amenity.description}</div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Facilities Tabs (Glassmorphism Style) */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Spaces of Excellence</h2>
            <p className="text-gray-500 font-medium max-w-xl mx-auto">Purpose-built environments for modern learners.</p>
          </div>

          <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-16">
              <TabsList className="inline-flex h-16 items-center justify-center rounded-[2rem] bg-gray-200/50 p-2 text-gray-500">
                {settings?.facilities?.map((cat: any) => (
                  <TabsTrigger 
                    key={cat.category} 
                    value={cat.category}
                    className="rounded-[1.5rem] px-8 py-3 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-xl transition-all"
                  >
                    {cat.category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <AnimatePresence mode="wait">
              {settings?.facilities?.map((cat: any) => (
                <TabsContent key={cat.category} value={cat.category}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5 }}
                    className="grid md:grid-cols-3 gap-8"
                  >
                    {cat.items.map((item: any, i: number) => {
                      const Icon = getIcon(item.iconType)
                      return (
                        <Card
                          key={i}
                          className="bg-secondary/10 border-2 border-transparent hover:border-secondary/20 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[3rem] p-4 overflow-hidden"
                        >
                          <CardHeader className="p-8">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center mb-6">
                              <Icon className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle className="text-2xl font-black tracking-tight leading-tight">{item.name}</CardTitle>
                            <CardDescription className="text-base text-gray-500 font-medium py-2">{item.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="px-8 pb-8">
                            <ul className="space-y-3">
                              {item.features?.map((f: any, idx: number) => (
                                <li
                                  key={idx}
                                  className="flex items-center gap-3 text-xs font-bold text-gray-700"
                                >
                                  <div className="w-2 h-2 rounded-full bg-primary/20 border-2 border-primary" />
                                  {f.feature}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </div>
      </section>

      {/* Campus Map CTA */}
    </main>
  )
}