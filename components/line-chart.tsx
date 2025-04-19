"use client"

import { useState } from "react"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LineChartProps {
  title: string
  data: any[]
  lines: {
    dataKey: string
    stroke: string
    name: string
  }[]
  xAxisDataKey: string
  height?: number
  timeRangeFilter?: boolean
}

export function LineChart({ title, data, lines, xAxisDataKey, height = 350, timeRangeFilter = true }: LineChartProps) {
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
            <RechartsLineChart
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
              {lines.map((line, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={line.dataKey}
                  stroke={line.stroke}
                  name={line.name}
                  activeDot={{ r: 8 }}
                />
              ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
