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

// console.log(payload);


  await AddServices(payload);
  reset();
};


 return (
  <main className="min-h-screen">
    
    {/* PAGE CONTAINER */}
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

      {/* HEADER CARD */}
     <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-6 flex items-start gap-5 shadow-sm">

  {/* ICON */}
  <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-md border border-green-100">
    <SparklesIcon size={20} className="text-green-600" />
    
    {/* subtle glow */}
    <span className="absolute inset-0 rounded-2xl bg-green-400/10 blur-xl"></span>
  </div>

  {/* TEXT */}
  <div>
    {/* LABEL */}
    <p className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-widest text-green-700 bg-green-100 px-2 py-[2px] rounded-full">
      ✦ Service Catalog
    </p>

    {/* TITLE */}
    <h1 className="mt-3 text-xl font-semibold text-slate-900 flex items-center gap-2">
      <PlusCircle className="text-green-600" />
      Add a New Service
    </h1>

    {/* DESCRIPTION */}
    <p className="mt-2 text-sm text-slate-600 max-w-xl leading-relaxed">
      Capture the essentials for new offerings so your team can pitch, price, and deliver consistently.
    </p>
  </div>

</div>

      {/* GRID LAYOUT */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* FORM SECTION */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

          <form onSubmit={handleSubmit(SaveService)} className="space-y-6">

            {/* SERVICE NAME */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Service Name
              </label>

              <input
                {...register("ServiceName")}
                className={`w-full border rounded-lg px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2
                ${errors.ServiceName 
                  ? "border-red-500 focus:ring-red-200" 
                  : "border-slate-300 focus:border-slate-900 focus:ring-slate-200"}
                `}
                placeholder="Eg. Business Advisory"
              />

              {errors.ServiceName && (
                <p className="text-red-500 text-xs">
                  {errors.ServiceName.message}
                </p>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Description
              </label>

              <textarea
                {...register("Description")}
                className={`min-h-[140px] w-full border rounded-lg px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2
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
            </div>

            {/* HIGHLIGHTS */}
            <div className="space-y-3">
              <hr className="border-green-100" />

              <p className="text-sm font-semibold text-slate-700">
                Service Highlights
              </p>

              <div className="flex flex-wrap gap-3">
                {['Business Advisory', 'Hr Services', 'Counselling', 'IT support'].map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-slate-200 px-4 py-1.5 text-xs text-slate-700"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              <hr className="border-green-100" />
            </div>

            {/* BUTTON */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 w-[200px] justify-center rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-green-700 active:scale-95 transition"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Adding...
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
        </div>

        {/* SIDE PANEL */}
        <div className="hidden lg:block">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-5 shadow-sm">

            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Tips for Adding Services
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Make your service clear and valuable.
              </p>
            </div>

            <ul className="space-y-3 text-sm text-slate-600">
              <li>• Use clear and simple names</li>
              <li>• Focus on value, not tasks</li>
              <li>• Keep descriptions concise</li>
              <li>• Think from client perspective</li>
            </ul>

            <hr />

            <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600">
              <p className="font-semibold text-slate-800">Example</p>
              <p className="mt-1">
                Business Advisory helps improve performance through strategy, finance, and operations.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs text-green-700">
              Tip: Clear services increase client trust and conversions.
            </div>

          </div>
        </div>

      </div>
    </div>
  </main>
);
}

export default AddServicePage
