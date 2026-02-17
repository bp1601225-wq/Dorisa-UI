import FormField from '../components/ui/FormField'
import { formControlClassName } from '../components/templates/formControlClassName'

const priorities = ['High', 'Medium', 'Low']

const CreateTicketPage = () => {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Tickets</p>
        <h1 className="text-3xl font-semibold text-slate-900">Submit a new ticket</h1>
        <p className="text-sm text-slate-500">
          Describe the need, pick an owner, and we will route it to the right delivery team.
        </p>
      </header>

      <form className="grid gap-6 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm md:grid-cols-2">
        <FormField id="ticketTitle" label="Ticket title">
          <input
            className={formControlClassName}
            id="ticketTitle"
            name="ticketTitle"
            placeholder="Enable new client intake form"
            type="text"
          />
        </FormField>

        <FormField id="priority" label="Priority">
          <select className={formControlClassName} id="priority" name="priority" defaultValue="">
            <option value="">Select priority</option>
            {priorities.map((priority) => (
              <option key={priority} value={priority.toLowerCase()}>
                {priority}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="owner" label="Owner">
          <input
            className={formControlClassName}
            id="owner"
            name="owner"
            placeholder="Service desk"
            type="text"
          />
        </FormField>

        <FormField id="due" label="Desired completion">
          <input
            className={formControlClassName}
            id="due"
            name="due"
            placeholder="2026-03-01"
            type="date"
          />
        </FormField>

        <FormField className="md:col-span-2" id="details" label="Details">
          <textarea
            className={`${formControlClassName} min-h-24 resize-y`}
            id="details"
            name="details"
            placeholder="Explain the context so we can immediately route and prioritize."
          />
        </FormField>

        <div className="md:col-span-2 flex justify-end">
          <button
            className="rounded-full border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            type="submit"
          >
            Create ticket
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreateTicketPage
