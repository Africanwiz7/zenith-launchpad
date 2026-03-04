import React, { useState } from 'react';
import { Rocket, Shield, Brain, Database, Cloud, Code2, List, Hammer } from 'lucide-react';

// 1. The Database (All your roles in one place)
const techRolesData = {
  "AI & Machine Learning": {
    icon: <Brain size={24} color="#b294ff" />,
    definition: "AI specialists build systems that simulate human intelligence to solve complex problems.",
    subRoles: [
      { title: "AI/ML Engineer", description: "Designs and builds core machine learning algorithms." },
      { title: "MLOps Engineer", description: "Manages the production and scaling of AI models." },
      { title: "AI Ethics Officer", description: "Ensures AI systems are fair, transparent, and unbiased." },
      { title: "AI Product Manager", description: "Bridges the gap between AI tech and business needs." }
    ],
    skills: "Python, PyTorch, Linear Algebra, Prompt Engineering",
    projects: {
      easy: { title: "Sentiment Bot", blueprint: "1. Use Python NLTK library. 2. Scrape sample text data. 3. Train a basic classifier. 4. Build a UI to show 'Happy' or 'Sad'." },
      medium: "Custom Image Classifier", hard: "Fine-tuned LLM Chatbot", pro: "Autonomous Navigation System"
    }
  },
  "Cybersecurity": {
    icon: <Shield size={24} color="#b294ff" />,
    definition: "Cyber experts protect networks and data from digital threats and unauthorized access.",
    subRoles: [
      { title: "Security Analyst", description: "Monitors networks for suspicious activity and threats." },
      { title: "Ethical Hacker", description: "Legally tests systems to find security vulnerabilities." },
      { title: "IAM Specialist", description: "Manages user identities and digital access permissions." }
    ],
    skills: "Linux, Networking, Python, Cryptography",
    projects: {
      easy: { title: "Network Scanner", blueprint: "1. Install Scapy library. 2. Write script to send ARP requests. 3. Map all active IP addresses on your Wi-Fi." },
      medium: "Keylogger Detector", hard: "Encrypted Chat App", pro: "Zero-Trust Architecture"
    }
  },
  "Data Science": {
    icon: <Database size={24} color="#b294ff" />,
    definition: "Data Science uses math and tech to find patterns in raw data and predict future trends.",
    subRoles: [
      { title: "Data Engineer", description: "Builds systems that collect and store raw data." },
      { title: "Data Scientist", description: "Analyzes data to find insights and build predictions." },
      { title: "Data Governance Specialist", description: "Ensures data is handled legally and securely." }
    ],
    skills: "SQL, Python, Tableau, Statistics",
    projects: {
      easy: { title: "Budget Tracker", blueprint: "1. Export bank CSV. 2. Use Pandas to group spending. 3. Create a pie chart of your monthly habits." },
      medium: "House Price Predictor", hard: "Movie Recommendation Engine", pro: "Fraud Detection System"
    }
  },
  "Cloud Engineering": {
    icon: <Cloud size={24} color="#b294ff" />,
    definition: "Cloud Engineering manages virtual internet infrastructure on platforms like AWS or Azure.",
    subRoles: [
      { title: "Cloud Architect", description: "Designs the overall structure of cloud systems." },
      { title: "DevOps Engineer", description: "Automates code deployment and system updates." },
      { title: "Site Reliability Engineer", description: "Ensures cloud systems stay online and perform well." }
    ],
    skills: "AWS/Azure, Docker, Kubernetes, Terraform",
    projects: {
      easy: { title: "Static Portfolio", blueprint: "1. Create HTML site. 2. Upload to AWS S3 bucket. 3. Set up CloudFront for secure global access." },
      medium: "Containerized Web App", hard: "Auto-Scaling Cluster", pro: "Multi-Cloud Disaster Recovery"
    }
  },
  "Software Engineering": {
    icon: <Code2 size={24} color="#b294ff" />,
    definition: "Software Engineering applies engineering principles to design and build reliable applications.",
    subRoles: [
      { title: "Specialized Developer", description: "Focuses on deep niches like Fintech or Healthcare tech." },
      { title: "IoT Engineer", description: "Builds software for smart physical devices (like smart homes)." },
      { title: "SDET (Automation)", description: "Writes code to automatically test and break other software." }
    ],
    skills: "Java, JavaScript, Git, Data Structures",
    projects: {
      easy: { title: "Grade Manager", blueprint: "1. Create Student class in Java. 2. Use ArrayList for marks. 3. Function to calculate and print GPA." },
      medium: "Task API (CRUD)", hard: "Social Media Microservice", pro: "Real-time Collaboration Tool"
    }
  }
};

