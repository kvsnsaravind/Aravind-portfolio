/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { resumeData } from './src/data/resumeData';

// Setup file paths for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini SDK client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY is not defined. The AI Chatbot will run in offline/simulated mode.");
}

// Robust fallback responder logic using verified resume details for uninterrupted chatbot functionality
function getOfflineFallbackReply(messages: any[], isQuotaWarning: boolean = false): string {
  const lastMsg = (messages[messages.length - 1]?.text || '').toLowerCase();
  
  let prefix = "";
  if (isQuotaWarning) {
    prefix = "*(Gemini API quota exceeded/rate-limited. Seamlessly transitioned to Aravind's local knowledge engine)*\n\n";
  }

  // Question match patterns based on key resume experiences
  if (
    lastMsg.includes('bedrock') || 
    lastMsg.includes('rag') || 
    lastMsg.includes('amazon') || 
    lastMsg.includes('ticket') || 
    lastMsg.includes('sde') || 
    lastMsg.includes('lambda') ||
    lastMsg.includes('dynamodb') ||
    lastMsg.includes('redis')
  ) {
    return prefix + `### GenAI & AWS Orchestration at Amazon
During his time as an SDE at **Amazon** (10/2022 - 11/2025), Aravind built high-scale microservices and AI automation:
- **Sev-3 Support Automation**: Designed and deployed a GenAI Support Ticket Automation flow using **Python**, **AWS Bedrock RAG**, custom embeddings chunking, and DynamoDB. This automated support workflows, saving **60% manual labor**.
- **Latency Optimization**: Designed high-performance **Redis caching** layers resulting in a **40% latency reduction** for core APIs.
- **Enterprise Scale**: Built distributed backend schedulers utilizing Core Java, Python, AWS Lambda, SQS, and S3, and optimized DynamoDB indices to handle peak production loads.`;
  }
  
  if (
    lastMsg.includes('oracle') || 
    lastMsg.includes('smts') || 
    lastMsg.includes('zero trust') || 
    lastMsg.includes('zpr') || 
    lastMsg.includes('spring boot') || 
    lastMsg.includes('java')
  ) {
    return prefix + `### Core Engineering at Oracle (SMTS role)
Aravind is currently a **Senior Member of Technical Staff (SMTS)** at **Oracle** (since November 2025) in Austin, TX, building cloud-security systems:
- **Zero Trust Packet Routing (ZPR)**: He architects and writes core Java backend services for OCI's Zero Trust network controls using **Core Java 17** and **Spring Boot**.
- **Attribute Access Control**: Implements rigorous attribute-based protection rules directly within Virtual Cloud Networks (VCNs).
- **Security Visualizer**: Developed highly responsive internal dashboard tools utilizing **Angular** and **TypeScript** to render security routes.
- **High-Throughput Ingestion**: Integrates REST API microservices with real-time **Apache Kafka** event pipelines.`;
  }

  if (
    lastMsg.includes('project') || 
    lastMsg.includes('github') || 
    lastMsg.includes('bird') || 
    lastMsg.includes('ngrok') || 
    lastMsg.includes('classification') ||
    lastMsg.includes('solr')
  ) {
    return prefix + `### Highlighted Tech Projects
Aravind has built several advanced production-ready projects in AI and indexing:
1. **AI Assistant Hub on Ngrok**:
   - Built a dual-mode smart agent chatbot using **LangGraph**, **Groq LLaMA 3**, and **Gemini API**.
   - Integrates secure local PDF RAG query pipelines connected with **ChromaDB Vector DB** and support for prompt-to-image workflows.
2. **Bird Species Spectrogram Classifier**:
   - Formulated a Deep CNN model to detect and classify unique bird calls through frequency audio spectrogram images, reaching **93% classification accuracy**.
3. **Multilingual Covid Tweet Search Engine**:
   - Engineered an index search system containing **300K+ stream analyzed COVID-19 tweets** via **Apache Solr**, **Django**, and custom NLP sentiment models, fully deployed on AWS.`;
  }

  if (
    lastMsg.includes('contact') || 
    lastMsg.includes('email') || 
    lastMsg.includes('hire') || 
    lastMsg.includes('phone') || 
    lastMsg.includes('reach') || 
    lastMsg.includes('linkedin') ||
    lastMsg.includes('info')
  ) {
    return prefix + `### Contact Aravind
Would you like to connect with Aravind? Here is his verified contact info:
- ✉️ **Email**: [aravindkollipara123@gmail.com](mailto:aravindkollipara123@gmail.com)
- 📞 **Phone**: [+1 (716) 426-9215](tel:+17164269215)
- 🌐 **Location**: Texas, United States (available to relocate)
- 💼 **LinkedIn**: [linkedin.com/in/aravind-kollipara](https://www.linkedin.com/in/aravind-kollipara)
- 💻 **GitHub**: [github.com/kvsnsaravind](https://github.com/kvsnsaravind)

*You can also send a direct ping via the **Contact Form** at the bottom of the page! It logs directly to his message storage container.*`;
  }

  if (
    lastMsg.includes('resume') || 
    lastMsg.includes('download') || 
    lastMsg.includes('cv') || 
    lastMsg.includes('pdf')
  ) {
    return prefix + `### Download Resume Documents
You can download Aravind's ATS-compliant professional PDF resume instantly:
- Click the **"Download Resume"** option in the top floating navigation header or inside the action sections of this page.
- Direct Email request can be made to [aravindkollipara123@gmail.com](mailto:aravindkollipara123@gmail.com). Let him know you spoke with his AI Recruiter!`;
  }

  if (
    lastMsg.includes('edu') || 
    lastMsg.includes('university') || 
    lastMsg.includes('suny') || 
    lastMsg.includes('buffalo') || 
    lastMsg.includes('srm') ||
    lastMsg.includes('academic') ||
    lastMsg.includes('degree')
  ) {
    return prefix + `### Education & Research
Aravind holds advanced computing degrees from top-tier research institutes:
- **Master of Science (MS) in Computer Science** — **State University of New York (SUNY) at Buffalo** (08/2021 - 08/2022). Focused heavily on Database Systems, Large-scale Distributed Systems, Machine Learning, and NLP.
- **Bachelor of Technology (BTech) with Honors in IT** — **SRMIST**, India (08/2016 - 05/2020). Graded with excellence and focused on core computer engineering principles.`;
  }

  if (
    lastMsg.includes('skill') || 
    lastMsg.includes('technolog') || 
    lastMsg.includes('language') || 
    lastMsg.includes('stack') ||
    lastMsg.includes('tool') ||
    lastMsg.includes('framework')
  ) {
    return prefix + `### Professional Tech Stack
Aravind's development tools and platform skills include:
- **Languages**: Java (Core, Spring, Spring Boot 3.x), Python, TypeScript, SQL, C# (.NET).
- **Cloud & Microservices**: AWS (CDK, Lambda, ECS, SQS, IAM, RDS/S3), Oracle Cloud Infrastructure (OCI Zero Trust & VCN architectures).
- **Data & Middleware**: Apache Kafka real-time pipelines, Apache Solr search nodes, Redis.
- **Databases**: PostgreSQL, DynamoDB, Oracle Database, ChromaDB Vector DB.
- **GenAI / ML**: Bedrock, LangGraph agentics, LangChain, CNN, RAG pipelines.
- **Frontend**: React, Angular, TypeScript, Tailwind CSS, HTML/CSS.`;
  }

  return prefix + `Hi there! I am Aravind's interactive AI Recruiter Assistant. 

Since my active cloud-hosted connection is currently rate-limited on the Google Cloud Free Tier, I have automatically booted my **offline-backup resume knowledge core** to continue giving you 100% accurate, instant insights.

What details can I share with you?
- 🏢 **Work History**: His current SMTS security role at **Oracle** and SDE role achievements at **Amazon**.
- 🛠️ **Expertise & Skills**: Spring Boot, Python scripting, AWS architectures, and caching strategies.
- 🚀 **Projects**: His LangGraph **AI Assistant Hub**, the 93% CNN **Bird classification system**, or Solr search index.
- 🎓 **Education**: MS in Computer Science from SUNY Buffalo.
- ✉️ **Contact**: Direct email (aravindkollipara123@gmail.com) and phone information.

Feel free to ask a question about any of these attributes!`;
}

