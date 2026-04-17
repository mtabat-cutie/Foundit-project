import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex h-screen bg-zinc-900 text-zinc-100 font-sans">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-zinc-950 p-8">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
