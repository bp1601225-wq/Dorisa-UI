import { Phone, User, Users, UserRoundPlus, Lock, Mail, CheckCircle, Users2 } from "lucide-react";
import FormField from "../components/ui/FormField";
import { formControlClassName } from "../components/templates/formControlClassName";
import TextProps, { Arraycountries } from "./utils/utils";
import { useForm } from "react-hook-form";
import { useRolesStore } from "../ZustandShare/RolesZuts";
import { useEffect, useState } from "react";
import type { UserType } from "../../GlobalTypes";
import { useUsersStore } from "../ZustandShare/usersZuts";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, type UserField } from "../Zod_Schema/schemaValidations";
import SettingsModal from "./utils/Modal";


const CreateUserPage = () => {
  const fetchEveryRoles = useRolesStore((r: any) => r.fetchRoles);
  const AllRoles = useRolesStore((r: any) => r.roles);

  const {AddUsers} = useUsersStore()
  useEffect(() => {
    fetchEveryRoles();
  }, []);




  //  Stateful Variables
  const [pendingData, setPendingData] = useState<UserField | null>(null)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)




  
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<UserField>({
    resolver: zodResolver(UserSchema)
  });

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
  onSubmit={handleSubmit((data)=>{
    setPendingData(data)
    setIsOpenModal(true)
  })}


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
                   {errors.firstName &&
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
              }
              </FormField>
           
           {/* Optional */}

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
                
                {errors.lastName && 
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
                }

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
                type="tel"
                  {...register("phone", {
                    min: 10
                  })}
                  className={formControlClassName}
                  placeholder="+1 555 123 4567"
                />
                 {errors.phone && 
                <p className="text-red-500 text-sm">
                  {errors.phone.message}
                </p>
                }
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
{errors.country &&
<p className="text-red-500">Country is required</p>
}
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
                {errors.email &&
                <p className="text-red-500 text-sm">{errors.email.message}</p>
                }
              </FormField>

              <FormField id="password" label="Password" icon={Lock}>
                <input
                  {...register("password")}
                  type="password"
                  className={formControlClassName}
                  placeholder="Enter a password"
                />
                {errors.password && 
                <p className="text-red-500 text-sm">{errors.password.message}</p>

}
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
              className=" flex items-center gap-2 cursor-pointer rounded-xl bg-black px-5 py-2 text-sm text-white hover:opacity-90 active:scale-95 transition"
            >
              <CheckCircle />
              create user
            </button>
          </div>

        </form>
      </div>
{isOpenModal && pendingData && (
  <SettingsModal
    isOpen={isOpenModal}
    onClose={() => setIsOpenModal(false)}
  >
    <div className="max-w-lg bg-white p-5 rounded-xl space-y-4">

      <h1 className="flex items-center gap-2 bg-green-100 text-green-800 p-2 rounded-md font-semibold">
        <Users2 className="text-green-500 animate-pulse" />
        Review user details before submission
      </h1>

      <hr className="border-gray-300" />

      {/* 🔹 USER DETAILS */}
      <div className="space-y-2 text-sm">

        <p><strong>First Name:</strong> {pendingData.firstName}</p>

        <p>
          <strong>Middle Name:</strong>{" "}
          {pendingData.middleName || "N/A"}
        </p>

        <p><strong>Last Name:</strong> {pendingData.lastName}</p>

        <p><strong>Email:</strong> {pendingData.email}</p>

        <p><strong>Phone:</strong> {pendingData.phone}</p>

        <p><strong>Country:</strong> {pendingData.country}</p>

        <p><strong>Role ID:</strong> {pendingData.roleId}</p>

      </div>

      <hr className="border-gray-300" />

      {/* 🔹 ACTION BUTTONS */}
      <div className="flex justify-end gap-3 pt-2">

        <button
          onClick={() => setIsOpenModal(false)}
          className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            if (!pendingData) return;

            // console.log(pendingData);
            
            await AddUsers(pendingData);

            setIsOpenModal(false);
            reset(); // clear form after success
          }}
          className="px-5 py-2 text-sm bg-black text-white rounded-lg hover:opacity-90"
        >
          Confirm & Create
        </button>

      </div>

    </div>
  </SettingsModal>
)}
    </section>
  );
};

export default CreateUserPage;
