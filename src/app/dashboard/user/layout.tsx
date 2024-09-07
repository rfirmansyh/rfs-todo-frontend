import type { Metadata } from 'next';
import BreadcrumbDashboard from './_components/BreadcrumbDashboard/BreadcrumbDashboard';
import Main from './_components/Main/Main';
import Navbar from './_components/Navbar/Navbar';
import Sidebar from './_components/Sidebar/Sidebar';
import { DashboardStoreProvider } from './_stores/dashboard.provider';

export const metadata: Metadata = {
  title: 'Dashboard Nextjs Template',
  description: 'Description of Nextjs Template',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardStoreProvider>
      <Sidebar />
      <Main>
        <Navbar />

        <div className="p-8">
          <BreadcrumbDashboard />
          {children}
        </div>
      </Main>
    </DashboardStoreProvider>
  );
}
