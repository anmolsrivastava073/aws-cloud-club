import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Terminal, LayoutTemplate, Globe, 
  Cloud, Database, Shield, GitBranch, CheckCircle2, 
  ArrowRight, Zap, Play, Server, RefreshCw, Send
} from 'lucide-react';

export const WORKFLOW_STEPS = [
  {
    id: 'learn',
    title: '1. Discover & Learn',
    icon: BookOpen,
    description: 'Master core cloud fundamentals, compute models, storage classes, and structured roadmaps toward AWS Cloud Practitioner and Solutions Architect certifications.',
    tools: ['AWS Academy', 'Cloud Practitioner CLF-C02', 'Architectural Well-Architected Framework'],
    diagram: 'learning'
  },
  {
    id: 'labs',
    title: '2. Interactive Cloud Labs',
    icon: Terminal,
    description: 'Hands-on keyboard practice. Navigate AWS Console, execute AWS CLI commands, write IAM least-privilege policies, and spin up sandboxed VPC resources safely.',
    tools: ['AWS CLI v2', 'CloudShell', 'IAM Policy Simulator', 'VPC Peering'],
    diagram: 'terminal'
  },
  {
    id: 'build',
    title: '3. Architect & Build',
    icon: LayoutTemplate,
    description: 'Turn theoretical diagrams into working cloud systems. Connect API Gateway to serverless AWS Lambda functions and persist state into Amazon DynamoDB tables.',
    tools: ['Amazon API Gateway', 'AWS Lambda', 'Amazon DynamoDB', 'Amazon EventBridge'],
    diagram: 'architecture'
  },
  {
    id: 'deploy',
    title: '4. Deploy & Scale',
    icon: Globe,
    description: 'Ship to production like modern engineering teams. Automate builds with GitHub Actions CI/CD pipelines, configure CloudFront edge caches, and monitor with CloudWatch.',
    tools: ['GitHub Actions', 'AWS CloudFront', 'Route 53', 'Amazon CloudWatch'],
    diagram: 'deployment'
  }
];

