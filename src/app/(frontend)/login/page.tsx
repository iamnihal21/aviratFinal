'use client'
import React, { useState } from 'react'

export default function StudentLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/students/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        // Payload sets the 'payload-token' cookie automatically
        window.location.href = '/StudentPortal' 
      } else {
        // Payload returns errors in an array
        setError(data.errors?.[0]?.message || 'Invalid Email or Password')
      }
    } catch (err) {
      setError('Connection failed. Please check your internet or server status.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 font-sans pt-24">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Student Portal</h1>
          <p className="text-slate-500 mt-2">Sign in to access results and fees</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-lg animate-pulse">
            <span className="font-bold">Error:</span> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
              placeholder="12345@college.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-100 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
          >
            {loading ? 'Verifying...' : 'Login to Dashboard'}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-slate-400 italic">
          Default password is College@ followed by the last 4 digits of your registered phone number.
        </p>
      </div>
    </div>
  )
}