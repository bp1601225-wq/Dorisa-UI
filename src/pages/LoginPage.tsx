import { LockKeyhole, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data:any) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    toast.info('Demo login form', {
      description: 'Authentication is not connected yet. This is UI only.',
    });
    console.log(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-md p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-green-100">
            <LockKeyhole className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">Email</label>
            <div className="flex items-center border rounded-xl px-3 py-2">
              <User className="text-gray-400 mr-2" />
              <input
                {...register('email', { required: true })}
                id="email"
                type="email"
                placeholder="name@company.com"
                className="w-full outline-none text-gray-800"
              />
            </div>
            {errors.email && <span className="text-red-500 text-sm mt-1">Email is required</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-medium text-gray-700">Password</label>
            <div className="flex items-center border rounded-xl px-3 py-2">
              <LockKeyhole className="text-gray-400 mr-2" />
              <input
                {...register('password', { required: true })}
                id="password"
                type="password"
                placeholder="********"
                className="w-full outline-none text-gray-800"
              />
            </div>
            {errors.password && <span className="text-red-500 text-sm mt-1">Password is required</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-green-600 font-medium underline">
              Register
            </Link>
          </p>
        </form>

        <p className="border-t border-gray-200 mt-6 pt-4 text-center text-sm text-gray-600">
          Back to app:{' '}
          <Link className="text-gray-800 font-semibold underline" to="/template-one">
            App
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;