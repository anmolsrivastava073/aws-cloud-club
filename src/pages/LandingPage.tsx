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

const TEAM_CARD_CLASS = 'w-full h-auto';

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
            className="relative w-full max-w-sm sm:max-w-md aspect-[16/11] mb-6 mx-auto flex items-center justify-center overflow-visible origin-center group cursor-pointer"
          >
            <div className="absolute inset-0 bg-[#9b5cff]/8 rounded-full blur-xl sm:blur-2xl pointer-events-none group-hover:bg-[#9b5cff]/15 transition-all duration-500" />
            <svg viewBox="0 0 640 500" className="w-full h-full overflow-visible transition-transform duration-300 group-hover:scale-[1.02]" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Cloud Outline */}
              <path d="M124.625519,366.367706 C90.049614,323.323853 113.159302,258.476105 166.787689,247.171188 C174.381729,245.570358 174.381714,245.570358 175.179276,237.827911 C178.830551,202.382675 220.192154,182.180435 250.478439,201.059662 C252.854919,202.541046 255.165329,204.128433 257.736664,205.817825 C259.788757,201.881851 261.597931,198.172379 263.615417,194.579865 C280.509094,164.497345 306.033051,146.140198 339.944366,140.475937 C393.607391,131.512527 444.557404,165.049271 458.904541,216.262772 C461.129272,224.204178 461.859100,232.595398 462.866608,240.829208 C463.198792,243.543945 464.0489
