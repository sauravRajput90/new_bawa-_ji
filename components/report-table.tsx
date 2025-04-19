"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Download, Printer } from "lucide-react"

interface Column {
  key: string
  header: string
  cell?: (row: any) => React.ReactNode
  className?: string
}

interface ReportTableProps {
  title: string
  data: any[]
  columns: Column[]
  pageSize?: number
  onExport?: () => void
  onPrint?: () => void
  showActions?: boolean
  badge?: {
    text: string
    variant?: "default" | "secondary" | "destructive" | "outline"
  }
}

export function ReportTable({
  title,
  data,
  columns,
  pageSize = 10,
  onExport,
  onPrint,
  showActions = true,
  badge,
}: ReportTableProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, data.length)
  const currentData = data.slice(startIndex, endIndex)

  const handleExport = () => {
    if (onExport) {
      onExport()
    } else {
      alert("Exporting table data...")
    }
  }

  const handlePrint = () => {
    if (onPrint) {
      onPrint()
    } else {
      alert("Printing table data...")
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {badge && (
            <Badge className="ml-2 bg-cyan-600" variant={badge.variant}>
              {badge.text}
            </Badge>
          )}
        </div>

        {showActions && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead key={index} className={column.className}>
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.length > 0 ? (
                currentData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((column, colIndex) => (
                      <TableCell key={colIndex} className={column.className}>
                        {column.cell ? column.cell(row) : row[column.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-4 text-gray-500">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {data.length > pageSize && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1} to {endIndex} of {data.length} entries
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous Page</span>
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next Page</span>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
