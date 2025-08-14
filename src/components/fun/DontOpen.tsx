import React, { useEffect, useMemo, useRef, useState } from 'react';
import './DontOpen.css';

const asciiBanner = [
  '  ____                 _              _               _            ',
  " |  _ \\  ___  _ __ __| | ___  _ __  | |__   __ _  ___| | _____ _ __ ",
  " | | | |/ _ \\| '__/ _` |/ _ \\| '_ \\ | '_ \\ / _` |/ __| |/ / _ \\ '__|",
  ' | |_| | (_) | | | (_| | (_) | | | || | | | (_| | (__|   <  __/ |   ',
  ' |____/ \\___/|_|  \\__,_|\\___/|_| |_| |_| |_|\\__,_|\\___|_|\\_\\___|_|   '
].join('\n');

const terminalLines = [
  'Initializing payload[OK]',
  'Establishing secure channel... [OK]',
  'Bypassing firewall rules... [OK]',
  'Escalating privileges... [OK]',
  'Deploying confetti.exe ... [OK]',
  'Encrypting snacks drawer ... [FAILED]',
  'Exfiltrating dad jokes ... [OK]',
  'Injecting memes ... [OK]',
  'Launching RickRoll protocol ... [OK]'
];

const DontOpen: React.FC = () => {
  const [typed, setTyped] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const intervalRef = useRef<number | null>(null);

  const hackedMessage = useMemo(() => "You're hacked!", []);

  useEffect(() => {
    // Type the hacked message slowly
    let i = 0;
    const t = window.setInterval(() => {
      setTyped(hackedMessage.slice(0, i + 1));
      i += 1;
      if (i >= hackedMessage.length) {
        window.clearInterval(t);
      }
    }, 100);
    return () => window.clearInterval(t);
  }, [hackedMessage]);

  useEffect(() => {
    // Stream fake terminal logs
    let idx = 0;
    intervalRef.current = window.setInterval(() => {
      setLog(prev => [
        `${new Date().toLocaleTimeString()}  >  ${terminalLines[idx % terminalLines.length]}`,
        ...prev
      ].slice(0, 18));
      idx += 1;
    }, 250);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="dont-open-root">
      <div className="crt-overlay" />
      <pre className="ascii-banner">{asciiBanner}</pre>
      <div className="typed-line">
        <span className="prompt">$</span>
        <span className="typed"> {typed}</span>
        <span className="cursor">_</span>
      </div>
      <div className="terminal-log">
        {log.map((l, i) => (
          <div key={i} className="log-line">{l}</div>
        ))}
      </div>
      <div className="footer-fun">press ESC to abort... just kidding 😈</div>
    </div>
  );
};

export default DontOpen;


