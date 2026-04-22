import React from 'react';

export default function StatCard({ title, value, icon: Icon, colorClass }) {
  return (
    <div className="modern-card p-6 flex items-center justify-between border-l-4 transition-all hover:translate-y-[-2px]" style={{ borderLeftColor: colorClass }}>
      <div>
        <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">{title}</p>
        <h3 className="text-4xl font-black mt-2 dark:text-white tracking-tighter">{value}</h3>
      </div>
      <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-dark-700 border border-zinc-100 dark:border-dark-600">
        <Icon size={28} style={{ color: colorClass }} />
      </div>
    </div>
  );
}
