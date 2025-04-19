"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Download, Printer, X } from "lucide-react"

interface InvoiceViewModalProps {
  isOpen: boolean
  onClose: () => void
  invoice: any
  onMarkAsPaid: (invoiceId: string) => void
  onPrint: () => void
  onDownload: () => void
}

export function InvoiceViewModal({
  isOpen,
  onClose,
  invoice,
  onMarkAsPaid,
  onPrint,
  onDownload,
}: InvoiceViewModalProps) {
  if (!invoice) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center dark:text-white">
            <span>Invoice #{invoice.id}</span>
            <Badge
              className={
                invoice.status === "Paid"
                  ? "bg-green-500"
                  : invoice.status === "Pending"
                    ? "bg-yellow-500"
                    : invoice.status === "Unpaid"
                      ? "bg-red-500"
                      : "bg-gray-500"
              }
            >
              {invoice.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invoice Header */}
          <div className="flex flex-col md:flex-row justify-between gap-4 border-b pb-4 dark:border-gray-700">
            <div>
              <h3 className="font-bold text-lg dark:text-white">New Bawa Lal Ji Hospital</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Khehra Road, Dhianpur</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Gurdaspur</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">+91 99152-15406</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium dark:text-gray-300">Invoice Date:</span> {invoice.date}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium dark:text-gray-300">Due Date:</span> {invoice.dueDate || "N/A"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium dark:text-gray-300">Payment Method:</span>{" "}
                {invoice.paymentMethod || "Not specified"}
              </p>
            </div>
          </div>

          {/* Patient & Doctor Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <h4 className="font-medium text-gray-700 dark:text-gray-300">Patient Information</h4>
              <p className="font-bold text-gray-900 dark:text-white">{invoice.patient}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">ID: {invoice.patientId}</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-medium text-gray-700 dark:text-gray-300">Doctor Information</h4>
              <p className="font-bold text-gray-900 dark:text-white">{invoice.doctor || "Not specified"}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Department: {invoice.department || "Not specified"}
              </p>
            </div>
          </div>

          {/* Invoice Items */}
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Services</h4>
            <div className="border rounded-md overflow-hidden dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Qty
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Rate
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {invoice.items ? (
                    invoice.items.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">{item.description}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">{item.quantity}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right dark:text-gray-300">
                          ₹{item.rate.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right dark:text-gray-300">
                          ₹{item.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">{invoice.service}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">1</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right dark:text-gray-300">
                        ₹{invoice.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right dark:text-gray-300">
                        ₹{invoice.amount.toFixed(2)}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Invoice Summary */}
          <div className="flex flex-col items-end space-y-2 pt-4 border-t dark:border-gray-700">
            <div className="flex justify-between w-full md:w-1/2">
              <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
              <span className="font-medium dark:text-white">₹{(invoice.subtotal || invoice.amount).toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-full md:w-1/2">
              <span className="text-gray-600 dark:text-gray-400">Tax:</span>
              <span className="dark:text-white">₹{(invoice.tax || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-full md:w-1/2">
              <span className="text-gray-600 dark:text-gray-400">Discount:</span>
              <span className="dark:text-white">₹{(invoice.discount || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-full md:w-1/2 border-t pt-2 dark:border-gray-700">
              <span className="font-bold text-gray-800 dark:text-white">Total:</span>
              <span className="font-bold text-gray-800 dark:text-white">
                ₹{(invoice.total || invoice.amount).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="border-t pt-4 dark:border-gray-700">
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.notes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap justify-end gap-2 pt-4 border-t dark:border-gray-700">
            <Button variant="outline" onClick={onClose} className="dark:border-gray-600 dark:text-gray-300">
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
            <Button variant="outline" onClick={onPrint} className="dark:border-gray-600 dark:text-gray-300">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" onClick={onDownload} className="dark:border-gray-600 dark:text-gray-300">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            {(invoice.status === "Pending" || invoice.status === "Unpaid") && (
              <Button
                onClick={() => onMarkAsPaid(invoice.id)}
                className="bg-gradient-to-r from-teal-500 to-cyan-600 dark:from-teal-600 dark:to-cyan-700 text-white"
              >
                <Check className="h-4 w-4 mr-2" />
                Mark as Paid
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