// Sub-components for better organization
const Header = () => (
  <div style={{ textAlign: 'center', marginBottom: '40px' }}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
      <Rocket color="#b294ff" size={40} />
      <h1>Zenith Launchpad</h1>
    </div>
    <p className="slogan">"We're only in it for the bugs (and the bags)"</p>
  </div>
);

const CategoryButtons = ({ techRolesData, activeTab, setActiveTab, setInnerTab }) => (
  <div className="btn-group">
    {Object.keys(techRolesData).map(role => (
      <button
        key={role}
        onClick={() => { setActiveTab(role); setInnerTab(null); }}
        aria-label={`View ${role} information`}
      >
        {role}
      </button>
    ))}
  </div>
);

const SubNavigation = ({ setInnerTab }) => {
  const subButtonStyle = {
    flex: 1, padding: '10px', backgroundColor: 'transparent', border: '1px solid #374151',
    color: '#b294ff', borderRadius: '5px', cursor: 'pointer', display: 'flex',
    alignItems: 'center', justifyContent: 'center', gap: '8px'
  };

  return (
    <div className="sub-btn-group" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <button style={subButtonStyle} onClick={() => setInnerTab('roles')} aria-label="View roles">
        <List size={16} />
        Roles
      </button>
      <button style={subButtonStyle} onClick={() => setInnerTab('skills')} aria-label="View skills">
        <Hammer size={16} />
        Skills/Lang
      </button>
      <button style={subButtonStyle} onClick={() => setInnerTab('projects')} aria-label="View projects">
        <Code2 size={16} />
        Projects
      </button>
    </div>
  );
};

const RolesSection = ({ subRoles }) => (
  <div>
    {subRoles.map(role => (
      <div key={role.title} style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#1e293b', borderRadius: '8px' }}>
        <h4 style={{ color: '#b294ff', margin: '0 0 5px 0' }}>{role.title}</h4>
        <p style={{ fontSize: '0.9rem', margin: 0 }}>{role.description}</p>
      </div>
    ))}
  </div>
);

const SkillsSection = ({ skills }) => (
  <div style={{ padding: '20px', backgroundColor: '#1e293b', borderRadius: '8px', borderLeft: '4px solid #b294ff' }}>
    <p style={{ margin: 0 }}><strong>Required:</strong> {skills}</p>
  </div>
);

const ProjectsSection = ({ projects }) => (
  <div className="project-list">
    <div style={{ marginBottom: '15px' }}>
      <p><strong>Easy:</strong> {projects.easy.title}</p>
      <div className="blueprint">
        <p style={{ color: '#b294ff', fontWeight: 'bold', fontSize: '0.8rem' }}>MOTIVATION BLUEPRINT:</p>
        {projects.easy.blueprint}
      </div>
    </div>
    <p><strong>Medium:</strong> {projects.medium}</p>
    <p><strong>Hard:</strong> {projects.hard}</p>
    <p><strong>Pro:</strong> {projects.pro}</p>
  </div>
);

const DisplayCard = ({ activeTab, techRolesData, innerTab, setInnerTab }) => {
  const roleData = techRolesData[activeTab];

  return (
    <div className="display-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
        {roleData.icon}
        <h2 style={{ color: 'white', margin: 0 }}>{activeTab}</h2>
      </div>
      <p style={{ color: '#9ca3af', marginBottom: '25px', lineHeight: '1.6' }}>{roleData.definition}</p>

      <SubNavigation setInnerTab={setInnerTab} />

      {innerTab === 'roles' && <RolesSection subRoles={roleData.subRoles} />}
      {innerTab === 'skills' && <SkillsSection skills={roleData.skills} />}
      {innerTab === 'projects' && <ProjectsSection projects={roleData.projects} />}
    </div>
  );
};

const FutureProofSection = () => (
  <div className="future-proof">
    <h3 style={{ color: 'white' }}>Top 3 Future Proof Skills</h3>
    <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0 }}>
      <li style={{ marginBottom: '10px' }}>🚀 <strong>AI Collaboration:</strong> Using AI tools to accelerate coding and data analysis.</li>
      <li style={{ marginBottom: '10px' }}>🏗️ <strong>System Design:</strong> Understanding how complex, distributed systems work together.</li>
      <li>💬 <strong>Soft Skills:</strong> Strategic problem-solving and technical storytelling for stakeholders.</li>
    </ul>
  </div>
);

export default function ZenithLaunchpad() {
  const [activeTab, setActiveTab] = useState(null);
  const [innerTab, setInnerTab] = useState(null);

  return (
    <div className="main-bg">
      <div className="container centered">
        <Header />
        <CategoryButtons
          techRolesData={techRolesData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setInnerTab={setInnerTab}
        />
        {activeTab && (
          <DisplayCard
            activeTab={activeTab}
            techRolesData={techRolesData}
            innerTab={innerTab}
            setInnerTab={setInnerTab}
          />
        )}
        <FutureProofSection />
      </div>
    </div>
  );
}