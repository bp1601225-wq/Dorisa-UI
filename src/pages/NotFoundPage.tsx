import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-white">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900/70 p-10 text-center shadow-2xl">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-b from-emerald-500/20 to-slate-900">
          <AlertTriangle className="h-10 w-10 text-amber-300" />
        </div>
        <p className="mt-6 text-sm uppercase tracking-[0.5em] text-slate-400">404</p>
        <h1 className="mt-2 text-4xl font-black text-white">Page not found</h1>
        <p className="mt-4 text-slate-300">
          Looks like the route you entered does not exist yet. Let’s get you back on the pulse.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/20"
        >
          Go home
          <ArrowLeft className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-6 text-xs text-slate-500">
        Double-check the link or reach out to the team if you need help finding something.
      </p>
    </div>
  );
};

export default NotFoundPage;
