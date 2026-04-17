import { NavLink } from 'react-router-dom';
import { Home, PlusCircle, Search } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Report Lost Item', path: '/report-lost', icon: PlusCircle },
    { name: 'Report Found Item', path: '/report-found', icon: PlusCircle },
    { name: 'Viewing Module', path: '/browse', icon: Search },
  ];

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
          <Search className="text-accent" /> FoundiT
        </h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : 'text-zinc-400'}`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
      <div className="p-6 border-t border-zinc-800">
        <p className="text-xs text-zinc-500">FoundiT © 2026</p>
      </div>
    </aside>
  );
}
