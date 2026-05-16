import {
  Loader2,
  LogOut,
  LogOutIcon,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { useAuth } from "../context/AuthContext";
import SettingsModal from "../pages/utils/Modal";
import "../App.css";

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const [isConfirmLogout, setIsConfirmLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { Logout } = useAuth();

  const handleLogout = () => setIsConfirmLogout(true);


const {currentUser} = useAuth();



function ShowRole(){
if (!currentUser) return

  return (
    <span>
      {currentUser.role}
    </span>
  ) 
}

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
    <div className="relative flex min-h-screen w-full flex-col">

      {/* MOBILE SIDEBAR */}
      {toggled && isMobile && (
        <div className="fixed inset-0 z-30 flex">
          <div className="h-full w-64 bg-white shadow-lg">
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
      <header className="fixed inset-x-0 top-0 z-20 flex h-15  items-center justify-between border-b border-gray-200 bg-white px-0 shadow-sm">
 
        {/* LEFT */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setToggled((v) => !v)}
            className="text-gray-600 hover:text-gray-900"
          >
            <Menu size={18} />
          </button>

          {!isMobile && (
            <button
              onClick={() => setCollapsed((v) => !v)}
              className="text-gray-600 hover:text-gray-900"
            >
              {collapsed ? (
                <PanelLeftOpen size={18} />
              ) : (
                <PanelLeftClose size={18} />
              )}
            </button>
          )}

          <h1 className="text-xs font-semibold uppercase tracking-wide text-gray-900">
            Dorisa Consult
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-green-50 px-2 py-[2px] text-[10px] font-semibold text-green-600">
            Active
          </span>

          {ShowRole()}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white hover:bg-red-500"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </header>

      {/* BODY */}
      <div className="flex flex-1 w-full pt-14">

        {/* SIDEBAR */}
        <aside className="hidden md:flex flex-shrink-0">
          <div className="sticky top-14 h-[calc(100vh-56px)] w-full">
            <Sidebar
              collapsed={collapsed}
              toggled={toggled}
              onCloseMobile={() => setToggled(false)}
              onToggleCollapsed={() => setCollapsed(!collapsed)}
            />
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 min-w-0 w-full overflow-y-auto h-full">
          <div className="h-full w-full bg-white p-3 ">
            <Outlet />
          </div>
        </main>
      </div>

      {/* LOGOUT MODAL */}
      {isConfirmLogout && (
        <SettingsModal
          isOpen={isConfirmLogout}
          onClose={() => setIsConfirmLogout(false)}
        >
          <div className="w-[260px] p-4 space-y-3 bg-white">
            <h2 className="text-sm font-semibold text-gray-900">
              Confirm Logout
            </h2>

            <p className="text-xs text-gray-500">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsConfirmLogout(false)}
                className="rounded-md border px-3 py-1 text-xs text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  setIsLoading(true);

                  await new Promise((r) => setTimeout(r, 1500));

                  Logout();
                  navigate("/login");
                }}
                disabled={isLoading}
                className="flex items-center gap-1 rounded-md bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-500 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Logging...
                  </>
                ) : (
                  <>
                    <LogOutIcon size={14} />
                    Log out
                  </>
                )}
              </button>
            </div>
          </div>
        </SettingsModal>
      )}

      {/* GLOBAL LOADING OVERLAY */}
      {isLoading && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/20">
          <div className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-xs shadow">
            <Loader2 size={14} className="animate-spin" />
            Processing...
          </div>
        </div>
      )}
    </div>
  );
}

export default MainLayout;
