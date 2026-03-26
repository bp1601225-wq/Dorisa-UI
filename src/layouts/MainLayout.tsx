import { LogOut, Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { SIDEBAR_WIDTHS } from "../constants/sidebar";

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const navigate = useNavigate();
  const { Logout } = useAuth();

  const handleLogout = () => {
    Logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setToggled(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-gray-50 overflow-hidden">

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
      <header className="fixed inset-x-0 top-0 z-20 flex h-14 items-center justify-between border-b bg-white px-4 shadow-sm md:px-6">
        <div className="flex items-center gap-2">
          <button
            className="text-gray-600 transition hover:text-gray-900"
            onClick={() => setToggled((value) => !value)}
            aria-label={toggled ? "Close sidebar" : "Open sidebar"}
          >
            <Menu size={18} />
          </button>

          {!isMobile && (
            <button
              className="text-gray-600 transition hover:text-gray-900"
              onClick={() => setCollapsed((value) => !value)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>
          )}

          <h1 className="text-sm font-semibold text-gray-900">Dorisa Consult</h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded bg-green-100 px-2 py-[2px] text-xs text-green-600">
            Active
          </span>
<button
  onClick={handleLogout}
  className="
    flex items-center gap-2
    px-3 py-1.5
    text-sm font-medium
    text-gray-700
    bg-red-600 border border-red-300
    rounded-lg
    shadow-sm
    hover:bg-red-500
    transition-colors duration-200
    text-white
    cursor-pointer
    active:scale-105
  "
>
  <LogOut size={16} />
  Logout
</button>
        </div>
      </header>
      {/* BODY */}
      <div className="flex flex-1 pt-14 min-h-[calc(100vh-56px)]">

        {/* SIDEBAR */}
        <aside
          className="hidden md:flex flex-shrink-0 transition-all duration-300 ease-out"
        
        >
          <div className="sticky top-14 h-[calc(100vh-56px)] w-full">
            <Sidebar
              collapsed={collapsed}
              toggled={toggled}
              onCloseMobile={() => setToggled(false)}
              onToggleCollapsed={() => setCollapsed(!collapsed)}
            />
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main
          className="flex-1 min-w-0 overflow-y-auto p-4"
          style={{ maxHeight: "calc(100vh - 56px)" }}
        >
          <div className="rounded-md bg-white p-4 shadow-sm">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
