import {
  Briefcase,
  ClipboardList,
  FilePlus,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  PlusCircle,
  PlusSquare,
  Receipt,
  Settings,
  Sparkles,
  Ticket,
  UserCheck,
  UserPlus,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

import { useState } from "react";
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
};

type NavGroup = {
  id: string;
  label: string;
  icon: LucideIcon;
  children: NavItem[];
};

/* ================= NAV CONFIG ================= */

const standaloneNavItem: NavItem = {
  to: "/dashboard",
  label: "Dashboard",
  icon: LayoutDashboard,
};

const navGroups: NavGroup[] = [
  {
    id: "projects",
    label: "Projects & ops",
    icon: Briefcase,
    children: [
      { to: "/projects", label: "All projects", icon: ClipboardList },
      { to: "/projects/create", label: "Create project", icon: PlusSquare },
      { to: "/tickets", label: "Tickets", icon: Ticket },
      { to: "/tickets/create", label: "Create ticket", icon: PlusCircle },
      { to: "/invoices", label: "Invoices", icon: Receipt },
      { to: "/invoices/create", label: "Create invoice", icon: FilePlus },
    ],
  },
  {
    id: "people",
    label: "People & clients",
    icon: Users,
    children: [
      { to: "/users", label: "Users", icon: Users },
      { to: "/users/create", label: "Invite user", icon: UserPlus },
      { to: "/clients", label: "Clients", icon: UserCheck },
      { to: "/clients/create", label: "Add client", icon: UserPlus },
    ],
  },
  {
    id: "consulting",
    label: "Consult & controls",
    icon: Sparkles,
    children: [
      { to: "/settings", label: "Settings", icon: Settings },
      { to: "/consulting", label: "Consulting", icon: Briefcase },
    ],
  },
];

/* ================= COMPONENT ================= */

function Sidebar({
  collapsed,
  toggled,
  onToggleCollapsed,
  onCloseMobile,
}: SidebarProps) {
  const { pathname } = useLocation();

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    projects: true,
    people: true,
    consulting: true,
  });

  const handleGroupOpenChange = (groupId: string, open: boolean) => {
    setOpenGroups((current) => ({
      ...current,
      [groupId]: open,
    }));
  };

  return (
    <ProSidebar
      backgroundColor="#1b1818"
      breakPoint="lg"
      collapsed={collapsed}
      collapsedWidth="88px"
      onBackdropClick={onCloseMobile}
      toggled={toggled}
      width="280px"
      rootStyles={{
        borderRight: "1px solid #e2e8f0",
        height: "100dvh",
        position: "sticky",
        top: 0,
        [`& .${sidebarClasses.container}`]: {
          background:
            "linear-gradient(180deg, #ffffff 0%, #f8fafc 55%, #eff6ff 100%)",
        },
      }}
    >
      <div className="flex h-full flex-col py-4">
        {/* ===== LOGO ===== */}
        <div className="px-4">
          <div className="rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-700">
                  D O R I S A
                </p>
                <h1 className="truncate text-base font-bold text-slate-900">
                  {collapsed ? "Dorisa" : "Dorisa Consult"}
                </h1>

                {!collapsed && (
                  <p className="text-xs text-slate-500">
                    Best Consulting Service
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1">
                {/* Mobile Close */}
                <button
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
                  onClick={onCloseMobile}
                  type="button"
                >
                  <X size={16} />
                </button>

                {/* Collapse Toggle */}
                <button
                  className="hidden h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:inline-flex"
                  onClick={onToggleCollapsed}
                  type="button"
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
        <Menu
          className="mt-4"
          menuItemStyles={{
            button: ({ active, level }) => ({
              margin: level === 0 ? "4px 12px" : "3px 12px 3px 28px",
              height: level === 0 ? "46px" : "40px",
              borderRadius: "12px",
              color: active ? "#0f172a" : "#334155",
              backgroundColor: active ? "#dbeafe" : "transparent",
              "&:hover": {
                backgroundColor: active ? "#bfdbfe" : "#f1f5f9",
              },
            }),
            icon: ({ active }) => ({
              color: active ? "#1d4ed8" : "#64748b",
            }),
            label: {
              fontWeight: 600,
              fontSize: "0.9rem",
            },
          }}
        >
          {/* Dashboard */}
          <MenuItem
            active={pathname === standaloneNavItem.to}
            component={<NavLink to={standaloneNavItem.to} />}
            icon={<standaloneNavItem.icon size={18} />}
            onClick={onCloseMobile}
          >
            {standaloneNavItem.label}
          </MenuItem>

          {/* Groups */}
          {navGroups.map((group) => (
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
              {group.children.map((item) => (
                <MenuItem
                  key={item.to}
                  active={pathname === item.to}
                  component={<NavLink to={item.to} />}
                  icon={<item.icon size={16} />}
                  onClick={onCloseMobile}
                >
                  {item.label}
                </MenuItem>
              ))}
            </SubMenu>
          ))}
        </Menu>

        {/* ===== FOOTER ===== */}
        <div className="mt-auto px-4">
          <div className="rounded-xl border border-slate-200 bg-white/80 p-3 text-sm text-slate-500">
            {collapsed ? "v1" : "Version 1.0.0"}
          </div>
        </div>
      </div>
    </ProSidebar>
  );
}

export default Sidebar;
