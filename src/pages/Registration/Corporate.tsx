import {
  ArrowRight,
  Circle,
  Globe,
  LockKeyhole,
  Mail,
  Phone,
  UserRoundPlus,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { Arraycountries, ErrorText } from "../utils/utils";
import type { RegistrationForm } from "../../../GlobalTypes";
import type { FieldErrors,  UseFormRegister } from "react-hook-form";

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
  isSubmitting:boolean
};

const Corporate = ({ register, errors, isSubmitting }: CorporateProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      {/* FIRST GRID: Company Info */}
      <motion.div variants={containerVariants} className="grid gap-6 md:grid-cols-3">
        {/* Company Name */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-sm font-semibold text-slate-600">Company Name</label>
          <div className="flex items-center gap-3 rounded-[14px] border border-slate-200 bg-[#fafbff] px-3 py-2">
            <BuildingIcon />
            <input
              {...register("companyName", { required: "Company Name is required" })}
              type="text"
              placeholder="Dorisa Consult Ltd"
              className="w-full border-none bg-transparent text-sm font-medium text-slate-700 outline-none"
            />
          </div>
          {"companyName" in errors && (
            <ErrorText message={errors["companyName"]?.message as string} />
          )}
        </motion.div>

        {/* Contact Person */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-sm font-semibold text-slate-600">Contact Person</label>
          <div className="flex items-center gap-3 rounded-[14px] border border-slate-200 bg-[#fafbff] px-3 py-2">
            <UserRoundPlus className="text-slate-400" size={18} />
            <input
              {...register("contactPerson", { required: "Contact Person is required" })}
              type="text"
              placeholder="John Mensah"
              className="w-full border-none bg-transparent text-sm font-medium text-slate-700 outline-none"
            />
          </div>
          {"contactPerson" in errors && (
            <ErrorText message={errors["contactPerson"]?.message as string} />
          )}
        </motion.div>

        {/* Country */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-sm font-semibold text-slate-600">Country</label>
          <div className="flex items-center rounded-[14px] border border-slate-200 bg-[#fafbff] px-3 py-2">
            <select
              {...register("country", { required: "Country is required" })}
              className="w-full border-none bg-transparent text-sm font-medium text-slate-700 outline-none"
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
          <label className="text-sm font-semibold text-slate-600">Industry</label>
          <div className="flex items-center gap-3 rounded-[14px] border border-slate-200 bg-[#fafbff] px-3 py-2">
            <BriefcaseIcon />
            <input
              {...register("industry", { required: "Industry is required" })}
              type="text"
              placeholder="Consulting / Technology"
              className="w-full border-none bg-transparent text-sm font-medium text-slate-700 outline-none"
            />
          </div>
          {"industry" in errors && <ErrorText message={errors["industry"]?.message as string} />}
        </motion.div>

        {/* Business Email */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-sm font-semibold text-slate-600">Business Email</label>
          <div className="flex items-center gap-3 rounded-[14px] border border-slate-200 bg-[#fafbff] px-3 py-2">
            <Mail className="text-slate-400" size={18} />
            <input
              {...register("email", { required: "Business Email is required" })}
              type="email"
              placeholder="contact@company.com"
              className="w-full border-none bg-transparent text-sm font-medium text-slate-700 outline-none"
            />
          </div>
          {"email" in errors && <ErrorText message={errors["email"]?.message as string} />}
        </motion.div>

        {/* Company Website */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-sm font-semibold text-slate-600">Company Website (Optional)</label>
          <div className="flex items-center gap-3 rounded-[14px] border border-slate-200 bg-[#fafbff] px-3 py-2">
            <Globe className="text-slate-400" size={18} />
            <input
              {...register("companyWebsite")}
              type="url"
              placeholder="https://company.com"
              className="w-full border-none bg-transparent text-sm font-medium text-slate-700 outline-none"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* FINAL GRID: Password, Phone & Submit */}
      <motion.div variants={containerVariants} className="mt-6 grid gap-6 md:grid-cols-3">
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-sm font-semibold text-slate-600">Account Password</label>
          <div className="flex items-center gap-3 rounded-[14px] border border-slate-200 bg-[#fafbff] px-3 py-2">
            <LockKeyhole className="text-slate-400" size={18} />
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
              })}
              type="password"
              placeholder="***************"
              className="w-full border-none bg-transparent text-sm font-medium text-slate-700 outline-none"
            />
          </div>
          {"password" in errors && <ErrorText message={errors["password"]?.message as string} />}
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-sm font-semibold text-slate-600">Business Phone</label>
          <div className="flex items-center gap-3 rounded-[14px] border border-slate-200 bg-[#fafbff] px-3 py-2">
            <Phone className="text-slate-400" size={18} />
            <input
              {...register("phone", { required: "Business Phone is required" })}
              type="tel"
              placeholder="+233 000 000 000"
              className="w-full border-none bg-transparent text-sm font-medium text-slate-700 outline-none"
            />
          </div>
          {"phone" in errors && <ErrorText message={errors["phone"]?.message as string} />}
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-end justify-end md:col-span-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-[18px] bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_6px_15px_rgba(16,185,129,0.2)] transition hover:bg-emerald-600 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 md:w-72"
          >
               {isSubmitting ? (
  <>
    <Circle className="animate-spin" />
    Submitting...
  </>
) : (
  <>
    <ArrowRight />
    Submit Registration
  </>
)}

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
