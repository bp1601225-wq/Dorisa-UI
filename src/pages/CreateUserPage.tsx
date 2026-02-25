import { Phone, Users, User, User2 } from 'lucide-react'
import FormField from '../components/ui/FormField'
import { formControlClassName } from '../components/templates/formControlClassName'
import TextProps from './utils/utils'

const roles = ['Designer', 'Product Manager', 'Consultant', 'Ops Lead']


const CreateUserPage = () => {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
        </p>
   
   <TextProps data = "create user" />


        <p className="text-sm text-slate-500">
          Bring the next collaborator on board with the right role and visibility.
        </p>
      </header>
      
      <form className="grid gap-6 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm md:grid-cols-2">
        <FormField id="firstName" label="First Name" icon={User}>
          <input
            className={formControlClassName}
            id="firstName"
            name="firstName"
            placeholder="Alex"
            type="text"
          />
        </FormField>

        <FormField id="middleName" label="Middle Name" icon={User}>
          <input
            className={formControlClassName}
            id="middleName"
            name="middleName"
            placeholder="Rivera"
            type="text"
          />
        </FormField>

        <FormField id="lastName" label="Last Name" icon={User}>
          <input
            className={formControlClassName}
            id="lastName"
            name="lastName"
            placeholder="Diaz"
            type="text"
          />
        </FormField>

        <FormField id="phone" label="Phone" icon={Phone}>
          <input
            className={formControlClassName}
            id="phone"
            name="phone"
            placeholder="(555) 123-4567"
            type="tel"
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

        <div className="md:col-span-2 flex justify-end">
          <button
            className="rounded-full border border-slate-200 bg-green-500 text-white px-6 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 hover:text-black cursor-pointer 
            active:scale-105
            "
            type="submit"
          >
            create User
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreateUserPage
