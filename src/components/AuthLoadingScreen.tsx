import { Loader2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const AuthLoadingScreen = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900">
    <div className="flex w-full max-w-lg flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl shadow-emerald-900/40 backdrop-blur-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-200" />
      </div>
      <p className="text-xs uppercase tracking-[0.5em] text-emerald-200">
        Dorisa Consult
      </p>
      <h1 className="text-2xl font-semibold text-white">
        Loading your Dorisa product canvas
      </h1>
      <p className="text-sm leading-relaxed text-emerald-100">
        Syncing credentials, refreshing plans, and readying every insight before
        you dive into the service review experience.
      </p>
      <Link
        to="/all-services"
        className="rounded-full border border-emerald-400 px-6 py-2 text-sm font-semibold text-emerald-200 transition hover:border-emerald-300 hover:text-white"
      >
        Explore services while we prep things →
      </Link>
      <Sparkles className="h-5 w-5 text-emerald-300 animate-pulse" />
    </div>
  </div>
);

export default AuthLoadingScreen;
