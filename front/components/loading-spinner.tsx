import { Loader2 } from "lucide-react"

type LoadingSpinnerProps = {
  size?: "small" | "medium" | "large"
  text?: string
}

export default function LoadingSpinner({ size = "medium", text = "Carregando..." }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-6 w-6",
    large: "h-8 w-8",
  }

  const textClasses = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base",
  }

  return (
    <div className="flex flex-col items-center justify-center" role="status" aria-live="polite">
      <Loader2 className={`animate-spin ${sizeClasses[size]}`} />
      <p className={`mt-2 text-white-700 ${textClasses[size]}`}>{text}</p>
    </div>
  )
}
