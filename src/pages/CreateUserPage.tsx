import { Mail, Users, User } from 'lucide-react'
import FormField from '../components/ui/FormField'
import { formControlClassName } from '../components/templates/formControlClassName'

const roles = ['Designer', 'Product Manager', 'Consultant', 'Ops Lead']

const CreateUserPage = () => {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Users</p>
        <h1 className="text-3xl font-semibold text-slate-900">Invite a new user</h1>
        <p className="text-sm text-slate-500">
          Bring the next collaborator on board with the right role and visibility.
        </p>
      </header>

      <form className="grid gap-6 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm md:grid-cols-2">
        <FormField id="fullName" label="Full name" icon={User}>
          <input
            className={formControlClassName}
            id="fullName"
            name="fullName"
            placeholder="Alex Rivera"
            type="text"
          />
        </FormField>

        <FormField id="email" label="Work email" icon={Mail}>
          <input
            className={formControlClassName}
            id="email"
            name="email"
            placeholder="alex.rivera@dorisa.io"
            type="email"
          />
        </FormField>

        <FormField id="role" label="Role" icon={Users}>
          <select className={formControlClassName} id="role" name="role" defaultValue="">
            <option value="">Select role</option>
            {roles.map((role) => (
              <option key={role} value={role.toLowerCase()}>
                {role}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="team" label="Team" icon={Users}>
          <input
            className={formControlClassName}
            id="team"
            name="team"
            placeholder="Experience Lab"
            type="text"
          />
        </FormField>

        <FormField className="md:col-span-2" id="notes" label="Onboarding notes" icon={Mail}>
          <textarea
            className={`${formControlClassName} min-h-24 resize-y`}
            id="notes"
            name="notes"
            placeholder="Any permissions, calendar preferences, or kickoff context"
          />
        </FormField>

        <div className="md:col-span-2 flex justify-end">
          <button
            className="rounded-full border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            type="submit"
          >
            Send invite
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreateUserPage
