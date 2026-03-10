import { Settings, Shield, TrendingUp } from "lucide-react"
import TextProps from "./utils/utils"

const settings = [
  { label: 'Notifications', description: 'Team updates, client messages, and automations' },
  { label: 'Integrations', description: 'Linked workspaces and productivity syncs' },
  { label: 'Access & permissions', description: 'Invite collaborators and grant clearance' },
]

const SettingsPage = () => {
  return (
    <section className="space-y-6">
      {/* <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Settings</p>
        <h1 className="text-3xl font-semibold text-slate-900">Workspace controls</h1>
        <p className="text-sm text-slate-500">
          Tune reminders, security, and visibility so the team works the way you expect.
        </p>
      </header> */}

           <TextProps 
  data="Configure Settings "
  icon={<Settings size={20} />}
/>
    
        <div className="grid gap-4 md:grid-cols-2">

          <div className="flex flex-col">

   <div className="border p-2 border-gray-200 flex gap-2">
<h1 className=" tracking-widest flex items-center gap-2 text-yellow-900 text-sm">
  <Shield />
  Set Up and Establish Roles and Permission</h1>

  <button className="bg-green-500 p-1 text-white rounded flex gap-2 cursor hover:bg-green-700 transition active:scale-105 cursor-pointer">
    <TrendingUp />
    Establish</button>

    
   </div>

   asdassaas
          </div>


      <div>
    sadas
   </div>
      </div>
    </section>
  )
}

export default SettingsPage
