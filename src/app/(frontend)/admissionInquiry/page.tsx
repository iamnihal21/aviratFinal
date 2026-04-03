// 'use client'

// import React, { useState, useEffect } from 'react'
// import { X, CheckCircle2, Send, GraduationCap, Sparkles, MessageSquare, Phone, User } from 'lucide-react'
// import { motion, AnimatePresence } from 'framer-motion'

// interface PortalsMenuProps {
//   isOpen: boolean
//   onClose: () => void
// }

// export default function AdmissionInquiry({ isOpen, onClose }: PortalsMenuProps) {
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [isSuccess, setIsSuccess] = useState(false)
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     course: 'bca',
//     lastQualification: '',
//     message: '',
//   })

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden'
//     } else {
//       document.body.style.overflow = 'unset'
//     }
//     return () => {
//       document.body.style.overflow = 'unset'
//     }
//   }, [isOpen])

//   if (!isOpen) return null

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)
//     try {
//       const response = await fetch('/api/inquiries', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       })

//       if (response.ok) {
//         setIsSuccess(true)
//         setTimeout(() => {
//           onClose()
//           setTimeout(() => setIsSuccess(false), 300)
//         }, 3500)
//       }
//     } catch (error) {
//       alert('An error occurred. Please try again.')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div
//       className="fixed inset-0 bg-gray-950/40 backdrop-blur-md flex items-end sm:items-center justify-center z-[100] p-0 sm:p-4"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9, y: 100 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         exit={{ opacity: 0, scale: 0.9, y: 100 }}
//         transition={{ type: 'spring', damping: 25, stiffness: 300 }}
//         className="bg-white rounded-t-[3rem] sm:rounded-[3rem] w-full max-w-xl shadow-2xl overflow-hidden relative max-h-[95vh] flex flex-col border border-white/20"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Decorative Background Element */}
//         <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />

//         {/* Header */}
//         <div className="pt-10 px-8 sm:px-12 pb-6 flex justify-between items-start bg-white z-10">
//           <div>
//             <motion.div 
//               initial={{ x: -20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               className="flex items-center gap-2 mb-2"
//             >
//               <div className="p-1.5 bg-primary/10 rounded-lg">
//                 <GraduationCap className="w-4 h-4 text-primary animate-bounce" />
//               </div>
//               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary p-1.5 bg-primary/10 rounded-lg">
//                 Admissions 2026
//               </span>
//             </motion.div>
//             <h2 className="text-3xl font-black text-gray-900 tracking-tighter">
//               Start Your <span className="text-primary italic">Journey.</span>
//             </h2>
//           </div>
//           <motion.button
//             whileHover={{ rotate: 90, scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={onClose}
//             className="p-3 hover:bg-gray-100 rounded-2xl transition-all"
//           >
//             <X className="w-6 h-6 text-gray-400" />
//           </motion.button>
//         </div>

//         {/* Form Content */}
//         <div className="overflow-y-auto px-8 sm:px-12 pb-10 custom-scrollbar">
//           <AnimatePresence mode="wait">
//             {!isSuccess ? (
//               <motion.div
//                 key="form"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className="space-y-8"
//               >
//                 <p className="text-gray-500 font-medium leading-relaxed">
//                   Join a community of innovators. Leave your details below and our counselor will guide you personally.
//                 </p>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid grid-cols-1 gap-6">
//                     <InputField
//                       label="Your Full Name"
//                       name="name"
//                       icon={User}
//                       value={formData.name}
//                       onChange={handleChange}
//                       placeholder="e.g. Nihal Dave"
//                       required
//                     />

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                       <InputField
//                         label="Email Address"
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         placeholder="name@example.com"
//                         required
//                       />
//                       <InputField
//                         label="Mobile Number"
//                         type="tel"
//                         name="phone"
//                         icon={Phone}
//                         value={formData.phone}
//                         onChange={handleChange}
//                         placeholder="+91"
//                         required
//                       />
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                       <div className="w-full">
//                         <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block">
//                           Preferred Program
//                         </label>
//                         <div className="relative">
//                           <select
//                             name="course"
//                             value={formData.course}
//                             onChange={handleChange}
//                             className="w-full px-5 py-4 border-2 border-gray-100 bg-gray-50/50 rounded-2xl outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all text-sm font-bold appearance-none cursor-pointer"
//                           >
//                             <option value="bca">BCA (Computer Applications)</option>
//                             <option value="bba">BBA (Business Admin)</option>
//                           </select>
//                           <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
//                              <Sparkles className="w-4 h-4" />
//                           </div>
//                         </div>
//                       </div>
//                       <InputField
//                         label="Last Qualification"
//                         name="lastQualification"
//                         value={formData.lastQualification}
//                         onChange={handleChange}
//                         placeholder="e.g. 12th Commerce"
//                         required
//                       />
//                     </div>

