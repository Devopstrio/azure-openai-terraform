import React from 'react';

// Devopstrio Azure OpenAI Terraform
// Executive IaC Foundation Command Center & Platform Engineering Dashboard

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-indigo-500/30">
            {/* Global IaC Platform Header */}
            <header className="border-b border-white/5 bg-black/60 backdrop-blur-3xl sticky top-0 z-50">
                <div className="max-w-screen-2xl mx-auto px-10 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center font-black text-white shadow-[0_0_25px_rgba(79,70,229,0.4)] border border-white/10 relative overflow-hidden">
                            TF
                            <div className="absolute top-0 right-0 w-2 h-2 bg-indigo-400 rounded-full m-1 border border-black shadow-[0_0_50px_10px_rgba(129,140,248,0.5)]"></div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-widest leading-none">OPENAI TERRAFORM FOUNDATION</h1>
                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em] mt-2 italic">Industrialized Infrastructure as Code</p>
                        </div>
                    </div>
                    <nav className="flex gap-12 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                        <a href="#" className="text-indigo-400 border-b-2 border-indigo-500 pb-10 pt-10">Control Plane</a>
                        <a href="#" className="hover:text-white transition-all pt-10 pb-10">Module Registry</a>
                        <a href="#" className="hover:text-white transition-all pt-10 pb-10">Environments</a>
                        <a href="#" className="hover:text-white transition-all pt-10 pb-10">Compliance</a>
                        <a href="#" className="hover:text-white transition-all pt-10 pb-10">FinOps</a>
                    </nav>
                </div>
            </header>

            <main className="max-w-screen-2xl mx-auto px-10 py-12">

                {/* Global IaC Health KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                    {[
                        { label: 'Managed Resources', value: '1,542', status: 'In-Sync', color: 'indigo' },
                        { label: 'Active Environments', value: '8', status: 'Healthy', color: 'emerald' },
                        { label: 'Deployment Success', value: '98.4%', status: 'SLA Target 95%', color: 'emerald' },
                        { label: 'Infrastructure Cost', value: '£42,800', status: 'Managed', color: 'indigo' }
                    ].map((kpi, idx) => (
                        <div key={idx} className="bg-neutral-900/40 p-10 rounded-[2.5rem] border border-white/5 hover:border-indigo-500/40 transition-all shadow-2xl relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/10 transition-all"></div>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">{kpi.label}</span>
                            <div className="text-4xl font-black text-white tracking-tighter mb-4 font-mono">{kpi.value}</div>
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full bg-${kpi.color}-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]`}></div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kpi.status}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Automation Intelligence & Environment Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">

                    {/* Live Deployment Tracker & IaC Feed */}
                    <div className="xl:col-span-2 bg-neutral-900 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h2 className="text-3xl font-black text-white tracking-tight">Active Deployment Operations</h2>
                                <p className="text-slate-400 text-sm mt-2 max-w-lg">Monitoring global Terraform execution cycles, remote state locks, and environment promotion workflows across Azure regions.</p>
                            </div>
                            <div className="flex gap-4">
                                <button className="bg-black hover:bg-neutral-800 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-white/10">
                                    Check for Drift
                                </button>
                                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-900/40">
                                    Trigger New Deployment
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { env: 'Prod-EU-Core', module: 'openai-ha-cluster', status: 'Success', version: 'v3.2.0', time: '12m ago' },
                                { env: 'Dev-Sandbox-04', module: 'vector-search-lite', status: 'Applying', version: 'v1.4.1', time: 'In-Progress' },
                                { env: 'Regulated-UK-A', module: 'zerotrust-baseline', status: 'Success', version: 'v4.0.0', time: '4h ago' },
                                { env: 'Global-DR-Standby', module: 'cross-region-failover', status: 'Ready', version: 'v2.2.0', time: '1d ago' }
                            ].map((row, idx) => (
                                <div key={idx} className="p-8 bg-black/40 rounded-[2rem] border border-white/5 group hover:border-indigo-500/20 transition-all flex justify-between items-center">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center border border-indigo-500/20">
                                            <span className="text-indigo-400 text-xs font-black italic">T</span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-white">{row.env}</div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Module: {row.module}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-12">
                                        <div className="w-32 text-right">
                                            <div className="text-[9px] font-black text-slate-500 uppercase mb-1">Module Version</div>
                                            <div className="text-lg font-black text-white font-mono">{row.version}</div>
                                        </div>
                                        <div className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${row.status === 'Success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-indigo-500/10 text-indigo-400 animate-pulse'}`}>
                                            {row.status}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Module Registry & Registry Stack */}
                    <div className="flex flex-col gap-10">
                        <div className="bg-neutral-900 p-10 rounded-[3rem] border border-white/5 shadow-2xl flex-1 flex flex-col">
                            <h3 className="text-xl font-black text-white uppercase tracking-wider mb-8 border-b border-indigo-500/20 pb-6">Verified Module Catalog</h3>
                            <div className="space-y-8 flex-1">
                                {[
                                    { mod: 'Azure OpenAI Hardened', ver: 'v4.2', usage: '154', color: 'indigo' },
                                    { mod: 'AI Search Hub', ver: 'v2.1', usage: '82', color: 'indigo' },
                                    { mod: 'VNET ZeroTrust', ver: 'v1.8', usage: '210', color: 'indigo' },
                                    { mod: 'KV Manager Service', ver: 'v3.0', usage: '142', color: 'indigo' }
                                ].map((m, i) => (
                                    <div key={i} className="group cursor-pointer">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">{m.mod}</span>
                                            <span className="text-[10px] font-black text-slate-500 font-mono tracking-widest">{m.ver}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full bg-${m.color}-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]`}></div>
                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.usage} Active Deploys</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-10 bg-black hover:bg-neutral-800 text-white text-[11px] font-black py-4 rounded-2xl border border-white/10 uppercase tracking-widest transition-all">
                                Manage Module Registry
                            </button>
                        </div>

                        <div className="bg-indigo-600 p-10 rounded-[3rem] shadow-[0_0_50px_rgba(79,70,229,0.3)] relative overflow-hidden group border border-white/10">
                            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-all"></div>
                            <h4 className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-4 leading-none">IaC Governance Insight</h4>
                            <div className="text-2xl font-black text-white tracking-tight mb-4">Zero Drift Confirmed</div>
                            <p className="text-xs text-white/90 font-black px-6 py-4 rounded-2xl bg-black/20 shadow-xl leading-relaxed">
                                Global production environments matched desired state in last auto-scan (14:00 UTC).
                            </p>
                        </div>
                    </div>

                </div>

                {/* Cognitive Intelligence & Cost Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                    <div className="bg-neutral-900 p-10 rounded-[3.5rem] border border-white/5 shadow-xl relative overflow-hidden">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-3">IaC Deployment Velocity (30d)</h5>
                                <div className="text-3xl font-black text-white font-mono tracking-tighter">1,240 <span className="text-xs font-bold text-emerald-400 ml-1 uppercase tracking-normal">PLANS/MO</span></div>
                            </div>
                            <div className="text-right text-[10px] font-black text-slate-500 uppercase">Automation Stats</div>
                        </div>
                        <div className="flex items-end gap-1.5 h-32 px-2">
                            {[12, 18, 14, 22, 38, 54, 42, 28, 14, 12, 18, 22, 32, 48, 64, 42, 28, 14, 12, 10, 8, 12].map((v, i) => (
                                <div key={i} className="flex-1 bg-indigo-500/20 rounded-t-lg hover:bg-indigo-500 transition-all relative group cursor-pointer" style={{ height: `${v}%` }}>
                                    <div className="absolute -top-10 left-1/2 -ms-4 opacity-0 group-hover:opacity-100 bg-white text-black text-[10px] font-black px-2 py-1 rounded shadow-xl pointer-events-none transition-all">
                                        {v} Jobs
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-neutral-900 p-10 rounded-[3.5rem] border border-white/5 shadow-xl flex flex-col justify-between">
                        <div>
                            <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-10 border-b border-indigo-500/20 pb-4">Compliance Guardrail State</h5>
                            <div className="space-y-6">
                                {[
                                    { rule: 'Mandatory Tagging Compliance', score: '100%', col: 'emerald' },
                                    { rule: 'Private Endpoint Enforce Policy', score: '100%', col: 'emerald' },
                                    { rule: 'Region Residency Restriction', score: '94%', col: 'orange' },
                                    { rule: 'KMS CMK Key Rotation Status', score: '100%', col: 'emerald' }
                                ].map((row, idx) => (
                                    <div key={idx} className="flex justify-between items-center group cursor-pointer border-b border-white/5 pb-4">
                                        <div>
                                            <div className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight mb-1">{row.rule}</div>
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Policy-as-Code Shield</div>
                                        </div>
                                        <div className={`text-[11px] font-black text-${row.col}-400 font-mono`}>{row.score}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="w-full mt-10 bg-white hover:bg-slate-200 text-black text-[11px] font-black py-4 rounded-2xl uppercase tracking-widest transition-all">
                            Generate Quarterly IaC Audit
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
