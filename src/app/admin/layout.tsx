import AdminSidebar from '@/components/AdminSidebar';
import AdminAuth from '@/components/AdminAuth';

export const metadata = {
  title: 'Admin Portal',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuth>
      <div className="flex flex-col lg:flex-row min-h-screen">
        <AdminSidebar />
        <div className="flex-1 min-w-0">
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </AdminAuth>
  );
}
