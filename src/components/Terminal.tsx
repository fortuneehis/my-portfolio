
import React, { useState, useEffect, useRef } from 'react';
import { TerminalOutput } from './TerminalOutput';
import { TerminalInput } from './TerminalInput';
import { useTerminal } from '../hooks/useTerminal';

const Terminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const { output, executeCommand, isProcessing } = useTerminal();

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-green font-mono md:p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-terminal-bg  border border-terminal-green-dim md:rounded-lg shadow-2xl">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-terminal-green-dim bg-opacity-10 border-b border-terminal-green-dim">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-terminal-gray text-sm">fortune@portfolio:~$</div>
            <div className="w-12"></div>
          </div>

          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="h-screen md:h-[90vh] overflow-y-auto p-4 scroll-smooth"
          >
            <TerminalOutput output={output} />
            <TerminalInput onCommand={executeCommand} isProcessing={isProcessing} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
