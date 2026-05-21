/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, FileText, Printer, Clipboard, Check } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function AtsResumeView() {
  const [copied, setCopied] = React.useState(false);

  const handleCopyMarkdown = () => {
    // Generate clean markdown text for developers / recruiters to copy easily
    const md = `
# ${resumeData.name}
**${resumeData.title}**
${resumeData.contact.location} | ${resumeData.contact.phone} | ${resumeData.contact.email}
LinkedIn: ${resumeData.contact.linkedin} | GitHub: ${resumeData.contact.github}

## SUMMARY
${resumeData.summary}

## RELEVANT SKILLS
${resumeData.skills.map(c => `- **${c.category}**: ${c.skills.join(', ')}`).join('\n')}

## PROFESSIONAL EXPERIENCE
${resumeData.experiences.map(exp => `
### ${exp.role} | ${exp.company}
*${exp.location} | ${exp.period}*
${exp.bullets.map(b => `- ${b}`).join('\n')}
`).join('\n')}

## KEY PROJECTS
${resumeData.keyProjects.map(proj => `
### ${proj.title} ${proj.subtitle ? `(${proj.subtitle})` : ''}
*Tags: ${proj.tags.join(', ')}*
- ${proj.description}
${proj.bullets.map(b => `- ${b}`).join('\n')}
`).join('\n')}

## EDUCATION
${resumeData.education.map(edu => `- **${edu.degree}**, ${edu.institution} (${edu.period})`).join('\n')}
`;
    navigator.clipboard.writeText(md.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="resume-viewer" className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Control panel */}
      <div className="no-print bg-slate-950/60 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="font-display font-semibold text-slate-100 text-sm tracking-tight">Official Resume Viewer</h3>
            <p className="text-xs text-slate-400 font-sans">Print as PDF or copy standard ATS markdown</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700/80 text-xs text-slate-200 border border-slate-700 px-3.5 py-2 rounded-lg transition-all cursor-pointer"
            title="Copy as rich ATS Markdown code block"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Clipboard className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied MD!' : 'Copy Markdown'}</span>
          </button>
          
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-xs text-white px-3.5 py-2 rounded-lg transition-all cursor-pointer font-medium shadow-indigo-600/10 shadow-lg"
            title="Launch printing flow to save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print or Save PDF</span>
          </button>
        </div>
      </div>

      {/* Actual readable Resume (highly formatted, mimicking standard A4 layout but themed beautifully for web) */}
      <div className="p-8 md:p-12 bg-white text-slate-900 font-sans leading-relaxed max-w-4xl mx-auto rounded-b-2xl overflow-x-auto">
        <div className="min-w-[650px] space-y-6">
          {/* Header */}
          <div className="text-center border-b pb-4 border-slate-200">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 font-sans uppercase">
              {resumeData.name}
            </h1>
            <p className="text-sm font-semibold tracking-wide text-indigo-600 uppercase mt-1">
              {resumeData.title}
            </p>
            
            {/* Contact row */}
            <div className="flex flex-wrap justify-center items-center gap-y-1 gap-x-4 text-xs text-slate-600 mt-3 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {resumeData.contact.location}
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {resumeData.contact.phone}
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <a href={`mailto:${resumeData.contact.email}`} className="hover:underline text-indigo-600">{resumeData.contact.email}</a>
              </span>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-y-1 gap-x-4 text-[11px] text-slate-600 mt-2 font-mono">
              <span className="flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <a href={resumeData.contact.linkedin} target="_blank" rel="noreferrer noopener" className="hover:underline text-indigo-600">{resumeData.contact.linkedin}</a>
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1">
                <Github className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <a href={resumeData.contact.github} target="_blank" rel="noreferrer noopener" className="hover:underline text-indigo-600">{resumeData.contact.github}</a>
              </span>
            </div>
          </div>

          {/* Summary Section */}
          <section className="space-y-1.5">
            <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase border-b pb-0.5 border-slate-900">
              Summary
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              {resumeData.summary}
            </p>
          </section>

          {/* Education Section */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase border-b pb-0.5 border-slate-900">
              Education
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resumeData.education.map((edu, idx) => (
                <div key={idx} className="text-xs flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                    <p className="text-slate-600">{edu.institution}</p>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 shrink-0 bg-slate-100 px-1.5 py-0.5 rounded">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section className="space-y-3">
            <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase border-b pb-0.5 border-slate-900">
              Experience
            </h2>
            <div className="space-y-4">
              {resumeData.experiences.map((exp, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">
                        {exp.role} <span className="font-normal text-slate-500">|</span> {exp.company}
                      </h3>
                      <p className="text-[10px] text-slate-500 font-mono italic">
                        {exp.location}
                      </p>
                    </div>
                    <span className="font-mono text-[10px] text-indigo-600 bg-indigo-50 font-semibold px-2 py-0.5 rounded-full shrink-0">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="list-disc pl-4 text-[11px] text-slate-700 space-y-1">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase border-b pb-0.5 border-slate-900">
              Skills
            </h2>
            <div className="text-[11px] space-y-1.5">
              {resumeData.skills.map((cat, idx) => (
                <p key={idx} className="text-slate-800">
                  <strong className="text-slate-905">{cat.category}: </strong>
                  <span className="text-slate-600">{cat.skills.join(', ')}</span>
                </p>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section className="space-y-3">
            <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase border-b pb-0.5 border-slate-900">
              Key Projects
            </h2>
            <div className="space-y-3">
              {resumeData.keyProjects.map((proj, idx) => (
                <div key={idx} className="space-y-1">
                  <h3 className="text-xs font-bold text-slate-900">
                    {proj.title} {proj.subtitle && <span className="font-normal text-slate-500"> - {proj.subtitle}</span>}
                  </h3>
                  <p className="text-[11px] text-slate-700 italic">
                    {proj.description}
                  </p>
                  <ul className="list-disc pl-4 text-[11px] text-slate-700 space-y-1">
                    {proj.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
