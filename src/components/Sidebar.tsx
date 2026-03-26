// import {
// Briefcase,
// ClipboardList,
// Currency,
// LayoutDashboard,
// PanelLeftClose,
// PanelLeftOpen,
// PlusCircle,
// PlusSquare,
// Receipt,
// Settings,
// Sparkles,
// Ticket,
// UserCheck,
// UserPlus,
// Users,
// X,
// type LucideIcon,
// } from "lucide-react";

// import Logo from "../assets/Logo.png"

// import { useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import {
// Menu,
// MenuItem,
// Sidebar as ProSidebar,
// SubMenu,
// menuClasses,
// sidebarClasses,
// } from "react-pro-sidebar";

// /* ================= TYPES ================= */

// type SidebarProps = {
// collapsed: boolean;
// toggled: boolean;
// onToggleCollapsed: () => void;
// onCloseMobile: () => void;
// };

// type NavItem = {
// to: string;
// label: string;
// icon: LucideIcon;
// };

// type NavGroup = {
// id: string;
// label: string;
// icon: LucideIcon;
// children: NavItem[];
// };

// /* ================= NAV CONFIG ================= */

// const standaloneNavItem: NavItem = {
// to: "/dashboard",
// label: "Dashboard",
// icon: LayoutDashboard,
// };

// const navGroups: NavGroup[] = [
// // {
// // id: "projects",
// // label: "Projects",
// // icon: Briefcase,
// // children: [
// // { to: "/projects/create", label: "Create project", icon: PlusSquare },

// // { to: "/projects", label: "All projects", icon: ClipboardList },
// // ],
// // },
// // {
// // id: "tickets",
// // label: "Tickets",
// // icon: Ticket,
// // children: [
// // { to: "/tickets/create", label: "Create ticket", icon: PlusCircle },

// // { to: "/tickets", label: "All tickets", icon: Ticket },
// // ],
// // },
// // {
// // id: "invoices",
// // label: "Invoices",
// // icon: Receipt,
// // children: [
// // { to: "/invoices", label: "All invoices", icon: Receipt },
// // ],
// // },
// // {
// // id: "payments",
// // label: "Payments",
// // icon: Currency,
// // children: [
// // { to: "/payments", label: "All payments", icon: Currency },
// // { to: "/payments/record", label: "Record payment", icon: PlusCircle },
// // ],
// // },


// // {
// //   id: "clients",
// //   label: "Clients",
// //   icon: UserCheck,
// //   children: [
// //     { to: "/clients", label: "All clients", icon: UserCheck },
// //     { to: "/clients/create", label: "Add client", icon: UserPlus },
// //   ],
// // },

// // {
// // id: "people",
// // label: "People",
// // icon: Users,
// // children: [
// // { to: "/users", label: "Users", icon: Users },
// // { to: "/users/create", label: "Invite user", icon: UserPlus },
// // { to: "/clients", label: "Clients", icon: UserCheck },
// // { to: "/clients/create", label: "Add client", icon: UserPlus },
// // ],
// // },

// // {
// //   id: "users",
// //   label: "Users",
// //   icon: Users,
// //   children: [
// //     { to: "/users/create", label: "Create user", icon: UserPlus },
// //     { to: "/users", label: "All users", icon: Users },
  
// //   ],
// // },

// {
//   id: "users",
//   label: "Users",
//   icon: Users,
//   children: [
//     { to: "/users/create", label: "Create user", icon: UserPlus },
//     { to: "/users", label: "All users", icon: Users },
  
//   ],
// },


// {
//   id: "services",
//   label: "Services Request",
//   icon: Users,
//   children: [
//     { to: "/projects", label: "Projects", icon: UserPlus },
//   ],
// },




// {
// id: "Generals",
// label: "Generals",
// icon: Sparkles,
// children: [
// { to: "/settings", label: "Settings", icon: Settings },
// // { to: "/consulting", label: "Consulting", icon: Briefcase },
// ],
// },
// ];

// /* ================= COMPONENT ================= */

// function Sidebar({
// collapsed,
// toggled,
// onToggleCollapsed,
// onCloseMobile,
// }: SidebarProps) {
// const { pathname } = useLocation();

// const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
// projects: true,
// tickets: true,
// invoices: true,
// payments: true,
// people: true,
// consulting: true,
// });

// const handleGroupOpenChange = (groupId: string, open: boolean) => {
// setOpenGroups((current) => ({
// ...current,
// [groupId]: open,
// }));
// };

// return (
// <ProSidebar
// backgroundColor="#00e658"
// breakPoint="lg"
// collapsed={collapsed}
// collapsedWidth="88px"
// onBackdropClick={onCloseMobile}
// toggled={toggled}
// width="250px"

// rootStyles={{
// borderRight: "1px solid #2d9229",
// height: "100dvh",
// position: "sticky",
// top: 0,
// [`& .${sidebarClasses.container}`]: {
// background:
//   "linear-gradient(180deg, #54d71771 0%, #26d076b1 55%, #179b2481 100%)",
// },
// }}
// >
// <div className="flex h-full flex-col py-4">
// {/* ===== LOGO ===== */}
// <div className="px-4">
// <div className="rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm">
//   <div className="flex items-start justify-between gap-2">
//     <div className="min-w-0">
//       <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-700">
//       </p>
//       <h1 className="truncate text-base font-bold text-slate-900">
//         {collapsed ? "Dorisa" : 
        
