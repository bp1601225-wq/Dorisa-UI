const ConsultingPage = () => {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Consulting</p>
        <h1 className="text-4xl font-bold text-slate-900">
          Dorisa Consulting initiatives
        </h1>
        <p className="text-sm text-slate-500">
          Tailored programs, immersive sprints, and premium advisory to help clients operate with
          confidence.
        </p>
      </header>

      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-8 text-white shadow-2xl">
        <p className="text-sm uppercase tracking-[0.5em] text-slate-300">Signature offer</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">
          Bespoke consulting playbook
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-200">
          Strategy sessions, enablement labs, and measurement frameworks designed around the
          moment. Our consulting pods stay embedded to ensure adoption and momentum.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.4em]">
          <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200">Strategy</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200">Delivery</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200">Learning</span>
        </div>
      </div>
    </section>
  )
}

export default ConsultingPage
