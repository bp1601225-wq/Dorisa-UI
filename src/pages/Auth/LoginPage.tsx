import { Loader2, LockKeyhole, LogInIcon, Mail, Sparkles, TrendingUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Authschema, type FormFields } from "../../Zod_Schema/schemaValidations";
import { useForm } from "react-hook-form";
import { containerVariants, itemVariants } from "../../helpers/FramerMotion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/AuthContext";
import consultingHero from "../../assets/consulting-hero.jpg";

const LoginPage = () => {
  const navigate = useNavigate();
  const { Login, currentUser } = useAuth();

  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<FormFields>({
    resolver: zodResolver(Authschema),
  });

  const ClickOnLogin = async (data: FormFields) => {
    await Login(data);
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-0 py-0">
      <div className="grid h-screen w-full grid-cols-1 md:grid-cols-[68%_33%]">
        
        {/* Left Hero Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative hidden h-full flex-col justify-between overflow-hidden rounded-none bg-gradient-to-br from-emerald-500 via-emerald-600 to-slate-900 p-8 text-white md:flex" 
        >
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-200">Dorisa Consult</p>
            <div className="flex items-center gap-2 text-4xl font-semibold leading-tight text-white">
              <Sparkles className="h-9 w-10 text-emerald-200" />
              <span>Clear plans, calm delivery</span>
            </div>
            <p className="text-sm text-emerald-100 max-w-[380px]">
              Dorisa Consult builds steady roadmaps and trusted advice so every meeting feels
              calm, clear, and in line with your team’s style.
            </p>
<div className="mt-24 flex justify-center">
  <div className="flex items-center gap-3 rounded-full bg-white/10 px-5 py-2 backdrop-blur-sm border border-white/20 text-white font-semibold tracking-wide shadow-lg">
    
    <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />

    <span className="text-sm md:text-base">
      Best in Consulting Service
    </span>

    <TrendingUp className="h-5 w-5 text-emerald-200 animate-bounce" />

  </div>
</div>
          </motion.div>



          <motion.ul variants={itemVariants} className="space-y-3 text-sm text-emerald-50">
            {[
              { title: "Guided workshops" },
              { title: "Proof-driven delivery" },
              { title: "Client-ready meetings" },
            ].map((feature) => (
              <li key={feature.title} className="flex items-center gap-3 text-sm font-medium">
                <span className="rounded-full border border-emerald-200 bg-emerald-200/20 p-1">
                  <Sparkles className="h-3 w-3 text-emerald-200" />
                </span>
                {feature.title}
              </li>
            ))}
          </motion.ul>

          <div className="pointer-events-none absolute inset-0 w-">
            <img
              src={consultingHero}
              alt="Abstract gradient"
              className="absolute inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)]  object-cover opacity-40 mix-blend-screen "
            />
          </div>
        </motion.div>
        {/* Right Login Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="px-6 py-10 sm:px-10"
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
          <motion.form
            variants={containerVariants}
            className="mt-8 space-y-4"
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
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
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
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-end text-xs font-semibold text-emerald-600"
            >
              <Link to="/welcome">Forgot password?</Link>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-[18px] bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_6px_15px_rgba(16,185,129,0.2)] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Logging In...
                </>
              ) : (
                <>
                  <LogInIcon />
                  Login
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.p variants={itemVariants} className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account{" "}
            <Link to="/register" className="font-semibold text-emerald-600">
              Create account
            </Link>
          </motion.p>
        </motion.section>
      </div>
    </div>
  );
};

export default LoginPage;