//         "Dorisa Consult"
//         }
//       </h1>

//       {!collapsed && (
//         <p className="text-xs text-slate-500">
//           Best Consulting Service
//         </p>
//       )}
//     </div>

//     <div className="flex items-center gap-1">
//       {/* Mobile Close */}
//       <button
//         className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
//         onClick={onCloseMobile}
//         type="button"
//       >
//         <X size={16} />
//       </button>

//       {/* Collapse Toggle */}
//       <button
//         className="hidden h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:inline-flex mb-4"
//         onClick={onToggleCollapsed}
//         type="button"
//       >
//         {collapsed ? (
//           <PanelLeftOpen size={16} />
//         ) : (
//           <PanelLeftClose size={16} />
//         )}
//       </button>
//     </div>
//   </div>
// </div>
// </div>

// {/* ===== MENU ===== */}
// <Menu
// className="mt-4"
// menuItemStyles={{
//   button: ({ active, level }) => ({
// margin: level === 0 ? "2px 10px" : "3px 5px 3px 3px",

//     height: level === 0 ? "46px" : "40px",
//     // borderRadius: "12px",
//     color: active ? "#343a46" : "#334155",
//     backgroundColor: active ? "#2993523e" : "transparent",
//     "&:hover": {
//       backgroundColor: active ? "#15570629" : "#15570629",
//     },
//   }),
//   icon: ({ active }) => ({
//     color: active ? "#ffffff" : "white",
//   }),
//   label: {
//     fontWeight: 600,
//     fontSize: "0.9rem",
//     color: "white"
//   },
//   subMenuContent: {
//     backgroundColor: "#06cd241a",
//     margin: "0 12px",
//   },
// }}
// rootStyles={{
//   [`& .${menuClasses.subMenuContent}`]: {
//     paddingBottom: "4px",
//   },
// }}
// >
// {/* Dashboard */}
// <MenuItem
//   active={pathname === standaloneNavItem.to}
//   component={<NavLink to={standaloneNavItem.to} />}
//   icon={<standaloneNavItem.icon size={18} />}
//   onClick={onCloseMobile}
// >
//   {standaloneNavItem.label}
// </MenuItem>
// {/* Groups */}
// {navGroups.map((group) => (
//   <SubMenu
//     key={group.id}
//     label={group.label}
//     icon={<group.icon size={18} />}
//     open={openGroups[group.id] ?? false}
//     active={group.children.some((c) => c.to === pathname)}
//     onOpenChange={(open) =>
//       handleGroupOpenChange(group.id, open)
//     }


//   >

 
  
//     {group.children.map((item) => (
//       <MenuItem
//         key={item.to}
//         active={pathname === item.to}
//         component={<NavLink to={item.to} />}
//         icon={<item.icon size={16} />}
//         onClick={onCloseMobile}
//       >

//         {item.label}
//       </MenuItem>
//     ))}
//   </SubMenu>
// ))}
// </Menu>

// {/* ===== FOOTER ===== */}

// </div>
// </ProSidebar>
// );
// }

// export default Sidebar;

import {
  Briefcase,
  ClipboardList,
  Currency,
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

import Logo from "../assets/Logo.png";

import { SIDEBAR_WIDTHS } from "../constants/sidebar";

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
    id: "users",
    label: "Users",
    icon: Users,
    children: [
      { to: "/users/create", label: "Create user", icon: UserPlus },
      { to: "/users", label: "All users", icon: Users },
    ],
  },
  {
    id: "services",
    label: "Services Request",
    icon: Users,
    children: [{ to: "/projects", label: "Projects", icon: UserPlus }],
  },
  {
    id: "generals",
    label: "Generals",
    icon: Sparkles,
    children: [{ to: "/settings", label: "Settings", icon: Settings }],
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
      <div className="flex h-full flex-col py-4">
        {/* ===== LOGO ===== */}
        <div className="px-4 mb-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h1 className="truncate text-base font-bold text-gray-900">
                  {collapsed ? "Dorisa" : "Dorisa Consult"}
                </h1>
                {!collapsed && (
                  <p className="text-xs text-gray-500">Best Consulting Service</p>
                )}
              </div>

              <div className="flex items-center gap-1">
                {/* Mobile Close */}
                <button
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden"
                  onClick={onCloseMobile}
                  type="button"
                >
                  <X size={16} />
                </button>

                {/* Collapse Toggle */}
                <button
                  className="hidden h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 lg:inline-flex mb-4"
                  onClick={onToggleCollapsed}
                  type="button"
                >
                  {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
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
              margin: level === 0 ? "2px 10px" : "3px 5px 3px 3px",
              height: level === 0 ? "46px" : "40px",
              color: active ? "#1f2937" : "#4b5563",
              backgroundColor: active ? "#f3f4f6" : "transparent",
              "&:hover": {
                backgroundColor: "#f3f4f6",
              },
            }),
            icon: ({ active }) => ({
              color: active ? "#111827" : "#6b7280",
            }),
            label: {
              fontWeight: 600,
              fontSize: "0.9rem",
              color: "#111827",
            },
            subMenuContent: {
              backgroundColor: "#f9fafb",
              margin: "0 12px",
            },
          }}
          rootStyles={{
            [`& .${menuClasses.subMenuContent}`]: {
              paddingBottom: "4px",
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
              onOpenChange={(open) => handleGroupOpenChange(group.id, open)}
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
      </div>
    </ProSidebar>
  );
}

export default Sidebar;
