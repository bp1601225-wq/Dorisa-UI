import type { ReactNode } from 'react'

type FormFieldProps = {
  id: string
  label: string
  className?: string
  hint?: string
  children: ReactNode
}

function FormField({ id, label, className, hint, children }: FormFieldProps) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor={id}>
        {label}
      </label>
      {children}
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
    </div>
  )
}

export default FormField
