'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Button } from '@/app/(frontend)/components/ui/button'
import { Card, CardContent } from '@/app/(frontend)/components/ui/card'
import { Input } from '@/app/(frontend)/components/ui/input'
import { Textarea } from '@/app/(frontend)/components/ui/textarea'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  ChevronRight,
  HelpCircle,
  Sparkles,
  Globe,
  Trophy,
  ShieldAlert,
} from 'lucide-react'
import { useScrollAnimation } from '@/app/(frontend)/hooks/use-scroll-animation'

export default function ContactClient({ data }: { data: any }) {
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const { ref: heroRef } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })

  const getIcon = (title: string) => {
    const t = title.toLowerCase()
    if (t.includes('visit')) return MapPin
    if (t.includes('call')) return Phone
    if (t.includes('email')) return Mail
    return Clock
  }

  const { ref: headerRef } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const { ref: infoRef, isInView: infoInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  })

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
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('success')
    setTimeout(() => setFormStatus('idle'), 5000)
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
              <Sparkles className="w-4 h-4 text-primary animate-bounce" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Always Connected
              </span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85]"
            >
              We&apos;re Here to{' '} <br />
              <span className="text-primary italic">help</span>
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-500 leading-relaxed mb-12 max-w-2xl mx-auto font-medium"
            >
              Whether you’re a prospective student, a parent, or an industry partner, our
              specialized teams are ready to provide the clarity you need.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Info & Form Split Section */}
      <section className="py-24 relative -mt-16 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact Cards */}
            <motion.div
              ref={infoRef}
              initial="hidden"
              animate={infoInView ? 'visible' : 'hidden'}
              variants={staggerChildren}
              className="lg:col-span-5 space-y-6"
            >
              {data?.contactInfo?.map((info: any, idx: number) => {
                const Icon = getIcon(info.title)
                return (
                  <motion.div key={idx} variants={fadeInUp}>
                    <Card className="group bg-white border-none shadow-2xl rounded-[2.5rem] overflow-hidden hover:scale-[1.02] transition-all duration-500">
                      <CardContent className="p-8">
                        <div className="flex gap-6 items-start">
                          <div
                            className={`w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0`}
                          >
                            <Icon className="h-7 w-7" />
                          </div>
                          <div>
                            <h3 className="text-lg font-black tracking-tight mb-2">{info.title}</h3>
                            <div className="space-y-1 mb-4">
                              {info.details?.map((d: any, i: number) => (
                                <p
                                  key={i}
                                  className="text-sm font-medium text-gray-500 leading-relaxed"
                                >
                                  {d.line}
                                </p>
                              ))}
                            </div>
                            <Link
                              href={info.link || '#'}
                              className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 group/link"
                            >
                              {info.action}{' '}
                              <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Right Column: High-End Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <Card className="bg-white border-2 border-gray-100 shadow-2xl rounded-[3rem] overflow-hidden">
                <div className="p-10 md:p-16">
                  <div className="mb-10">
                    <h2 className="text-3xl font-black tracking-tight mb-2">Drop us a line</h2>
                    <p className="text-gray-500 font-medium italic">
                      We typically respond within 2 business hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
                          First Name
                        </label>
                        <Input
                          required
                          className="h-14 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-primary transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
                          Last Name
                        </label>
                        <Input
                          required
                          className="h-14 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-primary transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        required
                        className="h-14 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-primary transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
                        Your Message
                      </label>
                      <Textarea
                        required
                        className="min-h-[160px] rounded-[2rem] bg-gray-50 border-transparent focus:bg-white focus:border-primary transition-all p-6"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-16 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
                      disabled={formStatus === 'success'}
                    >
                      {formStatus === 'success' ? (
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" /> Message Sent
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message <Send className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Clean Journal Style */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Common Inquiries
            </h2>
            <div className="h-1 w-12 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid gap-4">
            {data?.faqs?.map((faq: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white border-gray-100 rounded-[2rem] hover:shadow-xl transition-all duration-500 group">
                  <CardContent className="p-8">
                    <div className="flex gap-6 items-start">
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                        <HelpCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black tracking-tight mb-3">{faq.question}</h3>
                        <p className="text-gray-500 font-medium leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Section - High Contrast Terminal */}
      <section className="py-32 bg-gradient-to-b to-background from-secondary/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 " />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-800 border border-white/10 rounded-[4rem] overflow-hidden backdrop-blur-sm">
              <CardContent className="p-12 md:p-24 text-center">
                <div className="w-20 h-20 rounded-3xl bg-red-500/20 flex items-center justify-center mx-auto mb-10 border border-red-500/30">
                  <ShieldAlert className="h-10 w-10 text-red-500" />
                </div>

                <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                  Critical Assistance.
                </h3>
                <p className="text-gray-400 font-medium text-lg mb-12 max-w-xl mx-auto italic">
                  Available 24/7 for urgent matters requiring immediate institutional attention.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Button
                    variant="outline"
                    className="h-20 px-10 rounded-2xl border-white/10 bg-white/5 text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-gray-950 transition-all min-w-[280px]"
                  >
                    <Phone className="mr-3 h-5 w-5" />
                    Contact: +91 70467 13410
                  </Button>
                  <Button className="h-20 px-10 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs hover:scale-105 transition-all min-w-[280px] shadow-2xl shadow-primary/40">
                    <Mail className="mr-3 h-5 w-5" />
                    aviratbba.bca.1709@gmail.com
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
