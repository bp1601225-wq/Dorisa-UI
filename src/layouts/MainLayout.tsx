import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

function MainLayout() {
const [collapsed, setCollapsed] = useState(false)
const [toggled, setToggled] = useState(false)

return (
<div className="min-h-screen bg-white text-slate-900">
<div className="flex min-h-screen">
<Sidebar
collapsed={collapsed}
onCloseMobile={() => setToggled(false)}
onToggleCollapsed={() => setCollapsed((value) => !value)}
toggled={toggled}
/>

<div className="flex min-h-screen min-w-0 flex-1 flex-col">
<header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 px-4 py-3 backdrop-blur-sm sm:px-6 lg:px-8">
<div className="flex items-center justify-between gap-3">
<div className="flex items-center gap-3">
<button
  aria-label="Open menu"
  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50 lg:hidden"
  onClick={() => setToggled((value) => !value)}
  type="button"
>
  <Menu size={18} />
</button>
<div>
  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
    React Tutorials
  </p>
  <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
    Simple Form Templates
  </h2>
</div>
</div>

<Link
className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
onClick={() => setToggled(false)}
to="/login"
>
Login
</Link>
</div>
</header>

<main className="flex-1 bg-white p-4 sm:p-6 lg:p-10">
<Outlet />
</main>
</div>
</div>
</div>
)
}

export default MainLayout
