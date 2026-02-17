import FormField from '../components/ui/FormField'
import { formControlClassName } from '../components/templates/formControlClassName'

const issueTypes = ['Bug', 'Support', 'Access', 'Other']
const urgencies = ['Low', 'Medium', 'High']

const TemplateTwoPage = () => {
  return (
    <section className="max-w-3xl space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Template 02</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Request Form</h1>
        <p className="mt-1 text-slate-600">Log a new request and highlight the details we need to resolve it.</p>
      </div>

      <form className="grid gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <FormField id="ticketTitle" label="Ticket Title">
          <input
            className={formControlClassName}
            id="ticketTitle"
            name="ticketTitle"
            placeholder="Printer stopped working"
            type="text"
          />
        </FormField>

        <FormField id="issueType" label="Issue Type">
          <select className={formControlClassName} id="issueType" name="issueType" defaultValue="">
            <option value="">Select type</option>
            {issueTypes.map((type) => (
              <option key={type} value={type.toLowerCase()}>
                {type}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="urgency" label="Urgency">
          <select className={formControlClassName} id="urgency" name="urgency" defaultValue="">
            <option value="">Select urgency</option>
            {urgencies.map((urgency) => (
              <option key={urgency} value={urgency.toLowerCase()}>
                {urgency}
              </option>
            ))}
          </select>
        </FormField>

        <FormField className="md:col-span-2" id="details" label="Details">
          <textarea
            className={`${formControlClassName} min-h-32 resize-y`}
            id="details"
            name="details"
            placeholder="Describe what happens, when, and what you expected instead."
          />
        </FormField>

        <div className="md:col-span-2 flex justify-end">
          <button
            className="rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            type="submit"
          >
            Create Ticket
          </button>
        </div>
      </form>
    </section>
  )
}

export default TemplateTwoPage
