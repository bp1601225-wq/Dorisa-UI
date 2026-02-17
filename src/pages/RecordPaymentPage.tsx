import FormField from '../components/ui/FormField'
import { formControlClassName } from '../components/templates/formControlClassName'

const paymentMethods = ['Wire transfer', 'ACH', 'Credit card', 'Check']

const RecordPaymentPage = () => {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Payments</p>
        <h1 className="text-3xl font-semibold text-slate-900">Record a payment</h1>
        <p className="text-sm text-slate-500">
          Log a received payment, attach the invoice reference, and note the method.
        </p>
      </header>

      <form className="grid gap-6 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm md:grid-cols-2">
        <FormField id="client" label="Client">
          <input
            className={formControlClassName}
            id="client"
            name="client"
            placeholder="Zenith Finance"
            type="text"
          />
        </FormField>

        <FormField id="amount" label="Amount">
          <input
            className={formControlClassName}
            id="amount"
            name="amount"
            placeholder="$52,000"
            type="text"
          />
        </FormField>

        <FormField id="invoice" label="Invoice number">
          <input
            className={formControlClassName}
            id="invoice"
            name="invoice"
            placeholder="INV-1024"
            type="text"
          />
        </FormField>

        <FormField id="method" label="Payment method">
          <select className={formControlClassName} id="method" name="method" defaultValue="">
            <option value="">Choose method</option>
            {paymentMethods.map((method) => (
              <option key={method} value={method.toLowerCase()}>
                {method}
              </option>
            ))}
          </select>
        </FormField>

        <FormField className="md:col-span-2" id="notes" label="Notes">
          <textarea
            className={`${formControlClassName} min-h-24 resize-y`}
            id="notes"
            name="notes"
            placeholder="Mention approval, reference number, or manual reconciliation notes."
          />
        </FormField>

        <div className="md:col-span-2 flex justify-end">
          <button
            className="rounded-full border border-slate-200 bg-slate-900 px-6 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            type="submit"
          >
            Record payment
          </button>
        </div>
      </form>
    </section>
  )
}

export default RecordPaymentPage
