import { cn } from "@/lib/utils"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const defaultClassName = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-min"

export const Input = ({ className, ...props }: Props) => {
  return (
    <input {...props} className={cn(className, defaultClassName)} />
  )
}
