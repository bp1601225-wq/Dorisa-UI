import { Phone, Users, User, UserCheck, Users2, UserRoundPlus } from "lucide-react";
import FormField from "../components/ui/FormField";
import { formControlClassName } from "../components/templates/formControlClassName";
import TextProps from "./utils/utils";

const roles = ["Designer", "Product Manager", "Consultant", "Ops Lead"];

const CreateUserPage = () => {
  return (
    <section className="max-w-5xl space-y-6">

      {/* Header */}
      <header className="space-y-2">
        <TextProps 
  data="Create User"
  icon={<UserRoundPlus size={20} />}
/>

<hr className="text-emerald-500 font-bold mt-4"/>

        
      </header>

      {/* Card */}
      <div className="rounded-lg  bg-white shadow-sm " >

        {/* Card Header */}
        <div className="border-b border-gray-300  px-8 py-4">
          <h3 className="text-sm font-semibold text-gray-900">
            User Information
          </h3>
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 gap-5 p-6 md:grid-cols-3">

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

          <FormField id="phone" label="Phone Number" icon={Phone}>
            <input
              className={formControlClassName}
              id="phone"
              name="phone"
              placeholder="(555) 123-4567"
              type="tel"
            />
          </FormField>

          <FormField id="role" label="Role" icon={Users}>
            <select
              className={formControlClassName}
              id="role"
              name="role"
              defaultValue=""
            >
              <option value="">Select role</option>
              {roles.map((role) => (
                <option key={role} value={role.toLowerCase()}>
                  {role}
                </option>
              ))}
            </select>
          </FormField>

          {/* Actions */}
          <div className="md:col-span-2 flex justify-end gap-3 pt-2">

            <button
              type="button"
              className="rounded-md border px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-md bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700 active:scale-[0.98] transition"
            >
              Create User
            </button>

          </div>

        </form>
      </div>
    </section>
  );
};

export default CreateUserPage;