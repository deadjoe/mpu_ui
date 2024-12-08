'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface Metric {
  time: string
  cpu: number
  memory: number
}

interface MetricsChartProps {
  data: Metric[]
}

export default function MetricsChart({ data }: MetricsChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis
          dataKey="time"
          stroke="#9ca3af"
          tick={{ fill: '#d1d5db' }}
          tickLine={{ stroke: '#9ca3af' }}
        />
        <YAxis stroke="#9ca3af" tick={{ fill: '#d1d5db' }} tickLine={{ stroke: '#9ca3af' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1f2937',
            border: '1px solid #374151',
            borderRadius: '6px',
            color: '#f3f4f6',
            padding: '8px',
          }}
          labelStyle={{ color: '#d1d5db' }}
        />
        <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} name="CPU Usage %" />
        <Line
          type="monotone"
          dataKey="memory"
          stroke="#22c55e"
          strokeWidth={2}
          name="Memory Usage %"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
