import { Briefcase, Clipboard, Flag, DollarSign } from 'lucide-react'
import FormField from '../components/ui/FormField'
import { formControlClassName } from '../components/templates/formControlClassName'
import TextProps from './utils/utils'
import { useForm, useFieldArray } from "react-hook-form";
const projectStages = ['Planning', 'Approved', 'In Progress', 'On Hold', 'Review', 'Completed', 'Delivered', 'Cancelled']

const CreateProjectPage = () => {

  const demoProject = {
  id: 101,
  title: "Dorisa Design Website",
  budget: 3000,
  client: 2,          // client id
  stages: 3,          // index from projectStages array
  description: "Build a modern landing page and dashboard UI."
};

  const {register, handleSubmit, watch, formState: {errors}} = useForm()


const clientSelected = watch("client");

  
const clients = [ 
  { id: 1, clientName: "Acme Corporation" },
  { id: 2, clientName: "Bright Future Ltd" },
  { id: 3, clientName: "Golden Star Ventures" },
  { id: 4, clientName: "NovaTech Solutions" },
  { id: 5, clientName: "Sunrise Holdings" }
];

function CreateProject(data:any){
console.log(data)
}



  return (
    <section className="space-y-6">
      <header className="space-y-1">
    
    <TextProps data = "Create Projects" text = "Capture the brief, assign an owner, and let the squad know what success looks like." />
      

      </header>

      <form className="grid gap-6 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm md:grid-cols-2"
      onSubmit={handleSubmit(CreateProject)}>
        <FormField id="projectName" label="Project Title" icon={Briefcase}
        >
          <input
          {...register("title", {required:"title is required"})}
            className={formControlClassName}
            id="projectName"
            placeholder="Dorisa Design"
            type="text"
          />
        </FormField>


     <FormField id="projectName" label="Budget" icon={DollarSign}>
          <input
          {...register("budget")}
            className={formControlClassName}
            id="projectName"
            placeholder=" 3000.00"
            type="text"
          />
        </FormField>

        <FormField id="client" label="Select Client" icon={Clipboard}>
        <select
        {...register("client")}
      className = {formControlClassName} >
          <option value="">Select Client</option>
        {clients.map((clients)=>{
          return (
            <option key={clients.id} value={clients.id}>
              {clients.clientName}
            </option>
          )
        })}
        </select>
        </FormField>

   

        <FormField id="status" label="Stage" icon={Flag}>
          <select className={formControlClassName} id="stage"  defaultValue=""
            {...register("stages")}
          >
            <option value="">Choose stage</option>
            {projectStages.map((stage, index:number) => (
              <option key={index} value={index}>
                {stage}
              </option>
            ))}
          </select>
        </FormField>

        <FormField className="md:col-span-2" id="summary" label="Project description" >
          <textarea
          {...register("description")}
            className={`${formControlClassName} min-h-32 resize-y`}
            id="summary"
            placeholder="Describe the goals, desired outcomes, and success cues."
          />
        </FormField>

        <div className="md:col-span-2 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            We will notify the team and create a channel once you submit the draft.
          </p>
          <button
            className="rounded-full border border-slate-200 bg-slate-900 px-6 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            type="submit"
          >
            Create project
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreateProjectPage
