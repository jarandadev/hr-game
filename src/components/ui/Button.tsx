import { cn } from "@/lib/utils"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: React.ReactNode
}

const defaultProps: Props = {
  type: 'button',
}

const defaultClassName = "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 disabled:opacity-70 disabled:cursor-not-allowed"


export const Button = ({ className, children, ...props }: Props) => {
  return (
    <button {...defaultProps} {...props} className={cn(defaultClassName, className)}>
      {children}
    </button>

  )
}
