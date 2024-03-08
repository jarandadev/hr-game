interface Props extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const defaultSvgProps: React.SVGProps<SVGSVGElement> = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const defaultPathProps: React.SVGProps<SVGPathElement> = {
  stroke: 'none',
  d: "M0 0h24v24H0z",
  fill: 'none'
}

const Cross = ({ className, ...props }: Props) => {
  return <svg className={className} {...defaultSvgProps} {...props}><path {...defaultPathProps} />

    <path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
}

const Plus = ({ className, ...props }: Props) => {
  return <svg className={className} {...defaultSvgProps} {...props}><path {...defaultPathProps} />

    <path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
}

const Minus = ({ className, ...props }: Props) => {
  return <svg className={className} {...defaultSvgProps} {...props}><path {...defaultPathProps} />

    <path d="M5 12l14 0" /></svg>
}

const Instagram = ({ className, ...props }: Props) => {
  return <svg className={className} {...defaultSvgProps} {...props}><path {...defaultPathProps} />

    <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16.5 7.5l0 .01" /></svg>
}

const X = ({ className, ...props }: Props) => {
  return <svg className={className} {...defaultSvgProps} {...props}><path {...defaultPathProps} />

    <path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
}

const Crown = ({ className, ...props }: Props) => {
  return <svg className={className} {...defaultSvgProps} {...props}><path {...defaultPathProps} />

    <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z" /></svg>
}

const Clipboard = ({ className, ...props }: Props) => {
  return <svg className={className} {...defaultSvgProps} {...props}><path {...defaultPathProps} />

    <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /></svg>
}
const ClipboardCheck = ({ className, ...props }: Props) => {
  return <svg className={className} {...defaultSvgProps} {...props}><path {...defaultPathProps} />

    <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M9 14l2 2l4 -4" /></svg>
}
const User = ({ className, ...props }: Props) => {
  return <svg className={className} {...defaultSvgProps} {...props}><path {...defaultPathProps} />

    <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
}
const ArrowRight = ({ className, ...props }: Props) => {
  return <svg className={className} {...defaultSvgProps} {...props}><path {...defaultPathProps} />

    <path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" /></svg>
}

export const Icon = { Cross, Plus, Minus, Clipboard, ClipboardCheck, User, Instagram, X, Crown, ArrowRight }

