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

export function LoginForm({ actionClassName }: Props) {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email.trim() || !password) {
      setError('Enter your email and password.')
      return
    }
    await login(email.trim(), password)
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
    setError('Sign-in did not complete. Check your details and try again.')
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="h-12 rounded-xl"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="login-password">Password</Label>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="h-12 rounded-xl"
        />
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <Button type="submit" disabled={isLoading} className={`h-12 rounded-full text-sm font-semibold ${actionClassName}`}>
        {isLoading ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}
