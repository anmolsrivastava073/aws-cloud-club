import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, Code, Users, Zap, Cloud, Server, Target, 
  BookOpen, Database, Cpu, Laptop, LayoutTemplate, Globe, 
  CheckCircle2, GitBranch, Shield, Mail, MoveRight, Instagram, Sparkles, Linkedin,
  Award, Layers, Compass, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import EventCard from '../components/EventCard';
import { EVENTS, TEAM_SESSIONS, FACULTY, LINKEDIN_URLS } from '../constants';
import CloudVisual from '../components/CloudVisual';
import HeroAmbientGlow from '../components/HeroAmbientGlow';

// 🛠️ Core Club Pillars
const CLUB_PILLARS = [
  {
    icon: BookOpen,
    step: '01',
    title: 'Hands-on Workshops',
    description: 'Step-by-step guided coding sessions in campus lecture halls. Bring your laptop and learn cloud fundamentals by actually building.',
    highlight: 'Guided exercises & practical learning'
  },
  {
    icon: Users,
    step: '02',
    title: 'Invited AWS Professionals',
    description: 'We host experienced AWS Developer Advocates, Community Builders, and working engineers who share real-world architectures and tech workflows.',
    highlight: 'Direct learning from industry experts'
  },
  {
    icon: Code,
    step: '03',
    title: 'Campus Hackathons',
    description: 'Team up with enthusiastic peers across branches and years. Brainstorm ideas, write code, and build working prototypes together.',
    highlight: 'Collaborative project building'
  },
  {
    icon: Award,
    step: '04',
    title: 'Mentorship & Networking',
    description: 'Connect directly with guest speakers and senior students to get project feedback, clear technical doubts, and get career guidance.',
    highlight: 'Resume reviews & LinkedIn connections'
  }
];

// ✅ Fixed card widths (no calc() percentages that shift while zooming).
// Mobile uses 44% of the row so two cards always fit; larger screens use fixed widths.
const TEAM_CARD_CLASS = 'w-[44%] sm:w-[180px] md:w-[190px] lg:w-[205px] grow-0 shrink-0';

const getInitials = (name: string) =>
  name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const target = e.currentTarget;
  const src = target.src;
  if (src.endsWith('.png')) {
    target.src = src.replace('.png', '.jpg');
  } else if (src.endsWith('.jpg')) {
    target.src = src.replace('.jpg', '.jpeg');
  } else {
    target.style.display = 'none';
  }
};

// 👤 Reusable team member card
type TeamMember = (typeof TEAM_SESSIONS)[number]['members'][number];

function MemberCard({
  member,
  variant = 'standard',
  delay = 0,
  className = '',
}: {
  member: TeamMember;
  variant?: 'hero' | 'standard';
  delay?: number;
  className?: string;
}) {
  const isHero = variant === 'hero';
  const linkedin = LINKEDIN_URLS[member.name];
  const [showLink, setShowLink] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showLink) return;
    const handleOutside = (e: Event) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setShowLink(false);
      }
    };
    document.addEventListener('pointerdown', handleOutside);
    return () => document.removeEventListener('pointerdown', handleOutside);
  }, [showLink]);

  return (
    <motion.div
      ref={cardRef}
      onClick={() => linkedin && setShowLink((v) => !v)}
      onMouseLeave={() => setShowLink(false)}
      initial={{ opacity: 0, y: isHero ? 24 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: isHero ? 0.4 : 0.35, delay }}
      className={`relative group rounded-2xl overflow-hidden bg-[#18181b] transition-all duration-300 ${
        isHero ? 'shadow-lg hover:shadow-2xl' : 'shadow-md hover:shadow-xl'
      } ${className}`}
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-[#18181b]">
        {/* Fallback avatar initials */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1e1b2e] to-[#120f1d] text-center ${isHero ? 'p-4' : 'p-3'}`}>
          <div
            className={`rounded-full bg-[#9b5cff]/20 border border-[#9b5cff]/40 flex items-center justify-center font-bold text-[#b784ff] mb-2 shadow-inner ${
              isHero ? 'w-14 h-14 sm:w-16 sm:h-16 text-lg sm:text-xl' : 'w-10 h-10 sm:w-12 sm:h-12 text-sm sm:text-base'
            }`}
          >
            {getInitials(member.name)}
          </div>
          <span className="text-xs font-semibold text-white/90 truncate max-w-full px-2">{member.name}</span>
        </div>

        <img
          src={member.image}
          alt={member.name}
          className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 z-10 ${
            isHero ? 'transition-transform duration-700' : 'transition-transform duration-500'
          }`}
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-20" />
        
        {/* 🔗 LinkedIn button */}
        {linkedin && (
          <>
          <div
            className={`absolute inset-0 z-[25] pointer-events-none bg-gradient-to-b from-black/30 via-black/60 to-black/30 transition-opacity duration-300 ${
              showLink ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          />
          <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              title={`${member.name} on LinkedIn`}
              className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-white/95 text-[#0A66C2] text-[10px] sm:text-xs font-semibold shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 hover:bg-[#0A66C2] hover:text-white transition-all duration-300 ${
                showLink
                  ? 'opacity-100 scale-100 pointer-events-auto'
                  : 'opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'
              }`}
            >
              <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
          </>
        )}

        {isHero ? (
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 z-30 flex flex-col items-center text-center">
            <h3 className="text-sm sm:text-xl font-bold text-white mb-0.5 drop-shadow-md leading-snug line-clamp-2">
              {member.name}
            </h3>
            <p className="text-[#b784ff] font-semibold text-[10px] sm:text-sm drop-shadow-sm whitespace-nowrap truncate">
              {member.position}
            </p>
          </div>
        ) : (
          <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-4 z-30 flex flex-col items-center text-center">
            <h4 className="text-[11px] sm:text-sm font-bold text-white group-hover:text-[#b784ff] transition-colors mb-0.5 drop-shadow-md leading-snug line-clamp-2">
              {member.name}
            </h4>
            <p className="text-[#b784ff] font-semibold text-[9px] sm:text-xs drop-shadow-sm whitespace-nowrap truncate">
              {member.position}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function LandingPage() {
  const sortedEvents = [...EVENTS].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const [activeSessionId, setActiveSessionId] = useState<string>(TEAM_SESSIONS[0].id);
  
  const activeSession =
    TEAM_SESSIONS.find((s) => s.id === activeSessionId) ?? TEAM_SESSIONS[0];
  
  const MEMBERS = activeSession.members;

  const captain = MEMBERS.find(
    (m) =>
      m.position?.toLowerCase().includes('captain') &&
      !m.position?.toLowerCase().includes('co-captain')
  );
  const coCaptain = MEMBERS.find(
    (m) => m.position?.toLowerCase().includes('co-captain')
  );
  const teamLeads = MEMBERS.filter(
    (m) =>
      m.id !== captain?.id &&
      m.id !== coCaptain?.id &&
      m.position?.toLowerCase().includes('lead') &&
      !m.position?.toLowerCase().includes('co-lead') &&
      !m.position?.toLowerCase().includes('swt')
  );
  const teamCoLeads = MEMBERS.filter(
    (m) =>
      m.id !== captain?.id &&
      m.id !== coCaptain?.id &&
      m.position?.toLowerCase().includes('co-lead') &&
      !m.position?.toLowerCase().includes('swt')
  );
  const swtMembers = MEMBERS.filter(
    (m) =>
      m.id !== captain?.id &&
      m.id !== coCaptain?.id &&
      (m.position?.toLowerCase().includes('swt') ||
        (!teamLeads.some((l) => l.id === m.id) && !teamCoLeads.some((c) => c.id === m.id)))
  );

  return (
    <div className="bg-[#f5f3ef] text-black aws-grid-bg overflow-x-hidden">
      {/* HERO SECTION — in normal flow (no absolute layers), so zoom can never make pieces overlap or drift apart */}
      <section className="relative w-full min-h-[100dvh] border-b border-black/10 overflow-hidden bg-[#f5f3ef] flex flex-col">
        <HeroAmbientGlow />

        {/* CORE: grows to fill the available height and stays centered */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center w-full max-w-7xl mx-auto px-4 sm:px-8 pt-24 pb-6">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-[clamp(11rem,28vw,24rem)] aspect-[16/11] mb-6 mx-auto flex items-center justify-center overflow-visible origin-center group cursor-pointer"
          >
            <div className="absolute inset-0 bg-[#9b5cff]/8 rounded-full blur-xl sm:blur-2xl pointer-events-none group-hover:bg-[#9b5cff]/15 transition-all duration-500" />
            <svg viewBox="0 0 640 500" className="w-full h-full overflow-visible transition-transform duration-300 group-hover:scale-[1.02]" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Cloud Outline */}
              <path d="M124.625519,366.367706 C90.049614,323.323853 113.159302,258.476105 166.787689,247.171188 C174.381729,245.570358 174.381714,245.570358 175.179276,237.827911 C178.830551,202.382675 220.192154,182.180435 250.478439,201.059662 C252.854919,202.541046 255.165329,204.128433 257.736664,205.817825 C259.788757,201.881851 261.597931,198.172379 263.615417,194.579865 C280.509094,164.497345 306.033051,146.140198 339.944366,140.475937 C393.607391,131.512527 444.557404,165.049271 458.904541,216.262772 C461.129272,224.204178 461.859100,232.595398 462.866608,240.829208 C463.198792,243.543945 464.048950,244.879776 466.546234,245.921234 C494.206421,257.456512 511.231476,277.907837 516.430725,307.453430 C520.763489,332.075317 513.782776,353.913086 497.962860,373.050385 C497.294617,373.858734 496.239563,374.347382 494.525024,374.318390 C495.113800,373.331757 495.578766,372.240906 496.309082,371.373444 C531.494324,329.583557 515.994202,268.086517 465.081451,247.862701 C461.944519,246.616653 460.886200,244.909805 460.723694,241.617249 C459.387543,214.544754 449.447723,191.098404 430.281799,171.839783 C378.627167,119.935379 289.817474,137.135651 261.209564,204.502716 C260.577057,205.992172 259.898468,207.462021 258.940887,209.617386 C257.030487,208.314316 255.549530,207.395630 254.166702,206.347473 C227.581207,186.196732 190.805511,197.117828 179.823349,228.597870 C178.308716,232.939499 177.317780,237.715057 177.358414,242.278381 C177.400314,246.983566 175.345520,248.196182 171.390976,248.792679 C157.149292,250.940765 144.719086,257.037476 134.166183,266.787872 C120.255821,279.640381 112.350319,295.447876 110.776390,314.464691 C107.809517,350.311707 129.849503,374.561401 154.477051,386.554077 C173.295471,395.717957 193.005753,401.246185 213.978790,402.049530 C214.893066,402.084564 215.795242,402.436096 217.466431,402.811798 C216.400726,403.614441 215.949707,404.248718 215.528259,404.229614 C182.613403,402.739777 152.613174,393.671204 128.125992,370.406128 C126.925354,369.265442 125.930725,367.907867 124.625519,366.367706 Z" fill="none" stroke="#111111" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
              {/* Amazon Smile */}
              <path d="M118 73.348c-4.432.063-9.664 1.052-13.621 3.832-1.223.883-1.012 2.062.336 1.894 4.508-.547 14.44-1.726 16.21.547 1.77 2.23-1.976 11.62-3.663 15.79-.504 1.26.59 1.769 1.726.8 7.41-6.231 9.348-19.242 7.832-21.137-.757-.925-4.388-1.79-8.82-1.726zM1.63 75.859c-.927.116-1.347 1.236-.368 2.121 16.508 14.902 38.359 23.872 62.613 23.872 17.305 0 37.43-5.43 51.281-15.66 2.273-1.688.297-4.254-2.02-3.204-15.534 6.57-32.421 9.77-47.788 9.77-22.778 0-44.8-6.273-62.653-16.633-.39-.231-.755-.304-1.064-.266z" transform="translate(200, 160) scale(1.75)" fill="#9b5cff" className="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(155,92,255,0.7)]" />
            </svg>
          </motion.div>

          <h1 className="font-bold tracking-tight flex flex-wrap items-center justify-center gap-x-[0.35em] gap-y-1 text-[clamp(1.5rem,5vw,3.75rem)] leading-tight">
            {['AWS', 'STUDENT', 'BUILDER', 'GROUP'].map((word, wIdx) => (
              <span key={wIdx} className="inline-flex items-center flex-nowrap whitespace-nowrap transition-transform duration-200 hover:-translate-y-0.5">
                {word.split('').map((char, cIdx) => (
                  <span key={cIdx} className="inline-block font-bold text-[#111111] hover:text-[#9b5cff] transition-colors duration-150">
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <h2 className="mt-4 font-semibold uppercase flex flex-wrap items-center justify-center gap-x-[0.8em] gap-y-1 text-[clamp(0.65rem,1.4vw,1rem)] tracking-[0.2em] text-center">
            {['MANIPAL', 'UNIVERSITY', 'JAIPUR'].map((word, wIdx) => (
              <span key={wIdx} className="inline-flex items-center flex-nowrap whitespace-nowrap">
                {word.split('').map((char, cIdx) => (
                  <span key={cIdx} className="inline-block font-semibold text-[#9b5cff]">
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h2>

          <div className="mt-6 w-32 sm:w-80 h-[1.5px] bg-gradient-to-r from-transparent via-[#9b5cff]/40 to-transparent" />
        </div>

        {/* BOTTOM CONTENT: in flow, always sits below the core */}
        <div className="relative z-20 w-full flex flex-col items-center px-4 sm:px-8 pb-8 sm:pb-12 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center w-full"
          >
            <p className="text-[#5f5f5f] text-xs sm:text-sm md:text-base max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed text-center px-2">
              A student-led community at Manipal University Jaipur focused on learning,
              building, and growing with cloud technologies through real-world exposure
              and collaboration.
            </p>
            
            <div className="flex flex-col sm:flex-row w-full sm:w-auto justify-center gap-3 sm:gap-4 px-2 sm:px-0">
              <a
                href="#events"
                className="group relative overflow-hidden w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#111111] text-white font-bold text-sm shadow-md transition-all duration-300 hover:shadow-[0_8px_30px_rgba(155,92,255,0.3)] hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2.5"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-25 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />
                <span>Explore Events</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#b784ff]" />
              </a>
              <a
                href="#about"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/80 hover:bg-white text-[#111111] font-semibold text-sm border border-black/10 hover:border-[#9b5cff]/50 shadow-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center backdrop-blur-sm"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-[clamp(3rem,8vw,7rem)] border-b border-black/10">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* LEFT: TEXT */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center text-center lg:text-left"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.05em] leading-[1.05] mb-6 sm:mb-8">
              About
              <br className="hidden lg:block" />
              <span className="text-[#9b5cff] lg:block ml-2 lg:ml-0">
                AWS Student Builder Group
              </span>
            </h2>
            
            <div className="space-y-5 sm:space-y-6 text-[#5f5f5f] text-sm md:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
              <p>
                AWS Student Builder Group at Manipal University Jaipur is a premier student-driven community dedicated to bridging the gap between academic theory and real-world cloud engineering. Our programming revolves entirely around practical execution. We guide members through the complete lifecycle of cloud development, starting from engineering robust backend architectures to deploying highly scalable applications. Instead of relying solely on presentations, we host interactive workshops right on campus. During these sessions, students open their laptops to configure real AWS environments, write deployment scripts, and troubleshoot live infrastructure alongside experienced peers.
              </p>
              <p>
                Beyond the technical skills, the club serves as a collaborative hub for innovation and professional networking. Members frequently team up for intense hackathons, participate in study jams for AWS certifications, and collaborate on ambitious projects. We also regularly invite industry professionals, AWS Developer Advocates, and alumni to share their insights. This direct industry exposure ensures our students develop the exact builder mindset required to excel in the modern tech landscape.
              </p>
            </div>
          </motion.div>

          {/* RIGHT: VISUAL & FEATURES */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-5 sm:gap-6"
          >
            {/* Cloud Visual Container */}
            <div className="rounded-2xl border border-black/10 overflow-hidden bg-white shadow-sm">
              <CloudVisual />
            </div>

            {/* Features Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white border border-black/10 p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col items-center sm:items-start text-center sm:text-left hover:border-[#9b5cff]/40 transition-colors">
                <div className="bg-[#9b5cff]/10 w-9 h-9 rounded-xl flex items-center justify-center mb-3">
                  <Code className="text-[#9b5cff] w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-[#18181b] mb-1.5">Hands-on</h4>
                <p className="text-[11px] sm:text-xs text-[#666666] leading-relaxed">Build & deploy real apps using AWS.</p>
              </div>

              <div className="bg-white border border-black/10 p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col items-center sm:items-start text-center sm:text-left hover:border-[#9b5cff]/40 transition-colors">
                <div className="bg-[#9b5cff]/10 w-9 h-9 rounded-xl flex items-center justify-center mb-3">
                  <Users className="text-[#9b5cff] w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-[#18181b] mb-1.5">Community</h4>
                <p className="text-[11px] sm:text-xs text-[#666666] leading-relaxed">Collaborate with driven peers.</p>
              </div>

              <div className="bg-white border border-black/10 p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col items-center sm:items-start text-center sm:text-left hover:border-[#9b5cff]/40 transition-colors">
                <div className="bg-[#9b5cff]/10 w-9 h-9 rounded-xl flex items-center justify-center mb-3">
                  <Zap className="text-[#9b5cff] w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-[#18181b] mb-1.5">Exposure</h4>
                <p className="text-[11px] sm:text-xs text-[#666666] leading-relaxed">Learn directly from experts.</p>
              </div>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* 🚀 HOW WE LEARN & BUILD */}
      <section id="what-we-do" className="py-12 sm:py-16 border-b border-black/10 bg-white">
        <div id="perks" className="sr-only" />
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.05em] leading-tight sm:leading-none mb-3">
              How We <span className="text-[#9b5cff]">Learn &amp; Build</span>
            </h2>
            <p className="text-[#5f5f5f] text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
              From interactive campus workshops and hackathons to direct sessions with invited AWS professionals.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            {/* Left: The Official MUJ Student Member Pass */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#faf8f5] via-white to-purple-50/40 rounded-2xl border border-black/10 p-5 sm:p-7 flex flex-col justify-between shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#9b5cff]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <div className="flex items-center gap-3 pb-4 mb-5 border-b border-black/10">
                  <img src="/newlogo.jpg" alt="AWS SBG MUJ" className="w-8 h-8 rounded-lg object-contain border border-black/10" />
                  <div>
                    <div className="text-[11px] font-bold text-[#18181b] tracking-wider uppercase">
                      AWS SBG MUJ
                    </div>
                    <div className="text-[10px] text-[#71717a]">
                      Manipal University Jaipur
                    </div>
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#18181b] tracking-tight mb-2">
                  Student Member Pass
                </h3>
                <p className="text-[11px] sm:text-xs text-[#52525b] leading-relaxed mb-6">
                  Open to all enrolled students at Manipal University Jaipur across all years and branches.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2.5 text-[11px] sm:text-xs text-[#18181b]">
                    <CheckCircle2 className="w-4 h-4 text-[#9b5cff] shrink-0 mt-0.5" />
                    <span className="font-medium">Interactive hands-on workshops in campus LHC halls</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[11px] sm:text-xs text-[#18181b]">
                    <CheckCircle2 className="w-4 h-4 text-[#9b5cff] shrink-0 mt-0.5" />
                    <span className="font-medium">Sessions &amp; live demos by invited AWS professionals</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[11px] sm:text-xs text-[#18181b]">
                    <CheckCircle2 className="w-4 h-4 text-[#9b5cff] shrink-0 mt-0.5" />
                    <span className="font-medium">Campus hackathons and collaborative project building</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[11px] sm:text-xs text-[#18181b]">
                    <CheckCircle2 className="w-4 h-4 text-[#9b5cff] shrink-0 mt-0.5" />
                    <span className="font-medium">Direct 1-on-1 Q&amp;A and networking with speakers and mentors</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-black/10 z-10">
                <div className="mb-3 flex items-baseline justify-between">
                  <span className="text-[11px] sm:text-xs font-semibold text-[#71717a]">Membership Fee</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#18181b]">₹0</span>
                </div>
                <a
                  href="#events"
                  className="group relative overflow-hidden w-full py-3.5 px-4 rounded-xl bg-[#111111] text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-300 hover:shadow-[0_8px_30px_rgba(155,92,255,0.3)] hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2.5"
                >
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-25 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />
                  <span className="relative z-10">View Upcoming Events</span>
                  <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#b784ff]" />
                </a>
                <div className="mt-2.5 text-center text-[10px] sm:text-[11px] text-[#71717a] font-medium">
                  All workshops &amp; events are free to attend
                </div>
              </div>
            </div>
            
            {/* Right: 4 Core Club Pillars */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CLUB_PILLARS.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="bg-[#fcfbf9] rounded-2xl border border-black/10 p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:border-[#9b5cff]/50 hover:shadow-md hover:-translate-y-1 group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#9b5cff] group-hover:scale-105 group-hover:bg-[#9b5cff] group-hover:text-white transition-all duration-200">
                          <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <span className="text-[11px] sm:text-xs font-mono font-bold text-[#71717a]">
                          {pillar.step}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-[#18181b] mb-1.5 group-hover:text-[#9b5cff] transition-colors">
                        {pillar.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-[#52525b] leading-relaxed mb-4">
                        {pillar.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-black/5 text-[10px] sm:text-[11px] font-medium text-[#7c3aed]">
                      {pillar.highlight}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="py-12 sm:py-16 border-b border-black/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-6 sm:mb-7 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 text-center sm:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.05em] leading-none mb-2">
                Events
              </h2>
              <p className="text-[#5f5f5f] text-xs sm:text-sm md:text-base">
                Explore our workshops, sessions, and past events.
              </p>
            </motion.div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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

      {/* 👥 1. MEMBERS SECTION */}
      <section id="members" className="py-[clamp(3rem,8vw,7rem)] border-b border-black/10 bg-[#f5f3ef]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-10 text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.05em] leading-none mb-2 sm:mb-3">
              Our <span className="text-[#9b5cff]">Team</span>
            </h2>
            <p className="text-[#5f5f5f] text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
              Meet the passionate builders and student leaders driving the AWS Student Builder Group MUJ.
            </p>
          </motion.div>
          
          <div className="flex justify-center mb-10 sm:mb-16 overflow-x-auto pb-4 sm:pb-0 px-2">
            <div
              role="tablist"
              aria-label="Select team session"
              className="inline-flex items-center gap-1 p-1 rounded-full bg-white border border-black/10 shadow-sm whitespace-nowrap"
            >
              {TEAM_SESSIONS.map((session, idx) => {
                const isActive = session.id === activeSession.id;
                return (
                  <button
                    key={session.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveSessionId(session.id)}
                    className={`relative px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-semibold transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-[#52525b] hover:text-[#18181b]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="team-session-pill"
                        className="absolute inset-0 rounded-full bg-[#18181b]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                      {session.label}
                      {idx === 0 && (
                        <span
                          className={`text-[8px] sm:text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-full ${
                            isActive ? 'bg-[#9b5cff] text-white' : 'bg-purple-50 text-[#7c3aed]'
                          }`}
                        >
                          Current
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSession.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {/* TIER 1 */}
              {(captain || coCaptain) && (
                <div className="mb-10 sm:mb-16">
                  <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-lg mx-auto">
                    {captain && <MemberCard member={captain} variant="hero" />}
                    {coCaptain && <MemberCard member={coCaptain} variant="hero" delay={0.1} />}
                  </div>
                </div>
              )}
              {/* TIER 2 */}
              {(teamLeads.length > 0 || teamCoLeads.length > 0) && (
                <div className="mb-14 sm:mb-20">
                  <div className="text-center mb-8 sm:mb-10">
                    <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-[#111111]">
                      Leads and Co leads
                    </h3>
                  </div>
                  {teamLeads.length > 0 && (
                    <div className="mb-5 sm:mb-6">
                      <div className="flex flex-wrap justify-center gap-3 sm:gap-5 max-w-6xl mx-auto">
                        {teamLeads.map((member, i) => (
                          <MemberCard
                            key={member.id}
                            member={member}
                            delay={(i % 5) * 0.07}
                            className={TEAM_CARD_CLASS}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {teamCoLeads.length > 0 && (
                    <div>
                      <div className="flex flex-wrap justify-center gap-3 sm:gap-5 max-w-6xl mx-auto">
                        {teamCoLeads.map((member, i) => (
                          <MemberCard
                            key={member.id}
                            member={member}
                            delay={(i % 5) * 0.07}
                            className={TEAM_CARD_CLASS}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* TIER 3 */}
              {swtMembers.length > 0 && (
                <div>
                  <div className="text-center mb-8 sm:mb-10">
                    <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-[#111111]">
                      {activeSession.workingTeamLabel}
                    </h3>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3 sm:gap-5 max-w-6xl mx-auto">
                    {swtMembers.map((member, i) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        delay={(i % 5) * 0.07}
                        className={TEAM_CARD_CLASS}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 🎓 2. FACULTY COORDINATOR SECTION */}
      <section id="faculty" className="py-[clamp(3rem,8vw,7rem)] border-b border-black/10 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 sm:mb-14 text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.05em] leading-none mb-3">
              Faculty <span className="text-[#9b5cff]">Coordinators</span>
            </h2>
            <p className="text-[#5f5f5f] text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
              Our esteemed faculty mentors who guide the chapter initiatives and support academic integration at Manipal University Jaipur.
            </p>
          </motion.div>
          
          <div className="flex flex-col items-center md:flex-row flex-wrap justify-center gap-6 md:gap-12 px-2 sm:px-4 max-w-6xl mx-auto">
            {FACULTY.map((faculty, index) => (
              <motion.div 
                key={faculty.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative w-full max-w-[280px] sm:max-w-[310px] aspect-[3/4] rounded-3xl overflow-hidden group shadow-lg shrink-0"
              >
                <img 
                  src={faculty.image} 
                  alt={faculty.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = '/newlogo.jpg';
                  }}
                />
              
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-20" />
                
                <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6 flex flex-col items-center text-center justify-end z-30">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
                    {faculty.name}
                  </h3>
                  <p className="text-[#b784ff] font-semibold text-xs sm:text-sm mb-2 md:mb-0 md:group-hover:mb-2 transition-all duration-300">
                    {faculty.position}
                  </p>
                  
                  <div className="max-h-40 opacity-100 md:max-h-0 md:opacity-0 overflow-hidden md:group-hover:max-h-40 md:group-hover:opacity-100 transition-all duration-500 ease-in-out flex flex-col items-center">
                    <p className="text-gray-300 text-[11px] sm:text-xs mb-3 sm:mb-4 mt-1 sm:mt-2 font-semibold">
                      {faculty.department}
                    </p>
                    
                    <div className="h-0.5 w-12 sm:w-16 bg-[#9b5cff] mb-3 sm:mb-4" />
                    {faculty.email && (
                      <a 
                        href={`mailto:${faculty.email}`} 
                        className="inline-flex w-fit items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {faculty.email}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 COMMUNITY HUB & CONNECT SECTION */}
      <section className="py-14 sm:py-24 border-t border-black/10 bg-[#f5f3ef] text-[#18181b] relative overflow-hidden aws-grid-bg">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15], x: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[250px] sm:h-[380px] bg-[#9B5CFF]/15 blur-[100px] sm:blur-[130px] rounded-full"
          />
        </div>
        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-[-0.05em] leading-[1.05] text-[#18181b] mb-4"
          >
            Ready to Build <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9B5CFF] via-[#C084FC] to-[#7C3AED]">
              with Us?
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#52525b] text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10 sm:mb-12 font-medium"
          >
            Connect with student builders, domain leads, and faculty coordinators at Manipal University Jaipur. Follow our journey, network with leaders, and reserve your seat for upcoming hands-on labs.
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 text-left">
            <motion.a
              href="https://www.instagram.com/awssbg_muj/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-black/10 p-5 sm:p-7 shadow-xs hover:border-[#9B5CFF]/50 hover:shadow-[0_16px_36px_rgba(155,92,255,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#7C3AED] group-hover:scale-110 group-hover:bg-[#9B5CFF] group-hover:text-white transition-all duration-300 shadow-xs mb-4">
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                
                <div className="text-[11px] sm:text-xs font-mono text-[#7C3AED] font-semibold mb-1">
                  @awssbg_muj
                </div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#18181b] group-hover:text-[#7C3AED] transition-colors mb-2">
                  Instagram
                </h3>
                <p className="text-[11px] sm:text-[13px] text-[#52525b] leading-relaxed">
                  Event galleries, speaker reveals, workshop teasers, and real-time stories from Manipal University Jaipur.
                </p>
              </div>
              <div className="mt-5 sm:mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-[11px] sm:text-xs font-bold text-[#18181b] group-hover:text-[#7C3AED] transition-colors">
                <span>Follow on Instagram</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1.5 transition-transform duration-200" />
              </div>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/company/aws-cloud-club-muj/posts/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-black/10 p-5 sm:p-7 shadow-xs hover:border-[#9B5CFF]/50 hover:shadow-[0_16px_36px_rgba(155,92,255,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#7C3AED] group-hover:scale-110 group-hover:bg-[#0A66C2] group-hover:text-white transition-all duration-300 shadow-xs mb-4">
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-[11px] sm:text-xs font-mono text-[#0A66C2] font-semibold mb-1">
                  AWS Cloud Club MUJ
                </div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#18181b] group-hover:text-[#7C3AED] transition-colors mb-2">
                  LinkedIn
                </h3>
                <p className="text-[11px] sm:text-[13px] text-[#52525b] leading-relaxed">
                  Session recaps, professional networking, certification cohorts, and career referrals across the cloud ecosystem.
                </p>
              </div>
              <div className="mt-5 sm:mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-[11px] sm:text-xs font-bold text-[#18181b] group-hover:text-[#7C3AED] transition-colors">
                <span>Connect on LinkedIn</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1.5 transition-transform duration-200" />
              </div>
            </motion.a>
            <motion.a
              href="https://www.meetup.com/aws-cloud-club-at-manipal-university-jaipur/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-black/10 p-5 sm:p-7 shadow-xs hover:border-[#9B5CFF]/50 hover:shadow-[0_16px_36px_rgba(155,92,255,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#7C3AED] group-hover:scale-110 group-hover:bg-[#ED1C40] group-hover:text-white transition-all duration-300 shadow-xs mb-4">
                  <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-[11px] sm:text-xs font-mono text-[#ED1C40] font-semibold mb-1">
                  Official Chapter
                </div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#18181b] group-hover:text-[#7C3AED] transition-colors mb-2">
                  Meetup
                </h3>
                <p className="text-[11px] sm:text-[13px] text-[#52525b] leading-relaxed">
                  The primary registration gateway for all hands-on cloud labs, lab seats, and guest speaker sessions.
                </p>
              </div>
              <div className="mt-5 sm:mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-[11px] sm:text-xs font-bold text-[#18181b] group-hover:text-[#7C3AED] transition-colors">
                <span>RSVP on Meetup</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1.5 transition-transform duration-200" />
              </div>
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="p-4 sm:p-6 rounded-2xl bg-white border border-black/10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5 text-center sm:text-left"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <img
                src="/newlogo.jpg"
                alt="AWS Student Builder Group Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-contain border border-black/10 shadow-xs shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/mujawslogo.png';
                }}
              />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#18181b] mb-0.5">
                  AWS Student Builder Group MUJ
                </h4>
                <p className="text-[10px] sm:text-xs text-[#52525b]">
                  Department of Computer Science &amp; Engineering • Manipal University Jaipur
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0 mt-2 md:mt-0">
              <a
                href="#events"
                className="group relative overflow-hidden w-full md:w-auto px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#111111] text-white font-bold text-[11px] sm:text-sm shadow-md transition-all duration-300 hover:shadow-[0_8px_30px_rgba(155,92,255,0.3)] hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 sm:gap-2.5"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-25 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />
                <span className="relative z-10">View Upcoming Workshops</span>
                <ArrowRight className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#b784ff]" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
