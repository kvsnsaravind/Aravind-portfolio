/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RefreshCw, FileDown, MessageSquare, Terminal } from 'lucide-react';
import { ChatMessage } from '../types';

interface ResumeChatbotProps {
  onTriggerDownload: () => void;
  onSkillSelect?: (skill: string) => void;
  selectedSkill?: string;
}

export default function ResumeChatbot({ onTriggerDownload, selectedSkill }: ResumeChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hi! I am Aravind's AI Recruiter Assistant, powered by Gemini. I have complete access to Aravind's verified resume and repository summaries. Ask me anything about his technical achievements, Spring Boot/AWS expertise, or how he can add value to your team!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Tell me about his AWS Bedrock RAG project at Amazon.",
    "What core technologies is he using at Oracle?",
    "How does he optimize database queries?",
    "What is his educational background?",
    "How can I contact Aravind?"
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle selected skill from portfolio
  useEffect(() => {
    if (selectedSkill) {
      handleSendMessage(`Tell me about Aravind's experience with ${selectedSkill}.`);
    }
  }, [selectedSkill]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMessage].map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: chatHistory })
      });

      if (!response.ok) {
        throw new Error('API server returned an error');
      }

      const data = await response.json();
      
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply || "Sorry, I spent too long thinking. Could you please rephrase that question?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: 'system',
        text: "I'm having trouble reaching my neural network. Please check your connection or try again in a moment.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: "Hi! I am Aravind's AI Recruiter Assistant, powered by Gemini. Ask me anything about his technical achievements, work history, or academic research!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div id="ai-assistant" className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[580px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 border border-indigo-500/25 rounded-lg text-indigo-400">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-semibold text-slate-100 text-sm tracking-tight">AI Recruiter Assistant</h3>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Online
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans">Powered by Gemini 3.5 Flash</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={handleClearChat}
            className="p-1 px-2 text-xs font-mono text-slate-400 hover:text-indigo-400 hover:bg-slate-800/60 rounded border border-slate-800 transition-all flex items-center gap-1.5"
            title="Clear Conversation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Messages Panel */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => {
          if (message.sender === 'system') {
            return (
              <div key={message.id} className="mx-auto max-w-md bg-rose-950/20 border border-rose-900/30 rounded-xl p-3.5 text-center text-xs text-rose-300 font-sans">
                {message.text}
              </div>
            );
          }

          const isBot = message.sender === 'bot';
          return (
            <div key={message.id} className={`flex gap-3 max-w-[85%] ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                isBot 
                  ? 'bg-slate-800 border-slate-700 text-indigo-400' 
                  : 'bg-indigo-600 border-indigo-500 text-white'
              }`}>
                {isBot ? <Terminal className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div className="space-y-1">
                <div className={`p-3.5 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${
                  isBot 
                    ? 'bg-slate-800/60 border border-slate-800 text-slate-200' 
                    : 'bg-indigo-950/40 border border-indigo-900/40 text-slate-100'
                }`}>
                  {message.text}
                  
                  {/* Download Action Suggestion in specific Bot Messages */}
                  {isBot && (message.text.includes('download') || message.text.includes('resume')) && (
                    <div className="mt-3 pt-2 border-t border-slate-700/50 flex">
                      <button
                        type="button"
                        onClick={onTriggerDownload}
                        className="inline-flex items-center gap-2 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium border border-indigo-500/30 transition-all cursor-pointer"
                      >
                        <FileDown className="w-3.5 h-3.5" />
                        Download PDF Resume
                      </button>
                    </div>
                  )}
                </div>
                <div className={`text-[10px] text-slate-500 font-mono ${!isBot && 'text-right'}`}>
                  {message.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing Loader */}
        {isLoading && (
          <div className="flex gap-3 max-w-[80%] mr-auto">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center border bg-slate-800 border-slate-700 text-indigo-400">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-800/60 border border-slate-800 p-4 rounded-xl flex items-center gap-1.5">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Panel */}
      <div className="px-6 py-2 border-t border-slate-800/60 bg-slate-900/40 overflow-x-auto whitespace-nowrap flex gap-2 no-scrollbar">
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(q)}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 bg-slate-800/40 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-indigo-300 px-3 py-1.5 rounded-full transition-all shrink-0 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* Input panel */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage(inputValue);
          }}
          disabled={isLoading}
          placeholder="Ask me anything about Aravind..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 disabled:opacity-60"
        />
        <button
          type="button"
          onClick={() => handleSendMessage(inputValue)}
          disabled={!inputValue.trim() || isLoading}
          className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-indigo-600/10 shadow-lg"
          title="Send query"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
