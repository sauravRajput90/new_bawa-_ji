"use client"

import { useState } from "react"
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BarChartProps {
  title: string
  data: any[]
  bars: {
    dataKey: string
    fill: string
    name: string
  }[]
  xAxisDataKey: string
  height?: number
  timeRangeFilter?: boolean
  stacked?: boolean
}

export function BarChart({
  title,
  data,
  bars,
  xAxisDataKey,
  height = 350,
  timeRangeFilter = true,
  stacked = false,
}: BarChartProps) {
  const [timeRange, setTimeRange] = useState("month")

  // In a real app, this would filter data based on the selected time range
  const filteredData = data

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {timeRangeFilter && (
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={filteredData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisDataKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {bars.map((bar, index) => (
                <Bar
                  key={index}
                  dataKey={bar.dataKey}
                  fill={bar.fill}
                  name={bar.name}
                  stackId={stacked ? "stack" : undefined}
                />
              ))}
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
