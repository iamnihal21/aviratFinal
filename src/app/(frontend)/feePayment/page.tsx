
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/app/(frontend)/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/(frontend)/components/ui/card'
import { Input } from '@/app/(frontend)/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/(frontend)/components/ui/select'
import {
  CreditCard,
  Shield,
  Lock,
  CheckCircle2,
  Building2,
  Wallet,
} from 'lucide-react'

export default function FeePaymentPage() {
  const [categories, setCategories] = useState<{label: string, value: string}[]>([])
  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    email: '',
    phone: '',
    category: '',
    amount: '',
  })

  // Fetch fee configurations/categories from Payload
  useEffect(() => {
    const fetchFeeSettings = async () => {
      try {
        const response = await fetch('/api/globals/home-settings') // Or your specific 'Payments' collection
        const data = await response.json()
        // Assuming you added a fee structure to HomeSettings or a dedicated global
        if (data.feeStructure) {
          setCategories(data.feeStructure.map((f: any) => ({ label: f.name, value: f.slug })))
        } else {
          // Fallback to defaults if DB is empty
          setCategories([
            { value: 'tuition', label: 'Tuition Fee' },
            { value: 'hostel', label: 'Hostel Fee' },
          ])
        }
      } catch (error) {
        console.error("Failed to fetch fee categories", error)
      }
    }
    fetchFeeSettings()
  }, [])

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    // Logic to send payment record to 'Payments' collection
    const res = await fetch('/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, status: 'pending' })
    })
    if (res.ok) alert("Redirecting to gateway...")
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <Card className="border-none shadow-2xl">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-xl">
            <CardTitle className="text-2xl">Student Fee Portal</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Securely pay your academic and campus fees online.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handlePayment} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Student ID</label>
                  <Input 
                    required 
                    placeholder="e.g. AVI2024001" 
                    onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fee Category</label>
                  <Select onValueChange={(v) => setFormData({...formData, category: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount (INR)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">₹</span>
                  <Input 
                    type="number" 
                    className="pl-8" 
                    placeholder="0.00"
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 text-lg">
                Proceed to Pay
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}