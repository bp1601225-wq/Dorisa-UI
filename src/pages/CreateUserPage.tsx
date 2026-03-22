import { Phone, User, Users, UserRoundPlus, Lock, Mail } from "lucide-react";
import FormField from "../components/ui/FormField";
import { formControlClassName } from "../components/templates/formControlClassName";
import TextProps, { Arraycountries } from "./utils/utils";
import { useForm } from "react-hook-form";
import { useRolesStore } from "../ZustandShare/RolesZuts";
import { useEffect } from "react";
import type { UserType } from "../../GlobalTypes";
import { useUsersStore } from "../ZustandShare/usersZuts";


const CreateUserPage = () => {
  const fetchEveryRoles = useRolesStore((r: any) => r.fetchRoles);
  const AllRoles = useRolesStore((r: any) => r.roles);

  const {AddUsers} = useUsersStore()
  useEffect(() => {
    fetchEveryRoles();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<UserType>();

  const onSubmit = async (data: UserType) => {
await AddUsers(data)
    console.log(data);
  };


  return (
    <section className="min-h-screen bg-slate-50 p-6">

      {/* 🔹 Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <TextProps data="Create User" icon={<UserRoundPlus size={20} />} />
          <p className="text-sm text-slate-500 mt-1">
            Add a new user to your platform
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto bg-white border border-slate-200  shadow-sm">

        {/* Card Header */}
        <div className="border-b border-slate-200 px-8 py-5">
          <h3 className="text-lg font-semibold text-slate-900">
            User Information
          </h3>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 space-y-6"
        >

          {/* 🔹 Name Section */}
          <div>
            <h4 className="text-sm font-medium text-slate-500 mb-4">
              Personal Details
            </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormField id="firstName" label="First Name" icon={User}>
                <input
                  {...register("firstName")}
                  className={formControlClassName}
                  placeholder="Alex"
                />
              </FormField>

              <FormField id="middleName" label="Middle Name" icon={User}>
                <input
                  {...register("middleName")}
                  className={formControlClassName}
                  placeholder="Rivera"
                />
              </FormField>

              <FormField id="lastName" label="Last Name" icon={User}>
                <input
                  {...register("lastName")}
                  className={formControlClassName}
                  placeholder="Diaz"
                />
              </FormField>
            </div>
          </div>
   <div>
            <h4 className="text-sm font-medium text-slate-500 mb-4">
              Contact Info
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormField id="phone" label="Phone Number" icon={Phone}>
                <input
                  {...register("phone")}
                  className={formControlClassName}
                  placeholder="+1 555 123 4567"
                />
              </FormField>

              <FormField id="role" label="Role" icon={Users}>
                <select
                {...register("roleId")}
                className="border w-full p-1">
<option value="client">client(default)</option>
{AllRoles.map((value:any, index:number)=>(
  <option value={value.id} key={index}>{value.name}</option>
))}
               </select>
              </FormField>
              
         <FormField id="country" label="Country" icon={User}>
<select
  {...register("country")}
  className={formControlClassName}
  defaultValue=""
>
  <option value="" disabled>
    Select country
  </option>

  {Arraycountries.map((country: string) => (
    <option key={country} value={country}>
      {country}
    </option>
  ))}
</select>
</FormField>
            </div>
          </div>

        {/* 🔹 Account */} 
          <div>
            <h4 className="text-sm font-medium text-slate-500 mb-4">
              Account Credentials
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormField id="email" label="Email" icon={Mail}>
                <input
                  {...register("email")}
                  type="email"
                  className={formControlClassName}
                  placeholder="user@example.com"
                />
              </FormField>

              <FormField id="password" label="Password" icon={Lock}>
                <input
                  {...register("password")}
                  type="password"
                  className={formControlClassName}
                  placeholder="Enter a password"
                />
              </FormField>

              {/* keep placeholders to align grid */}
              <div />
              <div />
            </div>
          </div>

          {/* 🔹 ss Section */}
       
          {/* 🔹 Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-black px-5 py-2 text-sm text-white hover:opacity-90 active:scale-95 transition"
            >
              {isSubmitting ? "Creating..." : "Create User"}
            </button>
          </div>

        </form>
      </div>
    </section>
  );
};

export default CreateUserPage;
