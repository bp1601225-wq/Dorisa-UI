import {
  Circle,
  CircleCheck,
  Pencil,
  Settings,
  Shield,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";
import TextProps from "../utils/utils";
import { useEffect, useMemo, useState } from "react";
import { formControlClassName } from "../../components/templates/formControlClassName";
import SettingsModal from "../utils/Modal";
import { useForm } from "react-hook-form";
import type { RoleType } from "../../../GlobalTypes";
import { useRolesStore } from "../../ZustandShare/RolesZuts";
import { DataGrid } from "@mui/x-data-grid";
import PricingPlans from "./Pricing";

export default function SettingsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<RoleType | null>(null);

  const AddRoles = useRolesStore((r: any) => r.AddRoles);
  const fetchEveryRoles = useRolesStore((r: any) => r.fetchRoles);
  const AllRoles = useRolesStore((r: any) => r.roles);
  const EditRoles = useRolesStore((r: any) => r.EditRoles);
  const DeleteRoles = useRolesStore((r: any) => r.DeleteRoles);


// const dummyPlans = [
//   {
//     id: "1",
//     name: "Basic Consulting",
//     price: 500,
//     users: 2,
//     features: "Initial consultation, summary report",
//   },
//   {
//     id: "2",
//     name: "Business Advisory",
//     price: 1500,
//     users: 5,
//     features: "3 strategy sessions, advisory report",
//   },
//   {
//     id: "3",
//     name: "IT Infrastructure Audit",
//     price: 3000,
//     users: 10,
//     features: "System audit, security report",
//   },
// ];


  useEffect(()=>{
    fetchEveryRoles()
    console.log(AllRoles)
  }, [] )

const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting },
} = useForm<RoleType>({
  defaultValues: {
    name: "",
    status: "Active",
  },
});

  const clickOnSave = async (data: RoleType) => {
  if (editingRole?.id) {
    await EditRoles({ ...editingRole, ...data });
  } else {
    await AddRoles(data);
  }
  reset({
    name: "",
    status: "Active",
  });
  setEditingRole(null);
  setIsOpen(false);
};

const openAddModal = () => {
  setEditingRole(null);
  reset({
    name: "",
    status: "Active",
  });
  setIsOpen(true);
};

const openEditModal = (role: RoleType) => {
  setEditingRole(role);
  reset({
    name: role.name,
    status: role.status,
  });
  setIsOpen(true);
};

const handleDelete = async (id?: string) => {
  if (!id) return;
  await DeleteRoles(id);
  };

  const modalTitle = editingRole ? "Edit Role" : "Add Role";

  const columns = useMemo(
  () => [
    { field: "name", headerName: "Role Name", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      valueGetter: ({ value }: { value?: string }) => {
        if (!value) return "";
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) return value;
        return parsed.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => (
        <div className="flex gap-2">
          <button
            className="rounded-full border cursor-pointer border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 transition hover:bg-emerald-100"
            onClick={() => openEditModal(params.row)}
          >
            <Pencil className="w-4"/>
          </button>
          <button
            className="rounded-full cursor-pointer border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-100"
            onClick={() => handleDelete(params.row.id)}
          >
            <Trash2 className="w-4"/>

          </button>
        </div>
      ),
    },
  ],
  [handleDelete, openEditModal]
);

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
              onClick={openAddModal}
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

        <div>
<PricingPlans />
        </div>
        
      </div>

      {/* Modal */}
      <SettingsModal isOpen={isOpen} onClose={() => setIsOpen(false)} 
      className="bg-white max-w-lg p-2 mt-3 rounded-lg">
      <form onSubmit={(handleSubmit(clickOnSave))}>

        <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
          <Shield className="text-yellow-700" />
         <span className=" w-full"> {modalTitle}</span> 
          <span className=" w-full flex justify-end">
            <X
              className="text-red-700 cursor-pointer active:scale-105"
              onClick={() => setIsOpen(false)}
            />
          </span>
        </h2>
          <hr className="mt-[-2] text-gray-300"/>
<p className="text-gray-700 mb-2 text-sm">
         Add a new role or permission for your team:
        </p>

        <div className="flex flex-col gap-3">

<input
  {...register("name", { required: "Name cannot be empty" })}
  type="text"
  placeholder="e.g., Client"
  className={formControlClassName}
/>
{errors.name && (
  <div className="text-red-500 text-sm">{errors.name.message}</div>
)}


<select
  {...register("status", { required: "Status is required" })}
  className={`${formControlClassName} w-full`}
>
  <option value="">Select status</option>
  <option value="Active">Active</option>
  <option value="In Active">In Active</option>
</select>
{errors.status && (
  <div className="text-red-500 text-sm">{errors.status.message}</div>
)}

        </div>

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

        
</div>
      </form>

      </SettingsModal>

    </section>
  );
}
