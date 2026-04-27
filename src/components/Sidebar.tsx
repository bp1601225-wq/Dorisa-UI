import {
  FolderKanban,
  LayoutDashboard,
  List,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Sparkles,
  Star,
  UserPlus,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { useAuth } from "../context/AuthContext";
import { SIDEBAR_WIDTHS } from "../constants/sidebar";

import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Menu,
  MenuItem,
  Sidebar as ProSidebar,
  SubMenu,
  menuClasses,
  sidebarClasses,
} from "react-pro-sidebar";

/* ================= TYPES ================= */

type SidebarProps = {
  collapsed: boolean;
  toggled: boolean;
  onToggleCollapsed: () => void;
  onCloseMobile: () => void;
};

type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  roles?: string[]
};

type NavGroup = {
  id: string;
  label: string;
  icon: LucideIcon;
  roles?: string[]; // 👈 added roles
  children: NavItem[];
};

/* ================= COMPONENT ================= */

function Sidebar({
  collapsed,
  toggled,
  onToggleCollapsed,
  onCloseMobile,
}: SidebarProps) {
  const { currentUser } = useAuth();
  const { pathname } = useLocation();

  /* ================= AUTH GUARD ================= */
  if (!currentUser) {
    return null;
  }

  /* ================= HELPERS ================= */

  const hasRole = (roles?: string[]) => {
    if (!roles) return true;
    return roles.includes(currentUser.role as string);
  };


  const hasItemRole = (roles?: string[]) => {
  if (!roles) return true;
  return roles.includes(currentUser.role as string);
};
  /* ================= NAV CONFIG ================= */

  const standaloneNavItem: NavItem = {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  };

  const navGroups: NavGroup[] = [
    {
      id: "users",
      label: "Users",
      icon: Users,
      roles: ["Admin"], // 👈 ONLY ADMIN
      children: [
        { to: "/users/create", label: "Create user", icon: UserPlus },
        { to: "/users", label: "All users", icon: Users },
      ],
    },

  {
  id: "services",
  label: "Service Inquires",
  icon: Users,
  roles: ["Admin", "Client"],
  children: [
    { to: "/services/create", label: "create services", icon: UserPlus, roles: ["Admin"] },


    { to: "/services/list", label: "service list", icon: List, roles: ["Admin"] },


   
    



    { to: "/reviews", label: "reviews", icon: Star, roles: ["Client", "Admin"] },


    
  ],
},


{
  id: "projects",
  label: "Projects",
  icon: FolderKanban,
  roles: ["Admin", "Client"],
  children: [
    { to: "/projects", label: "My Projects", icon: FolderKanban }
  ],
},


    // {
    //   id: "projects",
    //   label: "Pending Outcome ",
    //   icon: LayoutDashboard,
    //   roles: ["Admin", "Client"],
    //   children: [
    //     {
    //       to: "/reviews/pending-proposals",
    //       label: "pending",
    //       icon: Sparkles,
    //     },
    //   ],
    // },



    // Clients Reviews

    {
      id: "generals",
      label: "Generals",
      icon: Sparkles,
      roles: ["Admin", "Client"],
      children: [{ to: "/settings", label: "Settings", icon: Settings }],
    },
  ];

  /* ================= FILTER NAV ================= */

  const filteredNavGroups = navGroups.filter((group) =>
    hasRole(group.roles)
  );

  /* ================= PROGRESS ================= */

  const handleNavItemClick = () => {
    NProgress.start();
    onCloseMobile();
  };

  useEffect(() => {
    NProgress.configure({ showSpinner: false });
  }, []);

  useEffect(() => {
    NProgress.done();
  }, [pathname]);

  /* ================= STATE ================= */

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    users: true,
    services: true,
    generals: true,
  });

  const handleGroupOpenChange = (groupId: string, open: boolean) => {
    setOpenGroups((current) => ({
      ...current,
      [groupId]: open,
    }));
  };

  /* ================= UI ================= */

  return (
    <ProSidebar
      breakPoint="lg"
      collapsed={collapsed}
      onBackdropClick={onCloseMobile}
      toggled={toggled}
      width={`${SIDEBAR_WIDTHS.expanded}px`}
      collapsedWidth={`${SIDEBAR_WIDTHS.collapsed}px`}
      rootStyles={{
        borderRight: "1px solid #e2e8f0",
        height: "100dvh",
        position: "sticky",
        top: 0,
        [`& .${sidebarClasses.container}`]: {
          background: "#ffffff",
        },
      }}
    >
      <div className="flex h-full flex-col pb-12">
        {/* ===== HEADER ===== */}
        <div className="px-3 mb-4 mt-10">
          <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 ">
                <h1 className="truncate text-base font-bold text-gray-900">
                  {collapsed ? "Dorisa" : "Dorisa Consult"}
                </h1>
                {!collapsed && (
                  <p className="text-xs text-gray-500">
                    Best Consulting Service
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1">
                <button
                  className="lg:hidden"
                  onClick={onCloseMobile}
                >
                  <X size={16} />
                </button>

                <button
                  className="hidden lg:inline-flex"
                  onClick={onToggleCollapsed}
                >
                  {collapsed ? (
                    <PanelLeftOpen size={16} />
                  ) : (
                    <PanelLeftClose size={16} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===== MENU ===== */}
        <div className="mt-4 flex-1 overflow-y-auto  ">
          <Menu
            menuItemStyles={{
              button: ({ active, level }) => ({
                margin: "1px",
                height: level === 0 ? "46px" : "40px",
                color: active ? "#1f2937" : "#4b5563",
                backgroundColor: active ? "#f3f4f6" : "transparent",
                "&:hover": { backgroundColor: "#f3f4f6" },
              }),
              icon: ({ active }) => ({
                color: active ? "#111827" : "#6b7280",
              }),
              label: {
                fontWeight: 600,
                fontSize: "1.1rem",
                color: "#111827",
              },
              subMenuContent: {
                backgroundColor: "#f9fafb",
                margin: "0 1px",
              },
            }}
            rootStyles={{
              [`& .${menuClasses.subMenuContent}`]: {
                paddingBottom: "0px",
              },
            }}
          >
            {/* Dashboard */}
            <MenuItem
              active={pathname === standaloneNavItem.to}
              component={<NavLink to={standaloneNavItem.to} />}
              icon={<standaloneNavItem.icon size={18} />}
              onClick={handleNavItemClick}
            >
              {standaloneNavItem.label}
            </MenuItem>

            {/* GROUPS */}
            {filteredNavGroups.map((group) => (
              <SubMenu
                key={group.id}
                label={group.label}
                icon={<group.icon size={18} />}
                open={openGroups[group.id] ?? false}
                active={group.children.some((c) => c.to === pathname)}
                onOpenChange={(open) =>
                  handleGroupOpenChange(group.id, open)
                }
              >
                {group.children
  .filter((item) => hasItemRole(item.roles))
  .map((item) => (
                  <MenuItem
                    key={item.to}
                    active={pathname === item.to}
                    component={<NavLink to={item.to} />}
                    icon={<item.icon size={16} />}
                    onClick={handleNavItemClick}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </SubMenu>
            ))}
          </Menu>
        </div>
      </div>
    </ProSidebar>
  );
}

export default Sidebar;
