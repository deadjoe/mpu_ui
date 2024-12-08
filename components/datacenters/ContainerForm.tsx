'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Container } from '@/types/datacenter'

interface ContainerFormProps {
  container?: Container
  onSubmit: (data: Container) => void
  onCancel: () => void
}

export default function ContainerForm({ container, onSubmit, onCancel }: ContainerFormProps) {
  const [formData, setFormData] = useState<Container>({
    name: container?.name || '',
    image: container?.image || '',
    status: container?.status || 'stopped',
    hostId: container?.hostId || '',
    ports: container?.ports || [],
    environment: container?.environment || {},
    description: container?.description || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Container Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={e => setFormData({ ...formData, image: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value: 'running' | 'stopped' | 'paused') =>
            setFormData({ ...formData, status: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="running">Running</SelectItem>
            <SelectItem value="stopped">Stopped</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ports">Ports (comma separated)</Label>
        <Input
          id="ports"
          value={formData.ports.join(', ')}
          onChange={e =>
            setFormData({
              ...formData,
              ports: e.target.value.split(',').map(p => p.trim()),
            })
          }
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

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{container ? 'Update' : 'Create'} Container</Button>
      </div>
    </form>
  )
}
