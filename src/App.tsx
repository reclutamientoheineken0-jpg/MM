import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Toast } from './components/common/Toast';

// Views
import { LoginView } from './components/views/LoginView';
import { DashboardView } from './components/views/DashboardView';
import { RegistroView } from './components/views/RegistroView';
import { VendedoresView } from './components/views/VendedoresView';
import { ReportesView } from './components/views/ReportesView';

// Modals
import { SalesRepDetailModal } from './components/modals/SalesRepDetailModal';
import { NewVendedorModal } from './components/modals/NewVendedorModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { ITSupportModal } from './components/modals/ITSupportModal';
import { GuiaUsoModal } from './components/modals/GuiaUsoModal';
import { SalesRep } from './types';

const MainContent: React.FC = () => {
  const { currentPage } = useApp();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isITSupportOpen, setIsITSupportOpen] = useState(false);
  const [isGuiaUsoOpen, setIsGuiaUsoOpen] = useState(false);
  const [isNewVendedorOpen, setIsNewVendedorOpen] = useState(false);
  const [selectedRepForDetail, setSelectedRepForDetail] = useState<SalesRep | null>(null);

  // If page is 'login', render standalone login screen without sidebar/header
  if (currentPage === 'login') {
    return (
      <>
        <LoginView 
          onOpenITSupport={() => setIsITSupportOpen(true)}
          onOpenGuiaUso={() => setIsGuiaUsoOpen(true)}
        />

        {/* Modals available on Login screen */}
        <ITSupportModal 
          isOpen={isITSupportOpen} 
          onClose={() => setIsITSupportOpen(false)} 
        />
        <GuiaUsoModal 
          isOpen={isGuiaUsoOpen} 
          onClose={() => setIsGuiaUsoOpen(false)} 
        />
        <Toast />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col font-['Inter',sans-serif]">
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main View Area offset for desktop sidebar */}
      <div className="lg:pl-[280px] flex-1 flex flex-col min-h-screen transition-all duration-300">
        
        {/* Top Header Bar */}
        <Header 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          onOpenHelp={() => setIsGuiaUsoOpen(true)}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1">
          {currentPage === 'dashboard' && (
            <DashboardView />
          )}

          {currentPage === 'registro' && (
            <RegistroView />
          )}

          {currentPage === 'vendedores' && (
            <VendedoresView 
              onOpenNewVendedorModal={() => setIsNewVendedorOpen(true)}
              onSelectRepForDetail={(rep) => setSelectedRepForDetail(rep)}
            />
          )}

          {currentPage === 'reportes' && (
            <ReportesView />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <SalesRepDetailModal 
        rep={selectedRepForDetail} 
        onClose={() => setSelectedRepForDetail(null)} 
      />

      <NewVendedorModal 
        isOpen={isNewVendedorOpen} 
        onClose={() => setIsNewVendedorOpen(false)} 
      />

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />

      <ITSupportModal 
        isOpen={isITSupportOpen} 
        onClose={() => setIsITSupportOpen(false)} 
      />

      <GuiaUsoModal 
        isOpen={isGuiaUsoOpen} 
        onClose={() => setIsGuiaUsoOpen(false)} 
      />

      {/* Toast notifications */}
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
