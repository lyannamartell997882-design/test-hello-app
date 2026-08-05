import React from 'react';
import { Environment } from '../types';

interface FooterProps {
  activeEnv: Environment;
}

export const Footer: React.FC<FooterProps> = ({ activeEnv }) => {
  const getApiUrl = (env: Environment) => {
    switch (env) {
      case 'dev':
        return 'https://test-api.local/v1';
      case 'staging':
        return 'https://staging-api.internal/v1';
      case 'prod':
        return 'https://api.applet.edge/v1';
    }
  };

  return (
    <footer className="h-10 bg-slate-100 border-t border-slate-200 px-6 flex items-center justify-between text-[11px] text-slate-500 shrink-0 font-sans select-none">
      <div className="flex items-center gap-2">
        <span className="text-slate-400">API Endpoint:</span>
        <code className="bg-slate-200/80 px-1.5 py-0.5 rounded text-slate-700 font-mono text-[10px]">
          {getApiUrl(activeEnv)}
        </code>
      </div>

      <div className="flex items-center space-x-5 font-mono">
        <span className="flex items-center gap-1">
          <span className="text-slate-400">RAM:</span> 124MB / 512MB
        </span>
        <span className="flex items-center gap-1">
          <span className="text-slate-400">CPU:</span> 2.4%
        </span>
        <div className="flex items-center gap-1.5 font-medium text-indigo-600 font-sans">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
          <span>Live Re-render Active</span>
        </div>
      </div>
    </footer>
  );
};
