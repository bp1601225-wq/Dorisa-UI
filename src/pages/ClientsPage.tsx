const clientSpotlights = [
  {
    name: 'Zenith Finance',
    focus: 'Risk and resilience planning',
    status: 'Kickoff soon',
  },
  {
    name: 'Halo Health',
    focus: 'Care delivery automation',
    status: 'Discovery complete',
  },
  {
    name: 'Northwind Utilities',
    focus: 'Field leadership enablement',
    status: 'Field pilots active',
  },
]

const ClientsPage = () => {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Clients</p>
        <h1 className="text-3xl font-semibold text-slate-900">Client relationships</h1>
        <p className="text-sm text-slate-500">
          Track each engagement, surface context, and highlight what needs your presence next.
        </p>
      </header>

      <div className="space-y-4">
        {clientSpotlights.map((client) => (
          <article
            key={client.name}
            className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">{client.name}</h2>
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                {client.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-500">{client.focus}</p>
          </article>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-amber-50 to-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-slate-900">Relationship health</h2>
        <p className="text-sm text-slate-500">
          Every touchpoint and follow-up is logged so the next outreach is confident and curated.
        </p>
      </div>
    </section>
  )
}

export default ClientsPage
