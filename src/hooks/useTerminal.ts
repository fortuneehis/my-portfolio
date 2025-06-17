
import { useState, useCallback } from 'react';
import { TerminalLine } from '../types/terminal';

const WELCOME_MESSAGE = `
██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 

Welcome to Fortune's Portfolio Terminal v10.0
Backend Developer

Type 'help' to see available commands or 'about' to learn more about me.
`;

const HELP_TEXT = `
Available Commands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  about      Display information about me
  skills     Show technical skills and expertise
  projects   List recent projects and contributions  
  experience Show work experience and career history
  contact    Get contact information
  clear      Clear the terminal screen
  help       Show this help message
  whoami     Display current user info
  ls         List directory contents
  pwd        Print working directory
  date       Show current date and time
  exit       Close terminal (just kidding!)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tip: Use arrow keys to navigate command history
`;

const ABOUT_TEXT = `
┌─────────────────────────────────────────────────────────────┐
│                        ABOUT ME                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🚀 Backend Developer with 4+ years of experience           │
│  🏗️  Specialized in scalable system architecture            │
│  ☁️  Cloud infrastructure enthusiast (AWS, GCP)             │
│  🐍  NodeJS, JavaScript/Typescript, Go                      │
│  🗄️  Database optimization wizard                           │
│                                                             │
│  📍 Based in Lagos State, NG                                │
│  🎓 Mathematics Degree - University Of Benin                │                          
│                                                             │
│  "I love solving complex problems and turning               │
│   ideas into efficient, maintainable code."                 │    
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
`;

const SKILLS_TEXT = `
┌─────────────────────────────────────────────────────────────┐
│                      TECHNICAL SKILLS                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🐍 LANGUAGES                                               │                                        
│     JavaScript/Node.js                                      │
│     TypeScript                                              │
│     Go                                                      │
│                                                             │
│                                                             │
│  🗄️  DATABASES                                              │
│     PostgreSQL/MySQL                                              │
│     Redis                                                   │
│     Elasticsearch                                           │
│                                                             │
│  ☁️  CLOUD & DEVOPS                                         │
│     AWS                                                     │
│     Docker                                                  │
│     Kubernetes                                              │
│     Terraform                                               │
│                                                             │
│  🔧 FRAMEWORKS & TOOLS                                      │
│     Nest.js                                                 │
│     Express.js                                              │
│     GraphQL                                                 │
│     Fiber(Go)                                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
`;

const PROJECTS_TEXT = `
┌─────────────────────────────────────────────────────────────┐
│                       RECENT PROJECTS                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🚀 GoNut — HTML-like templating engine in Go               │
│     GitHub: github.com/fortuneehis/gonut                    │
│     • Developed a simple, fast templating engine            │
│       mimicking HTML syntax for Go web applications.        │
│     • Built a custom parser with clean syntax and           │ 
│       extensibility.                                        │
│     • Tech Stack: Go                                        │
│                                                             │
│  📊 Proenv – Enhanced Dotenv Configuration Loader           │
│     GitHub: github.com/fortuneehis/proenv                   │
│     • Created a dotenv-compatible loader with support       │
│       for defaults and hierarchical environments.           │
│     • Simplified environment switching with fallback        │
│       logic and override priority.                          │
│     • Tech: TypeScript, NodeJS                              │
│                                                             │     
│     XWire – Simple Banking Backend API                      │   
│     GitHub: github.com/fortuneehis/xwire                    │
│     • Implemented user authentication (register, login,     │   
│       logout, get user info) with secure session management │
│     • Developed wallet operations: view balance,            │  
│       deposit, withdraw, and peer-to-peer transfers         │
│     • Added transaction history tracking with efficient     │
│       database queries and pagination                       │
│     • Secured the API with CORS, Helmet, input validation,  │
│       and structured error handling                         │
│                                                             │
│  🔐 use-responsive-lib – React Hook for Responsive Design   │
│     GitHub: github.com/fortuneehis/use-responsive           │
│     • Built a custom React hook to detect and respond       │
│       to screen size breakpoints.                           │
│     • Enabled responsive UI logic directly in components    │
│       without extra CSS media queries.                      │
│     • Integrated seamlessly into modern React codebases.    │
│     • Tech: React, Typescript                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
`;

const EXPERIENCE_TEXT = `
┌─────────────────────────────────────────────────────────────┐
│                     WORK EXPERIENCE                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🏢 Software Engineer @ KadMap Systems Limited.             │
│     📅 Aug 2024 - Present                                   │
│     • Developed a secure client application using           │
│        Hub-Spoke network topology.                          │
│      • Built a custom Go networking library for             │
│        remote OS communication with wireguard-go.           │ 
│      • Developed core repository and point-to-point         │
│        networking daemon.                                   │
│     • Mentor junior developers and conduct code reviews     │
│                                                             │
│  🚀 Freelance Fullstack Developer @ Upwork,Contract Work... │
│     📅 Jun 2019 - Present                                   │
│     • Built fullstack applications using the MERN Stack     │ 
│     • Implemented payment processing with Stripe            │
│     • Created Telegram bots for FX and financial            │
│       calculations.                                         │ 
│     • Developed a passport photo app (Passport Perfect) with│ 
│       React Native.                                         │
│     • Managed and optimized PostgreSQL and MySQL databases. │                                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
`;

const CONTACT_TEXT = `
┌─────────────────────────────────────────────────────────────┐
│                      CONTACT INFORMATION                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📧 Email: ehijianbhulufortune@gmail.com                    │     
│  📱 Phone: +2348168790081                                   │
│  💼 LinkedIn: https://linkedin.com/in/fortune-ehis          │
│  🐙 GitHub: https://github.com/fortuneehis                  │
│  🐦 Twitter: @ieatbits                                      │
│                                                             │
│  🌍 Open to remote opportunities                            │
│                                                             │
│  💌 Feel free to reach out for:                             │
│     • Job opportunities                                     │
│     • Technical discussions                                 │
│     • Open source collaborations                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
`;

export const useTerminal = () => {
  const [output, setOutput] = useState<TerminalLine[]>([
    { type: 'output', content: WELCOME_MESSAGE },
    {type: "output", content: HELP_TEXT}
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const executeCommand = useCallback(async (command: string) => {
    setOutput(prev => [...prev, { type: 'command', content: command }]);
    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));

    const cmd = command.toLowerCase().trim();
    let response = '';

    switch (cmd) {
      case 'help':
        response = HELP_TEXT;
        break;
      case 'about':
        response = ABOUT_TEXT;
        break;
      case 'skills':
        response = SKILLS_TEXT;
        break;
      case 'projects':
        response = PROJECTS_TEXT;
        break;
      case 'experience':
        response = EXPERIENCE_TEXT;
        break;
      case 'contact':
        response = CONTACT_TEXT;
        break;
      case 'clear':
        setOutput([]);
        setIsProcessing(false);
        return;
      case 'whoami':
        response = 'Ehijianbhulu Fortune';
        break;
      case 'pwd':
        response = '/home/fortune/portfolio';
        break;
      case 'ls':
        response = `about.txt  skills.txt  projects.txt  experience.txt  contact.txt`;
        break;
      case 'date':
        response = new Date().toString();
        break;
      case 'exit':
        response = `
Nice try! This terminal doesn't close that easily. 😉
Use 'clear' to clean the screen or just keep exploring!`;
        break;
      case '':
        response = '';
        break;
      default:
        if (cmd.startsWith('cd ')) {
          response = `bash: cd: ${cmd.slice(3)}: No such file or directory`;
        } else if (cmd.startsWith('cat ')) {
          const file = cmd.slice(4);
          if (file === 'about.txt') response = ABOUT_TEXT;
          else if (file === 'skills.txt') response = SKILLS_TEXT;
          else if (file === 'projects.txt') response = PROJECTS_TEXT;
          else if (file === 'experience.txt') response = EXPERIENCE_TEXT;
          else if (file === 'contact.txt') response = CONTACT_TEXT;
          else response = `cat: ${file}: No such file or directory`;
        } else {
          response = `bash: ${cmd}: command not found

Try 'help' to see available commands.`;
        }
    }

    setOutput(prev => [...prev, { type: 'output', content: response }]);
    setIsProcessing(false);
  }, []);

  return {
    output,
    executeCommand,
    isProcessing
  };
};
