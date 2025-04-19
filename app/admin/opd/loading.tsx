import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">
          <Skeleton className="h-10 w-64 mb-6" />
          <Skeleton className="h-5 w-full max-w-2xl mb-6" />
        </div>
      </div>

      <Skeleton className="h-[220px] w-full rounded-lg" />

      <div className="grid grid-cols-1 gap-6">
        <Skeleton className="h-[400px] w-full rounded-lg" />
        <Skeleton className="h-[500px] w-full rounded-lg" />
      </div>
    </div>
  )
}
