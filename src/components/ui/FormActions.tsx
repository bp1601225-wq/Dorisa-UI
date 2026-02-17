type FormActionsProps = {
  submitLabel: string
  resetLabel?: string
  className?: string
}

function FormActions({ submitLabel, resetLabel = 'Clear', className }: FormActionsProps) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ''}`.trim()}>
      <button
        className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        type="reset"
      >
        {resetLabel}
      </button>

      <button
        className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
        type="submit"
      >
        {submitLabel}
      </button>
    </div>
  )
}

export default FormActions
