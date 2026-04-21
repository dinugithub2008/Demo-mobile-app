import './styles.css';
import { ReactNode } from 'react';
import { Sidebar } from '../components/Sidebar';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900">
        <div className="min-h-screen grid grid-cols-[260px_1fr]">
          <Sidebar />
          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
