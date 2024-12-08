'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import WorldMap from '@/components/dashboard/WorldMap'
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Mock data for charts
const resourceData = [
  { name: 'Instance 1', cpu: 65, memory: 45, storage: 80 },
  { name: 'Instance 2', cpu: 45, memory: 55, storage: 60 },
  { name: 'Instance 3', cpu: 85, memory: 75, storage: 70 },
  { name: 'Instance 4', cpu: 55, memory: 85, storage: 50 },
  { name: 'Instance 5', cpu: 75, memory: 65, storage: 90 },
  { name: 'Instance 6', cpu: 95, memory: 95, storage: 85 },
]

const timeSeriesData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  cpu: Math.floor(Math.random() * 40) + 30,
  memory: Math.floor(Math.random() * 30) + 40,
}))

// Mock data for datacenters
const datacenterLocations = [
  { name: 'US East', lat: 37.7749, lng: -122.4194, size: 1.5 },
  { name: 'US West', lat: 40.7128, lng: -74.0060, size: 1.2 },
  { name: 'Europe', lat: 51.5074, lng: -0.1278, size: 1.3 },
  { name: 'Asia Pacific', lat: 35.6762, lng: 139.6503, size: 1.4 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, size: 1.1 },
  { name: 'Australia', lat: -33.8688, lng: 151.2093, size: 1 },
  { name: 'India', lat: 19.0760, lng: 72.8777, size: 1.2 },
  { name: 'Brazil', lat: -23.5505, lng: -46.6333, size: 1 },
]

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Total Resources', value: '24' },
            { title: 'Active Services', value: '8' },
            { title: 'Running Instances', value: '16/20' },
            { title: 'System Health', value: '98%' },
          ].map((stat) => (
            <div
              key={stat.title}
              className="bg-card text-card-foreground overflow-hidden rounded-lg border border-border/30 hover:border-border/60 transition-colors"
            >
              <div className="px-6 py-6 flex flex-col items-center text-center">
                <dt className="text-base font-semibold text-muted-foreground">
                  {stat.title}
                </dt>
                <dd className="mt-2 text-4xl font-bold tracking-tight">
                  {stat.value}
                </dd>
              </div>
            </div>
          ))}
        </div>

        {/* Global Datacenter Distribution */}
        <div className="bg-card text-card-foreground rounded-lg border border-border/30">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Global Datacenter Distribution
            </h3>
            <div className="relative">
              <WorldMap
                locations={[
                  { name: "San Francisco", lat: 37.7749, lng: -122.4194, size: 2 },
                  { name: "New York", lat: 40.7128, lng: -74.0060, size: 2 },
                  { name: "London", lat: 51.5074, lng: -0.1278, size: 2 },
                  { name: "Singapore", lat: 1.3521, lng: 103.8198, size: 2 },
                  { name: "Tokyo", lat: 35.6762, lng: 139.6503, size: 2 },
                  { name: "Sydney", lat: -33.8688, lng: 151.2093, size: 1 },
                  { name: "Frankfurt", lat: 50.1109, lng: 8.6821, size: 1 },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Resource Usage Chart */}
        <div className="bg-card text-card-foreground p-6 rounded-lg border border-border/30">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Top Instance Resource Usage
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resourceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cpu" fill="#8884d8" name="CPU %" />
                <Bar dataKey="memory" fill="#82ca9d" name="Memory %" />
                <Bar dataKey="storage" fill="#ffc658" name="Storage %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Time Series Chart */}
        <div className="bg-card text-card-foreground p-6 rounded-lg border border-border/30">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            System Performance (24h)
          </h3>
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
                  dataKey="cpu"
                  stroke="#8884d8"
                  name="CPU Usage %"
                />
                <Line
                  type="monotone"
                  dataKey="memory"
                  stroke="#82ca9d"
                  name="Memory Usage %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
