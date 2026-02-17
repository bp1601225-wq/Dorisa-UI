import {
  ClipboardList,
  FileText,
  FolderKanban,
  FolderOpen,
  MessageSquareText,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  Menu,
  MenuItem,
  Sidebar as ProSidebar,
  SubMenu,
  menuClasses,
  sidebarClasses,
} from 'react-pro-sidebar'

type SidebarProps = {
  collapsed: boolean
  toggled: boolean
  onToggleCollapsed: () => void
  onCloseMobile: () => void
}

type NavItem = {
  to: string
  label: string
  icon: LucideIcon
}

type NavGroup = {
  id: string
  label: string
  icon: LucideIcon
  children: NavItem[]
}

const standaloneNavItem: NavItem = {
  to: '/template-one',
  label: 'Template One',
  icon: ClipboardList,
}

const navGroups: NavGroup[] = [
  {
    id: 'group-core',
    label: 'Core Forms',
    icon: FolderKanban,
    children: [{ to: '/template-two', label: 'Template Two', icon: FileText }],
  },
  {
    id: 'group-extra',
    label: 'Feedback Forms',
    icon: FolderOpen,
    children: [{ to: '/template-three', label: 'Template Three', icon: MessageSquareText }],
  },
]

function Sidebar({ collapsed, toggled, onToggleCollapsed, onCloseMobile }: SidebarProps) {
  const { pathname } = useLocation()
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    'group-core': true,
    'group-extra': true,
  })

  const handleGroupOpenChange = (groupId: string, open: boolean) => {
    setOpenGroups((current) => ({
      ...current,
      [groupId]: open,
    }))
  }

  return (
    <ProSidebar
      backgroundColor="#1b1818"
      breakPoint="lg"
      collapsed={collapsed}
      collapsedWidth="88px"
      onBackdropClick={onCloseMobile}
      rootStyles={{
        borderRight: '1px solid #e2e8f0',
        height: '100dvh',
        position: 'sticky',
        top: 0,
        [`& .${sidebarClasses.container}`]: {
          background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 55%, #eff6ff 100%)',
        },
      }}
      toggled={toggled}
      width="280px"
    >
      <div className="flex h-full flex-col py-4">
        <div className="px-4">
          <div className="rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-700">
                  Workspace
                </p>
                <h1 className="truncate text-base font-bold text-slate-900">
                  {collapsed ? 'Forms' : 'Form Templates'}
                </h1>
                {!collapsed && (
                  <p className="text-xs text-slate-500">Collapsible React Pro Sidebar</p>
                )}
              </div>

              <div className="flex items-center gap-1">
                <button
                  aria-label="Close menu"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
                  onClick={onCloseMobile}
                  type="button"
                >
                  <X size={16} />
                </button>
                <button
                  aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                  className="hidden h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 lg:inline-flex"
                  onClick={onToggleCollapsed}
                  type="button"
                >
                  {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <Menu
          className="mt-4"
          menuItemStyles={{
            button: ({ active, level }) => ({
              margin: level === 0 ? '4px 12px' : '3px 12px 3px 28px',
              height: level === 0 ? '46px' : '40px',
              borderRadius: '12px',
              color: active ? '#0f172a' : '#334155',
              backgroundColor: active ? '#dbeafe' : 'transparent',
              '&:hover': {
                color: '#0f172a',
                backgroundColor: active ? '#bfdbfe' : '#f1f5f9',
              },
            }),
            icon: ({ active }) => ({
              color: active ? '#1d4ed8' : '#64748b',
            }),
            label: {
              fontWeight: 600,
              fontSize: '0.9rem',
            },
            subMenuContent: {
              backgroundColor: 'transparent',
            },
          }}
          rootStyles={{
            [`& .${menuClasses.button}`]: {
              transition: 'all 160ms ease',
            },
            [`& .${menuClasses.subMenuContent}`]: {
              paddingBottom: '4px',
            },
          }}
        >
          <MenuItem
            active={pathname === standaloneNavItem.to}
            component={<NavLink to={standaloneNavItem.to} />}
            icon={<standaloneNavItem.icon size={18} />}
            onClick={onCloseMobile}
          >
            {standaloneNavItem.label}
          </MenuItem>

          {navGroups.map((group) => (
            <SubMenu
              key={group.id}
              active={group.children.some((item) => item.to === pathname)}
              icon={<group.icon size={18} />}
              label={group.label}
              onOpenChange={(open) => handleGroupOpenChange(group.id, open)}
              open={openGroups[group.id] ?? false}
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

        <div className="mt-auto px-4">
          <div className="rounded-xl border border-slate-200 bg-white/80 p-3 text-xs text-slate-500">
            {collapsed ? '3 templates' : 'Three simple form templates are ready for reuse.'}
          </div>
        </div>
      </div>
    </ProSidebar>
  )
}

export default Sidebar
