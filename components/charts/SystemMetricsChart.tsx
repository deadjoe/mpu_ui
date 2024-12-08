'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

interface MetricsData {
  time: string
  cpu: number
  memory: number
  io: number
  network: number
  swap: number
  iops: number
}

interface SystemMetricsChartProps {
  data: MetricsData[]
}

const chartConfig = {
  cpu: {
    label: 'CPU',
    color: 'hsl(346, 77%, 49%)', // 深色主题友好的红色
  },
  memory: {
    label: 'Memory',
    color: 'hsl(0 0% 90%)', // 非常亮的灰
  },
  io: {
    label: 'I/O',
    color: 'hsl(0 0% 82%)', // 亮灰
  },
  network: {
    label: 'Network',
    color: 'hsl(0 0% 74%)', // 中灰偏亮
  },
  swap: {
    label: 'Swap',
    color: 'hsl(0 0% 66%)', // 中灰
  },
  iops: {
    label: 'IOPS',
    color: 'hsl(0 0% 58%)', // 中灰偏暗
  },
}

export default function SystemMetricsChart({ data }: SystemMetricsChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="!aspect-none h-full w-full [&_.recharts-cartesian-grid-horizontal_line]:stroke-border [&_.recharts-cartesian-grid-vertical_line]:stroke-border"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 40, right: 30, bottom: 80, left: 30 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
          <XAxis
            dataKey="time"
            fontSize={13}
            tickLine={false}
            axisLine={false}
            dy={10}
            interval={1}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            fontSize={13}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
            unit="%"
            dx={-10}
            width={50}
          />
          <Tooltip content={<ChartTooltipContent formatter={(value: number) => `${value}%`} />} />
          <Legend
            verticalAlign="top"
            height={40}
            fontSize={13}
            iconSize={12}
            wrapperStyle={{
              paddingBottom: '20px',
            }}
          />
          <Bar
            dataKey="cpu"
            name={chartConfig.cpu.label}
            fill={chartConfig.cpu.color}
            radius={[4, 4, 0, 0]}
            maxBarSize={16}
          />
          <Bar
            dataKey="memory"
            name={chartConfig.memory.label}
            fill={chartConfig.memory.color}
            radius={[4, 4, 0, 0]}
            maxBarSize={16}
          />
          <Bar
            dataKey="io"
            name={chartConfig.io.label}
            fill={chartConfig.io.color}
            radius={[4, 4, 0, 0]}
            maxBarSize={16}
          />
          <Bar
            dataKey="network"
            name={chartConfig.network.label}
            fill={chartConfig.network.color}
            radius={[4, 4, 0, 0]}
            maxBarSize={16}
          />
          <Bar
            dataKey="swap"
            name={chartConfig.swap.label}
            fill={chartConfig.swap.color}
            radius={[4, 4, 0, 0]}
            maxBarSize={16}
          />
          <Bar
            dataKey="iops"
            name={chartConfig.iops.label}
            fill={chartConfig.iops.color}
            radius={[4, 4, 0, 0]}
            maxBarSize={16}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
