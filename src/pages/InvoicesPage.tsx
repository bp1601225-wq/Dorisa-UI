const invoices = [
  { client: 'Zenith Finance', amount: '$42,500', due: 'Feb 24' },
  { client: 'Halo Health', amount: '$18,900', due: 'Mar 2' },
  { client: 'Northwind Utilities', amount: '$29,350', due: 'Mar 15' },
]

const InvoicesPage = () => {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Invoices</p>
        <h1 className="text-3xl font-semibold text-slate-900">Invoice desk</h1>
        <p className="text-sm text-slate-500">
          Track what has been billed, what is pending, and what needs follow-up.
        </p>
      </header>

      <div className="space-y-3">
        {invoices.map((invoice) => (
          <article
            key={invoice.client}
            className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">{invoice.client}</h2>
              <span className="text-sm font-semibold text-slate-600">{invoice.due}</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-900">{invoice.amount}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Awaiting payment</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default InvoicesPage
