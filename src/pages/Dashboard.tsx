import FormField from '../components/ui/FormField'
import { formControlClassName } from '../components/templates/formControlClassName'
import { ArrowUpRight, Rocket, Ticket, UserCheck } from 'lucide-react'

const industries = ['Technology', 'Finance', 'Healthcare', 'Education', 'Operations']

const Dashboard = () => {
  return (
    <section className="max-w-3xl space-y-6">
      <div>
     
        <h1 className="mt-2 text-3xl tracking-wider font-bold flex items-center gap-3 bg-gradient-to-r 
        from-yellow-600  via-white to yellow-300 bg-clip-text text-transparent italic">

          Hello Yaw </h1>
<hr className='text-gray-300/80 mt-2'/>

       <p className="text-slate-600 text-lg mt-5">
  Welcome to your dashboard. View your analytics and system overview.
</p>

<p className="text-slate-600 text-sm tracking-wider mt-3 ">
  Monitor ongoing activities and track current progress.
</p>

<div className='flex flex-wrap gap-5 w-[900px]'>

<div className="max-w-sm w-[270px] bg-white shadow-lg rounded-2xl p-6 border border-gray-200 mt-10">
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-gray-500 text-sm font-medium">Total Users</h2>
      <p className="text-2xl font-bold text-gray-900 mt-1">1,245</p>
    </div>
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
      {/* Example icon */}
      <UserCheck size={24} className="text-white" />
    </div>
  </div>

  <div className="mt-4 flex items-center text-sm text-green-500">
    <ArrowUpRight size={16} className="mr-1" />
    <span>+5% since last week</span>
  </div>
</div>


<div className="max-w-sm w-[270px] bg-white shadow-lg rounded-2xl p-6 border border-gray-200 mt-10">
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-gray-500 text-sm font-medium">Total Projects</h2>
      <p className="text-2xl font-bold text-gray-900 mt-1">20</p>
    </div>
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
      {/* Example icon */}
      <Rocket size={24} className="text-white" />
    </div>
  </div>

  <div className="mt-4 flex items-center text-sm text-green-500">
    <ArrowUpRight size={16} className="mr-1" />
    <span>+2% since last week</span>
  </div>
</div>


<div className="max-w-sm w-[270px] bg-white shadow-lg rounded-2xl p-6 border border-gray-200 mt-10">
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-gray-500 text-sm font-medium">Total Tickets</h2>
      <p className="text-2xl font-bold text-gray-900 mt-1">10</p>
    </div>
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
      {/* Example icon */}
      <Ticket size={24} className="text-white" />
    </div>
  </div>

  <div className="mt-4 flex items-center text-sm text-green-500">
    <ArrowUpRight size={16} className="mr-1" />
    <span>+2% since last week</span>
  </div>
</div>



</div>

      </div>

    </section>
  )
}

export default Dashboard
