const ticketQueue = [
  { title: 'Service desk uplift', priority: 'High', owner: 'Support & Delivery', due: 'Tonight' },
  { title: 'Portal feedback loop', priority: 'Medium', owner: 'Experience Lab', due: 'Tomorrow' },
  { title: 'Operational handbook', priority: 'Low', owner: 'Ops Enablement', due: 'Next week' },
]

const TicketsPage = () => {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Tickets</p>
        <h1 className="text-3xl font-semibold text-slate-900">Ticket center</h1>
        <p className="text-sm text-slate-500">
          Every request gets routed, triaged, and surfaced with an owner so no one waits for a reply.
        </p>
      </header>

      <div className="space-y-3">
        {ticketQueue.map((ticket) => (
          <article
            key={ticket.title}
            className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">{ticket.title}</h2>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                {ticket.priority}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-500">
              Owner: {ticket.owner} · Due: {ticket.due}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TicketsPage
