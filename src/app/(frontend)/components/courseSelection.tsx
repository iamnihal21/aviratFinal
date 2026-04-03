'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/app/(frontend)/components/ui/button'
import { Card } from '@/app/(frontend)/components/ui/card'
import { Laptop, Briefcase } from 'lucide-react'

interface CourseDialogProps {
  onSelect: (course: 'bba' | 'bca') => void
}

export function CourseDialog({ onSelect }: CourseDialogProps) {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const savedCourse = localStorage.getItem('selectedCourse')
    if (savedCourse) {
      setIsOpen(false)
      onSelect(savedCourse as 'bba' | 'bca')
    }
  }, [onSelect])

  const handleSelect = (course: 'bba' | 'bca') => {
    localStorage.setItem('selectedCourse', course)
    setIsOpen(false)
    onSelect(course)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 🔥 Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />

          {/* 🔥 Floating Background Glow */}
          <div className="fixed inset-0 z-50 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 blur-[100px] rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/20 blur-[100px] rounded-full" />
          </div>

          {/* 🔥 Dialog */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 60 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <Card className="max-w-md w-full bg-white/90 backdrop-blur-xl shadow-2xl overflow-hidden border border-white/20">
              
              {/* Header */}
              <div className="relative bg-gradient-to-r from-primary to-accent p-6 text-white text-center overflow-hidden">
                
                {/* Glow inside header */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-0 left-0 w-40 h-40 bg-white/30 blur-2xl rounded-full" />
                </div>

                <h2 className="text-2xl font-bold mb-1 relative z-10">
                  Welcome to Avirat BBA & BCA College
                </h2>
                <p className="text-white/80 text-sm relative z-10">
                  Choose your path to success
                </p>
              </div>

              {/* Options */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">

                  {/* 🔥 BCA */}
                  <motion.button
                    whileHover={{ y: -6, scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelect('bca')}
                    className="group relative overflow-hidden rounded-xl p-6 border border-primary/20 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
                  >
                    {/* Glow Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                      <div className="absolute -inset-1 bg-primary/20 blur-xl" />
                    </div>

                    <Laptop className="h-12 w-12 text-primary mx-auto mb-3 relative z-10" />
                    
                    <h3 className="text-xl font-bold text-foreground mb-1 relative z-10">
                      BCA
                    </h3>

                    <p className="text-xs text-muted-foreground relative z-10">
                      Computer Applications
                    </p>

                    <div className="mt-3 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full relative z-10 inline-block">
                      3 Years
                    </div>
                  </motion.button>

                  {/* 🔥 BBA */}
                  <motion.button
                    whileHover={{ y: -6, scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelect('bba')}
                    className="group relative overflow-hidden rounded-xl p-6 border border-accent/20 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
                  >
                    {/* Glow Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10" />
                      <div className="absolute -inset-1 bg-accent/20 blur-xl" />
                    </div>

                    <Briefcase className="h-12 w-12 text-accent mx-auto mb-3 relative z-10" />
                    
                    <h3 className="text-xl font-bold text-foreground mb-1 relative z-10">
                      BBA
                    </h3>

                    <p className="text-xs text-muted-foreground relative z-10">
                      Business Administration
                    </p>

                    <div className="mt-3 text-xs bg-accent/10 text-accent px-2 py-1 rounded-full relative z-10 inline-block">
                      3 Years
                    </div>
                  </motion.button>

                </div>

                {/* Footer Note */}
                <p className="text-xs text-muted-foreground text-center mt-6">
                  You can change this later anytime
                </p>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}