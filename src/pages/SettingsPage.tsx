import { Check, Circle, CircleCheck, Divide, Settings, Shield, TrendingUp, X } from "lucide-react";
import TextProps from "./utils/utils";
import { useEffect, useState } from "react";
import { formControlClassName } from "../components/templates/formControlClassName";
import SettingsModal from "./utils/Modal";
import {useForm} from "react-hook-form"
import type { RoleType } from "../../GlobalTypes";
import { useRolesStore } from "../ZustandShare/RolesZuts";
import { DataGrid } from '@mui/x-data-grid';

export default function SettingsPage() {
  const [isOpen, setIsOpen] = useState(false);

  const AddRoles = useRolesStore((r:any)=>r.AddRoles)
  const fetchEveryRoles = useRolesStore((r:any)=>r.fetchRoles)
  const AllRoles = useRolesStore((r:any)=>r.roles)


  useEffect(()=>{
    fetchEveryRoles()
    console.log(AllRoles)
  }, [] )

const {register, handleSubmit, reset, formState:{errors, isSubmitting}} = useForm<RoleType>()

const clickOnSave =  async (data:RoleType) => {

  await AddRoles(data)
  reset()
}

const columns = [
  {field: "name", headerName: "Role Name"},
  {field: "status", headerName: "status"},
  {field: "createdAt", headerName: "created At"},

  // {field: "Action", headerName: "Action"}

]

const rows = AllRoles;



 function RolesTable() {
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} 
      density="compact"
      pageSizeOptions={[5, 10, 20, 30, 40]}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5, page: 0
          }
        }
      }}
 />
    </div>
  );
}

  return (
    <section className="space-y-6">
      {/* Page Header */}
      <TextProps
        data="Configure Settings"
        icon={<Settings size={24} className="text-green-600" />}
        text="Manage roles, permissions, notifications, and integrations for your team."
      />

      {/* Roles & Permissions Card */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between border rounded border-gray-200 p-3 bg-white shadow-sm">
            <h2 className="flex items-center gap-2 text-yellow-900 font-semibold text-sm">
              <Shield className="text-yellow-700 " />
              Set Up Roles & Permissions
            </h2>

            <button
              className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition active:scale-95 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <TrendingUp size={16} />
              Establish
            </button>
          </div>

          
          {/* Display table */}
          <span className="text-green-500 text-sm ml-1">
          Role List
          </span>

{RolesTable()}





        </div>
      </div>

      {/* Modal */}
      <SettingsModal isOpen={isOpen} onClose={() => setIsOpen(false)} 
      className="bg-white max-w-lg p-2 mt-3 rounded-lg">
      <form onSubmit={(handleSubmit(clickOnSave))}>

        <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <Shield className="text-yellow-700" />
          
          Roles & Permissions 

          <span className="ml-15">
          <X className="text-red-700 cursor-pointer active:scale-105" onClick={()=>setIsOpen(false)}/>
          </span>

          </h2>
          <hr className="mt-[-2] text-gray-300"/>
        <p className="text-gray-700 mb-2 text-sm">
         Add a new role or permission for your team:
        </p>
<input
  {...register("name", { required: "Name cannot be empty" })}
  type="text"
  placeholder="e.g., Client"
  className={formControlClassName}
/>
{errors.name && (
  <div className="text-red-500 text-sm">{errors.name.message}</div>
)}
     
<div className="flex  justify-center p-1">


<button
  className="
    flex items-center justify-center mt-1 w-full
    bg-green-500 text-white py-2 rounded
    hover:bg-green-600 transition gap-2 cursor-pointer
    active:scale-105
  "
  type="submit"
>
  {isSubmitting ? (
    <>
      <Circle className="animate-spin" /> Saving
    </>
  ) : (
    <>
      <CircleCheck /> Save
    </>
  )}
</button>   

lorem
        
</div>
      </form>

      </SettingsModal>

      lorem700
    </section>
  );
}