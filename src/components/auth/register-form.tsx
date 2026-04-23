'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { storageKeys } from '@/lib/local-storage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Props = {
  actionClassName: string
}

export function RegisterForm({ actionClassName }: Props) {
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!name.trim() || !email.trim() || !password) {
      setError('Fill in your name, email, and password.')
      return
    }
    await signup(name.trim(), email.trim(), password)
    if (typeof window !== 'undefined') {
      const raw = window.localStorage.getItem(storageKeys.user)
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as { email?: string }
          if (parsed?.email === email.trim()) {
            router.push('/')
            router.refresh()
            return
          }
        } catch {
          /* ignore */
        }
      }
    }
    setError('Registration did not complete. Try again.')
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="register-name">Full name</Label>
        <Input id="register-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Morgan" className="h-12 rounded-xl" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-email">Email</Label>
        <Input id="register-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="h-12 rounded-xl" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-password">Password</Label>
        <Input id="register-password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="h-12 rounded-xl" />
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <Button type="submit" disabled={isLoading} className={`h-12 rounded-full text-sm font-semibold ${actionClassName}`}>
        {isLoading ? 'Creating account…' : 'Create account'}
      </Button>
    </form>
  )
}
