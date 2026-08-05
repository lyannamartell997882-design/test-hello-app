import React from 'react';
import { Environment, TestItem } from '../types';
import { CheckCircle2, MinusCircle, ShieldAlert } from 'lucide-react';

interface SidebarProps {
  activeEnv: Environment;
  onSelectEnv: (env: Environment) => void;
  recentTests: TestItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ activeEnv, onSelectEnv, recentTests }) => {
  const environments: { id: Environment; label: string }[] = [
    { id: 'dev', label: 'Development-Local' },
    { id: 'staging', label: 'Staging-Alpha' },
    { id: 'prod', label: 'Production-Edge' },
  ];

  return (
    <aside className="w-64 bg-slate-100 border-r border-slate-200 p-4 flex flex-col shrink-0 select-none">
      <nav className="space-y-1">
        <p className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Environments
        </p>
        {environments.map((env) => {
          const isActive = activeEnv === env.id;
          return (
            <button
              key={env.id}
              onClick={() => onSelectEnv(env.id)}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-all duration-150 flex items-center justify-between cursor-pointer ${
                isActive
                  ? 'bg-white text-indigo-700 shadow-xs ring-1 ring-slate-200 italic font-semibold'
                  : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
              }`}
            >
              <span>{env.label}</span>
              {isActive && (
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-8 flex-1 overflow-y-auto">
        <p className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Recent Tests
        </p>
        <div className="space-y-2.5">
          {recentTests.map((test) => {
            if (test.status === 'PASSED') {
              return (
                <div
                  key={test.id}
                  className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-lg flex items-start gap-2.5 shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-emerald-800 tracking-wide">PASSED</p>
                    <p className="text-xs text-emerald-700 font-mono mt-0.5">{test.name}</p>
                  </div>
                </div>
              );
            }
            if (test.status === 'RUNNING') {
              return (
                <div
                  key={test.id}
                  className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2.5 animate-pulse shadow-2xs"
                >
                  <div className="w-4 h-4 rounded-full border-2 border-amber-600 border-t-transparent animate-spin shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-amber-800 tracking-wide">RUNNING</p>
                    <p className="text-xs text-amber-700 font-mono mt-0.5">{test.name}</p>
                  </div>
                </div>
              );
            }
            return (
              <div
                key={test.id}
                className="p-3 bg-white border border-slate-200 rounded-lg flex items-start gap-2.5 shadow-2xs"
              >
                <MinusCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-400 tracking-wide">SKIPPED</p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{test.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
