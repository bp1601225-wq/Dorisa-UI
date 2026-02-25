import { LockKeyhole } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import type {FormFields} from "../../GlobalTypes"

function LoginPage() {
const {
register,
handleSubmit,
formState: { errors, isSubmitting },
} = useForm<FormFields>()

return (

<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-sky-50 to-cyan-100 p-4">
  
<section className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm ">

<header className="border-b border-slate-200 bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-5 text-white flex items-center gap-2">

<div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
<LockKeyhole size={18} />
</div>

<h2 className="text-2xl font-bold">Login</h2>
<p className="mt-1 text-sm text-blue-50">Sign in to continue to your form templates.</p>
</header>

<form
className="space-y-4 p-6"
onSubmit={handleSubmit(async () => {
await new Promise((resolve) => setTimeout(resolve, 200))
toast.info('Demo login form', {
  description: 'Authentication is not connected yet. This is UI only.',
})
})}
>
<div>
<label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="email">
  Email
</label>
<input
  {...register('email', {
    required: true,
  })}
  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
  id="email"
  name="email"
  placeholder="name@company.com"
  type="email"
/>
{errors.email && <div className="text-red-500">Email is required</div>}
</div>

<div>
<label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="password">
  Password
</label>
<input
  {...register('password', {
    required: true,
  })}
  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
  id="password"
  name="password"
  placeholder="********"
  type="password"
/>
{errors.password && <div className="text-red-500">Password is required</div>}
</div>

<button
className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
disabled={isSubmitting}
type="submit"
>
{isSubmitting ? 'submitting...' : 'Submit'}
</button>
</form>

<p className="border-t border-slate-200 px-6 py-4 text-sm text-slate-600">
Back to app:{' '}
<Link className="font-semibold text-slate-900 underline" to="/template-one">
App
</Link>
</p>
</section>
</div>
)
}

export default LoginPage