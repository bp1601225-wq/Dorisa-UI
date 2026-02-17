const highlights = [
  { label: 'Active Projects', value: '8', trend: '+3 this quarter' },
  { label: 'New RFPs', value: '5', trend: '+2 in the last 30 days' },
  { label: 'Completed', value: '14', trend: '+6 this year' },
]

const projectBoards = [
  {
    title: 'Dorisa Consulting Platform',
    stage: 'Strategy sprint',
    owner: 'Studio Alpha',
    progress: 78,
  },
  {
    title: 'AI Enablement Pilot',
    stage: 'Proof of concept',
    owner: 'Product Ops',
    progress: 45,
  },
  {
    title: 'Client Portal Refresh',
    stage: 'UX reviews',
    owner: 'Experience Lab',
    progress: 64,
  },
]

const ProjectsPage = () => {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Projects</p>
        <h1 className="text-3xl font-semibold text-slate-900">Project command center</h1>
        <p className="text-sm text-slate-500">
          Keep every engagement aligned, transparent, and ready for the next sprint.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((highlight) => (
          <article
            key={highlight.label}
            className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
              {highlight.label}
            </p>
            <p className="text-4xl font-bold text-slate-900">{highlight.value}</p>
            <p className="text-xs text-emerald-500">{highlight.trend}</p>
          </article>
        ))}
      </div>

      <div className="space-y-4">
        {projectBoards.map((project) => (
          <article
            key={project.title}
            className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">{project.title}</h2>
              <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
                {project.stage}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
              <span>Owner: {project.owner}</span>
              <span>Progress: {project.progress}%</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-slate-800"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProjectsPage
