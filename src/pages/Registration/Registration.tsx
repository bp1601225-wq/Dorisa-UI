import {
ArrowRight,
Building2,
LockKeyhole,
Mail,
Phone,
UserRoundPlus,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Corporate from "./Corporate";
import { Arraycountries, ErrorText } from "../utils/utils";
import { useForm } from "react-hook-form";
import { type RegistrationForm } from "../../../GlobalTypes";

const containerVariants: Variants = {
hidden: { opacity: 0 },
visible: {
opacity: 1,
transition: {
staggerChildren: 0.12,
},
},
};

const itemVariants: Variants = {
hidden: { opacity: 0, y: 25 },
visible: {
opacity: 1,
y: 0,
transition: { duration: 0.5, ease: "easeOut" },
},
};

const slideUp: Variants = {
hidden: { opacity: 0, y: 40 },
visible: {
opacity: 1,
y: 0,
transition: { duration: 0.6, ease: "easeOut" },
},
};

const Registration = () => {
const [selected, setSelected] = useState<"Individual" | "Corporate">(
"Individual"
);
const [formData, setFormData] = useState<RegistrationForm | null>(null);

const buttonStyles = (active: boolean) =>
`cursor-pointer flex items-center justify-center gap-2 rounded-sm px-6 py-2 text-sm font-semibold transition ${
active
? "bg-white text-slate-900 shadow-lg"
: "bg-emerald-100 text-green-500"
}`;

const {
register,
handleSubmit,
reset,
formState: { errors },
} = useForm<RegistrationForm>();

function RegisterButton(data: RegistrationForm) {
setFormData(data);
reset();
console.log(data);
}

return (
<form onSubmit={handleSubmit(RegisterButton)}>
<motion.div
variants={slideUp}
initial="hidden"
animate="visible"
className="min-h-screen bg-gradient-to-br from-green-500 px-4 py-12"
>
{/* HEADER */}
<motion.div
variants={containerVariants}
initial="hidden"
animate="visible"
className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 text-white"
>
<motion.p
variants={itemVariants}
className="text-xs tracking-[0.4em] text-emerald-900"
>
Client Registration
</motion.p>

<motion.h1
variants={itemVariants}
className="text-center text-3xl font-bold leading-tight"
>
Tell Us About Your Organization
</motion.h1>

<motion.p
variants={itemVariants}
className="text-center text-sm text-emerald-900 tracking-wider"
>
Provide your company details below. This helps us understand your
needs and prepare a tailored proposal.
</motion.p>

<motion.div variants={itemVariants} className="flex items-center gap-3">
<motion.button
  type="button"
  onClick={() => setSelected("Individual")}
  className={buttonStyles(selected === "Individual")}
>
  <UserRoundPlus />
  Individual
</motion.button>

<ArrowRight className="text-white" />

<motion.button
  type="button"
  onClick={() => setSelected("Corporate")}
  className={buttonStyles(selected === "Corporate")}
>
  <Building2 />
  Corporate
</motion.button>
</motion.div>
</motion.div>

{/* FORM CARD */}
<div className="mx-auto mt-10 w-full max-w-6xl">
<AnimatePresence mode="wait">
{selected === "Individual" ? (
  <motion.div
    key="individual"
    variants={slideUp}
    initial="hidden"
    animate="visible"
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.4 }}
    className="bg-white/90 p-10 shadow-[0_35px_90px_rgba(15,23,42,0.18)]"
  >
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-6 md:grid-cols-3"
    >
      {/* FULL NAME */}
      <motion.div variants={itemVariants} className="space-y-2">
        <label className="text-xs font-semibold tracking-[0.2em] text-slate-500">
          Full Name
        </label>
        <div className="flex items-center gap-2 border border-slate-200 px-2 py-2">
          <UserRoundPlus className="text-slate-400" />
          <input
            {...register("Full Name", { required: "Full name is required" })}
            type="text"
            placeholder="Jane Doe"
            className="w-full bg-transparent text-sm text-slate-700 outline-none"
          />
        </div>
        {"Full Name" in errors && (
          <ErrorText message={errors["Full Name"]?.message as string} />
        )}
      </motion.div>

      {/* EMAIL */}
      <motion.div variants={itemVariants} className="space-y-2">
        <label className="text-xs font-semibold tracking-[0.2em] text-slate-500">
          Email Address
        </label>
        <div className="flex items-center gap-2 border border-slate-200 px-2 py-2">
          <Mail className="text-slate-400" />
          <input
            {...register("Email", { required: "Email is required" })}
            type="email"
            placeholder="you@example.com"
            className="w-full bg-transparent text-sm text-slate-700 outline-none"
          />
        </div>
        {"Email" in errors && (
          <ErrorText message={errors["Email"]?.message as string} />
        )}
      </motion.div>

      {/* PHONE */}
      <motion.div variants={itemVariants} className="space-y-2">
        <label className="text-xs font-semibold tracking-[0.2em] text-slate-500">
          Phone Number
        </label>
        <div className="flex items-center gap-2 border border-slate-200 px-2 py-2">
          <Phone className="text-slate-400" />
          <input
            {...register("Phone", { required: "Phone number is required" })}
            type="tel"
            placeholder="+233 000 000 000"
            className="w-full bg-transparent text-sm text-slate-700 outline-none"
          />
        </div>
        {"Phone" in errors && (
          <ErrorText message={errors["Phone"]?.message as string} />
        )}
      </motion.div>

      {/* PASSWORD */}
      <motion.div variants={itemVariants} className="space-y-2">
        <label className="text-xs font-semibold tracking-[0.2em] text-slate-500">
          Password
        </label>
        <div className="flex items-center gap-2 border border-slate-200 px-2 py-2">
          <LockKeyhole className="text-slate-400" />
          <input
            {...register("Password", { required: "Password is required" })}
            type="password"
            placeholder="***************"
            className="w-full bg-transparent text-sm text-slate-700 outline-none"
          />
        </div>
        {"Password" in errors && (
          <ErrorText message={errors["Password"]?.message as string} />
        )}
      </motion.div>

      {/* COUNTRY */}
      <motion.div variants={itemVariants} className="space-y-2">
        <label className="text-xs font-semibold tracking-[0.2em] text-slate-500">
          Country
        </label>
        <div className="flex items-center gap-2 border border-slate-200 px-2 py-2">
          <select
            {...register("Country", { required: "Country is required" })}
            className="w-full bg-transparent text-sm text-slate-700 outline-none"
          >
            <option value="">Select Country</option>
            {Arraycountries.map((country: string, index: number) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        {"Country" in errors && (
          <ErrorText message={errors["Country"]?.message as string} />
        )}
      </motion.div>
    </motion.div>

    <div className="flex justify-center mt-10">
      <motion.button
        type="submit"
        className="flex w-60 items-center justify-center gap-2 bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(16,185,129,0.4)] hover:bg-emerald-500 cursor-pointer"
      >
        <ArrowRight />
        Submit Registration
      </motion.button>
    </div>
  </motion.div>
) : (
    <motion.div
      key="corporate"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
    >
      <Corporate register={register} errors={errors} />
    </motion.div>
)}
</AnimatePresence>
</div>
</motion.div>
</form>
);
};

export default Registration;
