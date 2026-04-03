'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone, Mail, ChevronRight, Globe, UserCircle, Sparkles } from 'lucide-react'
import { Button } from '@/app/(frontend)/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import AdmissionInquiry from '@/app/(frontend)/admissionInquiry/page'

const navigation = [
  { name: 'About Us', href: '/aboutus', desc: 'Our legacy and vision' },
  { name: 'Achievements', href: '/achievements', desc: 'Our milestones' },
  { name: 'Admissions', href: '/admissions', desc: 'Join our community' },
  { name: 'Campus', href: '/campus', desc: 'Life at Avirat' },
  { name: 'Contact Us', href: '/contact', desc: 'Get in touch with us' },
  { name: 'Events', href: '/events', desc: 'Happening now' },
  { name: 'Research', href: '/research', desc: 'Innovation at core' },
  { name: 'Placements', href: '/placements', desc: 'Career success' },
  { name: 'Gallery', href: '/gallery', desc: 'Visual journey' },
]

export function Header() {
  const [fullMenuOpen, setFullMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isInquiryOpen, setIsInquiryOpen] = useState(false)

  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = fullMenuOpen ? 'hidden' : 'unset'
  }, [fullMenuOpen])

  return (
    <>
      {/* --- GCAS Awareness Banner --- */}
      
<div className="fixed top-0 left-0 right-0 z-[60] bg-gray-400 h-10 flex items-center justify-center border-b border-white/10">
  <div className="flex items-center gap-3 px-6">
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
    />
    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-white/90">
      <span className='bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>  GCAS awareness </span> is available in the website 
    </span>
    
  </div>
</div>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          // We add 'top-8' to push the header down below the ticker
          scrolled || !isHome
            ? 'top-8 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-3 shadow-sm'
            : 'top-8 bg-transparent py-5'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between ">
            {/* Logo Group */}
            <Link href="/" className="group flex items-center gap-3 outline-none ">
              <div className="relative w-10 h-10 ">
                {/* Ensure your logo path matches your setup (Supabase vs Local) */}
                <Image
                  src="/api/media/file/avirat-bba-bca-collage-logo-1.png"
                  alt="Avirat Logo"
                  fill
                  className="object-contain "
                />
              </div>

              <div className="flex flex-col">
                <span
                  className={`text-xl font-black tracking-tighter leading-none transition-colors ${
                    scrolled || !isHome ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  AVIRAT
                </span>
                <span
                  className={`text-[9px] font-black tracking-[0.3em] uppercase transition-colors ${
                    scrolled || !isHome ? 'text-primary' : 'text-white/80'
                  }`}
                >
                  BBA & BCA College
                </span>
              </div>
            </Link>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                href="/StudentPortal"
                className={`group relative flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all ${
                  scrolled || !isHome ? 'text-gray-600' : 'text-white/90'
                }`}
              >
                <UserCircle className={`w-4 h-4 transition-colors group-hover:text-secondary`} />
                <span className="group-hover:text-secondary transition-colors">Student Portal</span>
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </Link>
              
              <div className="h-4 w-[1px] bg-gray-300/30" />

              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setIsInquiryOpen(true)}
                  className={`rounded-full px-6 text-xs font-bold uppercase tracking-widest transition-all ${
                    scrolled || !isHome
                      ? 'text-gray-900 hover:bg-gray-100 hover:text-gray-900'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Inquiry
                </Button>

                <button
                  onClick={() => setFullMenuOpen(true)}
                  className="flex items-center gap-3 bg-gray-900 hover:bg-primary text-white pl-6 pr-2 py-2 rounded-full transition-all duration-300 group"
                >
                  <span className="text-xs font-black uppercase tracking-widest">Menu</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:rotate-90 transition-transform">
                    <Menu className="h-4 w-4" />
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setFullMenuOpen(true)}
              className={`lg:hidden p-2 rounded-xl transition-colors ${
                scrolled || !isHome ? 'text-gray-900 bg-gray-50' : 'text-white bg-white/10'
              }`}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          
        </nav>
      </header>

      <AnimatePresence>
        {fullMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary animate-spin-slow" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                  Global Navigation
                </span>
              </div>
              <button
                onClick={() => setFullMenuOpen(false)}
                className="group flex items-center gap-3 bg-gray-50 hover:bg-gray-900 p-2 pr-6 rounded-full transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:rotate-180 transition-transform shadow-sm">
                  <X className="h-5 w-5 text-gray-900" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest group-hover:text-white">
                  Close
                </span>
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {navigation.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setFullMenuOpen(false)}
                      className="group block p-8 rounded-[2rem] bg-gray-50 hover:bg-primary transition-all duration-500 h-full"
                    >
                      <div className="mb-8 w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        <ChevronRight className="w-5 h-5 text-primary group-hover:rotate-[-45deg] transition-transform" />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 group-hover:text-white mb-2 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-400 group-hover:text-white/70 transition-colors">
                        {item.desc}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Menu Footer */}
            <div className="bg-gray-50 px-6 py-12">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex gap-12">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                      Admissions
                    </p>
                    <p className="text-sm font-bold text-gray-900">+91 70467 13410</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                      Email Us
                    </p>
                    <p className="text-sm font-bold text-gray-900">aviratbba.bca.1709@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isInquiryOpen && (
          <AdmissionInquiry isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
        )}
      </AnimatePresence>

      <style jsx global>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  )
}