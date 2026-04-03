'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/app/(frontend)/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/(frontend)/components/ui/card'
import {
  Calendar, MapPin, Clock, Users, Music, Microscope, Trophy, Laptop, Palette, ArrowRight
} from 'lucide-react'
import { useScrollAnimation } from '@/app/(frontend)/hooks/use-scroll-animation'

export default function EventsClient({ eventsData }: { eventsData: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
  const { ref: headerRef } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })

  const { ref: heroRef } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const getIcon = (type: string) => {
    const icons: any = { laptop: Laptop, music: Music, microscope: Microscope, trophy: Trophy, palette: Palette }
    return icons[type] || Calendar
  }

  const categories = ['All', 'Academic', 'Cultural', 'Sports']
  const filteredEvents = selectedCategory === 'All' 
    ? eventsData 
    : eventsData.filter(event => event.category === selectedCategory)

  const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }
  const staggerChildren = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }

  return (
    <main className="min-h-screen ">
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
              <Calendar className="w-4 h-4 text-primary animate-bounce" />
              <span className="text-sm font-medium">Events at Avirat</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85]"
            >
              Upcoming <br />
              <span className="text-primary italic">Events.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-500 leading-relaxed mb-12 max-w-2xl mx-auto font-medium"
            >
             Join us for academic conferences, cultural festivals, sports meets, and more.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="pb-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                className={selectedCategory === cat ? 'bg-primary text-white' : ''}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredEvents.map((event, index) => {
                const Icon = getIcon(event.iconType)
                return (
                  <motion.div
                    key={event.id}
                    variants={fadeInUp}
                    onClick={() => setSelectedEvent(event)}
                    className="cursor-pointer group"
                  >
                    <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden h-full">
                      <div className={`h-40 bg-gradient-to-br ${event.color} relative`}>
                        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 rounded-full text-xs font-medium">
                          {event.category}
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <Icon className="h-8 w-8 text-white" />
                        </div>  
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">{event.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 text-primary" /> {event.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 text-primary" /> {event.time}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 text-primary" /> {event.location}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full"
            >
              <Card className="bg-white border-none shadow-2xl overflow-hidden">
                <div className={`h-32 bg-gradient-to-br ${selectedEvent.color} relative p-6`}>
                  <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">×</button>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-primary font-medium mb-1">{selectedEvent.category}</p>
                      <CardTitle className="text-2xl">{selectedEvent.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{selectedEvent.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-sm"><p className="text-muted-foreground">Date</p><p className="font-medium">{selectedEvent.date}</p></div>
                    <div className="text-sm"><p className="text-muted-foreground">Location</p><p className="font-medium">{selectedEvent.location}</p></div>
                  </div>
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <p className="text-sm font-medium">Registration Deadline</p>
                    <p className="text-lg font-semibold text-primary">{selectedEvent.registrationDeadline}</p>
                  </div>
                  <Button className="w-full bg-primary text-white">Register Now</Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}