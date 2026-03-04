import {
  ArrowRight,
  Globe,
  LockKeyhole,
  Mail,
  Phone,
  UserRoundPlus,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { Arraycountries, ErrorText } from "../utils/utils";
import type { RegistrationForm } from "../../../GlobalTypes";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

type CorporateProps = {
  register: UseFormRegister<RegistrationForm>;
  errors: FieldErrors<RegistrationForm>;
};

const Corporate = ({ register, errors }: CorporateProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto w-full  bg-white/90 p-10 shadow-[0_35px_90px_rgba(15,23,42,0.18)]"
    >
      {/* FIRST GRID: Company Info */}
      <motion.div variants={containerVariants} className="grid gap-6 md:grid-cols-3">
        {/* Company Name */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-xs font-semibold tracking-[0.2em] text-slate-500">
            Company Name
          </label>
          <div className="flex items-center gap-2 border border-slate-200 px-2 py-2">
            <BuildingIcon />
            <input
              {...register("companyName", { required: "Company Name is required" })}
              type="text"
              placeholder="Dorisa Consult Ltd"
              className="w-full border-none bg-transparent text-sm text-slate-700 outline-none"
            />
          </div>
          {"companyName" in errors && (
            <ErrorText message={errors["companyName"]?.message as string} />
          )}
        </motion.div>

        {/* Contact Person */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-xs font-semibold tracking-[0.2em] text-slate-500">
            Contact Person
          </label>
          <div className="flex items-center gap-2 border border-slate-200 px-2 py-2">
            <UserRoundPlus className="text-slate-400" />
            <input
              {...register("contactPerson", { required: "Contact Person is required" })}
              type="text"
              placeholder="John Mensah"
              className="w-full border-none bg-transparent text-sm text-slate-700 outline-none"
            />
          </div>
          {"contactPerson" in errors && (
            <ErrorText message={errors["contactPerson"]?.message as string} />
          )}
        </motion.div>

        {/* Country */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-xs font-semibold tracking-[0.2em] text-slate-500">
            Country
          </label>
          <div className="flex items-center border border-slate-200 bg-white/90 px-2 py-2">
            <select
              {...register("country", { required: "Country is required" })}
              className="w-full border-none bg-transparent text-sm text-slate-700 outline-none"
            >
              <option value="">Select Country</option>
              {Arraycountries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          {"country" in errors && <ErrorText message={errors["country"]?.message as string} />}
        </motion.div>
      </motion.div>

      {/* SECOND GRID: Industry, Email, Website */}
      <motion.div variants={containerVariants} className="mt-6 grid gap-6 md:grid-cols-3">
        {/* Industry */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-xs font-semibold tracking-[0.2em] text-slate-500">Industry</label>
          <div className="flex items-center gap-2 border border-slate-200 px-2 py-2">
            <BriefcaseIcon />
            <input
              {...register("industry", { required: "Industry is required" })}
              type="text"
              placeholder="Consulting / Technology"
              className="w-full border-none bg-transparent text-sm text-slate-700 outline-none"
            />
          </div>
          {"industry" in errors && <ErrorText message={errors["industry"]?.message as string} />}
        </motion.div>

        {/* Business Email */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-xs font-semibold tracking-[0.2em] text-slate-500">Business Email</label>
          <div className="flex items-center gap-2 border border-slate-200 px-2 py-2">
            <Mail className="text-slate-400" />
            <input
              {...register("email", { required: "Business Email is required" })}
              type="email"
              placeholder="contact@company.com"
              className="w-full border-none bg-transparent text-sm text-slate-700 outline-none"
            />
          </div>
          {"email" in errors && <ErrorText message={errors["email"]?.message as string} />}
        </motion.div>

        {/* Company Website */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-xs font-semibold tracking-[0.2em] text-slate-500">Company Website (Optional)</label>
          <div className="flex items-center gap-2 border border-slate-200 px-2 py-2">
            <Globe className="text-slate-400" />
            <input
              {...register("companyWebsite")}
              type="url"
              placeholder="https://company.com"
              className="w-full border-none bg-transparent text-sm text-slate-700 outline-none"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* FINAL GRID: Password, Phone & Submit */}
      <motion.div variants={containerVariants} className="mt-6 grid gap-6 md:grid-cols-3">
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-xs font-semibold tracking-[0.2em] text-slate-500">Account Password</label>
          <div className="flex items-center gap-2 border border-slate-200 px-2 py-2">
            <LockKeyhole className="text-slate-400" />
          <input
  {...register("password", { minLength: { value: 8, message: "Password must be at least 8 characters" } })}
  type="password"
  placeholder="***************"
  className="w-full border-none bg-transparent text-sm text-slate-700 outline-none"
/>
          </div>
          {"password" in errors && <ErrorText message={errors["password"]?.message as string} />}
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-xs font-semibold tracking-[0.2em] text-slate-500">Business Phone</label>
          <div className="flex items-center gap-2 border border-slate-200 px-2 py-2">
            <Phone className="text-slate-400" />
            <input
              {...register("phone", { required: "Business Phone is required" })}
              type="tel"
              placeholder="+233 000 000 000"
              className="w-full border-none bg-transparent text-sm text-slate-700 outline-none"
            />
          </div>
          {"phone" in errors && <ErrorText message={errors["phone"]?.message as string} />}
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-end justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="flex items-center gap-2 rounded-sm bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(16,185,129,0.4)] transition hover:bg-emerald-500 cursor-pointer"
          >
            <ArrowRight />
            Submit Registration
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// ICONS
const BuildingIcon = () => (
  <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 20h16V4H4z" />
    <path d="M9 20V9h6v11" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M5 7h14M8 7V5h8v2M4 7v12h16V7" />
  </svg>
);

export default Corporate;
