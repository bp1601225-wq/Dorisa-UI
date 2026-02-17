const settings = [
  { label: 'Notifications', description: 'Team updates, client messages, and automations' },
  { label: 'Integrations', description: 'Linked workspaces and productivity syncs' },
  { label: 'Access & permissions', description: 'Invite collaborators and grant clearance' },
]

const SettingsPage = () => {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Settings</p>
        <h1 className="text-3xl font-semibold text-slate-900">Workspace controls</h1>
        <p className="text-sm text-slate-500">
          Tune reminders, security, and visibility so the team works the way you expect.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {settings.map((setting) => (
          <article
            key={setting.label}
            className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-900">{setting.label}</h2>
            <p className="mt-1 text-sm text-slate-500">{setting.description}</p>
            <button className="mt-4 inline-flex rounded-full border border-slate-200 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
              Configure
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default SettingsPage
