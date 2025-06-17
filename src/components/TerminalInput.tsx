
import React, { useState, useRef, useEffect } from 'react';

interface TerminalInputProps {
  onCommand: (command: string) => void;
  isProcessing: boolean;
}

export const TerminalInput: React.FC<TerminalInputProps> = ({ onCommand, isProcessing }) => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && !isProcessing) {
      inputRef.current.focus();
    }
  }, [isProcessing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      onCommand(input.trim());
      setCommandHistory(prev => [...prev, input.trim()]);
      setInput('');
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };


  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <span className="text-terminal-green-dim">fortune@portfolio:~$ </span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent outline-none text-terminal-white caret-terminal-cursor ml-1"
        autoFocus
        spellCheck={false}
        autoComplete="off"
      />
      <span className="text-terminal-cursor animate-cursor-blink">█</span>
    </form>
  );
};
