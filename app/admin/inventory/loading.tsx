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

      <div className="mt-8">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-[500px] w-full rounded-lg" />
      </div>
    </div>
  )
}
