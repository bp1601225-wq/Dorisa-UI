import { useEffect, useMemo } from "react";
import { useUsersStore } from "../ZustandShare/usersZuts";
import { DataGridUiTable } from "./utils/utils";

const UsersPage = () => {
  const { fetchUsers, users } = useUsersStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = useMemo(() => [
    {
      field: "name",
      headerName: "Full Name",
      flex: 1,
      valueGetter: (_:any, row:any) => {
        if (!row) return "—";

        if (row.fullName) return row.fullName;

        return [row.firstName, row.middleName, row.lastName]
          .filter(Boolean)
          .join(" ") || "—";
      },
    },
    { field: "email", headerName: "Email", flex: 1.5 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "type", headerName: "User Type", flex: 1 },
  ], []);

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
          <h2 className="text-2xl font-semibold text-slate-900 mt-2">
            {users.length}
          </h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-slate-500">Corporate</p>
          <h2 className="text-2xl font-semibold text-slate-900 mt-2">
            {users.filter(u => u.type === "CORPORATE").length}
          </h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-slate-500">Individuals</p>
          <h2 className="text-2xl font-semibold text-slate-900 mt-2">
            {users.filter(u => u.type === "INDIVIDUAL").length}
          </h2>
        </div>
      </div>

      {/* 🔹 Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
        <DataGridUiTable rows={users} columns={columns} />
      </div>

      {/* 🔹 Footer Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Activity Overview
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Track user engagement and system usage in real-time.
        </p>
      </div>

    </section>
  );
};

export default UsersPage;