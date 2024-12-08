'use client'

import { useState } from 'react'
import { Host } from './HostForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'

export type HostGroup = {
  id?: string
  name: string
  description: string
  hosts: Host[]
}

interface HostGroupFormProps {
  hostGroup?: HostGroup
  availableHosts: Host[]
  onSubmit: (data: HostGroup) => void
  onCancel: () => void
}

export default function HostGroupForm({
  hostGroup,
  availableHosts,
  onSubmit,
  onCancel,
}: HostGroupFormProps) {
  const [formData, setFormData] = useState<HostGroup>({
    name: hostGroup?.name || '',
    description: hostGroup?.description || '',
    hosts: hostGroup?.hosts || [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleHostToggle = (host: Host) => {
    const isHostSelected = formData.hosts.some(h => h.id === host.id)
    if (isHostSelected) {
      setFormData({
        ...formData,
        hosts: formData.hosts.filter(h => h.id !== host.id),
      })
    } else {
      setFormData({
        ...formData,
        hosts: [...formData.hosts, host],
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Group Name</Label>
        <Input
          type="text"
          id="name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Select Hosts</Label>
        <Card>
          <CardContent className="p-0 divide-y">
            {availableHosts.map(host => (
              <div
                key={host.id}
                className="flex items-center justify-between p-4 hover:bg-accent/50"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{host.name}</p>
                  <p className="text-sm text-muted-foreground">{host.ip}</p>
                </div>
                <Checkbox
                  checked={formData.hosts.some(h => h.id === host.id)}
                  onCheckedChange={() => handleHostToggle(host)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{hostGroup ? 'Update' : 'Create'} Host Group</Button>
      </div>
    </form>
  )
}
