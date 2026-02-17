const userGroups = [
  { title: 'Design & Experience', count: '32', status: 'Active collaborators' },
  { title: 'Product & Ops', count: '19', status: 'Monitoring delivery' },
  { title: 'People & Culture', count: '8', status: 'Coaching clients' },
]

const UsersPage = () => {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Users</p>
        <h1 className="text-3xl font-semibold text-slate-900">Team pulse</h1>
        <p className="text-sm text-slate-500">
          See who is online, where attention is needed, and which pods are scaling up.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {userGroups.map((group) => (
          <article
            key={group.title}
            className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm"
          >
            <h2 className="text-sm font-semibold text-slate-400">{group.title}</h2>
            <p className="mt-2 text-3xl font-bold text-slate-900">{group.count}</p>
            <p className="text-xs text-slate-500">{group.status}</p>
          </article>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-slate-900">Availability snapshot</h2>
        <p className="mt-2 text-sm text-slate-500">
          48 users logged today, with 12 actively mentoring and five currently focused on client
          research.
        </p>
      </div>
    </section>
  )
}

export default UsersPage
