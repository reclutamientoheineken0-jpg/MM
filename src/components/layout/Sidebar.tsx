import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageView } from '../../types';
import { 
  LayoutDashboard, 
  FilePlus, 
  Users, 
  BarChart3, 
  Plus, 
  Settings, 
  LogOut,
  X
} from 'lucide-react';
import { HeinekenLogo } from '../common/HeinekenLogo';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpenSettings?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose, onOpenSettings }) => {
  const { currentPage, setCurrentPage, setCurrentUser, showToast, setPreselectedRep, setPreselectedMemoType } = useApp();

  const navItems: { id: PageView; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'registro', label: 'Registro', icon: <FilePlus className="w-5 h-5" /> },
    { id: 'vendedores', label: 'Vendedores', icon: <Users className="w-5 h-5" /> },
    { id: 'reportes', label: 'Reports', icon: <BarChart3 className="w-5 h-5" /> },
  ];

  const handleNav = (page: PageView) => {
    setCurrentPage(page);
    if (onClose) onClose();
  };

  const handleNewMemoClick = () => {
    setPreselectedRep(null);
    setPreselectedMemoType(null);
    setCurrentPage('registro');
    if (onClose) onClose();
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
    showToast('Sesión cerrada correctamente.', 'info');
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-screen w-[280px] bg-[#f3f3f3] border-r border-[#becab6]/60 
        flex flex-col p-6 z-40 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo Section */}
        <div className="mb-8 px-1">
          <div className="flex items-center gap-3 mb-2">
            <HeinekenLogo variant="red-box" showText={false} />
            <div>
              <h1 className="font-['Hanken_Grotesk',sans-serif] font-bold text-xl text-[#006600] leading-tight">
                Corporate Admin
              </h1>
              <p className="text-xs font-semibold text-[#3f4a3a]">
                Management Portal
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`
                  flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm font-semibold transition-all duration-200
                  ${isActive 
                    ? 'bg-[#006600] text-white shadow-xs font-bold' 
                    : 'text-[#3f4a3a] hover:bg-[#e8e8e8] hover:text-[#1a1c1c]'
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-[#becab6]/60">
          <button
            onClick={handleNewMemoClick}
            className="w-full bg-[#006600] hover:bg-[#005300] text-white py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 mb-2"
          >
            <Plus className="w-5 h-5" />
            <span>New Memo</span>
          </button>

          <button
            onClick={() => {
              if (onOpenSettings) onOpenSettings();
              if (onClose) onClose();
            }}
            className="flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-[#3f4a3a] hover:bg-[#e8e8e8] rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-[#3f4a3a] hover:bg-red-50 hover:text-[#bb0011] rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
