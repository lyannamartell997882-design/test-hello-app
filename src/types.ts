export type Environment = 'dev' | 'staging' | 'prod';

export type LogLevel = 'INFO' | 'WARN' | 'EXEC' | 'SUCCESS' | 'STDOUT';

export interface LogMessage {
  id: string;
  timestamp: string;
  level: LogLevel;
  text: string;
}

export interface TestItem {
  id: string;
  name: string;
  status: 'PASSED' | 'SKIPPED' | 'FAILED' | 'RUNNING';
  time: string;
}
