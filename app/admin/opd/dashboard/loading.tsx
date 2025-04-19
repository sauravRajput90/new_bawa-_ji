export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="h-16 w-16 border-4 border-t-purple-600 border-r-transparent border-b-purple-600 border-l-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">Loading OPD Dashboard...</p>
      </div>
    </div>
  )
}