const app = express();
export { app };

// Middleware for parsing JSON
app.use(express.json());

// Store contact messages in-memory for the demo session
const contactMessages: any[] = [];

// --- API Routes ---

// 1. Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 2. Chatbot endpoint using @google/genai & gemini-3.5-flash
app.post('/api/chat', async (req, res) => {
  const { messages = [] } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages are required and must be an array' });
  }

  // Format current local time and resume context as a powerful system instruction
  const currentLocalTime = new Date().toISOString();
  
  const structuredResumeText = `
SYSTEM INSTRUCTION:
You are "Aravind's Personal AI Recruiter Assistant", an interactive, professional chatbot built right into Venkata Siva Naga Sai Aravind Kollipara's personal portfolio. Your mission is to represent Aravind to potential employers, recruiters, and colleagues in the most professional, accurate, and helpful way possible, based exclusively on his official resume.

CRITICAL INFORMATION ABOUT ARAVIND:
- Full Name: Venkata Siva Naga Sai Aravind Kollipara
- Title: Senior Software Engineer
- Contact: Texas, United States | +1 (716) 426-9215 | aravindkollipara123@gmail.com
- LinkedIn: https://www.linkedin.com/in/aravind-kollipara
- GitHub: https://github.com/kvsnsaravind

BACKGROUND SUMMARY:
Aravind has 5+ years of extensive experience building scalable backend architectures, cloud-native microservices, and automated AI application flows. He works extensively with Java, Python, AWS, and Oracle Cloud Infrastructure (OCI). Recently, he pioneered AI-driven enhancements: LLM-based assistants, RAG pipelines with ChromaDB, and LangGraph-orchestrated agents.

WORK HISTORY & ACHIEVEMENTS:
1. Senior Member of Technical Staff at Oracle (11/2025 - Present) in Austin, TX:
   - Backend architecture for OCI's Zero Trust Packet Routing (ZPR) utilizing Core Java and Spring Boot.
   - Designed attribute-based access control within Virtual Cloud Networks (VCNs).
   - Developed high-performance RESTful APIs and real-time Kafka event-driven pipelines.
   - Built modern internal UI visualization dashboards with Angular and TypeScript.
2. Software Development Engineer (SDE) at Amazon (10/2022 - 11/2025) in Seattle, WA:
   - Scalable scheduling microservices with Java, Python, and AWS Lambda/DynamoDB/RDS/SQS/S3.
   - Designed and built a GenAI Support Ticket automation using Python, Bedrock RAG, embeddings chunking (saving 60% manual labor, automating Sev-3 support).
   - Designed Redis caching resulting in 40% latency reductions.
   - Optimized DynamoDB indexes and drove JDK migrations from Java 8 to Java 17.
3. Application Development Associate at Accenture (01/2021 - 06/2021) in Hyderabad, India:
   - Designed a hotel recommendation ranker on Azure using C#, Python, and GraphQL (achieved +25% recommendation accuracy).
4. Database Developer at BNP Paribas (01/2020 - 12/2020) in Chennai, India:
   - Optimized high-volume relational tables, created interactive Tableau visual dashboards, resulting in 9% uptime boots.

KEY FEATURED PROJECTS:
- "AI Assistant Hub on Ngrok": Built dual-mode interactive chatbot via LangGraph, Groq LLaMA 3, and Gemini enabling prompt-to-image workflows and ChromaDB-driven PDF RAG.
- "Bird Species Classifier neural network": Deep CNN identifying distinct bird call audio spectrograms at 93% accuracy.
- "Multilingual COVID-19 Tweet Search Engine": 300K+ stream analyzer built using Apache Solr, Django, NLP sentiment classifiers, deployed on AWS.

EDUCATION:
- Master of Science (MS) in Computer Science - State University of New York (SUNY) at Buffalo, NY (08/2021 - 08/2022)
- Bachelor of Technology (BTech) in Information Technology - SRMIST, India (08/2016 – 05/2020)

CORE INSTRUCTIONS FOR YOUR TONE & BEHAVIOR:
1. Be professional, cheerful, accurate, humble, and polite.
2. Directly answer recruiter questions regarding Aravind's coding skills, tech stack, previous projects, cloud knowledge, and work history.
3. Do not invent details or exaggerate facts. If a recruiter asks a question about some tool or project not on his resume, reply honestly that Aravind is a fast learner and skilled engineer, but there is no specific mention of that tool in Aravind's primary background records.
4. Keep answers relatively concise and highly readable (use lists, bold text, and neat spacing where appropriate).
5. If the user asks how to contact Aravind or how to download his resume:
   - Helpfully point them to the Download Resume buttons in the top header or chatbot widget.
   - Point them to his contact form right below the portfolio page.
   - Provide his email (aravindkollipara123@gmail.com) and phone (+1 (716) 426-9215).
6. Ground your context in 2026. Aravind is currently working as a Senior Member of Technical Staff at Oracle.
`;

  if (!ai) {
    // Offline fallback if API key is not available
    const replyText = getOfflineFallbackReply(messages, false);
    return res.json({ reply: replyText });
  }

  try {
    // Build simple prompt from conversation list
    const promptParts: string[] = [];
    
    // We pass the last 10 messages for simple context history
    const formattedHistory = messages
      .slice(-10)
      .map((m: any) => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
      .join('\n');
    
    const prompt = `Here is the conversation history so far. Respond to the last message from User as the Assistant. Provide only your response as Aravind's professional AI recruiter assistant:
    
${formattedHistory}

Assistant:`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: structuredResumeText,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I was unable to formulate a response. Please try again.";
    return res.json({ reply });

  } catch (error: any) {
    console.error("Gemini API Error in backend:", error);
    
    // Detect rate-limits or quota limits (usually Status 429) and fall back gracefully
    const isQuotaOrLimit = error && (
      error.status === 429 ||
      error.statusCode === 429 ||
      (error.message && (
        error.message.includes('quota') ||
        error.message.includes('Quota') ||
        error.message.includes('limit') ||
        error.message.includes('Resource Exhausted') ||
        error.message.includes('RESOURCE_EXHAUSTED') ||
        error.message.includes('429')
      ))
    );
    
    // Serve detailed context from our offline local intelligence engine instead of returning 500 error
    const fallbackReply = getOfflineFallbackReply(messages, !!isQuotaOrLimit);
    return res.json({ reply: fallbackReply });
  }
});

