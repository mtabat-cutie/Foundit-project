import React from 'react';

export default function StatCard({ title, value, icon: Icon, colorClass }) {
  return (
    <div className="glass-card p-6 flex items-center justify-between border-l-4 transition-transform hover:scale-[1.02] duration-300" style={{ borderLeftColor: colorClass }}>
      <div>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-4xl font-bold mt-2 dark:text-white">{value}</h3>
      </div>
      <div className={`p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800`}>
        <Icon size={32} style={{ color: colorClass }} />
      </div>
    </div>
  );
}
