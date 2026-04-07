
'use client'

import { useState } from 'react'
import { motion , Variants } from 'framer-motion'
import {
  Sparkles,
  Eye,
  Target,
  Users,
  Quote,
  BookOpen,
  GraduationCap,
  Globe,
  Briefcase,
  Award,
  BookOpenCheck,
  Building2,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/(frontend)/components/ui/card'
import { useScrollAnimation } from '@/app/(frontend)/hooks/use-scroll-animation'

export default function AboutClient({ data }: { data: any }) {
  const [activeTrustee, setActiveTrustee] = useState(0)

  // Use DB data with fallbacks
  const hero = data?.hero || { year: '1892', description: 'Discover a legacy of excellence...' }
  const visionMission = data?.visionMission || {
    vision: { title: 'Our Vision', description: '', points: [] },
    mission: { title: 'Our Mission', description: '', points: [] },
  }
  const trustees = data?.trustees || []

  const { ref: heroRef } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const { ref: visionRef, isInView: visionInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  })
  const { ref: trusteesRef, isInView: trusteesInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  })
  const { ref: facultySectionRef, isInView: facultyInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  })
  const { ref: infraSectionRef, isInView: infraInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Animation Variants

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
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
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const cardHover = {
    initial: { y: 0, scale: 1 },
    hover: { y: -8, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20 selection:bg-primary selection:text-white">
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">About Avirat BBA & BCA College</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85]">
              Shaping Futures Since{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent italic">
                {hero.year}
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl text-gray-500 leading-relaxed mb-12 max-w-2xl mx-auto font-medium">
              {hero.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            ref={visionRef}
            initial="hidden"
            animate={visionInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Vision */}
            <motion.div variants={fadeInUp} whileHover="hover" initial="initial">
              <Card className="bg-white border-none shadow-xl h-full transition-shadow hover:shadow-2xl">
                <CardHeader>
                  <motion.div 
                    whileHover={{ rotate: 10 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-0.5 mb-4 shadow-lg shadow-blue-500/20"
                  >
                    <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                      <Eye className="h-8 w-8 text-blue-500" />
                    </div>
                  </motion.div>
                  <CardTitle className="text-3xl font-bold mb-4">Our Vision</CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">
                    {visionMission.vision.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {visionMission.vision.points?.map((p: any, i: number) => (
                      <motion.li 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 text-foreground group"
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" /> 
                        <span className="font-medium">{p.point}</span>
                      </motion.li> 
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mission */}
            <motion.div variants={fadeInUp} whileHover="hover" initial="initial">
              <Card className="bg-white border-none shadow-xl h-full transition-shadow hover:shadow-2xl">
                <CardHeader>
                  <motion.div 
                    whileHover={{ rotate: -10 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 mb-4 shadow-lg shadow-purple-500/20"
                  >
                    <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                      <Target className="h-8 w-8 text-purple-500" />
                    </div>
                  </motion.div>
                  <CardTitle className="text-3xl font-bold mb-4">Our Mission</CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">
                    {visionMission.mission.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {visionMission.mission.points?.map((p: any, i: number) => (
                      <motion.li 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 text-foreground group"
                      >
                        <div className="w-2 h-2 rounded-full bg-purple-500 group-hover:scale-150 transition-transform" /> 
                        <span className="font-medium">{p.point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trustees Section */}
      {trustees?.length > 0 && (
        <section ref={trusteesRef} className="py-24 container mx-auto px-4 space-y-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={trusteesInView ? { opacity: 1, scale: 1 } : {}}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-2">Our Trustees</h2>
            <div className="h-1.5 w-20 bg-primary mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4 text-lg">
              Guiding our institution with wisdom and vision
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-12">
            {trustees.map((trustee: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 md:p-12 rounded-[3.5rem] border flex flex-col md:flex-row gap-10 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all group"
              >
                <div className="relative w-56 h-56 rounded-[2.5rem] overflow-hidden shrink-0 shadow-inner bg-gray-100 ring-4 ring-gray-50 group-hover:ring-primary/10 transition-all">
                  {trustee?.image ? (
                    <img
                      src={typeof trustee.image === 'string' ? trustee.image : (trustee.image?.url || '')}
                      alt={trustee.name || 'Trustee'}
                      className="w-full h-full object-cover transition-all duration-500 scale-105 group-hover:scale-100"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Photo Available
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <h3 className="text-3xl font-black text-gray-900 group-hover:text-primary transition-colors">{trustee.name}</h3>
                    {trustee.title && (
                      <p className="text-primary uppercase text-xs font-black tracking-[0.2em] mt-1">
                        {trustee.title}
                      </p>
                    )}
                    {trustee.message && (
                      <div className="relative">
                        {/* <Quote className="absolute -left-6 top-2 w-10 h-10 text-primary/10 -z-0" /> */}
                        <p className="italic text-slate-600 mt-6 text-xl leading-relaxed relative z-10"><span className="text-slate-400 font-bold uppercase text-[10px] block">Message : </span>{trustee.message}</p>
                      </div>
                    )}
                    <div className=" gap-4 mt-8 pt-8 border-t border-slate-100">
                      {trustee.qualification && (
                        <div className="flex items-center gap-3">
                          <GraduationCap className="w-5 h-5 text-primary" />
                          <p className="text-md"><span className="text-slate-400 font-bold uppercase text-[10px] block">Profile</span>{trustee.qualification}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Faculty and Expertise Section */}
      <section className="py-24 bg-secondary/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={facultySectionRef} className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={facultyInView ? { opacity: 1, y: 0 } : {}}
              className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs mb-4"
            >
              <div className="w-8 h-[2px] bg-primary" />
              <span>Faculty and Expertise</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={facultyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold tracking-tight"
            >
              The Source of <span className="text-primary italic">Insight and Innovation</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={facultyInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", damping: 20 }}
            className="relative bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl border border-primary/5 group"
          >
            <Quote className="absolute top-10 right-10 w-24 h-24 text-primary/5 rotate-12 transition-transform group-hover:rotate-0" />
            <div className="relative z-10 space-y-8 md:text-xl text-muted-foreground leading-relaxed max-w-4xl font-medium">
              <p>
                Our faculty comprises highly qualified and experienced professionals who are
                passionate about teaching and mentoring. They bring a wealth of industry knowledge
                and academic expertise to the classroom.
              </p>
              <div className="flex items-center gap-4 text-foreground bg-primary/5 p-6 rounded-3xl border-l-4 border-primary">
                <Award className="w-8 h-8 text-primary shrink-0" />
                <p>We are committed to providing personalized attention and guidance to each student, ensuring their success.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Infrastructure and Facilities Section */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={infraSectionRef} className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={infraInView ? { opacity: 1, y: 0 } : {}}
              className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs mb-4"
            >
              <div className="w-8 h-[2px] bg-primary" />
              <span>Infrastructure</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={infraInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold tracking-tight"
            >
              Advanced Resources for <span className="text-primary italic">a Brighter Future</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={infraInView ? { opacity: 1, y: 0 } : {}}
            className="bg-secondary/50 p-10 md:p-16 rounded-[4rem] border border-border shadow-inner"
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our campus boasts modern infrastructure and state-of-the-art facilities, including
                  well-equipped computer labs, a comprehensive library, Wi-Fi connectivity, and
                  dedicated spaces for extracurricular activities.
                </p>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-5 p-6 bg-white rounded-[2rem] shadow-lg border border-primary/10"
                >
                  <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <p className="font-bold text-gray-900 leading-snug">
                    A conducive learning environment that fosters innovation and collaboration.
                  </p>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Tech Labs', icon: Globe, color: 'text-blue-500' },
                  { label: 'Library', icon: BookOpen, color: 'text-emerald-500' },
                  { label: 'Campus Wi-Fi', icon: Sparkles, color: 'text-amber-500' },
                  { label: 'Activity Hub', icon: Users, color: 'text-rose-500' },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -10, rotate: i % 2 === 0 ? 2 : -2 }}
                    className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-transparent hover:border-primary/20 text-center transition-all cursor-default"
                  >
                    <item.icon className={`w-10 h-10 mx-auto mb-4 ${item.color} opacity-80`} />
                    <span className="font-black text-xs uppercase tracking-widest text-gray-500">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}