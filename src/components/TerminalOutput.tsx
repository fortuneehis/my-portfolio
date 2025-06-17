
import React from 'react';
import { TerminalLine } from '../types/terminal';

interface TerminalOutputProps {
  output: TerminalLine[];
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ output }) => {
  return (
    <div className="space-y-1">
      {output.map((line, index) => (
        <div key={index} className="flex flex-wrap">
          {line.type === 'command' && (
            <>
              <span className="text-terminal-green-dim">fortune@portfolio:~$ </span>
              <span className="text-terminal-white">{line.content}</span>
            </>
          )}
          {line.type === 'output' && (
            <pre className="whitespace-pre-wrap text-terminal-green leading-relaxed font-mono text-sm">
              {line.content}
            </pre>
          )}
          {line.type === 'error' && (
            <span className="text-red-400">{line.content}</span>
          )}
        </div>
      ))}
    </div>
  );
};
