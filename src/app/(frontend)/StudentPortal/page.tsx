'use client'
import React, { useEffect, useState } from 'react'

export default function StudentDashboard() {
  const [student, setStudent] = useState<any>(null)
  const [results, setResults] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPortalData = async () => {
      try {
        // 1. Check Authentication
        const meRes = await fetch('/api/students/me')
        const meData = await meRes.json()

        // ❌ Not logged in
        if (!meData.user || meData.collection !== 'students') {
          window.location.href = '/login'
          return
        }

        // ❌ Needs password change
        if (meData.user.needsPasswordChange) {
          window.location.href = '/change-password'
          return
        }

        setStudent(meData.user)

        // 2. Fetch Results + Payments
        const [resSnap, paySnap] = await Promise.all([
          fetch(`/api/results?where[student][equals]=${meData.user.id}&sort=-semester`),
          fetch(`/api/payments?where[student][equals]=${meData.user.id}&sort=-createdAt`)
        ])

        if (!resSnap.ok || !paySnap.ok) {
          throw new Error('Failed to fetch academic data')
        }

        const resData = await resSnap.json()
        const payData = await paySnap.json()

        setResults(resData.docs || [])
        setPayments(payData.docs || [])

      } catch (err) {
        console.error(err)
        setError('Could not load dashboard. Please login again.')
      } finally {
        setLoading(false)
      }
    }

    fetchPortalData()
  }, [])

  const handleLogout = async () => {
    await fetch('/api/students/logout', { method: 'POST' })
    window.location.href = '/login'
  }

  // ✅ Block UI until auth is verified
  if (loading || !student) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Checking Authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">

      {/* ✅ Fixed Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900 uppercase tracking-tight">
                Student Hub
              </span>
              <span className="text-xs text-blue-600 font-bold uppercase tracking-widest">
                Academic Year 2026
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right mr-4">
                <p className="text-sm font-bold text-slate-900">
                  {student?.name}
                </p>
                <p className="text-xs text-slate-500 uppercase">
                  {student?.course}
                </p>
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

      {/* ✅ Fixed spacing */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-8 flex items-center">
            <span className="mr-2">⚠️</span> {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* RESULTS */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-black text-slate-800 uppercase italic">
                Grade Sheets
              </h2>
              <span className="bg-blue-100 text-blue-700 text-xs font-black px-3 py-1 rounded-full uppercase">
                Verified
              </span>
            </div>

            <div className="grid gap-4">
              {results.length > 0 ? results.map((res: any) => (
                <div key={res.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <h3 className="text-slate-500 text-xs font-black uppercase mb-1">
                    Semester {res.semester}
                  </h3>
                  <p className="text-3xl font-black text-slate-900">
                    {res.sgpa} <span className="text-sm text-slate-400">/ 10.0</span>
                  </p>
                </div>
              )) : (
                <div className="bg-slate-100 border-2 border-dashed p-12 rounded-2xl text-center text-slate-400">
                  No results published yet.
                </div>
              )}
            </div>
          </div>

          {/* PAYMENTS */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-black text-slate-800 uppercase italic">
                Finance & Fees
              </h2>
            </div>

            <div className="grid gap-4">
              {payments.length > 0 ? payments.map((pay: any) => (
                <div key={pay.id} className="bg-white p-6 rounded-2xl shadow-sm border">
                  <h3 className="font-bold text-lg">{pay.category} Fee</h3>
                  <p className="text-2xl font-black mt-2">
                    ₹{pay.amount.toLocaleString()}
                  </p>
                </div>
              )) : (
                <div className="bg-slate-100 border-2 border-dashed p-12 rounded-2xl text-center text-slate-400">
                  No payments found.
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}