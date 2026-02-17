import { CalendarDays, FileInvoice, FileText, Receipt, UserCheck } from 'lucide-react'
import FormField from '../components/ui/FormField'
import { formControlClassName } from '../components/templates/formControlClassName'

const CreateInvoicePage = () => {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Invoices</p>
        <h1 className="text-3xl font-semibold text-slate-900">Issue a new invoice</h1>
        <p className="text-sm text-slate-500">
          Select the client, confirm the amount, and we will queue it for review.
        </p>
      </header>

      <form className="grid gap-6 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm md:grid-cols-2">
        <FormField id="client" label="Client" icon={UserCheck}>
          <input
            className={formControlClassName}
            id="client"
            name="client"
            placeholder="Zenith Finance"
            type="text"
          />
        </FormField>

        <FormField id="amount" label="Amount" icon={Receipt}>
          <input
            className={formControlClassName}
            id="amount"
            name="amount"
            placeholder="$42,500"
            type="text"
          />
        </FormField>

        <FormField id="due" label="Due date" icon={CalendarDays}>
          <input
            className={formControlClassName}
            id="due"
            name="due"
            placeholder="2026-03-15"
            type="date"
          />
        </FormField>

        <FormField id="owner" label="Billing owner" icon={FileInvoice}>
          <input
            className={formControlClassName}
            id="owner"
            name="owner"
            placeholder="Revenue ops"
            type="text"
          />
        </FormField>

        <FormField className="md:col-span-2" id="notes" label="Notes" icon={FileText}>
          <textarea
            className={`${formControlClassName} min-h-24 resize-y`}
            id="notes"
            name="notes"
            placeholder="Describe what is being billed or any approvals that are pending."
          />
        </FormField>

        <div className="md:col-span-2 flex justify-end">
          <button
            className="rounded-full border border-slate-200 bg-slate-900 px-6 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            type="submit"
          >
            Issue invoice
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreateInvoicePage
