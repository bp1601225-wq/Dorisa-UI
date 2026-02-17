function DashboardPage() {
  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
      <p className="max-w-2xl text-slate-600">
        This is your main layout area. Use the sidebar to move between pages and
        extend this starter with your own features.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Open Tickets</p>
          <p className="mt-1 text-2xl font-semibold">18</p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Resolved Today</p>
          <p className="mt-1 text-2xl font-semibold">7</p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Pending Review</p>
          <p className="mt-1 text-2xl font-semibold">3</p>
        </article>
      </div>
    </section>
  )
}

export default DashboardPage
