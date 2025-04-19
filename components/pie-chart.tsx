"use client"

import { useState } from "react"
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PieChartProps {
  title: string
  data: any[]
  dataKey: string
  nameKey: string
  colors: string[]
  height?: number
  timeRangeFilter?: boolean
  innerRadius?: number
  outerRadius?: number
}

export function PieChart({
  title,
  data,
  dataKey,
  nameKey,
  colors,
  height = 350,
  timeRangeFilter = true,
  innerRadius = 0,
  outerRadius = 80,
}: PieChartProps) {
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
            <RechartsPieChart>
              <Pie
                data={filteredData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                dataKey={dataKey}
                nameKey={nameKey}
              >
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}`, ""]} />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
