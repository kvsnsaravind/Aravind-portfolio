/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface ProjectItem {
  title: string;
  subtitle?: string;
  description: string;
  bullets: string[];
  githubUrl?: string;
  tags: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

export interface ResumeData {
  name: string;
  title: string;
  contact: {
    location: string;
    phone: string;
    email: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experiences: ExperienceItem[];
  keyProjects: ProjectItem[];
  skills: SkillCategory[];
  education: EducationItem[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}
