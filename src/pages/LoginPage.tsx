import { LockKeyhole, LogInIcon, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Authschema, type FormFields } from "../Zod_Schema/schemaValidations";
import { useForm } from "react-hook-form";
import { containerVariants, itemVariants } from "../helpers/FramerMotion";
import { zodResolver } from "@hookform/resolvers/zod";


const LoginPage = () => {

const {handleSubmit, register, formState:{errors}} = useForm<FormFields>({
  resolver: zodResolver(Authschema)
})

const ClickOnLogin = (data:FormFields) => {
  console.log(data)
}

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-10">

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-[440px] rounded-[10px] bg-white px-8 py-10 shadow-[0_5px_20px_rgba(15,23,42,0.1)]"
      > 

        <motion.div variants={itemVariants} className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-emerald-100/60">
            <LockKeyhole className="text-emerald-600" size={26} />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Welcome Back</h1>
          <p className="text-sm text-slate-500">Login to access your dashboard</p>
        </motion.div>

        <motion.form variants={containerVariants} className="mt-8 space-y-4"
        onSubmit={handleSubmit(ClickOnLogin)}
        >

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Email Address</label>
            <div className="flex items-center gap-3 rounded-[18px] border border-slate-200 bg-[#fafbff] px-4 py-3">
              <Mail className="text-slate-400" />
              <input
              {...register("email")}
                type="email"
                placeholder="name@company.com"
                className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none"
              />
            </div>
          {errors.email && (
  <p className="text-xs text-red-500">{errors.email.message}</p>
)}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Password</label>
            <div className="flex items-center gap-3 rounded-[18px] border border-slate-200 bg-[#fafbff] px-4 py-3">
              <LockKeyhole className="text-slate-400" />
              <input
              {...register("password")}
                type="password"
                placeholder="Enter your password"
                className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none"
              />
            </div>
            {errors.password && (
  <p className="text-xs text-red-500">{errors.password.message}</p>
)}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-end text-xs font-semibold text-emerald-600"
          >
            <Link to="/forgot-password">Forgot password?</Link>
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full rounded-[18px] bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_6px_15px_rgba(16,185,129,0.2)] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogInIcon />
            Login
          </motion.button>

        </motion.form>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-center text-sm text-slate-500"
        >
          Don&apos;t have an account{" "}
          <Link to="/register" className="font-semibold text-emerald-600">
            Create account
          </Link>
        </motion.p>

      </motion.section>

    </div>

  );
};

export default LoginPage;