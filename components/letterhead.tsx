"use client"

import Image from "next/image"

export default function Letterhead() {
  return (
    <div className="border-b-2 border-gray-200 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
        <div className="relative h-25 w-25">
  <Image
    src="/images/logo (2).jpeg"
    alt="Hospital Logo"
    width={80}
    height={80}
    className="object-contain"
  />
</div>

          <div>
            <h1 className="text-2xl font-bold text-primary">New Bawa lal Ji Hospital</h1>
            <p className="text-sm text-gray-500">Your Health,your Commitment</p>
          </div>
        </div>
        <div className="text-right text-sm">
          <p>Phone: +91 98722-15406</p>
          <p>Phone: +91 99152-15406</p>
          <p>Add: Khehra Road, Dhianpur (Gurdaspur)</p>
          <p>Email: shribawalalhospital1@gmail.com</p>
        </div>
      </div>
    </div>
  )
}
