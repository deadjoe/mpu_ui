'use client'

import { useState, useEffect } from 'react'
import { Plus, Filter, Play, Stop, Trash2, Database } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import DashboardLayout from '@/components/layout/DashboardLayout'
import SystemMetricsChart from '@/components/charts/SystemMetricsChart'
import PerformanceLineChart from "@/components/charts/PerformanceLineChart"
import ClusterTopology from "@/components/topology/ClusterTopology"

// Define types
interface Instance {
  id: number
  name: string
  type: string
  status: 'running' | 'stopped' | 'error'
  version: string
  port: number
  uptime?: string
  memory_usage?: string
  cpu_usage?: string
  connections?: number
}

// Initial instances data
const initialInstances: Instance[] = [
  {
    id: 1,
    name: "MongoDB",
    type: "MongoDB",
    status: "running",
    version: "6.0.12",
    port: 27017,
    uptime: "5d 12h 30m",
    memory_usage: "1.2 GB",
    cpu_usage: "2.5%",
    connections: 125
  },
  {
    id: 2,
    name: "MySQL",
    type: "MySQL",
    status: "stopped",
    version: "8.0.35",
    port: 3306,
    memory_usage: "0 GB",
    cpu_usage: "0%",
    connections: 0
  },
  {
    id: 3,
    name: "MariaDB",
    type: "MariaDB",
    status: "stopped",
    version: "10.11.5",
    port: 3307,
    memory_usage: "0 GB",
    cpu_usage: "0%",
    connections: 0
  },
  {
    id: 4,
    name: "PostgreSQL",
    type: "PostgreSQL",
    status: "stopped",
    version: "16.1",
    port: 5432,
    memory_usage: "0 GB",
    cpu_usage: "0%",
    connections: 0
  },
  {
    id: 5,
    name: "ElasticSearch",
    type: "ElasticSearch",
    status: "stopped",
    version: "8.11.1",
    port: 9200,
    memory_usage: "0 GB",
    cpu_usage: "0%",
    connections: 0
  },
  {
    id: 6,
    name: "Kafka",
    type: "Kafka",
    status: "running",
    version: "3.6.1",
    port: 9092,
    uptime: "2d 8h 15m",
    memory_usage: "2.1 GB",
    cpu_usage: "3.2%",
    connections: 85
  },
  {
    id: 7,
    name: "Pulsar",
    type: "Pulsar",
    status: "running",
    version: "3.1.1",
    port: 6650,
    uptime: "2d 8h 15m",
    memory_usage: "1.8 GB",
    cpu_usage: "2.8%",
    connections: 62
  },
  {
    id: 8,
    name: "Zookeeper",
    type: "Zookeeper",
    status: "running",
    version: "3.9.1",
    port: 2181,
    uptime: "2d 8h 15m",
    memory_usage: "512 MB",
    cpu_usage: "1.2%",
    connections: 28
  }
]

// Mock data for metrics
const generateMetricsData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    time: new Date(Date.now() - (29 - i) * 240000).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    }),
    cpu: Math.floor(Math.random() * 40) + 30,     // 30-70%
    memory: Math.floor(Math.random() * 30) + 40,  // 40-70%
    io: Math.floor(Math.random() * 25) + 15,      // 15-40%
    network: Math.floor(Math.random() * 35) + 25, // 25-60%
    swap: Math.floor(Math.random() * 15) + 5,     // 5-20%
    iops: Math.floor(Math.random() * 40) + 20,    // 20-60%
  }))
}

// Mock data for performance metrics
const generatePerformanceData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    time: new Date(Date.now() - (29 - i) * 240000).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    }),
    qps: Math.floor(Math.random() * 1000) + 500,    // 500-1500 QPS
    tps: Math.floor(Math.random() * 800) + 300,     // 300-1100 TPS
    latency: Math.floor(Math.random() * 50) + 10,   // 10-60ms
  }))
}

