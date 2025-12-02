import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Header } from '@/components/Header';

export const Layout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-screen overflow-x-hidden">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-6 overflow-x-hidden w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
