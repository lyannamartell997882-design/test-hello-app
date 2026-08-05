import React from 'react';
import { Play, RotateCcw, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  isRunning: boolean;
  onRunSuite: () => void;
  activeEnv: string;
}

export const Header: React.FC<HeaderProps> = ({ isRunning, onRunSuite, activeEnv }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-xs z-10 shrink-0">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-base shadow-xs">
          H
        </div>
        <div className="flex items-baseline space-x-2">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">AppletRunner</h1>
          <span className="text-slate-400 font-normal text-xs font-mono">v2.4.1</span>
        </div>
      </div>

      <div className="flex items-center space-x-5">
        <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
          <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
          <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">
            {isRunning ? 'Executing Suite...' : 'System Ready'}
          </span>
        </div>

        <button
          onClick={onRunSuite}
          disabled={isRunning}
          className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60 text-white rounded-md text-sm font-medium transition-colors duration-150 flex items-center gap-2 shadow-xs cursor-pointer"
        >
          {isRunning ? (
            <>
              <RotateCcw className="w-4 h-4 animate-spin" />
              <span>Running...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Run Suite</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
