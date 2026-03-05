import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] px-6 text-slate-800">
      <div className="w-full max-w-md rounded-3xl bg-white p-12 text-center shadow-[0_40px_100px_rgba(15,23,42,0.08)]">
        
        {/* Icon Circle */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50">
          <AlertTriangle className="h-10 w-10 text-emerald-600" />
        </div>

        {/* 404 Label */}
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.5em] text-slate-400">
          404
        </p>

        {/* Heading */}
        <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
          Page not found
        </h1>

        {/* Description */}
        <p className="mt-4 text-sm text-slate-500 leading-relaxed">
          The page you’re looking for doesn’t exist or may have been moved.
          Let’s get you back to safety.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_15px_40px_rgba(16,185,129,0.25)] transition hover:bg-emerald-500 hover:scale-[1.03] active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Home
        </button>
      </div>

      <p className="mt-8 text-xs text-slate-400">
        Double-check the link or contact support if you need help.
      </p>
    </div>
  );
};

export default NotFoundPage;