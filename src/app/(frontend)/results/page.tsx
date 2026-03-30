'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/app/(frontend)/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/(frontend)/components/ui/card'
import { Input } from '@/app/(frontend)/components/ui/input'
import { Lock, KeyRound, AlertCircle } from 'lucide-react'


export default function ResultsPage() {
  const [step, setStep] = useState<'LOGIN' | 'CHANGE_PASSWORD' | 'VIEW_RESULTS'>('LOGIN')
  const [authData, setAuthData] = useState({ email: '', password: '', newPassword: '' })
  const [studentData, setStudentData] = useState<any>(null)
  const [results, setResults] = useState<any[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // ✅ LOGIN
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/students/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // 🔥 IMPORTANT
        body: JSON.stringify({
          email: authData.email,
          password: authData.password,
        }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error('Invalid Credentials')

      setStudentData(data.user)

      if (data.user.needsPasswordChange) {
        setStep('CHANGE_PASSWORD')
      } else {
        fetchResults(data.user.id)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // ✅ UPDATE PASSWORD
  const handleUpdatePassword = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)

  try {
    const res = await fetch(`/api/students/${studentData.id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
      },
      // Ensure we are sending ONLY what is needed to reduce validation errors
      body: JSON.stringify({
        password: authData.newPassword,
        needsPasswordChange: false,
      }),
      // This is crucial for authentication in Next.js
      credentials: 'include', 
    })

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.errors?.[0]?.message || 'Failed to update password')
    }

    // After success, re-fetch results
    fetchResults(studentData.id)
  } catch (err: any) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

  // ✅ FETCH RESULTS
  const fetchResults = async (studentId: string) => {
    try {
      const res = await fetch(
        `/api/results?where[student][equals]=${studentId}`,
        {
          credentials: 'include', // 🔥 IMPORTANT
        }
      )

      const data = await res.json()
      setResults(data.docs || [])
      setStep('VIEW_RESULTS')
    } catch {
      setError('Failed to fetch results')
    }
  }

  return (
    <main className="min-h-screen pt-32 pb-20 bg-secondary/10">
      <div className="max-w-md mx-auto px-6">
        
        {/* LOGIN */}
        {step === 'LOGIN' && (
          <Card className="shadow-2xl">
            <CardHeader className="text-center">
              <Lock className="w-10 h-10 text-primary mx-auto mb-2" />
              <CardTitle>Student Portal</CardTitle>
              <CardDescription>Login with your registered email</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input 
                  placeholder="Email" 
                  value={authData.email}
                  onChange={(e) => setAuthData({...authData, email: e.target.value})}
                  required 
                />
                <Input 
                  type="password" 
                  placeholder="Initial Password" 
                  value={authData.password}
                  onChange={(e) => setAuthData({...authData, password: e.target.value})}
                  required 
                />
                <Button className="w-full" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
                {error && <p className="text-red-500 text-xs text-center">{error}</p>}
              </form>
            </CardContent>
          </Card>
        )}

        {/* CHANGE PASSWORD */}
        {step === 'CHANGE_PASSWORD' && (
          <Card className="border-primary shadow-2xl">
            <CardHeader>
              <div className="flex items-center gap-2 text-primary mb-2">
                <KeyRound className="w-5 h-5" />
                <span className="font-bold uppercase text-xs tracking-widest">Security Update</span>
              </div>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>First-time users must set a new secure password.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="p-3 bg-blue-50 text-blue-700 rounded-lg text-sm flex gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Your old initial password will be deactivated.
                </div>
                <Input 
                  type="password" 
                  placeholder="New Secure Password" 
                  value={authData.newPassword}
                  onChange={(e) => setAuthData({...authData, newPassword: e.target.value})}
                  required 
                  minLength={8}
                />
                <Button className="w-full h-11">
                  {loading ? 'Updating...' : 'Update & View Result'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* VIEW RESULTS */}
        {step === 'VIEW_RESULTS' && (
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle>Your Results</CardTitle>
            </CardHeader>
            <CardContent>
              {results.length === 0 ? (
                <p>No results found</p>
              ) : (
                results.map((r, i) => (
                  <div key={i} className="border-b py-2">
                    Semester: {r.semester} | SGPA: {r.sgpa}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        )}

      </div>
    </main>
  )
}