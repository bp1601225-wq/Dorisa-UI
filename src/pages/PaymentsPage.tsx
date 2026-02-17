const payments = [
  { client: 'Zenith Finance', amount: '$52,000', status: 'Paid', date: 'Feb 10' },
  { client: 'Halo Health', amount: '$18,900', status: 'Pending', date: 'Feb 24' },
  { client: 'Northwind Utilities', amount: '$29,350', status: 'Overdue', date: 'Feb 05' },
]

const PaymentsPage = () => {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Payments</p>
        <h1 className="text-3xl font-semibold text-slate-900">Payment activity</h1>
        <p className="text-sm text-slate-500">
          Monitor cash collected, pending approvals, and overlap with invoices.
        </p>
      </header>

      <div className="space-y-3">
        {payments.map((payment) => (
          <article
            key={payment.client}
            className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">{payment.client}</h2>
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                {payment.status}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-slate-500">
              <span>Amount: {payment.amount}</span>
              <span>Processed: {payment.date}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PaymentsPage
