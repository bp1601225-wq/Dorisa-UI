import { LockKeyhole } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import type { FormFields } from "../../GlobalTypes";
import { motion } from "framer-motion";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-100 p-6">
      
      <motion.section
        className="w-full max-w-md rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <header className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-5 text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
            <LockKeyhole size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Login</h2>
            <p className="text-sm text-blue-100 mt-1">Sign in to continue to your account.</p>
          </div>
        </header>

        {/* Form */}
        <form
          className="space-y-5 p-6"
          onSubmit={handleSubmit(async () => {
            await new Promise((resolve) => setTimeout(resolve, 200));
            toast.info('Demo login form', {
              description: 'Authentication is not connected yet. This is UI only.',
            });
          })}
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              {...register('email', { required: true })}
              id="email"
              name="email"
              type="email"
              placeholder="name@company.com"
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
            {errors.email && <span className="mt-1 text-red-500 text-sm">Email is required</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              {...register('password', { required: true })}
              id="password"
              name="password"
              type="password"
              placeholder="********"
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
            {errors.password && <span className="mt-1 text-red-500 text-sm">Password is required</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 text-white font-semibold text-sm hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Login'}
          </button>

          <p className="text-center text-sm text-slate-500 mt-2">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-medium underline">
              Register
            </Link>
          </p>
        </form>

        {/* Back to app */}
        <p className="border-t border-slate-200 px-6 py-4 text-center text-sm text-slate-600">
          Back to app:{' '}
          <Link className="font-semibold text-slate-900 underline" to="/template-one">
            App
          </Link>
        </p>
      </motion.section>
    </div>
  );
}

export default LoginPage;