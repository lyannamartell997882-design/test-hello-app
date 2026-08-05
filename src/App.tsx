/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { PreviewCanvas } from './components/PreviewCanvas';
import { SessionSummaryCard } from './components/SessionSummaryCard';
import { LogTerminal } from './components/LogTerminal';
import { Footer } from './components/Footer';
import { Environment, LogMessage, TestItem } from './types';

const INITIAL_LOGS: LogMessage[] = [
  { id: '1', timestamp: '04:45:01', level: 'INFO', text: 'Initializing runner environment...' },
  { id: '2', timestamp: '04:45:01', level: 'INFO', text: 'Mounting virtual filesystem...' },
  { id: '3', timestamp: '04:45:02', level: 'WARN', text: 'Memory limit restricted to 512MB' },
  { id: '4', timestamp: '04:45:02', level: 'EXEC', text: 'python3 test_app.py' },
  { id: '5', timestamp: '04:45:03', level: 'STDOUT', text: 'Hello World' },
  { id: '6', timestamp: '04:45:03', level: 'INFO', text: 'Process finished with exit code 0' },
];

const INITIAL_TESTS: TestItem[] = [
  { id: 't1', name: 'Core/Health_Check', status: 'PASSED', time: '12ms' },
  { id: 't2', name: 'Hello_World/Output_Verify', status: 'PASSED', time: '8ms' },
  { id: 't3', name: 'Auth/Token_Refresh', status: 'SKIPPED', time: '0ms' },
];

export default function App() {
  const [activeEnv, setActiveEnv] = useState<Environment>('dev');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<LogMessage[]>(INITIAL_LOGS);
  const [recentTests, setRecentTests] = useState<TestItem[]>(INITIAL_TESTS);
  const [outputMessage, setOutputMessage] = useState<string>('Hello World');
  const [exitCode, setExitCode] = useState<number>(0);

  // Session summary stats state
  const [totalTestsRun, setTotalTestsRun] = useState<number>(4);
  const [passedCount, setPassedCount] = useState<number>(4);
  const [failedCount, setFailedCount] = useState<number>(0);
  const [executionTimes, setExecutionTimes] = useState<number[]>([12, 8, 7, 9]);

  const avgExecutionTimeMs =
    executionTimes.length > 0
      ? executionTimes.reduce((a, b) => a + b, 0) / executionTimes.length
      : 0;

  const formatTime = () => {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  };

  const handleRunSuite = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);

    const nowStr = formatTime();

    // Mark test as running
    setRecentTests((prev) =>
      prev.map((t) => (t.id === 't2' ? { ...t, status: 'RUNNING' } : t))
    );

    // Append initialization log
    setLogs((prev) => [
      ...prev,
      { id: Date.now().toString() + '-1', timestamp: nowStr, level: 'INFO', text: `Switching context to environment [${activeEnv.toUpperCase()}]...` },
      { id: Date.now().toString() + '-2', timestamp: nowStr, level: 'EXEC', text: 'Executing suite test_hello_world.py' },
    ]);

    setTimeout(() => {
      const time2 = formatTime();
      const runTime = Math.floor(Math.random() * 5) + 6; // random duration 6-10ms

      setLogs((prev) => [
        ...prev,
        { id: Date.now().toString() + '-3', timestamp: time2, level: 'STDOUT', text: 'Hello World' },
        { id: Date.now().toString() + '-4', timestamp: time2, level: 'SUCCESS', text: `Test suite assertion matched: stdout == "Hello World" (${runTime}ms)` },
        { id: Date.now().toString() + '-5', timestamp: time2, level: 'INFO', text: 'Process finished with exit code 0' },
      ]);

      setOutputMessage('Hello World');
      setExitCode(0);
      setRecentTests((prev) =>
        prev.map((t) => (t.id === 't2' ? { ...t, status: 'PASSED', time: `${runTime}ms` } : t))
      );

      // Update session statistics
      setTotalTestsRun((prev) => prev + 1);
      setPassedCount((prev) => prev + 1);
      setExecutionTimes((prev) => [...prev, runTime]);

      setIsRunning(false);
    }, 800);
  }, [isRunning, activeEnv]);

  const handleSelectEnv = (env: Environment) => {
    if (env === activeEnv) return;
    setActiveEnv(env);
    const timeStr = formatTime();
    setLogs((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        timestamp: timeStr,
        level: 'INFO',
        text: `Target environment set to: ${env.toUpperCase()}`,
      },
    ]);
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 text-slate-900 font-sans overflow-hidden antialiased">
      <Header isRunning={isRunning} onRunSuite={handleRunSuite} activeEnv={activeEnv} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeEnv={activeEnv} onSelectEnv={handleSelectEnv} recentTests={recentTests} />

        <main className="flex-1 flex flex-col p-6 bg-white overflow-hidden">
          <SessionSummaryCard
            totalTestsRun={totalTestsRun}
            passedCount={passedCount}
            failedCount={failedCount}
            avgExecutionTimeMs={avgExecutionTimeMs}
          />

          <PreviewCanvas
            isRunning={isRunning}
            onTriggerExecution={handleRunSuite}
            outputMessage={outputMessage}
            exitCode={exitCode}
          />

          <LogTerminal logs={logs} onClearLogs={handleClearLogs} />
        </main>
      </div>

      <Footer activeEnv={activeEnv} />
    </div>
  );
}
