import { Loader2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const AuthLoadingScreen = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-white">
    <div className="flex w-full max-w-lg flex-col items-center gap-6 rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-md">
      
      {/* Loader */}
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
      </div>

      {/* Brand */}
      <p className="text-xs uppercase tracking-[0.5em] text-gray-400">
        Dorisa Consult
      </p>

      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-900">
        Loading your Dorisa product canvas
      </h1>

      {/* Description */}
      <p className="text-sm leading-relaxed text-gray-500">
        Syncing credentials, refreshing plans, and preparing your workspace for
        a smooth service experience.
      </p>

      {/* Button */}
      <Link
        to="/all-services"
        className="rounded-full border border-gray-200 px-6 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
      >
        Explore services while we prep things →
      </Link>

      {/* Icon */}
      <Sparkles className="h-5 w-5 text-gray-300 animate-pulse" />
    </div>
  </div>
);

export default AuthLoadingScreen;