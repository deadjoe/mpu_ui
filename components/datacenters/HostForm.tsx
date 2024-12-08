'use client'

import { useState } from 'react'
import { Tag, X } from 'lucide-react'
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
import type { Host } from '@/types/datacenter'

interface HostFormProps {
  host?: Host
  onSubmit: (data: Host) => void
  onCancel: () => void
}

export default function HostForm({ host, onSubmit, onCancel }: HostFormProps) {
  const [formData, setFormData] = useState<Host>({
    name: host?.name || '',
    ip: host?.ip || '',
    type: host?.type || 'physical',
    description: host?.description || '',
    tags: host?.tags || [],
    status: host?.status || 'stopped',
  })

  const [newTag, setNewTag] = useState('')

  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag],
      })
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Host Name</Label>
        <Input
          type="text"
          id="name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ip">IP Address</Label>
        <Input
          type="text"
          id="ip"
          value={formData.ip}
          onChange={e => setFormData({ ...formData, ip: e.target.value })}
          required
          pattern="^(\d{1,3}\.){3}\d{1,3}$"
          placeholder="192.168.1.100"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <Select
          value={formData.type}
          onValueChange={(value: 'physical' | 'virtualized') =>
            setFormData({ ...formData, type: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select host type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="physical">Physical</SelectItem>
            <SelectItem value="virtualized">Virtualized</SelectItem>
          </SelectContent>
        </Select>
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
        <Label>Tags</Label>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={newTag}
            onChange={e => setNewTag(e.target.value)}
            placeholder="Add a tag"
          />
          <Button type="button" onClick={handleAddTag} variant="secondary">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 hover:text-secondary-foreground/70"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{host ? 'Update' : 'Create'} Host</Button>
      </div>
    </form>
  )
}
