import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Terminal.css';

type HistoryEntry = { text: string; isCommand?: boolean };

type FileNode = { type: 'file'; content: string } | { type: 'dir'; children: Record<string, FileNode> };

const buildFs = (): FileNode => ({
  type: 'dir',
  children: {
    home: {
      type: 'dir',
      children: {
        user: {
          type: 'dir',
          children: {
            'readme.txt': { type: 'file', content: 'Welcome to the XP Portfolio terminal. Type "help" to see commands.' },
            'projects': {
              type: 'dir',
              children: {
                'emotion-ai.md': { type: 'file', content: 'Emotion Detection AI — Python, OpenCV, ML' },
                'todo-app.md': { type: 'file', content: 'To‑do App — HTML, CSS, JS' }
              }
            }
          }
        }
      }
    },
    etc: {
      type: 'dir',
      children: {
        'motd': { type: 'file', content: 'Have a productive day!' }
      }
    },
    var: { type: 'dir', children: {} }
  }
});

function isDir(node: FileNode): node is { type: 'dir'; children: Record<string, FileNode> } {
  return node.type === 'dir';
}

const Terminal: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [cmd, setCmd] = useState('');
  const [cwd, setCwd] = useState<string[]>(['home', 'user']);
  const [username] = useState('user');
  const [hostname] = useState('xp-portfolio');
  const fs = useMemo(buildFs, []);

  const prompt = useMemo(() => {
    const path = '/' + cwd.join('/');
    const homePath = '/home/' + username;
    const shown = path.startsWith(homePath) ? '~' + path.substring(homePath.length) : path;
    return `${username}@${hostname}:${shown}$`;
  }, [cwd, hostname, username]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const pushOutput = (text: string) => setHistory(prev => [...prev, { text }]);
  const pushCommand = (text: string) => setHistory(prev => [...prev, { text, isCommand: true }]);

  function getNodeByPath(pathSegs: string[]): FileNode | null {
    let node: FileNode = fs;
    for (const seg of pathSegs) {
      if (!isDir(node)) return null;
      const next = node.children[seg];
      if (!next) return null;
      node = next;
    }
    return node;
  }

  function resolvePath(arg: string | undefined): string[] {
    if (!arg || arg.trim() === '') return cwd.slice();
    let parts = arg.split('/').filter(Boolean);
    let base = arg.startsWith('/') ? [] : cwd.slice();
    for (const part of parts) {
      if (part === '.') continue;
      if (part === '..') {
        base.pop();
      } else {
        base.push(part);
      }
    }
    return base;
  }

  function cmd_help() {
    pushOutput('Available commands:');
    pushOutput('  help, whoami, pwd, ls, cd, cat, echo, clear, date, time, uname, history');
  }

  function cmd_whoami() { pushOutput(username); }
  function cmd_pwd() { pushOutput('/' + cwd.join('/')); }
  function cmd_date() { pushOutput(new Date().toDateString()); }
  function cmd_time() { pushOutput(new Date().toLocaleTimeString()); }
  function cmd_uname() { pushOutput('XP-Portfolio React/TS (x86_64) Web'); }

  function cmd_ls(pathArg?: string) {
    const targetPath = resolvePath(pathArg);
    const node = getNodeByPath(targetPath);
    if (!node) return pushOutput(`ls: cannot access: No such file or directory`);
    if (!isDir(node)) return pushOutput(pathArg || '.');
    const names = Object.keys(node.children);
    pushOutput(names.join('  '));
  }

  function cmd_cd(pathArg?: string) {
    const targetPath = resolvePath(pathArg);
    const node = getNodeByPath(targetPath);
    if (!node) return pushOutput(`cd: ${pathArg}: No such file or directory`);
    if (!isDir(node)) return pushOutput(`cd: ${pathArg}: Not a directory`);
    setCwd(targetPath);
  }

  function cmd_cat(pathArg?: string) {
    if (!pathArg) return pushOutput('cat: missing file operand');
    const targetPath = resolvePath(pathArg);
    const node = getNodeByPath(targetPath);
    if (!node) return pushOutput(`cat: ${pathArg}: No such file`);
    if (isDir(node)) return pushOutput(`cat: ${pathArg}: Is a directory`);
    pushOutput(node.content);
  }

  function cmd_echo(rest: string[]) { pushOutput(rest.join(' ')); }

  function cmd_clear() { setHistory([]); }

  const onEnter = () => {
    const input = cmd.trim();
    pushCommand(`${prompt} ${input}`);
    setCmd('');
    if (!input) return;
    const [name, ...rest] = input.split(/\s+/);
    switch (name) {
      case 'help': return cmd_help();
      case 'whoami': return cmd_whoami();
      case 'pwd': return cmd_pwd();
      case 'ls': return cmd_ls(rest[0]);
      case 'cd': return cmd_cd(rest[0]);
      case 'cat': return cmd_cat(rest[0]);
      case 'echo': return cmd_echo(rest);
      case 'clear': return cmd_clear();
      case 'date': return cmd_date();
      case 'time': return cmd_time();
      case 'uname': return cmd_uname();
      case 'history': return history.forEach(h => pushOutput(h.text));
      default:
        pushOutput(`${name}: command not found (type 'help')`);
    }
  };

  return (
    <div className="terminal-root" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-output">
        {history.map((h, idx) => (
          <div key={idx} className={h.isCommand ? 'line command' : 'line'}>{h.text}</div>
        ))}
      </div>
      <div className="terminal-input">
        <span className="prompt">{prompt}</span>
        <input
          ref={inputRef}
          value={cmd}
          onChange={(e) => setCmd(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onEnter(); }}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
        />
      </div>
    </div>
  );
};

export default Terminal;


