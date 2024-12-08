'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { User, KeyRound } from 'lucide-react'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Mock authentication - in real app, this would call an API
    if (username === 'admin' && password === 'admin') {
      router.push('/dashboard')
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">Login</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Username
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <KeyRound className="h-4 w-4" />
              Password
            </Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
