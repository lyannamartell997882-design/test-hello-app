import React, { useEffect, useRef } from 'react';
import { LogMessage } from '../types';
import { Terminal, Trash2 } from 'lucide-react';

interface LogTerminalProps {
  logs: LogMessage[];
  onClearLogs: () => void;
}

export const LogTerminal: React.FC<LogTerminalProps> = ({ logs, onClearLogs }) => {
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getLevelBadge = (level: LogMessage['level']) => {
    switch (level) {
      case 'INFO':
        return <span className="text-emerald-400 font-semibold">[INFO]</span>;
      case 'WARN':
        return <span className="text-amber-400 font-semibold">[WARN]</span>;
      case 'EXEC':
        return <span className="text-indigo-400 font-semibold">[EXEC]</span>;
      case 'SUCCESS':
        return <span className="text-emerald-400 font-semibold">[SUCCESS]</span>;
      case 'STDOUT':
        return <span className="text-slate-400 font-semibold">&gt;</span>;
      default:
        return <span className="text-slate-400">[LOG]</span>;
    }
  };

  return (
    <div className="h-48 mt-6 border border-slate-200 rounded-xl flex flex-col bg-slate-900 overflow-hidden shrink-0 shadow-md">
      <div className="h-8 bg-slate-800 border-b border-slate-700 flex items-center px-4 justify-between select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest font-semibold">
            Log Terminal
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onClearLogs}
            className="text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1 transition-colors cursor-pointer"
            title="Clear terminal"
          >
            <Trash2 className="w-3 h-3" />
            <span className="text-[10px] font-mono">Clear</span>
          </button>
          <div className="flex space-x-1.5">
            <div className="w-2 h-2 rounded-full bg-slate-600" />
            <div className="w-2 h-2 rounded-full bg-slate-600" />
            <div className="w-2 h-2 rounded-full bg-slate-600" />
          </div>
        </div>
      </div>

      <div className="p-4 font-mono text-sm text-slate-300 space-y-1.5 overflow-y-auto flex-1 select-text">
        {logs.length === 0 ? (
          <p className="text-slate-500 italic text-xs">No logs recorded. Run test suite to view output.</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex items-start gap-2 leading-relaxed">
              <span className="text-[10px] text-slate-500 select-none pt-0.5 min-w-[55px]">
                {log.timestamp}
              </span>
              <div className="flex-1 break-all">
                {getLevelBadge(log.level)}{' '}
                <span className={log.level === 'STDOUT' ? 'text-white font-semibold' : ''}>
                  {log.text}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};
