import Image from "next/image"

interface InvoiceHeaderProps {
  invoiceNumber: string
  date: string
  patientName: string
  patientId: string
}

export default function InvoiceHeader({ invoiceNumber, date, patientName, patientId }: InvoiceHeaderProps) {
  return (
    <div className="w-full border-b border-gray-200 pb-4 mb-6 print:mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 relative">
            <Image
              src="/images/logo (2).jpeg"
              alt="New Bawa Lal Ji Hospital"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#c64b7a]">NEW BAWA LAL JI HOSPITAL</h1>
            <p className="text-sm text-gray-600">Khehra Road, Dhianpur (Gurdaspur)</p>
            <p className="text-xs text-gray-500">Your Health, Our Commitment</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">Invoice #: {invoiceNumber}</p>
          <p className="text-sm text-gray-600">Date: {date}</p>
          <p className="text-sm text-gray-600">Patient ID: {patientId}</p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-bold text-center">INVOICE</h2>
        <p className="text-sm text-gray-600 text-center">Patient: {patientName}</p>
      </div>
    </div>
  )
}
