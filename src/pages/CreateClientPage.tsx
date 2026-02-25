import { Building, FileText, Mail,  UserPlus } from 'lucide-react'
import FormField from '../components/ui/FormField'
import { formControlClassName } from '../components/templates/formControlClassName'

const industries = ['Technology', 'Healthcare', 'Finance', 'Energy', 'Retail']

const CreateClientPage = () => {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Clients</p>
        <h1 className="text-3xl font-semibold text-slate-900">Add a new client</h1>
        <p className="text-sm text-slate-500">
          Capture the high-level context so every consultant knows the relationship story.
        </p>
      </header>

      <form className="grid gap-6 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm md:grid-cols-2">
        <FormField id="clientName" label="Client name" icon={Building}>
          <input
            className={formControlClassName}
            id="clientName"
            name="clientName"
            placeholder="Northwind Utilities"
            type="text"
          />
        </FormField>

        <FormField id="industry" label="Industry" >
          <select className={formControlClassName} id="industry" name="industry" defaultValue="">
            <option value="">Select industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry.toLowerCase()}>
                {industry}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="contact" label="Primary contact" icon={UserPlus}>
          <input
            className={formControlClassName}
            id="contact"
            name="contact"
            placeholder="Jordan Lee"
            type="text"
          />
        </FormField>

        <FormField id="email" label="Contact email" icon={Mail}>
          <input
            className={formControlClassName}
            id="email"
            name="email"
            placeholder="jordan.lee@northwind.com"
            type="email"
          />
        </FormField>

        <FormField className="md:col-span-2" id="notes" label="Relationship notes" icon={FileText}>
          <textarea
            className={`${formControlClassName} min-h-24 resize-y`}
            id="notes"
            name="notes"
            placeholder="Any upcoming renewals, important stakeholders, or blockers."
          />
        </FormField>

        <div className="md:col-span-2 flex justify-end">
          <button
            className="rounded-full border border-slate-200 bg-slate-900 px-6 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 transition-1s active:scale-10.5 cursor-pointer"
            type="submit"
          >
            Save client
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreateClientPage
