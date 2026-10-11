import { useState, useEffect } from 'react';
import { 
  ArrowRight, Code, Users, Zap, Cloud, Server, Target, 
  BookOpen, Database, Terminal, ChevronRight, LayoutTemplate, Globe, 
  CheckCircle2, GitBranch, Shield, Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import EventCard from '../components/EventCard';
import { EVENTS, MEMBERS, FACULTY } from '../constants';
import CloudVisual from '../components/CloudVisual';

// Enhanced Club Workflow Data
const WORKFLOW_STEPS = [
  {
    id: 'learn',
    title: '1. Discover & Learn',
    icon: BookOpen,
    description: 'We break down complex cloud concepts into digestible sessions. Master the fundamentals and prepare for certifications.',
    tools: ['AWS Academy', 'Cloud Practitioner', 'Study Groups'],
    diagram: 'learning'
  },
  {
    id: 'labs',
    title: '2. Interactive Cloud Labs',
    icon: Terminal,
    description: 'Theory meets practice. Dive into the AWS Console and CLI, running guided simulations to provision resources securely.',
    tools: ['AWS CLI', 'CloudShell', 'IAM Security'],
    diagram: 'terminal'
  },
  {
    id: 'build',
    title: '3. Architect & Build',
    icon: LayoutTemplate,
    description: 'Connect the dots. Teams architect real-world solutions—from serverless APIs to AI apps—for campus hackathons.',
    tools: ['Lambda', 'API Gateway', 'DynamoDB'],
    diagram: 'architecture'
  },
  {
    id: 'deploy',
    title: '4. Deploy & Scale',
    icon: Globe,
    description: 'Projects go live. We teach CI/CD pipelines, security best practices, and monitoring to make apps production-ready.',
    tools: ['GitHub Actions', 'Vercel', 'Route 53'],
    diagram: 'deployment'
  }
];

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('Core');
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);
  const categories = ['Core', 'Technical', 'Event Management', 'GDXSM', 'Finance'];

  const sortedEvents = [...EVENTS].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const filteredMembers = MEMBERS.filter(member => member.category.includes(activeTab));

  // Auto-cycle through workflow steps every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWorkflowIndex((prev) => (prev + 1) % WORKFLOW_STEPS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced Educational Diagrams (Optimized for 4-second cycle)
  const renderDiagram = (type: string) => {
    switch(type) {
      case 'learning':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full relative pt-4">
            <div className="flex gap-4 sm:gap-12 relative z-10 w-full max-w-sm justify-between px-4">
              {[
                { icon: Cloud, label: 'Compute' },
                { icon: Database, label: 'Storage' },
                { icon: Shield, label: 'Security' }
              ].map((node, i) => (
                <div key={i} className="flex flex-col items-center relative">
                  <motion.div 
                    initial={{ y: 10, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ delay: i * 0.2 }} 
                    className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md border border-[#9b5cff]/20 z-10"
                  >
                    <node.icon className="w-6 h-6 text-[#9b5cff]" />
                  </motion.div>
                  <motion.span 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: (i * 0.2) + 0.3 }}
                    className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-3 bg-white/80 px-2 py-1 rounded"
                  >
                    {node.label}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Animated Connection Line */}
            <div className="absolute top-[35%] left-[15%] right-[15%] h-0.5 bg-[#9b5cff]/20 -z-0">
              <motion.div 
                className="h-full bg-[#9b5cff]" 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }}
              />
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm border border-[#9b5cff]/20 p-3 rounded-lg text-center shadow-sm">
              <p className="text-xs text-[#52525b] font-medium">
                <span className="text-[#9b5cff] font-bold">Goal:</span> Build a strong foundation before touching code.
              </p>
            </div>
          </div>
        );

      case 'terminal':
        return (
          <div className="w-full h-full flex flex-col gap-3 relative pt-2">
            <div className="w-full flex-grow bg-[#18181b] rounded-lg border border-black/20 p-4 font-mono text-xs flex flex-col shadow-inner">
              <div className="flex gap-1.5 mb-4 border-b border-white/10 pb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="text-gray-300 space-y-2">
                <p><span className="text-green-400">student@muj:~$</span> aws ec2 run-instances</p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>  --image-id ami-0c55b159cbfafe1f0</motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>  --instance-type t2.micro</motion.p>
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ delay: 1 }} className="text-[#9b5cff] mt-2 pt-2 border-t border-white/10">
                  {`{\n  "InstanceId": "i-123456789",\n  "State": "pending"\n}`}
                </motion.div>
              </div>
            </div>

            {/* Translation Box */}
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.5 }} className="bg-white border border-[#9b5cff]/20 p-3 rounded-lg shadow-sm flex gap-3 items-center">
              <div className="bg-green-100 p-1.5 rounded-md shrink-0">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-xs text-[#52525b] leading-tight">
                <strong className="text-[#18181b]">What just happened?</strong><br/>
                We securely launched a virtual server (EC2) in the cloud using simple text commands.
              </p>
            </motion.div>
          </div>
        );

      case 'architecture':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center relative pt-4">
            <div className="flex items-center justify-between w-full max-w-sm relative z-10 px-2">
              
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-black/10 flex items-center justify-center relative">
                  <Terminal className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-[10px] font-semibold text-gray-500">Client</span>
              </div>
              
              {/* Data Packet 1 */}
              <div className="flex-1 h-0.5 bg-gray-200 relative mx-2">
                <motion.div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-[#9b5cff] rounded-full" animate={{ left: ["0%", "100%"] }} transition={{ repeat: Infinity, duration: 1.5 }} />
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white rounded-lg shadow-md border border-[#9b5cff]/40 flex items-center justify-center relative">
                  <Zap className="w-6 h-6 text-[#9b5cff]" />
                </div>
                <span className="text-[10px] font-semibold text-[#9b5cff]">API / Lambda</span>
              </div>

              {/* Data Packet 2 */}
              <div className="flex-1 h-0.5 bg-gray-200 relative mx-2">
                <motion.div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-[#9b5cff] rounded-full" animate={{ left: ["0%", "100%"] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.75 }} />
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-black/10 flex items-center justify-center relative">
                  <Database className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-[10px] font-semibold text-gray-500">Database</span>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm border border-[#9b5cff]/20 p-3 rounded-lg shadow-sm">
              <p className="text-xs text-[#52525b] text-center">
                Visualizing how a user request triggers serverless code to fetch data from the cloud.
              </p>
            </div>
          </div>
        );

      case 'deployment':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center relative">
            <div className="flex items-center gap-6 z-10">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center shadow-lg text-white">
                  <GitBranch className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-gray-600 uppercase">Push Code</span>
              </motion.div>

              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-8 h-0.5 bg-[#9b5cff] border-t-2 border-dashed border-[#9b5cff]" />

              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="w-24 h-24 rounded-full border border-dashed border-[#9b5cff]/40 flex items-center justify-center relative"
              >
                <div className="w-14 h-14 rounded-full bg-white shadow-lg border border-black/10 flex items-center justify-center z-10">
                  <Globe className="w-7 h-7 text-[#9b5cff]" />
                </div>
                <motion.div className="absolute top-0 w-2.5 h-2.5 bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
              </motion.div>
            </div>

            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
              <span className="px-3 py-1.5 bg-green-100 border border-green-200 text-green-700 text-[10px] uppercase tracking-wider rounded-md font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3" /> CI/CD Passed
              </span>
              <span className="px-3 py-1.5 bg-blue-100 border border-blue-200 text-blue-700 text-[10px] uppercase tracking-wider rounded-md font-bold">
                Live Globally
              </span>
            </motion.div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="pt-20 bg-[#f5f3ef] text-black aws-grid-bg">
      {/* HERO SECTION */}
      <section className="py-24 border-b border-black/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9b5cff]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-semibold mb-6 tracking-[-0.06em] leading-[0.92]"> 
              AWS Student <br /> 
              <span className="text-[#9b5cff]"> Builder Group</span>
              <br /> MUJ
            </h1>
            
            <p className="text-[#5f5f5f] text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
              A student-led community at Manipal University Jaipur focused on learning,
              building, and growing with cloud technologies through real-world exposure
              and collaboration.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#events"
                className="aws-button-primary flex items-center gap-2 justify-center"
              >
                Explore Events
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#about"
                className="aws-button-secondary flex items-center justify-center"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 border-b border-black/10">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.05em] leading-[1] mb-8">
              About
              <br />
              <span className="text-[#9b5cff]">
                AWS Student Builder Group MUJ
              </span>
            </h2>

            <p className="text-[#5f5f5f] text-sm md:text-base mb-5 leading-relaxed">
              AWS Student Builder Group MUJ is a student-driven initiative built
              to bridge the gap between theoretical knowledge and real-world cloud
              applications. The club provides a platform where students can actively
              explore AWS technologies, understand how modern systems are built,
              and gain hands-on experience.
            </p>

            <p className="text-[#5f5f5f] text-sm md:text-base mb-5 leading-relaxed">
              We focus on practical learning — from building backend systems to
              deploying scalable applications. Our sessions are designed to ensure
              that members not only understand concepts but also apply them in
              meaningful ways.
            </p>

            <p className="text-[#5f5f5f] text-sm md:text-base mb-10 leading-relaxed">
              Members can expect workshops, collaborative projects, guest sessions,
              and opportunities to work with tools used in the industry. The club
              emphasizes consistency, curiosity, and building real skills over
              passive learning.
            </p>

            {/* FEATURES */}
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="bg-[#9b5cff]/10 p-2 rounded-md">
                  <Code className="text-[#9b5cff] w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">
                    Hands-on Projects
                  </h4>
                  <p className="text-xs text-[#666666]">
                    Build and deploy real applications using AWS
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-[#9b5cff]/10 p-2 rounded-md">
                  <Users className="text-[#9b5cff] w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">
                    Strong Community
                  </h4>
                  <p className="text-xs text-[#666666]">
                    Learn and collaborate with like-minded students
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-[#9b5cff]/10 p-2 rounded-md">
                  <Zap className="text-[#9b5cff] w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">
                    Industry Exposure
                  </h4>
                  <p className="text-xs text-[#666666]">
                    Interact with experts and understand real-world workflows
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* CLOUD VISUAL */}
            <div className="rounded-md border border-black/10 overflow-hidden bg-white shadow-sm">
              <CloudVisual />
            </div>

            {/* IMAGE GRID */}
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[4/3] overflow-hidden rounded-md border border-black/10 bg-white shadow-sm">
                <img
                  src="/images/about1.jpeg"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>

              <div className="aspect-[4/3] overflow-hidden rounded-md border border-black/10 bg-white shadow-sm">
                <img
                  src="/images/about2.jpeg"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INTERACTIVE DIAGRAM DASHBOARD */}
          <div className="bg-[#fcfcfc] border border-black/10 rounded-2xl p-4 md:p-6 mb-16 shadow-[0_8px_30px_rgba(0,0,0,0.04)] grid lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
            
            {/* Left side: Workflow Steps */}
            <div className="lg:col-span-5 flex flex-col gap-3 relative z-10">
              {WORKFLOW_STEPS.map((step, idx) => {
                const isActive = activeWorkflowIndex === idx;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveWorkflowIndex(idx)}
                    className={`flex items-start gap-4 p-4 rounded-xl text-left transition-all duration-300 relative ${
                      isActive 
                        ? 'bg-white shadow-md border border-black/10 transform md:translate-x-2' 
                        : 'hover:bg-black/5 border border-transparent'
                    }`}
                  >
                    {/* Active Indicator Line */}
                    {isActive && (
                      <motion.div layoutId="activeStep" className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-[#9b5cff] rounded-r-md" />
                    )}
                    <div className={`p-2 rounded-lg mt-1 shrink-0 transition-colors ${isActive ? 'bg-[#9b5cff]/10' : 'bg-black/5'}`}>
                      <step.icon className={`w-5 h-5 ${isActive ? 'text-[#9b5cff]' : 'text-gray-500'}`} />
                    </div>
                    <div className="flex-grow">
                      <h3 className={`text-lg font-semibold mb-1 tracking-tight ${isActive ? 'text-[#18181b]' : 'text-gray-600'}`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm leading-relaxed mb-3 ${isActive ? 'text-[#52525b]' : 'text-gray-500'}`}>
                        {step.description}
                      </p>
                      
                      {/* Tech Stack Pills - Only visible when active */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="flex flex-wrap gap-1.5"
                          >
                            {step.tools.map((tool, i) => (
                              <span key={i} className="px-2 py-0.5 bg-[#f5f3ef] border border-black/5 text-gray-600 text-[10px] font-semibold uppercase tracking-wider rounded">
                                {tool}
                              </span>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right side: Dynamic Visual Diagram */}
            <div className="lg:col-span-7 bg-[#f5f3ef] rounded-xl border border-black/10 overflow-hidden relative min-h-[360px]">
              {/* Background styling */}
              <div className="absolute inset-0 bg-[url('/aws/aws.svg')] opacity-[0.03] bg-center bg-no-repeat bg-[length:300px]" />
              
              <div className="p-4 sm:p-8 h-full flex flex-col relative z-10">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#666666] mb-6 hidden sm:block">
                  {WORKFLOW_STEPS[activeWorkflowIndex].title.split('. ')[1]} Canvas
                </h4>
                
                <div className="flex-grow flex items-center justify-center w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeWorkflowIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      {renderDiagram(WORKFLOW_STEPS[activeWorkflowIndex].diagram)}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
      {/* PILLARS GRID */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Cloud Infrastructure', icon: Cloud, desc: 'Master AWS core services like EC2, S3, RDS, and Lambda through hands-on deployment exercises.' },
              { title: 'Modern Architectures', icon: Server, desc: 'Learn to design microservices, serverless APIs, and resilient cloud-native applications.' },
              { title: 'Certifications', icon: BookOpen, desc: 'Get guided study plans, resources, and peer support to achieve AWS Cloud Practitioner and Solutions Architect certifications.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aws-card p-8 group cursor-default"
              >
                <div className="w-12 h-12 rounded-lg bg-[#9b5cff]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-6 h-6 text-[#9b5cff]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 tracking-tight group-hover:text-[#9b5cff] transition-colors">{item.title}</h3>
                <p className="text-[#666666] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="py-28 border-b border-black/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.05em] leading-none mb-3">
                Events
              </h2>
              <p className="text-[#5f5f5f] text-sm md:text-base">
                Explore our workshops, sessions, and past events.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FACULTY SECTION */}
      <section id="faculty" className="py-28 border-b border-black/10 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.05em] leading-none mb-3">
              Faculty <span className="text-[#9b5cff]">Coordinators</span>
            </h2>
            <p className="text-[#5f5f5f] text-sm md:text-base max-w-2xl mx-auto">
              Our guiding pillars who provide continuous support and mentorship to the AWS Student Builder Group.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {FACULTY.map((faculty, index) => (
              <motion.div 
                key={faculty.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="aws-card p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left hover:border-[#9b5cff]/30"
              >
                <div className="w-28 h-28 shrink-0 rounded-full border border-black/10 overflow-hidden bg-[#f5f3ef]">
                  <img 
                    src={faculty.image} 
                    alt={faculty.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full">
                  <h3 className="text-2xl font-semibold tracking-tight text-[#18181b] mb-1">
                    {faculty.name}
                  </h3>
                  <p className="text-[#9b5cff] font-medium text-sm mb-2">
                    {faculty.position}
                  </p>
                  <p className="text-[#666666] text-xs">
                    {faculty.department}
                  </p>
                  
                  {faculty.email && (
                    <div className="mt-4 pt-4 border-t border-black/5">
                      <a 
                        href={`mailto:${faculty.email}`} 
                        className="inline-flex items-center gap-2 text-xs font-medium text-[#666666] hover:text-[#9b5cff] transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        {faculty.email}
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  {/* MEMBERS */}
      <section id="members" className="py-28">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.05em] leading-none mb-3">
              Our Team
            </h2>
            <p className="text-[#5f5f5f] text-sm md:text-base max-w-2xl mx-auto">
              Meet the passionate builders and leaders driving the AWS Student Builder Group MUJ.
            </p>
          </motion.div>

          {/* TABS FOR MEMBER CATEGORIES */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeTab === category
                    ? 'bg-[#9b5cff] text-white shadow-md'
                    : 'bg-white border border-black/10 text-[#666666] hover:border-[#9b5cff]/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FILTERED MEMBERS GRID */}
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredMembers.map((member) => (
              <div 
                key={member.id} 
                className="aws-card p-6 flex flex-col items-center text-center h-full group"
              >
                <div className="w-24 h-24 rounded-full bg-[#f3f4f6] mb-5 overflow-hidden border border-black/10 shadow-inner group-hover:border-[#9b5cff]/30 transition-colors">
                  <img
                    src={member.image || "/newlogo.jpg"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <h3 className="font-semibold text-lg tracking-tight text-[#18181b] mb-1">
                  {member.name}
                </h3>
                
                <p className="text-[#9b5cff] text-sm font-medium">
                  {member.position}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-24 border-t border-black/10 bg-[#111111] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/aws/aws.svg')] opacity-[0.03] bg-center bg-no-repeat bg-[length:600px]" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Target className="w-12 h-12 text-[#9b5cff] mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.05em] mb-6">
            Ready to Build on AWS?
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-10 max-w-2xl mx-auto">
            Join the community, attend our hands-on workshops, and start deploying your ideas to the cloud today. 
            Connect with us on our socials to stay updated!
          </p>
          <a
            href="https://www.linkedin.com/company/aws-cloud-club-muj/posts/"
            target="_blank"
            rel="noopener noreferrer"
            className="aws-button-primary inline-flex items-center gap-2 text-lg px-8 py-4"
          >
            Join Our LinkedIn Community
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

    </div>
  );
}
