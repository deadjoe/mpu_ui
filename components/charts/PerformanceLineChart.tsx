'use client'

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

interface PerformanceData {
  time: string
  qps: number
  tps: number
  latency: number
}

interface PerformanceLineChartProps {
  data: PerformanceData[]
}

const chartConfig = {
  qps: {
    label: 'QPS',
    color: 'hsla(200, 70%, 50%, 0.2)', // 透明蓝色
    stroke: 'hsl(200, 70%, 50%)',
  },
  tps: {
    label: 'TPS',
    color: 'hsla(45, 90%, 55%, 0.2)', // 透明明亮黄色
    stroke: 'hsl(45, 90%, 55%)', // 明亮黄色
  },
  latency: {
    label: 'Latency',
    color: 'hsla(350, 70%, 50%, 0.2)', // 透明红色
    stroke: 'hsl(350, 70%, 50%)',
  },
}

export default function PerformanceLineChart({ data }: PerformanceLineChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="!aspect-none h-full w-full [&_.recharts-cartesian-grid-horizontal_line]:stroke-border [&_.recharts-cartesian-grid-vertical_line]:stroke-border"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 40, right: 30, bottom: 80, left: 30 }}
          syncId="performance"
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
          <XAxis
            dataKey="time"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={10}
            interval={1}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis fontSize={12} tickLine={false} axisLine={false} dx={-10} />
          <Tooltip
            content={
              <ChartTooltipContent
                formatter={(value: number, name: string) => {
                  if (name === 'Latency') {
                    return `${value}ms`
                  }
                  return `${value}/s`
                }}
              />
            }
          />
          <Legend
            verticalAlign="top"
            height={36}
            fontSize={12}
            wrapperStyle={{
              paddingBottom: '20px',
            }}
          />
          <Area
            type="monotone"
            dataKey="qps"
            name={chartConfig.qps.label}
            stroke={chartConfig.qps.stroke}
            fill={chartConfig.qps.color}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="tps"
            name={chartConfig.tps.label}
            stroke={chartConfig.tps.stroke}
            fill={chartConfig.tps.color}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="latency"
            name={chartConfig.latency.label}
            stroke={chartConfig.latency.stroke}
            fill={chartConfig.latency.color}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
