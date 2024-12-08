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

export type DataCenter = {
  id?: string
  name: string
  description: string
  status: 'active' | 'inactive'
}

interface DataCenterFormProps {
  dataCenter?: DataCenter
  onSubmit: (data: DataCenter) => void
  onCancel: () => void
}

export default function DataCenterForm({ dataCenter, onSubmit, onCancel }: DataCenterFormProps) {
  const [formData, setFormData] = useState<DataCenter>({
    name: dataCenter?.name || '',
    description: dataCenter?.description || '',
    status: dataCenter?.status || 'active',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Data Center Name</Label>
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
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value: 'active' | 'inactive') =>
            setFormData({ ...formData, status: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{dataCenter ? 'Update' : 'Create'} Data Center</Button>
      </div>
    </form>
  )
}
