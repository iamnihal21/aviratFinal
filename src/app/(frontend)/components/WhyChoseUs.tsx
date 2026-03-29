'use client'

import { motion } from 'framer-motion'
import { 
  MapPin, Wind, Briefcase, Users, 
  Cpu, ShieldCheck, Sparkles, Building 
} from 'lucide-react'

const iconMap: any = {
  MapPin, Wind, Briefcase, Users, 
  Cpu, ShieldCheck, Sparkles, Building
}

export function WhyChooseUs({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-black uppercase tracking-[0.3em] text-xs"
          >
            Our Advantages
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black tracking-tighter mt-4"
          >
            Why Choose <span className="text-primary italic">Avirat?</span>
          </motion.h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {data.map((item, idx) => {
            const Icon = iconMap[item.iconType] || Sparkles
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-[2rem] bg-gray-50 border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-3 tracking-tight group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}