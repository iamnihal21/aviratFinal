'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Navigation, Clock } from 'lucide-react'
import { Button } from '@/app/(frontend)/components/ui/button'

export function MapSection() {
  // Replace these with your actual campus details
  const campusCoords = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.020426054587!2d72.51998907633718!3d23.059712714939128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8356fed6eaa7%3A0x7cf138fb3903e441!2sAvirat%20Law%20College!5e0!3m2!1sen!2sin!4v1774524280713!5m2!1sen!2sin"

  return (
    <section className="relative py-24 bg-secondary/20 overflow-hidden ">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-3 block"
          >
            Visit Our Campus
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter"
          >
            Where Innovation <br /> Meets <span className="text-primary">Education</span>
          </motion.h2>
        </div>

        <div className="relative h-[600px] w-full rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100">
          {/* 1. The Map Layer */}
          <iframe
            src={campusCoords}
            className="absolute inset-0 w-full h-full grayscale-[0.2] contrast-[1.1]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}