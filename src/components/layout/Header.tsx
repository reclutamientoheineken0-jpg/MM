import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  HelpCircle, 
  Bell, 
  Menu,
  Check,
  UserCheck
} from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
  onOpenHelp?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onOpenHelp }) => {
  const { 
    currentUser, 
    globalSearch, 
    setGlobalSearch, 
    notifications, 
    markNotificationAsRead, 
    clearAllNotifications 
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 w-full sticky top-0 z-30 bg-white border-b border-[#becab6]/60 flex justify-between items-center px-4 lg:px-8 shadow-2xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-[#3f4a3a] hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Abrir menú"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative w-48 sm:w-64 md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Buscar vendedor, memo o reporte..."
            className="w-full bg-[#eeeeee] pl-9 pr-4 py-1.5 rounded-full text-xs sm:text-sm text-[#1a1c1c] placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#006600] border-none transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Help Button */}
        <button
          onClick={onOpenHelp}
          className="p-2 text-[#3f4a3a] hover:bg-[#f3f3f3] rounded-full transition-colors active:scale-95"
          title="Guía y Ayuda"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* Notifications Popover Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-[#3f4a3a] hover:bg-[#f3f3f3] rounded-full transition-colors relative active:scale-95"
            title="Notificaciones"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#bb0011] rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50 animate-slide-down">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[#1a1c1c]">Notificaciones</h4>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 text-xs bg-[#bb0011] text-white rounded-full font-bold">
                      {unreadCount}
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="text-xs text-[#006600] font-semibold hover:underline flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Marcar leídas
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto my-2 divide-y divide-gray-50">
                {notifications.length === 0 ? (
                  <p className="py-6 text-center text-xs text-gray-500">No hay notificaciones</p>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationAsRead(notif.id)}
                      className={`p-3 text-xs transition-colors cursor-pointer rounded-lg hover:bg-gray-50 ${
                        !notif.read ? 'bg-green-50/50 font-medium' : 'text-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold mb-1 text-[#1a1c1c]">
                        <span>{notif.title}</span>
                        <span className="text-[10px] text-gray-400 font-normal">{notif.date}</span>
                      </div>
                      <p className="text-gray-600 text-xs leading-relaxed">{notif.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 border-l border-[#becab6]/60 pl-3 sm:pl-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-[#1a1c1c] leading-tight">
              {currentUser?.name || 'Salesforce HR Admin'}
            </p>
            <p className="text-[11px] text-[#3f4a3a]">
              {currentUser?.title || 'Administrador'}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#becab6] bg-gray-100 flex items-center justify-center shrink-0">
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <UserCheck className="w-4 h-4 text-gray-600" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
