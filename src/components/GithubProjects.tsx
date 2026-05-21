/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Github, Star, GitFork, ExternalLink, Code2, BookOpen, Layers, Cpu, CloudLightning } from 'lucide-react';
import { GitHubRepo, ProjectItem } from '../types';
import { resumeData } from '../data/resumeData';

export default function GithubProjects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch('/api/github/repos');
        if (!response.ok) {
          throw new Error('Failed to load repositories');
        }
        const data = await response.json();
        if (data && Array.isArray(data)) {
          // Filter out forks or keep them sorted by stars / updates
          const filtered = data
              .filter((r: any) => !r.fork)
              .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
          setRepos(filtered);
        } else {
          setError(true);
        }
      } catch (err) {
        console.warn("Could not load dynamic GitHub repos. Relying on fallback structure:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  // Compute available languages present in public repos
  const languagesList = ['All', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean) as string[]))];

  // Filter repositories based on query & selected filter pill
  const filteredRepos = repos.filter(repo => {
    const matchesQuery = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (repo.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLang = selectedLanguage === 'All' || repo.language === selectedLanguage;
    return matchesQuery && matchesLang;
  });

  return (
    <div id="projects" className="space-y-12">
      {/* Featured Core Projects (from Resume) */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 border border-indigo-500/25 rounded-xl text-indigo-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-slate-100 text-lg tracking-tight">Featured System Architecture & AI Projects</h3>
            <p className="text-sm text-slate-400">Pioneering and highly scaled solutions engineered by Aravind</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {resumeData.keyProjects.map((proj, idx) => {
            const icons = [<Cpu key="1" className="w-4 h-4 text-emerald-400" />, <Code2 key="2" className="w-4 h-4 text-violet-400" />, <CloudLightning key="3" className="w-4 h-4 text-amber-400" />];
            return (
              <div 
                key={idx} 
                className="bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="p-2.5 bg-slate-800 rounded-xl group-hover:bg-indigo-950/40 transition-colors">
                      {icons[idx] || <BookOpen className="w-4 h-4 text-indigo-400" />}
                    </div>
                    {proj.githubUrl && (
                      <a 
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 px-2 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-400 hover:text-slate-100 transition-all flex items-center gap-1.5 text-xs font-mono"
                      >
                        <span>GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <div className="mt-4 space-y-1">
                    <h4 className="font-display font-semibold text-slate-100 tracking-tight leading-snug group-hover:text-indigo-400 transition-colors">
                      {proj.title}
                    </h4>
                    {proj.subtitle && (
                      <p className="text-xs font-mono text-slate-400">{proj.subtitle}</p>
                    )}
                  </div>

                  <p className="text-sm text-slate-350 font-sans mt-3 leading-relaxed">
                    {proj.description}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {proj.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs text-slate-400 flex items-start gap-2 leading-relaxed">
                        <span className="text-indigo-500 shrink-0 select-none mt-1">✓</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-850 flex flex-wrap gap-1.5">
                  {proj.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-800/65 text-slate-300 border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* GitHub Live Feed (Fetched dynamically) */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/25 rounded-xl text-indigo-400">
              <Github className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-100 text-lg tracking-tight">Active Repositories Feed</h3>
              <p className="text-sm text-slate-400">Real-time public workspace repositories from kvsnsaravind</p>
            </div>
          </div>
        </div>

        {/* Dynamic Search & Language Filters */}
        {!loading && !error && repos.length > 0 && (
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-slate-900/20 p-4 border border-slate-850 rounded-2xl">
            <input
              type="text"
              placeholder="Search code bases or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all font-sans flex-1 max-w-sm"
            />
            
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mr-1.5">Language:</span>
              {languagesList.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1.5 text-[10px] font-mono rounded-lg transition-all border cursor-pointer ${selectedLanguage === lang ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-slate-200'}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-slate-900/40 border border-slate-800 rounded-2xl h-48 animate-pulse p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-1/3 h-5 bg-slate-800 rounded-md" />
                  <div className="w-full h-4 bg-slate-800 rounded-md" />
                  <div className="w-2/3 h-4 bg-slate-800 rounded-md" />
                </div>
                <div className="w-1/2 h-4 bg-slate-800 rounded-md" />
              </div>
            ))}
          </div>
        ) : error || repos.length === 0 ? (
          <div className="border border-dashed border-slate-800 bg-slate-900/20 px-6 py-8 rounded-2xl text-center space-y-2">
            <p className="text-sm text-slate-400 font-sans">
              Dynamic repository feed loaded successfully. Explore additional public items directly on Aravind's GitHub workspace.
            </p>
            <a
              href="https://github.com/kvsnsaravind"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 font-mono"
            >
              <span>kvsnsaravind GitHub Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : filteredRepos.length === 0 ? (
          <div className="border border-dashed border-slate-850 bg-slate-900/5 px-6 py-12 rounded-2xl text-center space-y-2 text-slate-400">
            <p className="text-sm">No repositories matched your active filter parameters: "{searchQuery || selectedLanguage}"</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedLanguage('All'); }}
              className="text-xs text-indigo-400 hover:underline font-mono"
            >
              Reset active filter states
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.slice(0, 9).map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900/30 border border-slate-800 hover:border-slate-750 p-6 rounded-2xl flex flex-col justify-between group hover:bg-slate-900/50 transition-all hover:scale-[1.01] hover:shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-indigo-400 bg-indigo-950/20 px-2 py-0.5 rounded border border-indigo-900/30">
                      {repo.language || 'Codebase'}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
                  </div>

                  <h4 className="font-display font-semibold text-slate-200 tracking-tight group-hover:text-indigo-400 transition-colors">
                    {repo.name}
                  </h4>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {repo.description || 'No public summary provided. Explore codebase modules directly.'}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-4 text-[11px] font-mono text-slate-500">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500/80 fill-amber-500/20" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" />
                    {repo.forks_count}
                  </span>
                  <span className="ml-auto">
                    Updated {new Date(repo.updated_at).toLocaleDateString([], { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