//                     <div className="relative group">
//                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block">
//                         Additional Questions
//                       </label>
//                       <textarea
//                         name="message"
//                         value={formData.message}
//                         onChange={handleChange}
//                         rows={3}
//                         placeholder="Tell us about your goals..."
//                         className="w-full px-5 py-4 border-2 border-gray-100 bg-gray-50/50 rounded-2xl outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all resize-none text-sm font-medium"
//                       ></textarea>
//                       <MessageSquare className="absolute right-4 bottom-4 w-4 h-4 text-gray-300 group-focus-within:text-primary transition-colors" />
//                     </div>
//                   </div>

//                   <motion.button
//                     type="submit"
//                     disabled={isSubmitting}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="w-full py-5 rounded-[1.5rem] bg-gray-950 text-white font-black uppercase tracking-widest text-xs hover:bg-primary shadow-xl shadow-gray-200 hover:shadow-primary/30 transition-all disabled:bg-gray-200 flex items-center justify-center gap-3"
//                   >
//                     {isSubmitting ? (
//                       <div className="flex items-center gap-2">
//                         <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
//                         <span>Processing...</span>
//                       </div>
//                     ) : (
//                       <>
//                         <Send className="w-4 h-4" />
//                         Submit Inquiry
//                       </>
//                     )}
//                   </motion.button>
//                 </form>
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="success"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="py-16 flex flex-col items-center text-center"
//               >
//                 <div className="relative mb-8">
//                   <motion.div 
//                     initial={{ scale: 0 }} 
//                     animate={{ scale: 1.5, opacity: 0 }} 
//                     transition={{ duration: 1.5, repeat: Infinity }}
//                     className="absolute inset-0 bg-green-500/20 rounded-full"
//                   />
//                   <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center relative z-10 shadow-lg shadow-green-200">
//                     <CheckCircle2 className="w-12 h-12 text-white" />
//                   </div>
//                 </div>
//                 <h2 className="text-4xl font-black text-gray-900 tracking-tighter mb-4">You&apos;re All Set!</h2>
//                 <p className="text-gray-500 font-medium text-lg max-w-[320px] leading-relaxed">
//                   Excellent choice. We&rsquo;ve received your request and will reach out to you within 24 hours.
//                 </p>
                
//                 {/* Visual Progress Bar */}
//                 <div className="mt-12 w-full max-w-xs h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                    <motion.div 
//                     initial={{ width: "0%" }}
//                     animate={{ width: "100%" }}
//                     transition={{ duration: 3.5, ease: "linear" }}
//                     className="h-full bg-green-500"
//                    />
//                 </div>
//                 <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Returning to site</p>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </motion.div>
//     </div>
//   )
// }

// function InputField({ label, icon: Icon, ...props }: any) {
//   return (
//     <div className="w-full group">
//       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block group-focus-within:text-primary transition-colors">
//         {label}
//       </label>
//       <div className="relative">
//         <input
//           {...props}
//           className="w-full px-5 py-4 border-2 border-gray-100 bg-gray-50/50 rounded-2xl outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all text-sm font-bold placeholder:text-gray-300 placeholder:font-medium"
//         />
//         {Icon && (
//           <Icon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-primary transition-colors" />
//         )}
//       </div>
//     </div>
//   )
// }

'use client'

