import FormField from '../components/ui/FormField'
import { formControlClassName } from '../components/templates/formControlClassName'

const industries = ['Technology', 'Finance', 'Healthcare', 'Education', 'Operations']

const TemplateOnePage = () => {
  return (
    <section className="max-w-3xl space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Template 01</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Intake Form</h1>
        <p className="mt-1 text-slate-600">Capture high-level goals and alignment for a new initiative.</p>
      </div>

      <form className="grid gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <FormField id="fullName" label="Full Name">
          <input
            className={formControlClassName}
            id="fullName"
            name="fullName"
            placeholder="Alex Rivera"
            type="text"
          />
        </FormField>

        <FormField id="workEmail" label="Work Email">
          <input
            className={formControlClassName}
            id="workEmail"
            name="workEmail"
            placeholder="alex.rivera@company.com"
            type="email"
          />
        </FormField>

        <FormField id="organization" label="Organization">
          <input
            className={formControlClassName}
            id="organization"
            name="organization"
            placeholder="Acme Co."
            type="text"
          />
        </FormField>

        <FormField id="industry" label="Industry">
          <select className={formControlClassName} id="industry" name="industry" defaultValue="">
            <option value="">Select industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry.toLowerCase()}>
                {industry}
              </option>
            ))}
          </select>
        </FormField>

        <FormField className="md:col-span-2" id="objectives" label="Objectives">
          <textarea
            className={`${formControlClassName} min-h-32 resize-y`}
            id="objectives"
            name="objectives"
            placeholder="Summarize the outcomes you want to achieve"
          />
        </FormField>

        <div className="md:col-span-2 flex justify-end">
          <button
            className="rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            type="submit"
          >
            Save Objectives
          </button>
        </div>
      </form>
    </section>
  )
}

export default TemplateOnePage
