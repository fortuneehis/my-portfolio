
export interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string;
}

export interface Command {
  name: string;
  description: string;
  execute: () => string;
}
