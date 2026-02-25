import { AlertTriangle, CalendarDays, FileText, Ticket, User } from 'lucide-react'
import FormField from '../components/ui/FormField'
import { formControlClassName } from '../components/templates/formControlClassName'

// const priorities = ['High', 'Medium', 'Low']

const CreateTicketPage = () => {
  return (
    <section className="space-y-8">
      <header className="mb-6 border-b border-slate-200 pb-5">
        <div className="rounded-2xl border-l-5 border-l-black border-slate-300 bg-slate-50 p-4 shadow-sm">
          <h1 className="mt-2 text-3xl tracking-wider font-bold flex items-center gap-3 bg-gradient-to-r 
        from-yellow-600  via-white to yellow-300 bg-clip-text text-transparent italic">
            <Ticket size={24} className="text-slate-700" />
             Ticket
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Describe the request, assign an owner, and route work to the right delivery team.
          </p>
        </div>
      </header>

      <form className="grid gap-6 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm md:grid-cols-2">
        <FormField id="ticketTitle" label="Ticket title" icon={Ticket}>
          <input
            className={formControlClassName}
            id="ticketTitle"
            name="ticketTitle"
            placeholder="Enable new client intake form"
            type="text"
          />
        </FormField>

        <FormField id="priority" label="Priority" icon={AlertTriangle}>
          <select className={formControlClassName} id="priority" name="priority" defaultValue="">
            <option value="">Select priority</option>
            {/* {priorities.map((priority) => (
              <option key={priority} value={priority.toLowerCase()}>
                {priority}
              </option>
            ))} */}
          </select>
        </FormField>


        <FormField className="md:col-span-2" id="details" label="Details" icon={FileText}>
          <textarea
            className={`${formControlClassName} min-h-28 resize-y`}
            id="details"
            name="details"
            placeholder="Explain the context so we can route and prioritize quickly."
          />
        </FormField>

        <div className="md:col-span-2 flex justify-end">
          <button
            className="rounded-full border border-slate-200 bg-slate-900 px-6 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 transition-1s active:scale-105 cursor-pointer"
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
