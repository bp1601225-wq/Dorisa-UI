import { Phone, Users, User, UserCheck, Users2, UserRoundPlus } from "lucide-react";
import FormField from "../components/ui/FormField";
import { formControlClassName } from "../components/templates/formControlClassName";
import TextProps from "./utils/utils";
import {useForm} from "react-hook-form"
import { useRolesStore } from "../ZustandShare/RolesZuts";
import { useEffect } from "react";
import type { RoleType } from "../../GlobalTypes";
import Select from "react-select"



const CreateUserPage = () => {


const fetchEveryRoles = useRolesStore((r:any)=>r.fetchRoles)
const AllRoles = useRolesStore((r:any)=>r.roles)

useEffect(()=>{
fetchEveryRoles()
console.log(AllRoles)
}, [] )


// Hook Form 
const {register, handleSubmit, reset, formState:{errors, isSubmitting}} = useForm<RoleType>()


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
  style={{ overflowY: "scroll" }}
>
  <option value="">Select role</option>
  {AllRoles.map((role: RoleType) => (
    <option key={role.id} value={role.id}>
      {role.name}
    </option>
  ))}
</select>
</FormField>

{/* Actions */}
<div className="mt-4 flex justify-end gap-3 pt-2 items-center bg">
<div className="flex gap-3 justify-end">
  <button
    type="button"
    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 transition cursor-pointer"
  >
    Reset
  </button>

  <button
    type="submit"
    className="rounded-md bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition-transform cursor-pointer"
  >
    Create User
  </button>
</div>

</div>

</form>
</div>
</section>
);
};

export default CreateUserPage;