import React, { useState, useEffect } from 'react'
import { X, CheckCircle2, Send, GraduationCap, Sparkles, MessageSquare, Phone, User, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface PortalsMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function AdmissionInquiry({ isOpen, onClose }: PortalsMenuProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'bca',
    lastQualification: '',
    message: '',
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      // POSTING TO PAYLOAD CMS ENDPOINT
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok || response.status === 201) {
        setIsSuccess(true)
        // Reset form data after success
        setFormData({
            name: '',
            email: '',
            phone: '',
            course: 'bca',
            lastQualification: '',
            message: '',
        })
        setTimeout(() => {
          onClose()
          setTimeout(() => setIsSuccess(false), 300)
        }, 3500)
      } else {
        const errorData = await response.json()
        console.error('Submission error:', errorData)
        alert('Could not submit inquiry. Please check your information.')
      }
    } catch (error) {
      console.error('Network error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-gray-950/40 backdrop-blur-md flex items-end sm:items-center justify-center z-[100] p-0 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 100 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white rounded-t-[3rem] sm:rounded-[3rem] w-full max-w-xl shadow-2xl overflow-hidden relative max-h-[95vh] flex flex-col border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="pt-10 px-8 sm:px-12 pb-6 flex justify-between items-start bg-white z-10">
          <div>
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-2 mb-2"
            >
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <GraduationCap className="w-4 h-4 text-primary animate-bounce" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary p-1.5 bg-primary/10 rounded-lg">
                Admissions 2026
              </span>
            </motion.div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter">
              Start Your <span className="text-primary italic">Journey.</span>
            </h2>
          </div>
          <motion.button
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-3 hover:bg-gray-100 rounded-2xl transition-all"
          >
            <X className="w-6 h-6 text-gray-400" />
          </motion.button>
        </div>

        {/* Form Content */}
        <div className="overflow-y-auto px-8 sm:px-12 pb-10 custom-scrollbar">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <p className="text-gray-500 font-medium leading-relaxed">
                  Join a community of innovators. Leave your details below and our counselor will guide you personally.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <InputField
                      label="Your Full Name"
                      name="name"
                      icon={User}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Nihal Dave"
                      required
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <InputField
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        required
                      />
                      <InputField
                        label="Mobile Number"
                        type="tel"
                        name="phone"
                        icon={Phone}
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="w-full">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block">
                          Preferred Program
                        </label>
                        <div className="relative">
                          <select
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            className="w-full px-5 py-4 border-2 border-gray-100 bg-gray-50/50 rounded-2xl outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all text-sm font-bold appearance-none cursor-pointer"
                          >
                            <option value="bca">BCA (Computer Applications)</option>
                            <option value="bba">BBA (Business Admin)</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                             <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                      <InputField
                        label="Last Qualification"
                        name="lastQualification"
                        value={formData.lastQualification}
                        onChange={handleChange}
                        placeholder="e.g. 12th Commerce"
                        required
                      />
                    </div>

                    <div className="relative group">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block">
                        Additional Questions
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Tell us about your goals..."
                        className="w-full px-5 py-4 border-2 border-gray-100 bg-gray-50/50 rounded-2xl outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all resize-none text-sm font-medium"
                      ></textarea>
                      <MessageSquare className="absolute right-4 bottom-4 w-4 h-4 text-gray-300 group-focus-within:text-primary transition-colors" />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 rounded-[1.5rem] bg-gray-950 text-white font-black uppercase tracking-widest text-xs hover:bg-primary shadow-xl shadow-gray-200 hover:shadow-primary/30 transition-all disabled:bg-gray-200 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Inquiry
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 flex flex-col items-center text-center"
              >
                <div className="relative mb-8">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1.5, opacity: 0 }} 
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 bg-green-500/20 rounded-full"
                  />
                  <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center relative z-10 shadow-lg shadow-green-200">
                    <CheckCircle2 className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter mb-4">You&apos;re All Set!</h2>
                <p className="text-gray-500 font-medium text-lg max-w-[320px] leading-relaxed">
                  Excellent choice. We&rsquo;ve received your request and will reach out to you within 24 hours.
                </p>
                
                {/* Visual Progress Bar */}
                <div className="mt-12 w-full max-w-xs h-1.5 bg-gray-100 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.5, ease: "linear" }}
                    className="h-full bg-green-500"
                   />
                </div>
                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Returning to site</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

function InputField({ label, icon: Icon, ...props }: any) {
  return (
    <div className="w-full group">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block group-focus-within:text-primary transition-colors">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          className="w-full px-5 py-4 border-2 border-gray-100 bg-gray-50/50 rounded-2xl outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all text-sm font-bold placeholder:text-gray-300 placeholder:font-medium"
        />
        {Icon && (
          <Icon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-primary transition-colors" />
        )}
      </div>
    </div>
  )
}