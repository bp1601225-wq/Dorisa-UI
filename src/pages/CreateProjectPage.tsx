import FormField from '../components/ui/FormField'
import { formControlClassName } from '../components/templates/formControlClassName'

const projectStages = ['Discovery', 'Design', 'Delivery', 'Enablement']

const CreateProjectPage = () => {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Projects</p>
        <h1 className="text-3xl font-semibold text-slate-900">Create a new project</h1>
        <p className="text-sm text-slate-500">
          Capture the brief, assign an owner, and let the squad know what success looks like.
        </p>
      </header>

      <form className="grid gap-6 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm md:grid-cols-2">
        <FormField id="projectName" label="Project name">
          <input
            className={formControlClassName}
            id="projectName"
            name="projectName"
            placeholder="Dorisa Insight Studio"
            type="text"
          />
        </FormField>

        <FormField id="client" label="Client">
          <input
            className={formControlClassName}
            id="client"
            name="client"
            placeholder="Northridge Health"
            type="text"
          />
        </FormField>

        <FormField id="owner" label="Owner">
          <select className={formControlClassName} id="owner" name="owner" defaultValue="">
            <option value="">Select owner</option>
            <option value="studio-alpha">Studio Alpha</option>
            <option value="experience-lab">Experience Lab</option>
            <option value="product-ops">Product Ops</option>
          </select>
        </FormField>

        <FormField id="stage" label="Stage">
          <select className={formControlClassName} id="stage" name="stage" defaultValue="">
            <option value="">Choose stage</option>
            {projectStages.map((stage) => (
              <option key={stage} value={stage.toLowerCase()}>
                {stage}
              </option>
            ))}
          </select>
        </FormField>

        <FormField className="md:col-span-2" id="summary" label="Project summary">
          <textarea
            className={`${formControlClassName} min-h-32 resize-y`}
            id="summary"
            name="summary"
            placeholder="Describe the goals, desired outcomes, and success cues."
          />
        </FormField>

        <div className="md:col-span-2 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            We will notify the team and create a channel once you submit the draft.
          </p>
          <button
            className="rounded-full border border-slate-200 bg-slate-900 px-6 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            type="submit"
          >
            Create project
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreateProjectPage
