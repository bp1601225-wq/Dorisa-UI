import { Phone, User, Users, UserRoundPlus } from "lucide-react";
import FormField from "../components/ui/FormField";
import { formControlClassName } from "../components/templates/formControlClassName";
import TextProps, { Arraycountries } from "./utils/utils";
import { useForm, Controller } from "react-hook-form";
import { useRolesStore } from "../ZustandShare/RolesZuts";
import { useEffect } from "react";
import type { RoleType } from "../../GlobalTypes";
import Select from "react-select";

const CreateUserPage = () => {
  const fetchEveryRoles = useRolesStore((r: any) => r.fetchRoles);
  const AllRoles = useRolesStore((r: any) => r.roles);

  useEffect(() => {
    fetchEveryRoles();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<any>();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const roleOptions = AllRoles.map((role: RoleType) => ({
    value: role.id,
    label: role.name,
  }));

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

          {/* 🔹 Contact Section */}
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
                <Controller
                  control={control}
                  name="roleId"
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={roleOptions}
                      placeholder="Select role"
                      className="text-sm"
                    />
                  )}
                />
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