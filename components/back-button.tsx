import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BackButtonProps {
  href: string
}

export function BackButton({ href }: BackButtonProps) {
  const router = useRouter()

  return (
    <Button variant="outline" size="sm" onClick={() => router.push(href)} className="flex items-center gap-2">
      <ArrowLeft className="h-4 w-4" />
      Back
    </Button>
  )
}
