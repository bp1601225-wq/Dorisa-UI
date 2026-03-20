import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { pricingPlans } from "./Pricing";

export default function PricingDetails() {
  const navigate = useNavigate();
  const { pricingId } = useParams<{ pricingId: string }>();
  const plan = pricingPlans.find((item) => item.id === pricingId);

  if (!plan) {
    return (
      <section className="space-y-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
        <p className="text-sm text-emerald-600">Pricing plan is not available.</p>
        <button
          onClick={() => navigate("/settings")}
          className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 underline"
        >
          <ArrowLeft size={16} />
          Back to Pricing
        </button>
      </section>
    );
  }

  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <button
        onClick={() => navigate("/settings")}
        className="flex items-center gap-2 text-sm font-semibold text-slate-600"
      >
        <ArrowLeft size={18} />
        Back to Pricing
      </button>
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Pricing details</p>
        <h1 className="text-2xl font-semibold text-slate-900">{plan.name}</h1>
        <p className="text-sm text-slate-500">ID: {plan.id}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Price</p>
          <p className="text-lg font-semibold text-slate-900">₵{plan.price.toLocaleString()}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">User limit</p>
          <p className="text-lg font-semibold text-slate-900">{plan.users}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Features</p>
          <p className="text-sm text-slate-700">{plan.features}</p>
        </div>
      </div>
    </section>
  );
}