export default function Page() {
  const [instances, setInstances] = useState<Instance[]>(initialInstances)
  const [selectedInstanceId, setSelectedInstanceId] = useState<number | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [metricsData, setMetricsData] = useState(generateMetricsData())
  const [performanceData, setPerformanceData] = useState(generatePerformanceData())

  // 从instances中获取选中的实例
  const selectedInstance = selectedInstanceId 
    ? instances.find(instance => instance.id === selectedInstanceId) 
    : null

  // 每分钟更新一次性能数据
  useEffect(() => {
    const interval = setInterval(() => {
      setMetricsData(generateMetricsData())
      setPerformanceData(generatePerformanceData())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  // 更新实例状态的函数
  const updateInstanceStatus = (instanceId: number, newStatus: 'running' | 'stopped' | 'error') => {
    const newInstances = instances.map(instance => {
      if (instance.id === instanceId) {
        return { ...instance, status: newStatus }
      }
      return instance
    })
    setInstances(newInstances)
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-2rem)]">
        <div className="flex h-full">
          {/* Left sidebar - Instance List */}
          <div className="w-80 bg-background border-r border-border overflow-y-auto">
            <div className="p-4">
              <Button
                onClick={() => setShowCreateModal(true)}
                className="w-full"
                variant="secondary"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Instance
              </Button>
            </div>
            <div className="px-4 py-2 border-t border-b border-border">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select defaultValue="all">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Services" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    <SelectItem value="mysql">MySQL</SelectItem>
                    <SelectItem value="redis">Redis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <ul className="divide-y divide-border">
              {instances.map((instance) => (
                <li
                  key={instance.id}
                  className={cn(
                    "p-4 cursor-pointer hover:bg-muted",
                    selectedInstanceId === instance.id ? "bg-muted" : ""
                  )}
                  onClick={() => setSelectedInstanceId(instance.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Database className="h-6 w-6 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {instance.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {instance.type} {instance.version}
                        </p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        instance.status === 'running'
                          ? "bg-green-500/20 text-green-400"
                          : instance.status === 'stopped'
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                      )}
                    >
                      {instance.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Main content - Instance Details */}
          {selectedInstance ? (
            <div className="flex-1 bg-background p-6 overflow-y-auto">
              <div className="bg-card shadow-sm rounded-lg border border-border">
                {/* Instance Header */}
                <div className="px-6 py-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {selectedInstance.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {selectedInstance.type} {selectedInstance.version}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {selectedInstance.status === 'stopped' ? (
                        <Button 
                          variant="secondary"
                          onClick={() => updateInstanceStatus(selectedInstance.id, 'running')}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Start
                        </Button>
                      ) : (
                        <Button 
                          variant="destructive"
                          onClick={() => updateInstanceStatus(selectedInstance.id, 'stopped')}
                        >
                          <Stop className="h-4 w-4 mr-2" />
                          Stop
                        </Button>
                      )}
                      <Button variant="destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Instance Details */}
                <div className="px-6 py-4 grid grid-cols-3 gap-4">
                  <div className="col-span-3 grid grid-cols-3 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-muted-foreground">Port</h4>
                      <p className="mt-1 text-2xl font-semibold text-foreground">
                        {selectedInstance.port}
                      </p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-muted-foreground">Uptime</h4>
                      <p className="mt-1 text-2xl font-semibold text-foreground">
                        {selectedInstance.uptime || 'N/A'}
                      </p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-muted-foreground">Memory Usage</h4>
                      <p className="mt-1 text-2xl font-semibold text-foreground">
                        {selectedInstance.memory_usage || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="col-span-3 grid grid-cols-3 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-muted-foreground">CPU Usage</h4>
                      <p className="mt-1 text-lg font-semibold text-foreground">
                        {selectedInstance.cpu_usage || 'N/A'}
                      </p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-muted-foreground">Connections</h4>
                      <p className="mt-1 text-lg font-semibold text-foreground">
                        {selectedInstance.connections || 'N/A'}
                      </p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                      <p className="mt-1 text-lg font-semibold text-foreground">
                        {selectedInstance.status}
                      </p>
                    </div>
                  </div>

                  {/* System Metrics */}
                  <div className="col-span-3 bg-muted p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-muted-foreground mb-4">System Resource Usage</h4>
                    <div className="h-[450px]">
                      <SystemMetricsChart data={metricsData} />
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="col-span-3 bg-muted p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-muted-foreground mb-4">Performance Metrics</h4>
                    <div className="h-[350px]">
                      <PerformanceLineChart data={performanceData} />
                    </div>
                  </div>

                  {/* Cluster Topology */}
                  <div className="col-span-3 bg-muted p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-muted-foreground mb-4">
                      Cluster Topology - {selectedInstance.type}
                    </h4>
                    <div className="mb-2 text-sm text-muted-foreground">
                      Current cluster topology for {selectedInstance.type} instance
                    </div>
                    <ClusterTopology instanceType={selectedInstance.type} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 bg-background flex items-center justify-center">
              <p className="text-muted-foreground">Select an instance to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Instance Modal */}
      {showCreateModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
            </div>
            <div className="inline-block align-bottom bg-background rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 border border-border">
              <div>
                <h3 className="text-lg font-medium text-foreground">Create New Instance</h3>
                {/* Add your form fields here */}
                <Button
                  onClick={() => setShowCreateModal(false)}
                  className="mt-4 w-full"
                  variant="secondary"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
