'use client'

import Link from 'next/link'
import { Instagram, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  academics: [
    { name: 'Undergraduate Programs', href: '/admissions' },
    { name: 'Graduate Programs', href: '/admissions' },
    { name: 'Research', href: '/research' },
    { name: 'Academic Calendar', href: '/admissions' },
  ],
  admissions: [
    { name: 'Apply Now', href: '/admissions' },
    { name: 'Visit Campus', href: '/campus' },
    { name: 'Tuition & Aid', href: '/admissions' },
    { name: 'International Students', href: '/admissions' },
  ],
  campus: [
    { name: 'Student Life', href: '/campus' },
    { name: 'Photo Gallery', href: '/gallery' },
    { name: 'Virtual Tour', href: '/campus' },
    { name: 'Campus Map', href: '/contact' },
  ],
}

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/avirat_bba_bca_college?igsh=amN3aGNyMjY2MG54', icon: Instagram },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand & Identity Column */}
          <div className="col-span-2 lg:col-span-2 pr-0 lg:pr-20">
            <Link href="/" className="inline-block mb-6 group">
              <span className="text-3xl font-black tracking-tighter transition-colors group-hover:text-secondary">
                AVIRAT<span className="text-secondary text-4xl">.</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              Empowering the next generation of engineers and leaders through industry-aligned
              curriculum and hands-on research.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-secondary mt-0.5" />
                <address className="not-italic text-sm text-gray-400 leading-relaxed">
                  Nr. Palladium mall, S.G. Highway Road,
                  <br />
                  Thaltej, Ahmedabad-380 054.
                </address>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary" />
                <a
                  href="tel:+917046713410"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  +91 70467 13410
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary" />
                <a
                  href="mailto:info@avirat.edu"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  aviratbba.bca.1709@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-6">
              Academics
            </h3>
            <ul className="space-y-4">
              {footerLinks.academics.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-all hover:pl-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-6">
              Admissions
            </h3>
            <ul className="space-y-4">
              {footerLinks.admissions.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-all hover:pl-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-6">
              Campus
            </h3>
            <ul className="space-y-4">
              {footerLinks.campus.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-all hover:pl-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Socials */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-600">
            © {new Date().getFullYear()} Avirat BBA & BCA College. All rights reserved.
          </p>

          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-600">
            Developed by Nihal dave & team
          </p>
        </div>
      </div>
    </footer>
  )
}
