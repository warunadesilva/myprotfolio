import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; 
import profileImg from './profile.jpeg'; 
import { GraduationCap, Award, User, Mail, Terminal, ShieldCheck, Database, Cpu, Code2, Download, Phone, BarChart3, Briefcase, BrainCircuit } from 'lucide-react';

// --- Professional Academic Card Component ---
const AcademicCard = ({ year, degree, university, description, subjects, icon: Icon, color }) => (
  <div className="relative pl-10 pb-12 border-l-2 border-slate-800 last:pb-0">
    <div className={`absolute -left-[17px] top-0 p-2.5 rounded-full border-4 border-slate-900 shadow-xl ${color} text-white z-10`}>
      <Icon size={14} />
    </div>
    
    <div className="group bg-gradient-to-br from-slate-800/40 to-slate-900/40 p-8 rounded-3xl border border-slate-700/50 hover:border-blue-500/40 transition-all duration-500 shadow-2xl backdrop-blur-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <span className="inline-block px-3 py-1 rounded-md bg-slate-900/80 text-blue-400 font-mono text-xs font-bold tracking-[0.2em] border border-slate-700/50">
          {year}
        </span>
        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs tracking-wide">
          <GraduationCap size={16} /> {university}
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 tracking-tight">
        {degree}
      </h3>
      
      <p className="text-slate-300 mt-4 text-[14.5px] leading-relaxed font-normal tracking-wide text-justify antialiased">
        {description}
      </p>

      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px w-8 bg-blue-500/50"></div>
          <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.25em]">Core Expertise</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {subjects.map((sub, i) => (
            <span key={i} className="text-[11px] bg-blue-500/5 text-blue-200/80 px-3 py-1.5 rounded-md border border-blue-500/10 group-hover:border-blue-500/30 transition-all duration-300">
              {sub}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);

  // 🔥 ඔයාගේ Backend එකේ Vercel ලින්ක් එක (eyeyeye.png එකේ තිබ්බ එක)
  const API_URL = "https://myprotfolio-7hdr.vercel.app/";

  useEffect(() => {
    // Backend එකෙන් Projects ලබා ගැනීම
    axios.get(`${API_URL}/get-projects`)
      .then(res => setProjects(res.data))
      .catch(err => console.error("Error fetching projects:", err));

    // Backend එකෙන් Certificates ලබා ගැනීම
    axios.get(`${API_URL}/get-certificates`)
      .then(res => setCertificates(res.data))
      .catch(err => console.error("Error fetching certificates:", err));
  }, [API_URL]);

  const handleContact = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      // Contact form එක Backend එකට යැවීම
      const res = await axios.post(`${API_URL}/contact`, formData);
      if (res.data.success) {
        setStatus('Message Sent Successfully! ✅');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus('Failed to send message. ❌');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-500/30 text-[15px]">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        
        {/* --- HEADER SECTION --- */}
        <header className="mb-20 text-center animate-in fade-in slide-in-from-top-4 duration-1000">
          <img 
            src={profileImg} 
            alt="Waruna Surajith" 
            className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto border-4 border-slate-800 shadow-2xl mb-8 object-cover hover:scale-105 transition-transform duration-500"
          />
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-3 tracking-tight">Waruna Surajith</h1>
          <p className="text-blue-400 text-lg md:text-xl font-medium tracking-wide uppercase mb-6">AI/ML Engineer & Data Science Enthusiast</p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8 text-slate-300">
            <a href="mailto:warunasurajith@email.com" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
              <Mail size={18} className="text-blue-500" />
              <span>warunasurajith@email.com</span>
            </a>
            <a href="tel:+94785127395" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
              <Phone size={18} className="text-blue-500" />
              <span>+94 78 512 7395</span>
            </a>
          </div>

          <a 
            href="/Waruna_Surajith_CV.pdf" 
            download="Waruna_Surajith_CV.pdf"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-10 py-4 rounded-full font-bold shadow-lg transition-all transform hover:-translate-y-1 active:scale-95"
          >
            <Download size={20} />
            Download CV
          </a>
        </header>

        {/* --- 1. ABOUT ME --- */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <User className="text-blue-500" size={28} />
            <h2 className="text-3xl font-bold text-white">About Me</h2>
          </div>
          <div className="bg-slate-800/20 p-8 md:p-10 rounded-3xl border border-slate-700/30 backdrop-blur-sm">
            <div className="text-slate-300 text-lg leading-relaxed space-y-6">
              <p className="text-justify antialiased tracking-wide">
                Hi, I am a <strong>Software Engineering undergraduate</strong> at the Open University of Sri Lanka, uniquely backed by a strong <strong>BSc in Statistics and Mathematics</strong> from the University of Ruhuna. My expertise lies at the intersection of robust software development and advanced data science, with a core focus on <strong>Machine Learning and Predictive Modeling</strong>.
              </p>
              <p className="text-justify antialiased tracking-wide">
                I specialize in bridging the gap between complex mathematical theory and scalable software solutions. From building <strong>AI-powered environmental monitoring systems</strong> to developing high-performance web applications, I leverage my analytical mindset and engineering skills to solve real-world problems. I am deeply passionate about <strong>AI, Data Analytics</strong>, and creating user-centric software that drives innovation.
              </p>
            </div>
          </div>
        </section>

        {/* --- 2. ACADEMIC JOURNEY --- */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <Award className="text-blue-500" size={28} />
            <h2 className="text-3xl font-bold text-white tracking-tight">Academic Journey</h2>
          </div>
          
          <div className="ml-4 space-y-6">
            <AcademicCard 
              year="2024 — PRESENT"
              degree="Bachelor of Software Engineering (BSE Hons)"
              university="The Open University of Sri Lanka"
              description="Focusing on advanced software engineering principles, I am developing expertise in designing scalable architectures, integrating AI/ML models into production environments, and mastering full-stack cloud ecosystems. This journey bridges theoretical computer science with modern industrial practices."
              subjects={[
                "Software Architecture", "Artificial Intelligence", "Web & Mobile Development", 
                "Data Science", "Web Security & Networking", "Optimization Techniques", 
                "Design Thinking", "Accounting"
              ]}
              icon={Code2}
              color="bg-blue-600"
            />
            
            <AcademicCard 
              year="2020 — 2024"
              degree="Bachelor of Science (BSc)"
              university="University of Ruhuna"
              description="My foundational degree in Statistics and Mathematics provides the critical analytical framework for my work in Data Science. I gained extensive experience in mathematical modeling, computational statistics, and core programming, allowing me to handle complex datasets with high precision."
              subjects={[
                "Mathematics & Statistics", "MATLAB & Data Analysis", "ML Experience Projects", 
                "Java & C Programming", "Analytical Chemistry", 
                "HR Management", "Business Management"
              ]}
              icon={Database}
              color="bg-emerald-600"
            />
          </div>
        </section>

        {/* --- 3. TECHNICAL SKILLS --- */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <Code2 className="text-blue-500" size={28} />
            <h2 className="text-3xl font-bold text-white">Technical Skills</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/20 p-6 rounded-2xl border border-slate-700/30 backdrop-blur-sm">
              <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2">
                <Terminal size={18} /> Programming & Frameworks
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Python", "Java", "JavaScript", "React", "Node.js", "C Language", "SQL", "PHP"].map((skill) => (
                  <span key={skill} className="bg-slate-900/60 text-blue-100 px-3 py-1.5 rounded-lg border border-slate-700 text-sm font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/20 p-6 rounded-2xl border border-slate-700/30 backdrop-blur-sm">
              <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2">
                <BarChart3 size={18} /> Data Science & ML
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Machine Learning", "Statistics", "Scikit-learn", "Power BI", "MATLAB", "MLE Modeling", "Data Analysis"].map((skill) => (
                  <span key={skill} className="bg-slate-900/60 text-emerald-100 px-3 py-1.5 rounded-lg border border-slate-700 text-sm font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/20 p-6 rounded-2xl border border-slate-700/30 backdrop-blur-sm">
              <h3 className="text-orange-400 font-bold mb-4 flex items-center gap-2">
                <ShieldCheck size={18} /> Databases & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {["MongoDB", "Firebase", "SQL", "Weka", "Google Earth Engine", "Git"].map((skill) => (
                  <span key={skill} className="bg-slate-900/60 text-orange-100 px-3 py-1.5 rounded-lg border border-slate-700 text-sm font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/20 p-6 rounded-2xl border border-slate-700/30 backdrop-blur-sm">
              <h3 className="text-purple-400 font-bold mb-4 flex items-center gap-2">
                <Briefcase size={18} /> Professional Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Software Architecture", "Networking", "Design Thinking", "Management", "Optimization"].map((skill) => (
                  <span key={skill} className="bg-slate-900/60 text-purple-100 px-3 py-1.5 rounded-lg border border-slate-700 text-sm font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- 4. FEATURED PROJECTS --- */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <Terminal className="text-blue-500" size={28} />
            <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.length > 0 ? projects.map((p) => (
              <div key={p.id} className="group flex flex-col h-full bg-slate-800/20 p-8 rounded-3xl border border-slate-700/50 hover:border-blue-500/50 transition-all shadow-xl backdrop-blur-md">
                <h3 className="text-2xl font-bold text-blue-400 mb-3 group-hover:text-blue-300 transition-colors">{p.title}</h3>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed text-justify flex-grow">{p.description}</p>
                <div className="mt-auto pt-6 border-t border-slate-700/50">
                  <p className="text-[11px] text-slate-500 uppercase font-bold tracking-widest mb-3">Technologies Used</p>
                  <div className="flex flex-wrap gap-2">
                    {p.techStack && typeof p.techStack === 'string' ? (
                      p.techStack.split(',').map((tech, index) => (
                        <span key={index} className="px-3 py-1 rounded-md text-[11px] font-mono font-semibold bg-blue-500/5 text-blue-300 border border-blue-500/20 shadow-sm hover:bg-blue-500/10 transition-all">
                          {tech.trim()}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-slate-500 italic">No tech stack provided</span>
                    )}
                  </div>
                </div>
              </div>
            )) : <p className="text-slate-500 italic text-center col-span-2 animate-pulse">Synchronizing projects...</p>}
          </div>
        </section>

        {/* --- 5. CERTIFICATIONS --- */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <ShieldCheck className="text-emerald-500" size={28} />
            <h2 className="text-3xl font-bold text-white">Professional Certifications</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.length > 0 ? certificates.map((c) => (
              <div key={c.id} className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-emerald-500/30 transition-all">
                <Award className="text-emerald-400 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-bold text-white text-sm">{c.title}</h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">{c.issuedBy}</p>
                </div>
              </div>
            )) : <p className="text-slate-500 italic text-center col-span-2">Loading credentials...</p>}
          </div>
        </section>

        {/* --- 6. CONTACT FORM --- */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10 justify-center">
            <Mail className="text-blue-500" size={28} />
            <h2 className="text-3xl font-bold text-white">Get In Touch</h2>
          </div>
          <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 shadow-2xl max-w-lg mx-auto backdrop-blur-md">
            <form onSubmit={handleContact} className="space-y-4">
              <input type="text" placeholder="Name" className="w-full p-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500 transition-all" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              <input type="email" placeholder="Email" className="w-full p-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500 transition-all" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              <textarea placeholder="Message" rows="4" className="w-full p-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500 transition-all" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required></textarea>
              <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95">Send Message</button>
              {status && <p className="text-center text-blue-400 mt-4 font-medium">{status}</p>}
            </form>
          </div>
        </section>

        <footer className="text-center text-slate-600 text-xs pb-10">
          © {new Date().getFullYear()} Waruna Surajith. Professional Portfolio.
        </footer>
      </div>
    </div>
  );
}

export default App;
