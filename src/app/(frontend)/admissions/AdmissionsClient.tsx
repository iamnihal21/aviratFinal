'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Card, CardContent } from '@/app/(frontend)/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/app/(frontend)/components/ui/tabs'
import {
  Calendar,
  CheckCircle2,
  FileText,
  GraduationCap,
  Users,
  Trophy,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MapPin,
  HelpCircle,
} from 'lucide-react'
import { useScrollAnimation } from '@/app/(frontend)/hooks/use-scroll-animation'

export default function AdmissionsClient({ data, faqData }: { data: any; faqData: any[] }) {
  const [activeTab, setActiveTab] = useState('process')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { ref: heroRef } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const { ref: statsRef, isInView: statsInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  })

  const getIcon = (type: string) => {
    const icons: any = {
      graduation: GraduationCap,
      users: Users,
      trophy: Trophy,
      clock: Clock,
      file: FileText,
      check: CheckCircle2,
      shield: ShieldCheck,
    }
    return icons[type] || GraduationCap
  }

  // Animation Variants
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
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }

  if (!mounted) return null

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
              <Sparkles className="w-4 h-4 text-primary animate-bounce" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Admissions Open 2026
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85]"
            >
              Design Your <br />
              <span className="text-primary italic">Future.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-500 leading-relaxed mb-12 max-w-2xl mx-auto font-medium"
            >
              Join a legacy of excellence in Ahmedabad. We value curiosity, leadership, and the
              drive to innovate in the digital age.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats/Highlights Section */}
      {/* Interactive Tabs Section */}
      <section className="pb-32 mt-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Tabs defaultValue="process" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-20">
              <TabsList className="inline-flex h-16 items-center justify-center rounded-[2rem] bg-gray-100 p-2 text-gray-500 shadow-inner">
                {['process', 'deadlines', 'FAQs'].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-[1.5rem] px-10 py-3 text-xs font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-xl transition-all"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'process' && (
                <motion.div
                  key="process"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-5xl mx-auto"
                >
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-black tracking-tight mb-4">Application Pathway</h2>
                    <p className="text-gray-500 font-medium">
                      Follow these five simple steps to secure your seat at Avirat.
                    </p>
                  </div>

                  <div className="space-y-12 relative before:absolute before:left-[27px] before:top-4 before:bottom-4 before:w-0.5 before:bg-gray-100 lg:before:left-1/2 lg:before:-translate-x-1/2">
                    {data?.timeline?.map((item: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className={`flex flex-col lg:flex-row gap-8 items-start lg:items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse text-left lg:text-right'}`}
                      >
                        <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-black text-xl z-10 shadow-xl shadow-primary/20 flex-shrink-0 lg:mx-auto">
                          {index + 1}
                        </div>
                        <div className="flex-1 bg-secondary/20 p-8 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                          <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-gray-500 font-medium leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <div className="hidden lg:block flex-1" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'deadlines' && (
                <motion.div
                  key="deadlines"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="grid lg:grid-cols-2 gap-12"
                >
                  {['undergraduate', 'graduate', 'FAQs'].map((category) => (
                    <div key={category} className="space-y-8">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-gray-950 flex items-center justify-center text-white">
                          <Clock className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-black tracking-tight capitalize">
                          {category} Intake
                        </h2>
                      </div>

                      <div className="space-y-6">
                        {data?.deadlines?.[category]?.map((item: any, i: number) => (
                          <Card
                            key={i}
                            className="group overflow-hidden rounded-[2rem] border-2 border-gray-50 hover:border-primary/20 transition-all duration-500 bg-secondary/20"
                          >
                            <CardContent className="p-10">
                              <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-black tracking-tight">{item.type}</h3>
                                <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">
                                  Active
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                    <Calendar className="h-3 w-3" /> Deadline
                                  </div>
                                  <div className="text-lg font-bold text-gray-900">
                                    {item.deadline}
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                    <CheckCircle2 className="h-3 w-3" /> Result
                                  </div>
                                  <div className="text-lg font-bold text-gray-900">
                                    {item.notification}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
              {activeTab === 'FAQs' && (
                <motion.div
                  key="faqs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-black tracking-tight mb-4">Admissions FAQ</h2>
                    <p className="text-gray-500 font-medium">
                      Quick answers to the most common questions about joining Avirat.
                    </p>
                  </div>
                  <div className="grid gap-6">
                    {faqData?.map((faq: any, index: number) => (
                      <Card
                        key={index}
                        className="bg-white border-gray-100 rounded-[2.5rem] hover:shadow-2xl transition-all duration-500 group border-2 hover:border-primary/10"
                      >
                        <CardContent className="p-8">
                          <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                              <HelpCircle className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="text-xl font-black tracking-tight mb-3 group-hover:text-primary transition-colors">
                                {faq.question}
                              </h3>
                              <p className="text-gray-500 font-medium leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Tabs>
        </div>
      </section>

      {/* Floating CTA Section */}
    </main>
  )
}