export default function ArchitectureSimulator() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPacketAnimating, setIsPacketAnimating] = useState(false);
  const [pipelineState, setPipelineState] = useState<'idle' | 'running' | 'success'>('idle');

  const triggerPacketFlow = () => {
    setIsPacketAnimating(true);
    setTimeout(() => setIsPacketAnimating(false), 2400);
  };

  const triggerPipeline = () => {
    setPipelineState('running');
    setTimeout(() => setPipelineState('success'), 2000);
  };

  return (
    <div className="bg-[#101826] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl grid lg:grid-cols-12 gap-6 items-stretch">
      {/* LEFT: STEP SELECTOR */}
      <div className="lg:col-span-5 flex flex-col gap-3 z-10">
        {WORKFLOW_STEPS.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`flex items-start gap-4 p-4 rounded-xl text-left transition-all duration-300 relative border ${
                isActive
                  ? 'bg-[#161E2D] border-aws-orange shadow-[0_0_20px_rgba(255,153,0,0.15)] md:translate-x-2'
                  : 'bg-white/5 border-transparent hover:border-white/10 hover:bg-white/[0.08]'
              }`}
            >
              {/* Active Orange Bar */}
              {isActive && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-aws-orange rounded-r-md" />
              )}
              
              <div className={`p-2.5 rounded-lg mt-0.5 shrink-0 transition-colors ${
                isActive ? 'bg-aws-orange text-aws-navy' : 'bg-white/10 text-gray-300'
              }`}>
                <step.icon className="w-5 h-5" />
              </div>

              <div className="flex-grow">
                <h3 className={`text-base font-bold mb-1 tracking-tight flex items-center justify-between ${
                  isActive ? 'text-white' : 'text-gray-300'
                }`}>
                  <span>{step.title}</span>
                  {isActive && <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-aws-orange/20 text-aws-orange">ACTIVE</span>}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-3">
                  {step.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {step.tools.map((tool, i) => (
                    <span
                      key={i}
                      className={`px-2 py-0.5 text-[10px] font-mono font-medium rounded border ${
                        isActive
                          ? 'bg-aws-orange/10 border-aws-orange/30 text-aws-orange'
                          : 'bg-black/30 border-white/5 text-gray-400'
                      }`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* RIGHT: DYNAMIC CANVAS & INTERACTIVE SIMULATOR */}
      <div className="lg:col-span-7 bg-[#0c121d] rounded-xl border border-white/10 overflow-hidden relative min-h-[20rem] h-auto flex flex-col p-6">
        {/* Background Grid */}
        <div className="absolute inset-0 aws-grid-bg opacity-30 pointer-events-none" />

        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-aws-orange" />
            <h4 className="text-xs font-mono uppercase tracking-widest text-gray-300 font-bold">
              Interactive AWS Workflow Simulation
            </h4>
          </div>
          <span className="text-[11px] font-mono text-gray-400">
            Step {activeStep + 1} of 4
          </span>
        </div>

        {/* WORKFLOW CONTENT SWITCHER */}
        <div className="flex-grow flex items-center justify-center relative z-10 py-4">
          <AnimatePresence mode="wait">
            {activeStep === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="w-full flex flex-col items-center justify-center gap-6"
              >
                <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-md">
                  {[
                    { icon: Cloud, label: 'Compute (EC2/Lambda)', desc: 'Elastic compute sizing' },
                    { icon: Database, label: 'Storage (S3/Dynamo)', desc: 'High durability tiers' },
                    { icon: Shield, label: 'Security (IAM/KMS)', desc: 'Zero trust boundary' }
                  ].map((node, i) => (
                    <div key={i} className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-[#161E2D] border border-white/10 hover:border-aws-orange/40 text-center transition-all">
                      <div className="w-12 h-12 rounded-xl bg-aws-orange/15 border border-aws-orange/30 flex items-center justify-center mb-3 text-aws-orange">
                        <node.icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-white mb-1">{node.label}</span>
                      <span className="text-[10px] text-gray-400 font-mono hidden sm:block">{node.desc}</span>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center max-w-sm">
                  <p className="text-xs text-gray-300 font-mono">
                    💡 Foundation pillars covered in every AWS Student Builder induction.
                  </p>
                </div>
              </motion.div>
            )}

            {activeStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="w-full flex flex-col items-center justify-center gap-4"
              >
                <div className="w-full max-w-md bg-[#161E2D] rounded-xl border border-white/10 p-4 font-mono text-xs space-y-2 break-all overflow-x-hidden">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 text-gray-400 text-[11px]">
                    <span>AWS CloudShell Sandbox Session</span>
                    <span className="text-emerald-400 shrink-0">● CONNECTED</span>
                  </div>
                  <p className="text-gray-300"><span className="text-emerald-400">user@cloudshell:~$</span> aws configure</p>
                  <p className="text-gray-400 pl-2">AWS Access Key ID: [****************4X7A]</p>
                  <p className="text-gray-400 pl-2">Default region name: <span className="text-aws-orange">ap-south-1</span></p>
                  <p className="text-gray-300"><span className="text-emerald-400">user@cloudshell:~$</span> aws s3 mb s3://muj-builder-lab-2026</p>
                  <p className="text-emerald-400 pl-2 font-bold">make_bucket: muj-builder-lab-2026</p>
                </div>
                <p className="text-xs text-gray-400 font-mono text-center">
                  Students learn hands-on with live guided CLI exercises.
                </p>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="w-full flex flex-col items-center justify-center gap-6"
              >
                {/* INTERACTIVE SERVERLESS PIPELINE */}
                <div className="flex items-center justify-center gap-2 sm:gap-4 w-full max-w-lg relative flex-wrap sm:flex-nowrap">
                  {/* CLIENT */}
                  <div className="flex flex-col items-center p-3 rounded-xl bg-[#161E2D] border border-white/10 text-center w-24">
                    <Globe className="w-6 h-6 text-cyan-400 mb-1" />
                    <span className="text-[10px] font-mono font-bold text-gray-300">HTTP Client</span>
                  </div>

                  <ArrowRight className={`hidden sm:block w-4 h-4 transition-colors ${isPacketAnimating ? 'text-aws-orange animate-pulse' : 'text-gray-600'}`} />

                  {/* API GATEWAY */}
                  <div className="flex flex-col items-center p-3 rounded-xl bg-[#161E2D] border border-white/10 text-center w-24">
                    <Zap className="w-6 h-6 text-amber-400 mb-1" />
                    <span className="text-[10px] font-mono font-bold text-gray-300">API Gateway</span>
                  </div>

                  <ArrowRight className={`hidden sm:block w-4 h-4 transition-colors ${isPacketAnimating ? 'text-aws-orange animate-pulse' : 'text-gray-600'}`} />

                  {/* LAMBDA */}
                  <div className="flex flex-col items-center p-3 rounded-xl bg-[#161E2D] border border-aws-orange/40 text-center w-24 shadow-[0_0_15px_rgba(255,153,0,0.2)]">
                    <span className="text-xl font-bold text-aws-orange mb-0.5">λ</span>
                    <span className="text-[10px] font-mono font-bold text-white">AWS Lambda</span>
                  </div>

                  <ArrowRight className={`hidden sm:block w-4 h-4 transition-colors ${isPacketAnimating ? 'text-aws-orange animate-pulse' : 'text-gray-600'}`} />

                  {/* DYNAMODB */}
                  <div className="flex flex-col items-center p-3 rounded-xl bg-[#161E2D] border border-white/10 text-center w-24">
                    <Database className="w-6 h-6 text-blue-400 mb-1" />
                    <span className="text-[10px] font-mono font-bold text-gray-300">DynamoDB</span>
                  </div>
                </div>

                {/* INTERACTIVE TRIGGER BUTTON */}
                <button
                  onClick={triggerPacketFlow}
                  disabled={isPacketAnimating}
                  className="px-4 py-2 rounded-lg bg-aws-orange hover:bg-aws-orange-light text-aws-navy font-bold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 w-full sm:w-auto"
                >
                  <Send className="w-3.5 h-3.5 shrink-0" />
                  <span>{isPacketAnimating ? 'Executing Serverless Request...' : 'Click to Simulate Live Request'}</span>
                </button>

                {isPacketAnimating && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono break-all text-center">
                    HTTP 200 OK • Lambda Duration: 42ms • ReadCapacityUnits: 1
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="w-full flex flex-col items-center justify-center gap-6"
              >
                <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-4 sm:gap-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-gray-800 border border-white/10 flex items-center justify-center text-white mb-2">
                      <GitBranch className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-gray-300">git push</span>
                  </div>

                  <ArrowRight className="hidden sm:block w-5 h-5 text-aws-orange" />

                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-aws-orange/15 border border-aws-orange/40 flex items-center justify-center text-aws-orange mb-2">
                      <RefreshCw className={`w-6 h-6 ${pipelineState === 'running' ? 'animate-spin' : ''}`} />
                    </div>
                    <span className="text-xs font-mono font-bold text-gray-300">CI/CD Build</span>
                  </div>

                  <ArrowRight className="hidden sm:block w-5 h-5 text-aws-orange" />

                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-2">
                      <Globe className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-gray-300">Route 53 Edge</span>
                  </div>
                </div>

                <button
                  onClick={triggerPipeline}
                  disabled={pipelineState === 'running'}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/20 transition-all w-full sm:w-auto"
                >
                  <Play className="w-3.5 h-3.5 text-aws-orange shrink-0" />
                  <span>{pipelineState === 'running' ? 'Deploying to CloudFront...' : 'Run Automated Pipeline Test'}</span>
                </button>

                {pipelineState === 'success' && (
                  <div className="flex flex-wrap justify-center gap-2 w-full">
                    <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono rounded flex items-center justify-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 100% Tests Passed
                    </span>
                    <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono rounded font-bold text-center">
                      Global Edge Cache Deployed
                    </span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
