import React from 'react';
import './WindowContent.css';
import TicTacToe from './TicTacToe';
import SettingsPanel from './settings/SettingsPanel';
import DontOpen from './fun/DontOpen';
import Terminal from './apps/Terminal';

interface WindowContentProps {
  content: string;
}

const WindowContent: React.FC<WindowContentProps> = ({ content }) => {
  const renderSkills = () => (
    <div className="content-section">
      <h3>Technical Skills</h3>
      <div className="skills-grid">
        <div className="skill-category">
          <h4>Programming & Scripting</h4>
          <ul>
            <li>Python</li>
            <li>Shell / Bash</li>
            <li>HTML / CSS</li>
          </ul>
        </div>
        <div className="skill-category">
          <h4>Cybersecurity Tools</h4>
          <ul>
            <li>Wireshark</li>
            <li>Splunk</li>
            <li>Nmap</li>
            <li>Metasploit</li>
            <li>Burp Suite</li>
          </ul>
        </div>
        <div className="skill-category">
          <h4>Networking</h4>
          <ul>
            <li>Cisco Packet Tracer</li>
            <li>Networking Configuration</li>
          </ul>
        </div>
        <div className="skill-category">
          <h4>Database & Development</h4>
          <ul>
            <li>SQL</li>
            <li>PL/SQL</li>
          </ul>
        </div>
        <div className="skill-category">
          <h4>Digital Marketing & Social Media</h4>
          <ul>
            <li>Video Editing</li>
            <li>Advertisement</li>
            <li>Social Media Algorithms</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="content-section">
      <h3>Projects</h3>
      <div className="projects-grid">
        <div className="project-card">
          <h4>Emotion Detection AI</h4>
          <p>
            AI-based emotion detection using Python and machine learning.
            Used OpenCV and pre-trained models for real-time facial emotion analysis.
          </p>
          <div className="project-tech">Python • OpenCV • ML</div>
          <div className="project-links">
            <a href="https://github.com/whoisraja" className="xp-button" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
        <div className="project-card">
          <h4>To‑do List</h4>
          <p>
            A simple functional to-do list web application built as a learning project.
            Focused on core front-end development concepts and task management features.
          </p>
          <div className="project-tech">HTML • CSS • JavaScript • LocalStorage</div>
          <div className="project-links">
            <a href="https://github.com/whoisraja" className="xp-button" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCertifications = () => (
    <div className="content-section">
      <h3>Certifications</h3>
      <div className="certifications-list">
        <div className="certification-item">
          <div className="cert-icon">📄</div>
          <div className="cert-details">
            <h4>DP‑900</h4>
          </div>
        </div>
        <div className="certification-item">
          <div className="cert-icon">📄</div>
          <div className="cert-details">
            <h4>IBM Cyber Security</h4>
          </div>
        </div>
        <div className="certification-item">
          <div className="cert-icon">📄</div>
          <div className="cert-details">
            <h4>(CEH) SQL Injection Attack</h4>
          </div>
        </div>
        <div className="certification-item">
          <div className="cert-icon">📄</div>
          <div className="cert-details">
            <h4>ISC2 ‑ CC</h4>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMyComputer = () => (
    <div className="content-section">
      <h3>System Information</h3>
      <ul>
        <li>OS: Windows XP Themed Portfolio</li>
        <li>CPU: React 18 + CRA</li>
        <li>Memory: TypeScript</li>
        <li>Storage: Components, Hooks, and CSS</li>
      </ul>
    </div>
  );

  const renderRecycleBin = () => (
    <div className="content-section">
      <h3>Recycle Bin</h3>
      <p>No items to display.</p>
    </div>
  );

  const renderAbout = () => (
    <div className="content-section">
      <h3>About Me</h3>
      <div className="about-header">
        {/* Try to load profile image from public/profile.jpg. Fallback to initials card. */}
        <img
          className="about-photo"
          src={process.env.PUBLIC_URL + '/profile.jpg'}
          alt="Raja Tripathy portrait"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.outerHTML = '<div class="about-photo-fallback">RT</div>';
          }}
        />
        <p>
          Recent BCA graduate specializing in Cybersecurity with hands‑on exposure to log analysis,
          web development, and threat identification. Comfortable with fundamentals of networking and
          ethical hacking and experienced with tools such as Wireshark, Splunk, Nmap, Metasploit, and
          Burp Suite. Passionate about securing digital systems and eager to contribute to real‑world
          cybersecurity solutions.
        </p>
      </div>

      <h4>Education</h4>
      <ul>
        <li>BCA (Cybersecurity), Manav Rachna International Institute of Research and Studies, Faridabad (2022–2025)</li>
      </ul>

      <h4>Internships</h4>
      <ul>
        <li>
          Deloitte (Virtual): Completed a job simulation reading web activity logs, supported a client
          in a cyber security breach scenario, and analyzed activity to identify suspicious behavior.
        </li>
        <li>
          Octanet: Front‑end development internship—built a basic web app using HTML, CSS, and JavaScript,
          consumed APIs, and focused on responsive UI and UX improvements.
        </li>
      </ul>

      <h4>Achievements & Interests</h4>
      <ul>
        <li>Served as Class Representative; awarded a merit‑based academic scholarship.</li>
        <li>Completed industry‑oriented virtual internships with Deloitte and Octanet.</li>
        <li>Interests: Capture The Flag (CTF), System hardening.</li>
      </ul>
    </div>
  );

  const renderContact = () => (
    <div className="content-section">
      <h3>Contact</h3>
      <p>Email: <a href="mailto:ayushraja0102@gmail.com" className="xp-button">ayushraja0102@gmail.com</a></p>
      <p>Phone: <a href="tel:+918882763304" className="xp-button">+91-8882763304</a></p>
      <p>LinkedIn: <a href="https://linkedin.com/in/rajatripathy" className="xp-button" target="_blank" rel="noreferrer">linkedin.com/in/rajatripathy</a></p>
      <p>GitHub: <a href="https://github.com/whoisraja" className="xp-button" target="_blank" rel="noreferrer">@whoisraja</a></p>
    </div>
  );

  const renderContent = () => {
    switch (content) {
      case 'my-computer':
        return renderMyComputer();
      case 'recycle-bin':
        return renderRecycleBin();
      case 'skills':
        return renderSkills();
      case 'projects':
        return renderProjects();
      case 'certifications':
        return renderCertifications();
      case 'game':
        return <TicTacToe />;
      case 'about':
        return renderAbout();
      case 'contact':
        return renderContact();
      case 'settings':
        return <SettingsPanel />;
      case "dont-open":
        return <DontOpen />;
      case 'terminal':
        return <Terminal />;
      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <div className="window-content">
      {renderContent()}
    </div>
  );
};

export default WindowContent;
