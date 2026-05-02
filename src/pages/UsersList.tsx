import { useCallback, useEffect, useMemo, useState } from "react";
import { useUsersStore } from "../ZustandShare/usersZuts";
import { DataGridUiTable } from "./utils/utils";
import { Building2, Delete, Edit, TrendingUpDown, Users2 } from "lucide-react";
import {useForm} from "react-hook-form"
import SettingsModal from "./utils/Modal";
import { Button } from "@mui/material";
import { useRolesStore } from "../ZustandShare/RolesZuts";
import type { UserType } from "../../GlobalTypes";

const UsersList = () => {
const { fetchUsers, users,  total,
  loading,
  paginationModel,
  setPaginationModel, EditUsers } = useUsersStore();

const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

const {fetchRoles, roles} = useRolesStore()


//  REACT HOOK FORM
const {register, reset, handleSubmit, formState:{
  isSubmitted, errors
}} = useForm<UserType>()

  useEffect(() => {
    fetchUsers();
    fetchRoles()
  }, []);

  useEffect(()=>{
    console.log(roles)
  }, [roles])

    useEffect(()=>{
    console.log(users)
  }, [users])




  //  Function to add user

const onSubmit = async (data: UserType) => {
  if (!selectedUser?.id) {
    console.warn("missing selected user while editing");
    return;
  }

  try {
    const selectedRole = roles.find((role) => role.id === data.roleId);
    const payload: UserType = {
      ...selectedUser,
      ...data,
      role: selectedRole?.name ?? selectedUser.role,
    };

    
console.log(payload)

    await EditUsers(payload);

    setIsModalOpen(false);
    reset();
    setSelectedUser(null);
  } catch (error) {
    console.error("failed to update user", error);
  }
};

  const openEditModal = useCallback(
    (user: UserType) => {
      const normalizedUser: UserType = {
        ...user,
        roleId: user.roleId ?? "",
      };

      setSelectedUser(normalizedUser);
      reset(normalizedUser);
      setIsModalOpen(true);
    },
    [reset]
  );

  useEffect(() => {
    if (!selectedUser) return;
    if (selectedUser.roleId) return;

    const roleName = selectedUser.role?.trim().toLowerCase();
    if (!roleName) return;

    const matchedRole = roles.find(
      (roleItem) => roleItem.name?.trim().toLowerCase() === roleName
    );

    if (!matchedRole?.id) return;

    const updatedUser: UserType = { ...selectedUser, roleId: matchedRole.id };

    setSelectedUser(updatedUser);
    reset(updatedUser);
  }, [roles, selectedUser, reset]);


  // Material Ui data grid
  const columns = useMemo(() => [
    {
      field: "name",
      headerName: "Full Name",
      flex: 1,
      valueGetter: (_:any, row:any) => {
        if (!row) return "—";

        if (row.fullName) return row.fullName;

        else {

        return [row.firstName, row.middleName, row.lastName]
          .filter(Boolean)
          .join(" ") || "—";
        }

      },
    },
    { field: "email", headerName: "Email", flex: 1.5 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      valueGetter: (_: any, row: any) => {
        if (!row) return "—";

        const role = row.role;
        if (!role) return "—";
        if (typeof role === "string") return role;
        return role.name ?? "—";
      },
    },
    { field: "type", headerName: "User Type", flex: 1 },

    // Action Column
   
{field: "Action", headerName: "Action", flex:1, 
  sortable: false,
    filterable: false,

    renderCell: (params:any) => {
      const user = params.row as UserType

      return (
        <div className="flex gap-2 items-center">

          {/*  The two buttons */}
          <button
            onClick={(e)=> {
              e.stopPropagation()
              openEditModal(user)
            }}
            className="text-blue-500 cursor-pointer"
          >
            <Edit   size={18}/>
          </button>
           <button 
            onClick={(e) => {
              e.stopPropagation();
              console.log("Delete", user.id);
            }}
              className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg cursor-pointer"
            >
            <Delete  size={18}/>

          </button>

        </div>
      )
    }
  
}

  ], [openEditModal]);

  return (
    <section className="min-h-screen bg-slate-50 p-6 space-y-6">


      {/* 🔹 Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Users</h1>
          <p className="text-sm text-slate-500">
            Manage your users and monitor activity
          </p>
        </div>



        <button className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:opacity-90">
          + Add User
        </button>
      </header>

      {/* 🔹 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Users</p>
          <h2 className="flex gap-4 items-center text-2xl  text-gray-600 mt-2">
            {users.length}
          <TrendingUpDown className="text-green-700" />

          </h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-slate-500">Corporate</p>
          <h2 className="text-2xl font-semibold text-gray-700 mt-2 flex gap-3 items-center">
            {users.filter(u => u.type === "CORPORATE").length}
            <Building2 className="text-green-700"/>
          </h2>
        </div>



        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-slate-500">Individuals</p>
          <h2 className="text-2xl font-semibold text-slate-900 mt-2 flex gap-4 items-center">
            {users.filter(u => u.type === "INDIVIDUAL").length}
            <Users2 className="text-green-700"/>
          </h2>
        </div>
      </div>

      {/* 🔹 Table */}
      <div className="bg-white mt-3">
        
     <DataGridUiTable
  rows={users}
  columns={columns}
  rowCount={total}
  loading={loading}
  paginationMode="server"
  paginationModel={paginationModel}
  onPaginationModelChange={setPaginationModel}

 
/>


        {isModalOpen && 
        <div>
          <SettingsModal isOpen={isModalOpen} 
          onClose={ ()=>setIsModalOpen(false)}>
         <div className="w-full max-w-5xl bg-white shadow-xl border border-slate-200">

      {/* 🔹 Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Edit User</h2>
          <p className="text-xs text-slate-500">Update user details</p>
        </div>

        <button
          onClick={() => setIsModalOpen(false)}
          className="p-2 rounded-lg hover:bg-slate-100"
        >
          ✕
        </button>
      </div>

      {/* 🔹 Form */}
  <form
  onSubmit={handleSubmit(onSubmit)}
  className="px-6 py-5 space-y-6"
>

  {/* 🔹 Grid Form */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

    {/* First Name */}
    <div className="flex flex-col gap-1">
      <label className="text-xs text-slate-500">First Name</label>
     <input
    {...register("firstName", {
      required: "First name is "
    })}
    className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-black"
  />

  {errors.firstName && (
    <p className="text-red-500 text-xs">
      {errors.firstName.message}
    </p>
  )}
    </div>

    {/* Last Name */}
    <div className="flex flex-col gap-1">
      <label className="text-xs text-slate-500">Last Name</label>
      <input
        {...register("lastName", {
        required:true
        } )}
        className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-black"
      />
    </div>

    
  {errors.lastName && (
    <p className="text-red-500 text-xs">
      {errors.lastName.message}
    </p>
  )}

    {/* Email */}
    <div className="flex flex-col gap-1">
      <label className="text-xs text-slate-500">Email</label>
      <input
        {...register("email", {
        required:true})}
        className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-black"
      />
    </div>

        
  {errors.email && (
    <p className="text-red-500 text-xs">
      {errors.email.message}
    </p>
  )}


    {/* Phone */}
    <div className="flex flex-col gap-1">
      <label className="text-xs text-slate-500">Phone</label>
      <input
        {...register("phone", {
        required:true})}
        className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-black"
      />
    </div>
    
  {errors.phone && (
    <p className="text-red-500 text-xs">
      {errors.phone.message}
    </p>
  )}

    {/* Country */}
    <div className="flex flex-col gap-1">
      <label className="text-xs text-slate-500">Country</label>
      <input
        {...register("country", {
        required:true})}
        className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-black"
      />
    </div>
        
  {errors.country && (
    <p className="text-red-500 text-xs">
      {errors.country.message}
    </p>
  )}


    {/* Type */}
    <div className="flex flex-col gap-1">
      <label className="text-xs text-slate-500">User Type</label>
      <select
        {...register("type")}
        className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-black"
      >
        <option value="">Select Type</option>
        <option value="INDIVIDUAL">Individual</option>
        <option value="CORPORATE">Corporate</option>
      </select>

      
    </div>

    <div className="flex flex-col gap-1">
      <label className="text-xs text-slate-500">Role</label>
      <select
        {...register("roleId")}
        className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-black"
      >
        <option value="">Select Role</option>
        {roles.map((role: any) => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>
    </div>

  </div>

  {/* 🔹 Divider */}
  <div className="border-t border-slate-200" />

  {/* 🔹 Footer */}
  <div className="flex flex-col sm:flex-row justify-end gap-3">


{/* Material UI buttons */}

    {/* <button
      type="button"
      onClick={() => setIsModalOpen(false)}
      className="w-full sm:w-auto px-4 py-2 text-sm rounded-xl border border-slate-200 hover:bg-slate-100"
    >
      Cancel
    </button>

    <button
      type="submit"
      className="w-full sm:w-auto px-4 py-2 text-sm rounded-xl bg-black text-white hover:opacity-90 flex items-center justify-center gap-2"
    >
      {isSubmitting ? "Saving..." : "Save Changes"}
    </button> */}


     <Button
    variant="outlined"
    // onClick={() => setIsModalOpen(false)}
  >
    Cancel
  </Button>

  <Button
    variant="contained"
    type="submit"
  >
    Save Changes
  </Button>

  </div>
</form>
    </div>
          </SettingsModal>
        </div>
        }
      </div>

    

    </section>
  );
};

export default UsersList;
