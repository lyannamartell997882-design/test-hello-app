import React from 'react';
import { Code2, Terminal, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface PreviewCanvasProps {
  isRunning: boolean;
  onTriggerExecution: () => void;
  outputMessage: string;
  exitCode: number;
}

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({
  isRunning,
  onTriggerExecution,
  outputMessage,
  exitCode,
}) => {
  return (
    <div className="flex-1 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center relative p-8 bg-white overflow-hidden shadow-xs">
      <div className="absolute top-6 left-6 text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block animate-pulse" />
        Viewport Preview: 1024x768
      </div>

      <motion.div
        key={outputMessage}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="text-center space-y-6 max-w-lg"
      >
        <div className="inline-flex items-center justify-center p-4 bg-indigo-50 text-indigo-600 rounded-full mb-2 shadow-xs border border-indigo-100">
          <Code2 className="w-12 h-12 stroke-[1.5]" />
        </div>

        <div className="space-y-2">
          <h2 className="text-5xl font-bold text-slate-900 tracking-tight font-sans">
            Hello World
          </h2>
          <p className="text-slate-500 max-w-md mx-auto text-base leading-relaxed">
            Your test applet is running successfully. This environment is isolated and ready for stress testing.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <div className="px-6 py-3 bg-slate-900 text-white rounded-xl font-mono text-sm shadow-lg flex items-center gap-2.5">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>stdout: <strong className="text-emerald-400 font-semibold">&quot;{outputMessage}&quot;</strong></span>
          </div>

          <div className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-mono text-sm shadow-lg flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>exit code: {exitCode}</span>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onTriggerExecution}
            disabled={isRunning}
            className="text-xs font-mono text-indigo-600 hover:text-indigo-800 underline underline-offset-4 cursor-pointer disabled:opacity-50"
          >
            Re-evaluate output &rarr;
          </button>
        </div>
      </motion.div>
    </div>
  );
};
