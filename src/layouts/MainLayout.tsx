import { LogOut, Menu } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setToggled(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-gray-50">

      {/* MOBILE SIDEBAR OVERLAY */}
      {toggled && isMobile && (
        <div className="fixed inset-0 z-30 flex">
          <div className="h-full w-72 bg-white shadow-xl">
            <Sidebar
              collapsed={collapsed}
              toggled={toggled}
              onCloseMobile={() => setToggled(false)}
              onToggleCollapsed={() => setCollapsed(!collapsed)}
            />
          </div>

          <button
            className="flex-1 bg-black/30"
            onClick={() => setToggled(false)}
            aria-label="Close sidebar"
          />
        </div>
      )}

      {/* HEADER */}
      <header className="flex h-14 w-full items-center justify-between border-b bg-white px-4">

        {/* LEFT */}
        <div className="flex items-center gap-2">
          <button
            className="md:hidden text-gray-600"
            onClick={() => setToggled((value) => !value)}
          >
            <Menu size={18} />
          </button>

          <h1 className="text-sm font-semibold text-gray-900">
            Dorisa Consult
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          <span className="rounded bg-green-100 px-2 py-[2px] text-xs text-green-600">
            Active
          </span>

          <Link
            to="/login"
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
          >
            <LogOut size={14} />
            Logout
          </Link>

        </div>

      </header>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR */}
        <aside className={`hidden w-60 bg-[#179b481] md:block ${isMobile ? "" : ""}`}>
          <div className="sticky top-0 h-[calc(100vh-56px)] overflow-hidden">
            <Sidebar
              collapsed={collapsed}
              toggled={toggled}
              onCloseMobile={() => setToggled(false)}
              onToggleCollapsed={() => setCollapsed(!collapsed)}
            />
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-4">

          <div className="rounded-md bg-white p-4 shadow-sm">
            <Outlet />
          </div>

        </main>

      </div>

    </div>
  );
}

export default MainLayout;
