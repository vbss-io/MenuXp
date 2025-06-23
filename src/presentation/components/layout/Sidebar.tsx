import {
  ChevronLeft,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  ShoppingBag,
  Trophy,
  UtensilsCrossed
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

interface SidebarProps {
  collapsed: boolean
  toggleSidebar: () => void
}

export default function Sidebar({ collapsed, toggleSidebar }: SidebarProps) {
  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair da plataforma?')) {
      // In a real app, this would clear authentication tokens and redirect
      console.log('Logout confirmed')
      // For prototype, just show alert
      alert('Logout realizado com sucesso!')
    }
  }

  return (
    <aside
      className={`fixed top-0 left-0 h-screen nav-sidebar transition-all duration-300 
        ${collapsed ? 'w-16' : 'w-60'} z-20 flex flex-col border-r border-black`}
    >
      <div className="flex items-center justify-between p-4 border-b border-secondary-600">
        {!collapsed && <h1 className="text-xl font-mono font-bold text-accent-500">MenuXP</h1>}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-sm hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-colors border border-gray-600"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft className={`transform transition-transform text-text-invert ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <nav className="mt-6 flex-1">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}>
          <LayoutDashboard className="shrink-0" size={20} />
          {!collapsed && <span className="ml-3">Dashboard</span>}
        </NavLink>

        <NavLink to="/orders" className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}>
          <ShoppingBag className="shrink-0" size={20} />
          {!collapsed && <span className="ml-3">Pedidos</span>}
        </NavLink>

        <NavLink to="/menu" className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}>
          <UtensilsCrossed className="shrink-0" size={20} />
          {!collapsed && <span className="ml-3">Cardápio</span>}
        </NavLink>

        <NavLink to="/reports" className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}>
          <FileText className="shrink-0" size={20} />
          {!collapsed && <span className="ml-3">Relatórios</span>}
        </NavLink>

        <NavLink to="/missions" className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}>
          <Trophy className="shrink-0" size={20} />
          {!collapsed && <span className="ml-3">Missões</span>}
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}>
          <Settings className="shrink-0" size={20} />
          {!collapsed && <span className="ml-3">Configurações</span>}
        </NavLink>

        <NavLink to="/messages" className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}>
          <MessageSquare className="shrink-0" size={20} />
          {!collapsed && <span className="ml-3">Mensagens</span>}
        </NavLink>
      </nav>

      <div className="border-t border-secondary-600 p-4">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 hover:bg-secondary-600 transition-colors rounded-sm text-error-300 hover:text-error-200 border border-gray-600"
        >
          <LogOut className="shrink-0" size={20} />
          {!collapsed && <span className="ml-3 text-nav">Sair</span>}
        </button>
      </div>
    </aside>
  )
}
