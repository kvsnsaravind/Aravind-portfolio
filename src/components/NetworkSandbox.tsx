/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Database, 
  Settings, 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  RefreshCw, 
  CheckCircle, 
  XOctagon, 
  AlertTriangle,
  Server,
  Network
} from 'lucide-react';

interface Packet {
  id: string;
  source: 'Frontend Subnet' | 'Application Node' | 'Unknown Public IP';
  action: 'READ' | 'WRITE' | 'DELETE' | 'INGEST';
  payload: 'Support Ticket' | 'Security Route' | 'SQL Ingestion' | 'Malicious Override';
  latency: number;
  status: 'PENDING' | 'ALLOWED' | 'BLOCKED' | 'CACHED';
  position: number; // 0 to 100 for animation
}

export default function NetworkSandbox() {
  const [activeTab, setActiveTab] = useState<'zpr' | 'rag'>('zpr');
  const [isPlaying, setIsPlaying] = useState(true);
  
  // ZPR state
  const [zeroTrustPolicy, setZeroTrustPolicy] = useState(true);
  const [redisCaching, setRedisCaching] = useState(true);
  const [blockUntrusted, setBlockUntrusted] = useState(true);
  const [logs, setLogs] = useState<string[]>([
    "System Initialized: Austin OCI-ZPR router active.",
    "Policy loaded: Attribute-based access checking active."
  ]);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [stats, setStats] = useState({
    sent: 0,
    allowed: 0,
    blocked: 0,
    cached: 0,
    latencyAvg: 48
  });

  // RAG state
  const [embeddingsChunkSize, setEmbeddingsChunkSize] = useState<number>(512);
  const [chromaLookup, setChromaLookup] = useState<boolean>(true);
  const [bedrockModel, setBedrockModel] = useState<'claude-v3' | 'llama-3'>('claude-v3');
  const [supportTicketsProcessed, setSupportTicketsProcessed] = useState<number>(12);
  const [automationAccuracy, setAutomationAccuracy] = useState<number>(93);

  // Reference lists for random generation
  const sources: Packet['source'][] = ['Frontend Subnet', 'Application Node', 'Unknown Public IP'];
  const actions: Packet['action'][] = ['READ', 'WRITE', 'DELETE', 'INGEST'];
  const payloads: Packet['payload'][] = ['Support Ticket', 'Security Route', 'SQL Ingestion', 'Malicious Override'];

  // Append logs
  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev.slice(0, 15)]);
  };

  // Generate a random packet
  const createPacket = (): Packet => {
    const src = sources[Math.floor(Math.random() * sources.length)];
    const act = actions[Math.floor(Math.random() * actions.length)];
    const pay = payloads[Math.floor(Math.random() * payloads.length)];
    
    // Calculate initial status
    let status: Packet['status'] = 'PENDING';
    
    return {
      id: Math.random().toString(36).substring(2, 9),
      source: src,
      action: act,
      payload: pay,
      latency: 0,
      status,
      position: 0
    };
  };

  // Trigger manual evaluation
  const triggerManualPacket = () => {
    const fresh = createPacket();
    setPackets(prev => [...prev, fresh]);
    addLog(`Manual packet initiated: ${fresh.source} attempting ${fresh.action} with payload [${fresh.payload}]`);
  };

  // Frame tick animation & packet lifecycle
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      // 1. Randomly spawn package with 20% possibility
      if (Math.random() < 0.25 && packets.length < 8) {
        const fresh = createPacket();
        setPackets(prev => [...prev, fresh]);
      }

      // 2. Advance existing packets
      setPackets(prevPackets => {
        return prevPackets
          .map(p => {
            const nextPosition = p.position + 4;
            
            // At 50% position, the firewall policy decides status!
            if (p.position < 50 && nextPosition >= 50 && p.status === 'PENDING') {
              let nextStatus: Packet['status'] = 'ALLOWED';
              
              if (activeTab === 'zpr') {
                // Rule evaluation
                if (blockUntrusted && p.source === 'Unknown Public IP') {
                  nextStatus = 'BLOCKED';
                  addLog(`⚠️ BLOCK: Unauthorized IP ${p.source} terminated dynamically.`);
                } else if (zeroTrustPolicy && p.payload === 'Malicious Override') {
                  nextStatus = 'BLOCKED';
                  addLog(`❌ ZERO TRUST VIOLATION: Malicious Payload flagged on ${p.source}`);
                } else if (p.action === 'DELETE' && p.source !== 'Application Node') {
                  nextStatus = 'BLOCKED';
                  addLog(`🚫 ACCESS DENIED: Delete action requires higher privilege token.`);
                } else if (redisCaching && p.action === 'READ') {
                  nextStatus = 'CACHED';
                  addLog(`⚡ CACHE HIT: READ request for ${p.payload} served instantly via local memory-grid.`);
                } else {
                  addLog(`✓ PERMITTED: ${p.source} successfully executed ${p.action}`);
                }
              } else {
                // RAG Ticket evaluation
                if (p.payload === 'Malicious Override') {
                  nextStatus = 'BLOCKED';
                  addLog(`🤖 RAG Sanitizer: Screened abusive prompt structure.`);
                } else {
                  nextStatus = 'ALLOWED';
                  addLog(`🤖 AWS Bedrock API: Processing ticket using ${bedrockModel} with ChromaDB chunk indexes.`);
                }
              }

              // Apply stats
              setStats(prev => {
                const isAllow = nextStatus === 'ALLOWED';
                const isBlock = nextStatus === 'BLOCKED';
                const isCache = nextStatus === 'CACHED';
                
                // Set latency appropriately
                let latencyStep = redisCaching && isCache ? 4 : (nextStatus === 'BLOCKED' ? 2 : Math.floor(Math.random() * 50) + 30);
                
                return {
                  sent: prev.sent + 1,
                  allowed: prev.allowed + (isAllow ? 1 : 0),
                  blocked: prev.blocked + (isBlock ? 1 : 0),
                  cached: prev.cached + (isCache ? 1 : 0),
                  latencyAvg: Math.round((prev.latencyAvg * 19 + latencyStep) / 20)
                };
              });

              return { ...p, position: nextPosition, status: nextStatus, latency: redisCaching && nextStatus === 'CACHED' ? 4 : (nextStatus === 'BLOCKED' ? 2 : Math.floor(Math.random() * 35) + 30) };
            }

            return { ...p, position: nextPosition };
          })
          // Keep packets until they cross the line (position 100)
          .filter(p => p.position < 100);
      });

    }, 80);

    return () => clearInterval(interval);
  }, [isPlaying, packets, activeTab, zeroTrustPolicy, redisCaching, blockUntrusted, bedrockModel]);

  const resetStats = () => {
    setPackets([]);
    setStats({
      sent: 0,
      allowed: 0,
      blocked: 0,
      cached: 0,
      latencyAvg: 48
    });
    setLogs([
      "Diagnostics reset completed.",
      "Awaiting next microsecond network transmission flow..."
    ]);
  };

  return (
    <div id="labs-sandbox" className="border border-zinc-900 bg-zinc-950/60 rounded-3xl p-6 md:p-8 space-y-6 select-none relative overflow-hidden">
      {/* Decorative backdrop glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Sandbox Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-950/30 border border-indigo-900/30 text-indigo-400 font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Interactive Dev Labs</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            Cloud Systems Simulation Playground
          </h3>
          <p className="text-xs text-zinc-400">
            Configure system rules below to interact with Aravind's core architecture specialties.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-850 self-start md:self-center shrink-0">
          <button
            onClick={() => { setActiveTab('zpr'); resetStats(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${activeTab === 'zpr' ? 'bg-indigo-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'}`}
          >
            OCI Zero-Trust Router
          </button>
          <button
            onClick={() => { setActiveTab('rag'); resetStats(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${activeTab === 'rag' ? 'bg-indigo-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'}`}
          >
            AWS Bedrock RAG Engine
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Play Control and Custom Toggles (5 Columns) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-zinc-900/50 p-3 rounded-2xl border border-zinc-900">
              <div className="text-xs font-bold text-zinc-300 font-mono tracking-wider flex items-center gap-2">
                <Settings className="w-3.5 h-3.5 text-zinc-400" />
                <span>POLICIES & GRID PARAMETERS</span>
              </div>
              
              <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-lg border border-zinc-850">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`p-1 rounded transition-colors ${isPlaying ? 'bg-indigo-600/20 text-indigo-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                  title={isPlaying ? "Pause Stream" : "Resume Stream"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={resetStats}
                  className="p-1 rounded text-zinc-500 hover:text-zinc-300 transition-colors"
                  title="Reset stream parameters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Tab Specific Rules selectors */}
            {activeTab === 'zpr' ? (
              <div className="space-y-3.5 bg-zinc-900/20 p-4 border border-zinc-900 rounded-2xl text-xs">
                
                {/* Policy Toggle 1 */}
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="space-y-0.5 max-w-[80%]">
                    <div className="font-semibold text-zinc-200 group-hover:text-indigo-400 transition-colors">
                      Zero-Trust Packet Checking
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      VCN isolates and drops packets flagged with malicious payloads.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={zeroTrustPolicy}
                    onChange={(e) => {
                      setZeroTrustPolicy(e.target.checked);
                      addLog(`Zero-Trust Enforcement toggled ${e.target.checked ? 'ON' : 'OFF'}`);
                    }}
                    className="w-4 h-4 rounded text-indigo-600 bg-zinc-950 border-zinc-800 focus:ring-0 focus:ring-offset-0 accent-indigo-500"
                  />
                </label>

                {/* Policy Toggle 2 */}
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="space-y-0.5 max-w-[80%]">
                    <div className="font-semibold text-zinc-200 group-hover:text-indigo-400 transition-colors">
                      Block Untrusted Public Subnets
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      Instantly deny requests arriving from unknown third-party public nodes.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={blockUntrusted}
                    onChange={(e) => {
                      setBlockUntrusted(e.target.checked);
                      addLog(`Untrusted Subnet filter toggled ${e.target.checked ? 'ON' : 'OFF'}`);
                    }}
                    className="w-4 h-4 rounded text-indigo-600 bg-zinc-950 border-zinc-800 focus:ring-0 focus:ring-offset-0 accent-indigo-500"
                  />
                </label>

                {/* Policy Toggle 3 */}
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="space-y-0.5 max-w-[80%]">
                    <div className="font-semibold text-zinc-200 group-hover:text-indigo-400 transition-colors">
                      Redis Microsecond Caching Layer
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      Intercept READ workflows inside memory-grids, slashing latency.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={redisCaching}
                    onChange={(e) => {
                      setRedisCaching(e.target.checked);
                      addLog(`Redis Microsecond caching turned ${e.target.checked ? 'ON' : 'OFF'}. Latency metrics will adjust.`);
                    }}
                    className="w-4 h-4 rounded text-indigo-600 bg-zinc-950 border-zinc-800 focus:ring-0 focus:ring-offset-0 accent-indigo-500"
                  />
                </label>

              </div>
            ) : (
              <div className="space-y-3.5 bg-zinc-900/20 p-4 border border-zinc-900 rounded-2xl text-xs">
                
                {/* Bedrock Selector */}
                <div className="space-y-1.5">
                  <span className="font-semibold text-zinc-300">Target AWS LLM Model</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setBedrockModel('claude-v3');
                        addLog("RAG framework anchored to Anthropic Claude 3 on Amazon Bedrock.");
                      }}
                      className={`py-1.5 rounded-lg border text-center transition-all ${bedrockModel === 'claude-v3' ? 'border-indigo-600 bg-indigo-950/20 text-indigo-300 font-bold' : 'border-zinc-800 bg-zinc-950 text-zinc-500'}`}
                    >
                      Claude v3 Sonnet
                    </button>
                    <button
                      onClick={() => {
                        setBedrockModel('llama-3');
                        addLog("RAG model switched to LLaMA-3 (Meta AI cluster).");
                      }}
                      className={`py-1.5 rounded-lg border text-center transition-all ${bedrockModel === 'llama-3' ? 'border-indigo-600 bg-indigo-950/20 text-indigo-300 font-bold' : 'border-zinc-800 bg-zinc-950 text-zinc-500'}`}
                    >
                      Meta LLaMA 3
                    </button>
                  </div>
                </div>

                {/* Embeddings slider */}
                <div className="space-y-1">
                  <div className="flex justify-between font-semibold text-zinc-300">
                    <span>Embeddings Paragraph Chunks</span>
                    <span className="font-mono text-indigo-400">{embeddingsChunkSize} tokens</span>
                  </div>
                  <input
                    type="range"
                    min="128"
                    max="1024"
                    step="128"
                    value={embeddingsChunkSize}
                    onChange={(e) => {
                      const num = parseInt(e.target.value);
                      setEmbeddingsChunkSize(num);
                      // Accuracy changes with appropriate chunk sizes
                      const rawAcc = num === 512 || num === 768 ? 96 : (num < 512 ? 88 : 91);
                      setAutomationAccuracy(rawAcc);
                      addLog(`Vector chunk sizes shifted to ${num} tokens. Accuracy index is calibrated.`);
                    }}
                    className="w-full h-1 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <p className="text-[10px] text-zinc-500 mt-0.5">
                    Modulating paragraph slicing optimizes retrieval relevance. Let's find your sweet spot!
                  </p>
                </div>

                {/* ChromaDB check */}
                <label className="flex items-center justify-between cursor-pointer group pt-1">
                  <div className="space-y-0.5 max-w-[80%]">
                    <div className="font-semibold text-zinc-200 group-hover:text-indigo-400 transition-colors">
                      ChromaDB Index Grounding
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      Anchors AI replies strictly inside verified resume vectors to prevent hallucinations.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={chromaLookup}
                    onChange={(e) => {
                      setChromaLookup(e.target.checked);
                      addLog(`ChromaDB Vector Lookup toggled ${e.target.checked ? 'ON' : 'OFF'}`);
                    }}
                    className="w-4 h-4 rounded text-indigo-600 bg-zinc-950 border-zinc-800 focus:ring-0 focus:ring-offset-0 accent-indigo-500"
                  />
                </label>

              </div>
            )}
          </div>

          <div className="space-y-3 pt-4">
            <button
              onClick={triggerManualPacket}
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-zinc-900 hover:bg-zinc-850 hover:border-zinc-700 border border-zinc-800 font-mono text-xs uppercase tracking-wider text-slate-100 rounded-xl transition-all font-bold"
            >
              <Zap className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>Send Random Probe Packet</span>
            </button>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-2 gap-4 bg-zinc-900/30 p-4 border border-zinc-900 rounded-2xl font-mono text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wide">AV. LATENCY</span>
                <p className="text-xl font-bold font-mono text-zinc-100 flex items-center gap-1">
                  {stats.latencyAvg} <span className="text-xs text-indigo-400 font-normal">ms</span>
                </p>
              </div>
              
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wide">PACKETS PROCESSED</span>
                <p className="text-xl font-bold font-mono text-zinc-100">
                  {stats.sent}
                </p>
              </div>

              <div className="col-span-2 pt-2 border-t border-zinc-900 flex justify-between text-[11px] text-zinc-400">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Allowed: {stats.allowed}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  Cached: {stats.cached}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  Blocked: {stats.blocked}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Visual Stream Animations Canvas representation (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col gap-4 text-xs">
          
          <div className="bg-zinc-900/20 border border-zinc-900 p-4 rounded-2xl space-y-4 relative flex-1 flex flex-col justify-between min-h-[220px]">
            <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
              <span className="flex items-center gap-1">
                <Server className="w-3.5 h-3.5 inline text-indigo-400" />
                <span>ACTIVE STREAM PIPELINE CHANNEL: {activeTab === 'zpr' ? 'VCN/ZPR-MESH-BETA' : 'AWS-BEDROCK-RAG-FLOW'}</span>
              </span>
              <span>{isPlaying ? '● REAL-TIME STAGED' : '■ STOPPED'}</span>
            </div>

            {/* Simulated nodes and lines */}
            <div className="relative h-28 my-auto w-full">
              {/* Path Lines */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-800 -translate-y-1/2" />
              
              {/* Node Source */}
              <div className="absolute top-1/2 left-[5%] -translate-y-1/2 flex flex-col items-center gap-1.5 z-10">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-lg text-indigo-400">
                  <Network className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase">Gateway</span>
              </div>

              {/* Node Guard */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 z-10">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all border ${activeTab === 'zpr' && zeroTrustPolicy ? 'bg-indigo-950/40 border-indigo-500/50 text-indigo-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase">
                  {activeTab === 'zpr' ? 'ZPR Firewall' : 'Embedding Vector'}
                </span>
              </div>

              {/* Node Terminal */}
              <div className="absolute top-1/2 right-[5%] -translate-y-1/2 flex flex-col items-center gap-1.5 z-10">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-lg text-emerald-400">
                  <Database className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase">Target Node</span>
              </div>

              {/* Animating packets */}
              {packets.map(p => {
                let colorClass = 'bg-white';
                if (p.status === 'ALLOWED') colorClass = 'bg-emerald-500 shadow-emerald-500/50';
                else if (p.status === 'BLOCKED') colorClass = 'bg-rose-500 shadow-rose-500/50';
                else if (p.status === 'CACHED') colorClass = 'bg-indigo-400 shadow-indigo-400/50';

                return (
                  <div
                    key={p.id}
                    className={`absolute w-3.5 h-3.5 rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center font-mono text-[8px] font-bold text-black border border-zinc-950 transition-all shadow-md ${colorClass}`}
                    style={{ left: `${5% + (p.position * 0.9)}%` }}
                    title={`Packet Payload: ${p.payload} from ${p.source}`}
                  >
                    {p.status === 'BLOCKED' ? '!' : ''}
                  </div>
                );
              })}
            </div>

            {/* Explanation of the visual pipeline */}
            <div className="text-[10px] text-zinc-500 bg-zinc-950/60 p-3 rounded-xl border border-zinc-900 leading-normal font-sans">
              {activeTab === 'zpr' ? (
                <span>
                  <strong>Interactive Logic:</strong> Watch random network requests generate. Turn off "Zero-Trust Packet Checking" and "Block Untrusted" toggles to see malicious packet payloads bypass routing checks (turning green instead of getting flagged red). Turn on Caching to instantly see READ operations cached (light blue, 4ms latency).
                </span>
              ) : (
                <span>
                  <strong>RAG Simulator Logic:</strong> Observe ticket ingestion workflows. Turn on "ChromaDB Index Grounding" to map inputs to precise coordinate spaces. Shift embeddings slice slider to tweak accuracy coefficients dynamically.
                </span>
              )}
            </div>
          </div>

          {/* Core Logs Console Panel (Very satisfying to watch) */}
          <div className="bg-zinc-900/40 p-4 border border-zinc-900 rounded-2xl flex flex-col justify-between h-[160px]">
            <div className="font-mono text-[10px] font-bold text-zinc-650 tracking-wider uppercase mb-1.5 flex items-center justify-between">
              <span>SYSTEM EVENT DIARY LOGS</span>
              <RefreshCw className={`w-3.5 h-3.5 text-zinc-650 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
            </div>
            
            <div className="font-mono text-[11px] text-zinc-400 space-y-1 overflow-y-auto flex-1 select-text scrollbar-thin pr-1">
              {logs.length === 0 ? (
                <div className="text-zinc-600 italic">Listening for incoming communication packets...</div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="flex gap-2 items-start leading-relaxed animate-fadeIn">
                    <span className="text-zinc-600 text-[10px] select-none pt-0.5">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                    <span className="flex-1 text-slate-300 font-sans leading-normal">{log}</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
