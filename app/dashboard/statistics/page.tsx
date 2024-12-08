'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Treemap,
  ComposedChart,
  RadialBarChart,
  RadialBar,
  FunnelChart,
  Funnel,
  LabelList,
  ScatterChart,
  Scatter,
} from 'recharts'

// Mock data
const resourceUsageData = [
  { name: 'MySQL', cpu: 65, memory: 45, storage: 80 },
  { name: 'PostgreSQL', cpu: 45, memory: 55, storage: 60 },
  { name: 'Redis', cpu: 85, memory: 75, storage: 70 },
  { name: 'MongoDB', cpu: 55, memory: 85, storage: 50 },
  { name: 'Elasticsearch', cpu: 75, memory: 65, storage: 90 },
]

const instanceStatusData = [
  { name: 'Running', value: 15 },
  { name: 'Stopped', value: 5 },
  { name: 'Failed', value: 2 },
]

const timeSeriesData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  totalCpu: Math.floor(Math.random() * 40) + 30,
  totalMemory: Math.floor(Math.random() * 30) + 40,
  activeUsers: Math.floor(Math.random() * 100) + 50,
}))

const performanceMetrics = [
  { subject: 'Response Time', A: 85, fullMark: 100 },
  { subject: 'Throughput', A: 78, fullMark: 100 },
  { subject: 'Availability', A: 95, fullMark: 100 },
  { subject: 'Error Rate', A: 88, fullMark: 100 },
  { subject: 'CPU Usage', A: 72, fullMark: 100 },
  { subject: 'Memory Usage', A: 68, fullMark: 100 },
]

const activityData = Array.from({ length: 7 }, (_, i) => ({
  date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    weekday: 'short',
  }),
  requests: Math.floor(Math.random() * 1000) + 500,
  errors: Math.floor(Math.random() * 50),
}))

const storageDistribution = [
  { name: 'Documents', size: 4096 },
  { name: 'Images', size: 2048 },
  { name: 'Videos', size: 8192 },
  { name: 'Logs', size: 1024 },
  { name: 'Backups', size: 6144 },
]

const networkTraffic = Array.from({ length: 12 }, (_, i) => ({
  time: `${i * 2}:00`,
  inbound: Math.floor(Math.random() * 800) + 200,
  outbound: Math.floor(Math.random() * 600) + 100,
}))

const serviceHealth = [
  { name: 'API Gateway', value: 98 },
  { name: 'Auth Service', value: 100 },
  { name: 'Database', value: 95 },
  { name: 'Cache', value: 99 },
  { name: 'Storage', value: 97 },
]

const errorDistribution = [
  { name: '400', value: 45 },
  { name: '401', value: 25 },
  { name: '403', value: 15 },
  { name: '404', value: 35 },
  { name: '500', value: 20 },
  { name: '502', value: 10 },
  { name: '503', value: 5 },
]

const COLORS = ['#60A5FA', '#34D399', '#FBBF24', '#F87171']
const AREA_COLORS = ['#60A5FA', '#34D399']

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState('24h')

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Statistics</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Detailed analysis of system resources and performance
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <select
              value={timeRange}
              onChange={e => setTimeRange(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-sm border rounded-md bg-background text-foreground border-input hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'Total Instances', value: '22' },
            { name: 'Active Services', value: '5' },
            { name: 'Total CPU Cores', value: '48' },
            { name: 'Total Memory (GB)', value: '256' },
          ].map(stat => (
            <div
              key={stat.name}
              className="bg-card overflow-hidden rounded-lg border border-border/30 hover:border-border/60 transition-colors"
            >
              <div className="px-6 py-6 flex flex-col items-center text-center">
                <dt className="text-base font-semibold text-muted-foreground">{stat.name}</dt>
                <dd className="mt-2 text-4xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </dd>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 gap-6">
          {/* Main Metrics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Resource Usage Chart */}
            <div className="bg-card rounded-lg p-6 border border-border/30">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Resource Usage by Service
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={resourceUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cpu" fill={COLORS[0]} name="CPU %" />
                    <Bar dataKey="memory" fill={COLORS[1]} name="Memory %" />
                    <Bar dataKey="storage" fill={COLORS[2]} name="Storage %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Resource Usage Trends */}
            <div className="bg-card rounded-lg p-6 border border-border/30">
              <h3 className="text-lg font-semibold text-foreground mb-4">Resource Usage Trends</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="totalCpu"
                      stroke={COLORS[0]}
                      name="CPU Usage %"
                    />
                    <Line
                      type="monotone"
                      dataKey="totalMemory"
                      stroke={COLORS[1]}
                      name="Memory Usage %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* System Health Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Instance Status */}
            <div className="bg-card rounded-lg p-6 border border-border/30">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Instance Status Distribution
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={instanceStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {instanceStatusData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Service Health */}
            <div className="bg-card rounded-lg p-6 border border-border/30">
              <h3 className="text-lg font-semibold text-foreground mb-4">Service Health</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={performanceMetrics}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Performance"
                      dataKey="A"
                      stroke={COLORS[0]}
                      fill={COLORS[0]}
                      fillOpacity={0.6}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Error Distribution */}
            <div className="bg-card rounded-lg p-6 border border-border/30">
              <h3 className="text-lg font-semibold text-foreground mb-4">Error Distribution</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={errorDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {errorDistribution.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Activity and Performance Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Activity */}
            <div className="bg-card rounded-lg p-6 border border-border/30">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                System Activity (Last 7 Days)
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="requests"
                      stroke={COLORS[0]}
                      name="Total Requests"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="errors"
                      stroke={COLORS[3]}
                      name="Errors"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Network Traffic */}
            <div className="bg-card rounded-lg p-6 border border-border/30">
              <h3 className="text-lg font-semibold text-foreground mb-4">Network Traffic (MB/s)</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={networkTraffic}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="inbound"
                      fill={COLORS[0]}
                      stroke={COLORS[0]}
                      fillOpacity={0.3}
                      name="Inbound"
                    />
                    <Bar dataKey="outbound" fill={COLORS[1]} name="Outbound" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Storage Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Storage Distribution */}
            <div className="bg-card rounded-lg p-6 border border-border/30">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Storage Distribution (MB)
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <Treemap
                    data={storageDistribution}
                    dataKey="size"
                    nameKey="name"
                    stroke="#374151"
                    fill={COLORS[0]}
                  >
                    <Tooltip formatter={value => `${value} MB`} />
                  </Treemap>
                </ResponsiveContainer>
              </div>
            </div>

            {/* CPU Core Distribution */}
            <div className="bg-card rounded-lg p-6 border border-border/30">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                CPU Core Load Distribution
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" dataKey="x" name="Core" />
                    <YAxis type="number" dataKey="y" name="Load" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter
                      name="CPU Cores"
                      data={Array.from({ length: 16 }, (_, i) => ({
                        x: i + 1,
                        y: Math.floor(Math.random() * 100),
                      }))}
                      fill={COLORS[0]}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
