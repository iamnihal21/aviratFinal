'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StudentDashboard() {
  const router = useRouter()
  const [student, setStudent] = useState<any>(null)
  const [results, setResults] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPortalData = async () => {
      try {
        // 1. Check Authentication & Session
        const meRes = await fetch('/api/students/me')
        const meData = await meRes.json()

        if (!meData.user || meData.collection !== 'students') {
          router.push('/login')
          return
        }

        // Check if student needs to update their auto-generated password
        if (meData.user.needsPasswordChange) {
          router.push('/change-password')
          return
        }

        setStudent(meData.user)

        // 2. Parallel Fetch Results and Payments using Student ID
        const [resSnap, paySnap] = await Promise.all([
          fetch(`/api/results?where[student][equals]=${meData.user.id}&sort=-semester`),
          fetch(`/api/payments?where[student][equals]=${meData.user.id}&sort=-createdAt`)
        ])

        if (!resSnap.ok || !paySnap.ok) throw new Error('Failed to fetch academic records')

        const resData = await resSnap.json()
        const payData = await paySnap.json()

        setResults(resData.docs)
        setPayments(payData.docs)
      } catch (err) {
        setError('Could not load dashboard data. Please try logging in again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPortalData()
  }, [router])

  const handleLogout = async () => {
    await fetch('/api/students/logout', { method: 'POST' })
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading Student Portal...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900 uppercase tracking-tight">Student Hub</span>
              <span className="text-xs text-blue-600 font-bold uppercase tracking-widest">Academic Year 2026</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right mr-4">
                <p className="text-sm font-bold text-slate-900">{student?.name}</p>
                <p className="text-xs text-slate-500 uppercase">{student?.course}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md shadow-slate-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-8 flex items-center">
            <span className="mr-2">⚠️</span> {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* RESULTS SECTION */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-black text-slate-800 uppercase italic">Grade Sheets</h2>
              <span className="bg-blue-100 text-blue-700 text-xs font-black px-3 py-1 rounded-full uppercase">Verified</span>
            </div>
            
            <div className="grid gap-4">
              {results.length > 0 ? results.map((res: any) => (
                <div key={res.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Semester {res.semester}</h3>
                      <p className="text-3xl font-black text-slate-900">{res.sgpa} <span className="text-sm font-medium text-slate-400">/ 10.0</span></p>
                    </div>
                    <div className="h-14 w-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl border border-blue-100">
                      A
                    </div>
                  </div>
                </div>
              )) : (
                <div className="bg-slate-100 border-2 border-dashed border-slate-300 p-12 rounded-2xl text-center text-slate-400 font-medium">
                  No results published yet for this session.
                </div>
              )}
            </div>
          </div>

          {/* PAYMENTS SECTION */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-black text-slate-800 uppercase italic">Finance & Fees</h2>
              <span className="bg-slate-200 text-slate-600 text-xs font-black px-3 py-1 rounded-full uppercase">Billing</span>
            </div>

            <div className="grid gap-4">
              {payments.length > 0 ? payments.map((pay: any) => (
                <div key={pay.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-slate-900 font-black text-lg capitalize">{pay.category} Fee</h3>
                      <p className="text-slate-400 text-sm italic">Due immediately</p>
                    </div>
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md tracking-tighter ${
                      pay.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700 animate-pulse'
                    }`}>
                      {pay.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-end border-t border-slate-50 pt-4">
                    <p className="text-2xl font-black text-slate-900">₹{pay.amount.toLocaleString()}</p>
                    {pay.status === 'pending' && (
                      <button className="bg-blue-600 text-white text-xs font-black px-6 py-2.5 rounded-xl uppercase hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
              )) : (
                <div className="bg-slate-100 border-2 border-dashed border-slate-300 p-12 rounded-2xl text-center text-slate-400 font-medium">
                  No billing statements found.
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}