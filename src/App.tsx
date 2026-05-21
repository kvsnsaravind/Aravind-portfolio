/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  FileText, 
  Send, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Lock, 
  Cpu,
  Layers,
  ArrowUpRight 
} from 'lucide-react';
import { resumeData } from './data/resumeData';
import { ContactFormData } from './types';
import GithubProjects from './components/GithubProjects';
import ResumeChatbot from './components/ResumeChatbot';
import AtsResumeView from './components/AtsResumeView';
import NetworkSandbox from './components/NetworkSandbox';

export default function App() {
  const [selectedSkillForChat, setSelectedSkillForChat] = useState<string>('');
  const [timeStr, setTimeStr] = useState<string>('00:00 PST');
  const [navActiveSection, setNavActiveSection] = useState<string>('profile');
  
  // Contact form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Trigger browser printing flow for resume download/rendering
  const triggerResumePrint = () => {
    const resumeEl = document.getElementById('resume-viewer');
    if (resumeEl) {
      resumeEl.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        window.print();
      }, 500);
    }
  };

  // Keep a digital clock ticked to represent a fast, highly interactive UI experience
  useEffect(() => {
    const updateTime = () => {
      // Show Austin, TX/Central Time appropriate to Oracle HQ
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Chicago',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatted = new Intl.DateTimeFormat('en-US', options).format(new Date());
      setTimeStr(`${formatted} CT`);
    };
    
    updateTime();
    const intervalID = setInterval(updateTime, 1000);
    return () => clearInterval(intervalID);
  }, []);

  // Handle skill click for chatbot queries integration
  const handleSkillClick = (skillName: string) => {
    setSelectedSkillForChat(skillName);
    const chatWidget = document.getElementById('ai-assistant');
    if (chatWidget) {
      chatWidget.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Submit Contact Form
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormError('Please fill out all required fields (Name, Email, and Message).');
      return;
    }

    setFormLoading(true);
    setFormError(null);
    setFormSuccess(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || 'Server error occurred');
      }

      setFormSuccess(resData.message || 'Your message has been received! Aravind will reply shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setFormError(err.message || 'Unable to submit your request. Check backend status.');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E4E4E7] font-sans selection:bg-indigo-500/25 selection:text-white pb-16">
      
      {/* Decorative Grid Mesh Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(30,58,138,0.05),transparent_40%)] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 space-y-12 relative z-10">
        
        {/* Navigation & Header Panel */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-900 pb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-900 border border-zinc-800 text-indigo-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>SENIOR SOFTWARE ENGINEER / AI PLATFORMS</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-sans font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-600 uppercase leading-none">
              Aravind<br/>Kollipara
            </h1>
            <p className="text-zinc-500 font-mono tracking-widest text-xs uppercase pt-1">
              5+ Years scalably designing at Oracle · Amazon · SUNY Buffalo
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4 shrink-0 w-full md:w-auto">
            <div className="flex flex-wrap gap-4 items-center">
              <a 
                href={resumeData.contact.github} 
                target="_blank" 
                rel="noreferrer noopener"
                className="group flex items-center gap-2 bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-800 px-4 py-2.5 rounded-xl transition-all font-mono text-xs uppercase"
              >
                <span className="text-indigo-400 group-hover:translate-x-0.5 transition-transform">01/</span>
                <span className="font-bold tracking-wider text-slate-100 flex items-center gap-1.5ClassName">
                  GitHub <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </span>
              </a>

              <a 
                href={resumeData.contact.linkedin} 
                target="_blank" 
                rel="noreferrer noopener"
                className="group flex items-center gap-2 bg-indigo-950/20 hover:bg-indigo-950/45 border border-indigo-950 hover:border-indigo-900/60 px-4 py-2.5 rounded-xl transition-all font-mono text-xs uppercase"
              >
                <span className="text-indigo-400 group-hover:translate-x-0.5 transition-transform">02/</span>
                <span className="font-bold tracking-wider text-indigo-300 flex items-center gap-1.5">
                  LinkedIn <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </span>
              </a>
            </div>

            <button
              onClick={triggerResumePrint}
              className="inline-flex items-center gap-2 tracking-widest bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase py-2.5 px-5 rounded-xl transition-all cursor-pointer shadow-xl shadow-white/5 font-display"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Download & Print Resume</span>
            </button>
          </div>
        </header>

        {/* Core Layout Split Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Core Biography & Competencies (7 Cols) */}
          <main className="lg:col-span-7 space-y-12">
            
            {/* Quick Summary Pitch */}
            <section className="space-y-4">
              <h2 className="text-xs font-mono text-zinc-600 uppercase tracking-[0.25em] flex items-center gap-2">
                <span>[01] Professional Statement</span>
                <span className="h-[1px] bg-zinc-900 flex-1"></span>
              </h2>
              <p className="text-base text-zinc-300 leading-relaxed font-sans text-justify bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent p-6 rounded-2xl border border-zinc-900">
                {resumeData.summary}
              </p>
            </section>

            {/* Core Work Experience Timeline */}
            <section className="space-y-6">
              <h2 className="text-xs font-mono text-zinc-600 uppercase tracking-[0.25em] flex items-center gap-2">
                <span>[02] Work Milestones</span>
                <span className="h-[1px] bg-zinc-900 flex-1"></span>
              </h2>

              <div className="space-y-8 relative pl-4 border-l border-zinc-900">
                {resumeData.experiences.map((exp, idx) => (
                  <div key={idx} className="group relative space-y-3">
                    {/* Glowing bullet indicator on timeline hover */}
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-800 group-hover:bg-indigo-500 group-hover:scale-125 border-4 border-[#0A0A0B] transition-all" />

                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                          {exp.role} <span className="text-zinc-500 font-normal">@ {exp.company}</span>
                        </h3>
                        <p className="text-xs font-mono text-zinc-500 mt-0.5">{exp.location}</p>
                      </div>

                      <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-2 pl-4 list-disc text-sm text-zinc-400 leading-relaxed text-slate-350">
                      {exp.bullets.slice(0, 4).map((bullet, bidx) => (
                        <li key={bidx} className="hover:text-zinc-200 transition-colors">
                          {bullet}
                        </li>
                      ))}
                      {exp.bullets.length > 4 && (
                        <li className="text-xs font-mono text-indigo-400 italic list-none pt-1">
                          + {exp.bullets.length - 4} additional key performance deliverables available in full printable PDF
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Interactive System Sandbox Visualizer */}
            <section className="space-y-6">
              <h2 className="text-xs font-mono text-zinc-600 uppercase tracking-[0.25em] flex items-center gap-2">
                <span>[03] Interactive System Sandbox</span>
                <span className="h-[1px] bg-zinc-900 flex-1"></span>
              </h2>
              <NetworkSandbox />
            </section>

            {/* Skills Matrix Workspace (Interactive Chat Triggers) */}
            <section className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xs font-mono text-zinc-600 uppercase tracking-[0.25em] flex-1 flex items-center gap-2">
                  <span>[04] Skill Matrix</span>
                  <span className="h-[1px] bg-zinc-900 flex-1"></span>
                </h2>
                <span className="text-[10px] font-mono text-indigo-400 flex items-center gap-1.5 uppercase shrink-0">
                  <Sparkles className="w-3 h-3 text-indigo-400 animate-pulse" />
                  <span>Interactive: Click to bot query</span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-950/40 p-6 rounded-2xl border border-zinc-900">
                {resumeData.skills.map((cluster, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="text-xs font-mono font-bold text-zinc-400 tracking-wider">
                      {cluster.category}
                    </h4>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {cluster.skills.map((skill, sIdx) => (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => handleSkillClick(skill)}
                          className="px-2.5 py-1 text-xs bg-zinc-900 hover:bg-indigo-950/30 border border-zinc-800 hover:border-indigo-900 text-zinc-300 hover:text-indigo-300 rounded-md transition-all font-mono flex items-center gap-1 cursor-pointer"
                          title={`Ask Gemini to summarize background on ${skill}`}
                        >
                          <span>{skill}</span>
                          <ChevronRight className="w-3 h-3 opacity-30 group-hover:opacity-100" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Structured Academic Record */}
            <section className="space-y-6">
              <h2 className="text-xs font-mono text-zinc-600 uppercase tracking-[0.25em] flex items-center gap-2">
                <span>[05] Educational Foundations</span>
                <span className="h-[1px] bg-zinc-900 flex-1"></span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="bg-zinc-900/30 border border-zinc-900 p-5 rounded-2xl flex flex-col justify-between hover:border-zinc-850 transition-colors">
                    <div className="space-y-1">
                      <div className="text-xs text-indigo-400 font-mono font-semibold uppercase">{edu.period}</div>
                      <h4 className="font-display font-semibold text-slate-100 text-sm md:text-base tracking-tight leading-snug">
                        {edu.degree}
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-500 font-mono mt-3">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Dynamic & Fallback GitHub Projects Grid */}
            <section className="space-y-6">
              <h2 className="text-xs font-mono text-zinc-600 uppercase tracking-[0.25em] flex items-center gap-2">
                <span>[06] Selected Code repositories</span>
                <span className="h-[1px] bg-zinc-900 flex-1"></span>
              </h2>
              <GithubProjects />
            </section>

            {/* ATS Printable Plain document layout */}
            <section className="space-y-6">
              <h2 className="text-xs font-mono text-zinc-600 uppercase tracking-[0.25em] flex items-center gap-2">
                <span>[07] ATS Compliant Document</span>
                <span className="h-[1px] bg-zinc-900 flex-1"></span>
              </h2>
              <p className="text-xs text-zinc-500 leading-relaxed font-mono">
                Visiting recruiters or HR portals requiring a white-background, black-and-text standard formal resume can preview, test, or print the document directly with the widget below.
              </p>
              <AtsResumeView />
            </section>

            {/* Premium, High-Contrast Form */}
            <section id="contact-section" className="space-y-6 pt-6 border-t border-zinc-900/80">
              <h2 className="text-xs font-mono text-zinc-650 uppercase tracking-[0.25em] flex items-center gap-2">
                <span>[08] Instant Encrypted Message Delivery</span>
                <span className="h-[1px] bg-zinc-900 flex-1"></span>
              </h2>

              <form onSubmit={handleContactSubmit} className="space-y-4 bg-zinc-900/20 border border-zinc-900/70 p-6 md:p-8 rounded-2xl">
                
                {formSuccess && (
                  <div className="p-4 bg-emerald-950/30 border border-emerald-900/50 rounded-xl flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-emerald-300">Form Captured successfully</h4>
                      <p className="text-xs text-emerald-400 mt-1">{formSuccess}</p>
                    </div>
                  </div>
                )}

                {formError && (
                  <div className="p-4 bg-rose-950/30 border border-rose-900/50 rounded-xl text-xs text-rose-300 font-sans">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">Your Full Name *</label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      placeholder="client@enterprise.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">Subject Title</label>
                  <input
                    type="text"
                    placeholder="Recruitment inquiry / System Optimization task"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">Your Message Content *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="State your technical specifications or hiring timelines..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all font-sans resize-y min-h-[100px]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full font-display py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all disabled:opacity-40 cursor-pointer shadow-indigo-600/10 shadow-lg flex items-center justify-center gap-2"
                >
                  {formLoading ? 'Transmitting Data packets...' : 'Transmit Encrypted Message'}
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </section>

          </main>

          {/* RIGHT: Monolithic Interactive AI Chatbot Widget (5 Cols, Sticky) */}
          <aside className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono text-zinc-650 uppercase tracking-[0.25em]">Interactive AI Recruit Service</h3>
                <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] font-mono">
                  <Clock className="w-3 h-3 text-indigo-400" />
                  <span>{timeStr}</span>
                </div>
              </div>
              
              <ResumeChatbot 
                onTriggerDownload={triggerResumePrint} 
                selectedSkill={selectedSkillForChat}
              />
            </div>

            {/* Quick Stats Block with Metallic Artistic theme info */}
            <div className="border border-zinc-900 bg-zinc-950/20 p-5 rounded-2xl space-y-4">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs font-mono font-bold uppercase text-zinc-300 tracking-wider">Security & Compliance Grounding</h4>
              </div>
              <p className="text-xs leading-relaxed text-zinc-500 font-sans">
                No telemetry tracking is enabled. Conversations are securely handled and anchored using strict local state parameters. Credentials have been verified in alignment with Austin Oracle SMTS deployment standard rulesets.
              </p>
            </div>

          </aside>

        </div>

        {/* Minimalist Design Footer */}
        <footer className="mt-16 pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-zinc-600 uppercase tracking-widest gap-4 no-print">
          <div>Built with React, Gemini LLM Model Context &amp; Creative Sincerity © 2026</div>
          <div className="flex gap-6">
            <span>Status: Available for Enterprise roles</span>
            <span>Austin, Texas USA</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
