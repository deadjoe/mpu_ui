export type Host = {
  id?: string
  name: string
  ip: string
  type: 'physical' | 'virtualized'
  description: string
  tags: string[]
  status: 'running' | 'stopped' | 'initializing'
  hostGroupId?: string
  dataCenterId?: string
}

export type HostGroup = {
  id?: string
  name: string
  description: string
  hosts: Host[]
  dataCenterId?: string
}

export type DataCenter = {
  id?: string
  name: string
  location: string
  description: string
  coordinates: [number, number]
  status: 'active' | 'inactive' | 'maintenance'
}

export type Container = {
  id?: string
  name: string
  image: string
  status: 'running' | 'stopped' | 'paused'
  hostId?: string
  ports?: string[]
  environment?: { [key: string]: string }
  description?: string
}

export type NodeData = {
  label: string
  type?: string
  status?: string
  details?: {
    [key: string]: string | number | boolean
  }
}

export type BadgeVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'success'
  | 'warning'
