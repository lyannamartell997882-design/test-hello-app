import React from 'react';
import { Activity, CheckCircle2, Clock, PlayCircle } from 'lucide-react';

interface SessionSummaryCardProps {
  totalTestsRun: number;
  passedCount: number;
  failedCount: number;
  avgExecutionTimeMs: number;
}

export const SessionSummaryCard: React.FC<SessionSummaryCardProps> = ({
  totalTestsRun,
  passedCount,
  failedCount,
  avgExecutionTimeMs,
}) => {
  const successRate =
    totalTestsRun > 0
      ? Math.round((passedCount / totalTestsRun) * 100)
      : 100;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5 shadow-2xs select-none">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200/80 pb-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider font-sans">
            Session Summary
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
          Live Session Metrics
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Total Tests Run */}
        <div className="bg-white p-3 rounded-lg border border-slate-200/90 flex items-center justify-between shadow-2xs">
          <div>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Total Tests Run
            </p>
            <p className="text-xl font-bold text-slate-900 font-mono mt-0.5">
              {totalTestsRun}
            </p>
          </div>
          <div className="w-9 h-9 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <PlayCircle className="w-5 h-5" />
          </div>
        </div>

        {/* Success Rate */}
        <div className="bg-white p-3 rounded-lg border border-slate-200/90 flex items-center justify-between shadow-2xs">
          <div>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Success Rate
            </p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <p className="text-xl font-bold text-emerald-600 font-mono">
                {successRate}%
              </p>
              {failedCount > 0 && (
                <span className="text-[10px] text-rose-500 font-mono">
                  ({failedCount} failed)
                </span>
              )}
            </div>
          </div>
          <div className="w-9 h-9 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Average Execution Time */}
        <div className="bg-white p-3 rounded-lg border border-slate-200/90 flex items-center justify-between shadow-2xs">
          <div>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Avg Execution Time
            </p>
            <p className="text-xl font-bold text-slate-900 font-mono mt-0.5">
              {avgExecutionTimeMs.toFixed(1)} <span className="text-xs font-normal text-slate-500">ms</span>
            </p>
          </div>
          <div className="w-9 h-9 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
