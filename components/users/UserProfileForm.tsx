'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function UserProfileForm({ user = null }) {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    team: user?.team || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Mock API call - in real app, this would call your backend
    console.log('Updating profile:', formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="team">Team</Label>
              <Input
                type="text"
                id="team"
                value={formData.team}
                onChange={e => setFormData({ ...formData, team: e.target.value })}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Change Password</h3>

            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                type="password"
                id="currentPassword"
                value={formData.currentPassword}
                onChange={e => setFormData({ ...formData, currentPassword: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                type="password"
                id="newPassword"
                value={formData.newPassword}
                onChange={e => setFormData({ ...formData, newPassword: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
