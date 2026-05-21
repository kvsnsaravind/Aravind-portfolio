/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ResumeData } from '../types';

export const resumeData: ResumeData = {
  name: "Venkata Siva Naga Sai Aravind Kollipara",
  title: "Senior Software Engineer",
  contact: {
    location: "Texas, TX",
    phone: "+1 (716) 426-9215",
    email: "aravindkollipara123@gmail.com",
    linkedin: "https://www.linkedin.com/in/aravind-kollipara",
    github: "https://github.com/kvsnsaravind"
  },
  summary: "Software Engineer with 5+ years of experience in scalable backend systems, cloud infrastructure, and data optimization using Java, Python, AWS, and OCI. Recently focused on AI-driven applications, including LLM-based assistants, RAG with ChromaDB, and multi-modal tools using LangGraph, Cohere, and Gemini. Skilled in CI/CD, TDD, and serverless architectures, with a track record of building robust, intelligent solutions and user-friendly interfaces in fast-paced Agile environments.",
  experiences: [
    {
      role: "Senior Member of Technical Staff",
      company: "Oracle",
      location: "Austin, United States of America",
      period: "11/2025 – Present",
      bullets: [
        "Contributed to the back-end architecture of OCI's Zero Trust Packet Routing (ZPR) using Core Java (Java 8+) and Spring Boot microservices, enabling scalable evaluation of packet flows across compute and database services.",
        "Designed and validated attribute-based access control logic for service-to-service communication within Virtual Cloud Networks (VCNs), strengthening tenant isolation and reducing lateral movement risks.",
        "Developed and optimized RESTful APIs for policy enforcement workflows, ensuring secure and efficient communication across distributed services.",
        "Built end-to-end full-stack features using Angular, TypeScript, HTML, and CSS, delivering internal dashboards to visualize policy enforcement and debug network flows.",
        "Integrated Oracle Database with backend services, leveraging advanced SQL and PL/SQL for efficient data access, policy evaluation, and performance tuning.",
        "Implemented event-driven communication using Apache Kafka, enabling real-time processing of network policy events and improving system responsiveness.",
        "Applied AI-driven analysis techniques to detect anomalous traffic patterns and enhance policy validation workflows.",
        "Led region build-outs and service onboarding, ensuring consistent and scalable policy enforcement across deployments.",
        "Collaborated cross-functionally in Agile sprints to troubleshoot policy misconfigurations, improving system reliability, observability, and security posture."
      ]
    },
    {
      role: "Software Development Engineer",
      company: "Amazon",
      location: "Seattle, United States of America",
      period: "10/2022 – 11/2025",
      bullets: [
        "Designed and implemented scalable cloud-based back-end scheduling services using Java and Python, leveraging AWS services (EC2, Lambda, API Gateway, DynamoDB, RDS, S3, SQS, SNS, CloudWatch) to build highly available, event-driven microservices.",
        "Led large-scale system expansion across AWS regions, enabling global availability and fault tolerance while ensuring consistent performance and seamless service onboarding.",
        "Spearheaded load testing and system scaling initiatives, increasing capacity from 500 to 12,000+ agents, reducing API latency by 50%, and maintaining 99.99% uptime through performance tuning and proactive monitoring.",
        "Built a GenAI-powered ticketing system using Python and AWS Bedrock, automating handling of Sev-3 support tickets by implementing RAG (Retrieval-Augmented Generation) over internal documentation, runbooks, and historical tickets.",
        "Developed intelligent pipelines to ingest, chunk, and embed documentation, enabling contextual retrieval and automated ticket summarization, classification, and resolution suggestions, reducing manual effort by ~60%.",
        "Integrated LLM-based workflows with backend services, enabling real-time ticket tracking and faster incident response using Bedrock-hosted foundation models.",
        "Designed and implemented Redis caching (AWS ElastiCache) for frequently accessed scheduling data, reducing response times and improving throughput for high-concurrency workloads.",
        "Engineered and optimized high-performance REST APIs, achieving 40% latency reduction, and contributed to React and TypeScript front-end integration within a microservices architecture.",
        "Developed a Backfilling system to restore missing shift data in the data lake by reprocessing impacted records, ensuring data integrity, consistency, and fault recovery in distributed systems.",
        "Led the development of the Shift Exchange feature, enabling dynamic shift swaps between agents, reducing manual intervention by 85% and improving operational efficiency.",
        "Contributed to the Localization project, enabling region-specific configurations, time zones, and compliance requirements to support global users.",
        "Optimized DynamoDB and RDS performance using advanced indexing strategies (GSI, LSI) and efficient partition key design, significantly improving query performance at scale.",
        "Drove JDK migration (Java 8 → Java 17), improving application performance, security, and maintainability with modern language features.",
        "Led AWS CDK migration (v1 → v2), enhancing infrastructure-as-code practices, reducing deployment complexity, and improving developer productivity.",
        "Built and maintained CI/CD pipelines using Jenkins and AWS tools, enabling faster, reliable, and automated deployments."
      ]
    },
    {
      role: "Application Development Associate",
      company: "Accenture",
      location: "Hyderabad, India",
      period: "01/2021 – 06/2021",
      bullets: [
        "Developed a scalable hotel recommendation system using C#, Python, and GraphQL on Microsoft Azure, integrating factors like ratings, awards, proximity, and user preferences, improving recommendation accuracy by 25%.",
        "Designed and implemented a ranking algorithm combining weighted scoring and user behavior signals, enabling personalized and context-aware hotel suggestions.",
        "Built real-time data pipelines using Azure services to ingest and update hotel data dynamically, ensuring up-to-date recommendations and improved system responsiveness.",
        "Implemented personalization features and A/B testing strategies, collaborating with stakeholders to refine recommendation logic and enhance user experience.",
        "Improved overall platform performance and reliability by developing automated test cases and optimizing backend APIs, resulting in a 30% increase in user satisfaction and a 20% rise in booking rates."
      ]
    },
    {
      role: "Database Developer",
      company: "BNP Paribas",
      location: "Chennai, India",
      period: "01/2020 – 12/2020",
      bullets: [
        "Resolved data processing issues, optimized SQL queries and database schema for better performance and scalability which resulted in improving system uptime by 9%. Tested and developed scalable back-end solutions to support a larger number of agents.",
        "Redesigned and normalized database schemas, enhancing scalability, data integrity, and query efficiency for high-volume transactional systems.",
        "Developed and tested scalable backend solutions, enabling the system to support a growing number of agents while maintaining stability and performance.",
        "Implemented performance tuning techniques including indexing, query optimization, and execution plan analysis, significantly reducing query response times.",
        "Built interactive Tableau dashboards to visualize sales and compensation data, improving reporting efficiency by 20% and enabling better business decision-making."
      ]
    }
  ],
  keyProjects: [
    {
      title: "AI Assistant Hub on Ngrok",
      subtitle: "Multi-modal ChatBot with Image Generation",
      description: "A comprehensive dual-mode chatbot workspace featuring LangGraph reasoning, Groq model execution, and PDF RAG workflows.",
      bullets: [
        "Built a dual-mode AI assistant using LangGraph, Groq LLaMA 3, and Google Gemini, enabling real-time text-based conversation and prompt-to-image generation with tool-based reasoning via Tavily Search.",
        "Designed a Streamlit interface with ChromaDB-based RAG for PDF Q&A, multimodal output, and Ngrok integration for public domain access."
      ],
      githubUrl: "https://github.com/kvsnsaravind",
      tags: ["LangGraph", "ChromaDB", "LLaMA 3", "Gemini", "RAG", "Streamlit", "Tavily Search"]
    },
    {
      title: "Neural Networks for Bird Species Classification",
      description: "A deep learning acoustic recognition model capable of categorizing distinct bird calls with a signal processing pipeline.",
      bullets: [
        "Worked on a Deep Learning project using convolutional Neural Networks (CNN) Methodology for bird species identification, achieving 90% accuracy.",
        "Preprocessed audio data through Clustering, Re-Sampling, segment identification, and spectrogram computation to improve database quality.",
        "Leveraged dropout layers in the model design to prevent over-fitting, enhancing overall model performance to 93%."
      ],
      githubUrl: "https://github.com/kvsnsaravind",
      tags: ["Deep Learning", "CNN", "Audio DSP", "Spectrograms", "Clustering", "Python"]
    },
    {
      title: "Multilingual COVID-19 Tweet Search Engine",
      subtitle: "Apache Solr, Django, AWS",
      description: "An advanced multilingual research index designed to search, analyze, and map global Twitter public sentiments during the pandemic.",
      bullets: [
        "Developed a scalable search engine processing 300K+ multilingual COVID-19 tweets, implementing language detection, tokenization, topic classification, and sentiment analysis for real-time insights.",
        "Built high-performance indexing and querying using Apache Solr, enabling fast filtering by language, topic, and sentiment across large datasets.",
        "Deployed a Django-based web application on AWS, delivering an interactive platform for analyzing global public sentiment and trending discussions."
      ],
      githubUrl: "https://github.com/kvsnsaravind",
      tags: ["Apache Solr", "Django", "AWS", "NLP", "Sentiment Analysis", "Python"]
    }
  ],
  skills: [
    {
      category: "Programming Languages",
      skills: ["Java", "Python", "JavaScript", "TypeScript", "Golang", "C++", "C#", "SQL"]
    },
    {
      category: "Web & Frontend",
      skills: ["React.js", "Angular", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"]
    },
    {
      category: "Back-end & Frameworks",
      skills: ["Spring Boot", "Django", "Node.js (Express)", "GraphQL", "REST APIs", "Flask"]
    },
    {
      category: "Cloud, Database & DevOps",
      skills: [
        "AWS (EC2, ECS, EKS, Lambda, S3, DynamoDB, RDS, RedShift, API Gateway, CloudWatch, SQS, SNS, EventBridge, ElastiCache, IAM, VPC, CDK)",
        "Azure", "OCI", "Oracle DB", "MySQL", "PostgreSQL", "MongoDB", "Redis", "Kafka", "Docker", "Kubernetes", "CI/CD (Jenkins, GitHub Actions)"
      ]
    },
    {
      category: "AI / GenAI & Tools",
      skills: ["LLMs", "RAG", "LangChain", "LangGraph", "ChromaDB", "Cohere", "OpenAI API", "Amazon Q", "LLaMA", "Gemini", "LangSmith", "Groq"]
    },
    {
      category: "Tools & Collaboration",
      skills: ["Git", "JIRA", "Confluence", "Grafana", "Tableau", "Ngrok", "Linux"]
    }
  ],
  education: [
    {
      degree: "Master of Science in Computer Science",
      institution: "State University of New York at Buffalo, NY",
      period: "08/2021 – 08/2022"
    },
    {
      degree: "Bachelor of Technology in Information Technology",
      institution: "SRMIST, India",
      period: "08/2016 – 05/2020"
    }
  ]
};
