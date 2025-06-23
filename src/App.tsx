import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Sidebar from './components/layout/Sidebar';
import TopAppBar from './components/layout/TopAppBar';
import Dashboard from './components/dashboard/Dashboard';
import OrdersKanban from './components/orders/OrdersKanban';
import MenuDataTable from './components/menu/MenuDataTable';
import SettingsForm from './components/settings/SettingsForm';
import MessagesTimeline from './components/messages/MessagesTimeline';
import ReportsPage from './components/reports/ReportsPage';
import MissionsPage from './components/missions/MissionsPage';
import Notification from './components/ui/Notification';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };
    
    // Set initial state
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Router>
      <AppProvider>
        <div className="flex bg-gray-100 min-h-screen">
          <Sidebar 
            collapsed={sidebarCollapsed} 
            toggleSidebar={toggleSidebar} 
          />
          
          <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-60'}`}>
            <TopAppBar onMenuClick={toggleSidebar} />
            
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/orders" element={<OrdersKanban />} />
                <Route path="/menu" element={<MenuDataTable />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/settings" element={<SettingsForm />} />
                <Route path="/messages" element={<MessagesTimeline />} />
                <Route path="/missions" element={<MissionsPage />} />
              </Routes>
            </main>
          </div>
          
          <Notification />
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;