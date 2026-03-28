import { Loader2, Plus, PlusCircle, SparklesIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { ServiceSchemaZod, type ServiceField } from "../../Zod_Schema/schemaValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServiceStore } from "../../ZustandShare/serviceZuts";
import { ServiceStatus } from "../../../GlobalTypes";

const AddServicePage = () => {

const {AddServices} = useServiceStore()


const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting },
} = useForm<ServiceField>({
  resolver: zodResolver(ServiceSchemaZod),
});

const SaveService = async (data: ServiceField) => {
  const payload: ServiceField = {
    ...data,
    status: ServiceStatus.ACTIVE, // ✅ FIX
  };

  await AddServices(payload);
  reset();
};


  return (
    <main className="min-h-screen bg-slate-50 ">
      <div className="pl-5 max-w-3xl  ">
        <section className=" bg-white ">

   
<div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-start gap-4">

  {/* Icon */}
  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
    <SparklesIcon size={20} />
  </div>

  {/* Text Content */}
  <div>
    <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
      Service Catalog
    </p>
    <h1 className="mt-1 text-lg font-semibold text-green-700/70 flex items-center mt-3 gap-2">
    <PlusCircle />
      Add a New Service
    </h1>
    <p className="mt-2 text-sm text-gray-600 max-w-xl">
      Capture the essentials for new offerings so your team can pitch, price, and deliver consistently.
    </p>
  </div>

</div>


          <form onSubmit={handleSubmit(SaveService)} className="mt-3 space-y-6">

         <label className="space-y-2 text-sm font-medium text-slate-700">
  Service Name
  <input
    {...register("ServiceName")}
    className={`w-full border px-4 py-3 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2
      ${errors.ServiceName 
        ? "border-red-500 focus:ring-red-200" 
        : "border-slate-300 focus:border-slate-900 focus:ring-slate-200"}
    `}
    placeholder="Eg. Business Advisory"
    type="text"
  />

  {errors.ServiceName && (
    <p className="text-red-500 text-xs">
      {errors.ServiceName.message}
    </p>
  )}
</label>

            <div className="grid gap-6 md:grid-cols-2">
             
            </div>
<label className="space-y-2 text-sm font-medium text-slate-700">
  Description
  <textarea
    {...register("Description")}
    className={`min-h-[140px] w-full border px-4 py-3 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2
      ${errors.Description 
        ? "border-red-500 focus:ring-red-200" 
        : "border-slate-300 focus:border-slate-900 focus:ring-slate-200"}
    `}
    placeholder="Eg. We provide expert advice..."
  />

  {errors.Description && (
    <p className="text-red-500 text-xs">
      {errors.Description.message}
    </p>
  )}
</label>


            <div className="mt-10 space-y-3 text-sm font-medium text-slate-700">
<hr className="text-green-200"/>

              <p className="text-green-900">Service Highlights</p>
              <div className="flex flex-wrap gap-3">
                {['Business Advisory', 'Hr Services', 'Counselling', 'IT support'].map((highlight) => (
                  <span key={highlight} className="rounded-2xl border border-slate-200 px-4 py-2 text-slate-700">
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

<hr className="text-green-200" />


<div className=" flex justify-end">


          <button
  type="submit"
  disabled={isSubmitting}
  className="
    flex items-center justify-center gap-2
    w-[200px]
    rounded-xl
    bg-green-600
    px-4 py-2.5
    text-sm font-semibold text-white
    shadow-md shadow-green-600/30
    transition-all duration-200
    hover:bg-green-700 hover:shadow-green-600/40
    active:scale-95
    cursor-pointer
  "
>
  {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Adding . . .
                </>
              ) : (
                <>
                  <Plus />
                  Add to Catalog
                </>
              )}
</button>
</div>

          </form>
        </section>
      </div>
    </main>
  )
}

export default AddServicePage
