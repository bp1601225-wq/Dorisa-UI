import type { ReactNode } from 'react'
import { type LucideIcon } from 'lucide-react'

type FormFieldProps = {
  id: string
  label: string
  className?: string
  hint?: string
  children: ReactNode
  icon?: LucideIcon
}

function FormField({ id, label, className, hint, children, icon }: FormFieldProps) {
  const Icon = icon

  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor={id}>
        <div className="flex items-center gap-2">
          {Icon ? <Icon size={16} className="text-slate-400" /> : null}
          <span>{label}</span>
        </div>
      </label>
      {children}
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
    </div>
  )
}

export default FormField