// 3. GitHub API Proxy with fallback to local portfolio data
app.get('/api/github/repos', async (req, res) => {
  try {
    const response = await fetch('https://api.github.com/users/kvsnsaravind/repos?sort=updated&per_page=12', {
      headers: {
        'User-Agent': 'Aravind-Portfolio-App'
      }
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }
    
    const repos = await response.json();
    return res.json(repos);
  } catch (error: any) {
    console.warn("GitHub API call failed. Returning empty list or custom fallbacks:", error.message);
    // Return empty array so the client knows to use hardcoded key projects securely
    return res.json([]);
  }
});

// 4. Contact Form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required fields' });
  }

  const newMessage = {
    id: Math.random().toString(36).substring(7),
    name,
    email,
    subject: subject || 'No Subject',
    message,
    timestamp: new Date().toISOString()
  };

  contactMessages.push(newMessage);
  console.log(`[Contact Form Submission] Received message from ${name} (${email}): "${subject}" - "${message}"`);
  
  return res.json({ 
    success: true, 
    message: 'Your message has been captured successfully! Aravind will get in touch with you soon.' 
  });
});

async function startServer() {
  const PORT = 3000;

  // --- Serve Frontend Application ---

  if (typeof process.env.VERCEL === 'undefined' && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
    if (process.env.NODE_ENV !== 'production') {
      // Development Mode: Use Vite dev middleware
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } else {
      // Production Mode: Serve static files from /dist
      const distPath = path.join(__dirname, 'dist');
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }

    // Bind to 0.0.0.0 and PORT 3000 as required by guidelines
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on http://0.0.0.0:${PORT}`);
    });
  }
}

startServer();
