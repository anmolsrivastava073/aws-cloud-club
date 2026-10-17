import { Instagram, Linkedin, MapPin, Mail, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onReplayIntro?: () => void;
}

export default function Footer({ onReplayIntro }: FooterProps) {
  return (
    <footer className="border-t border-black/10 bg-[#f5f3ef] pt-10 pb-6 text-[#18181b]">
      <div className="max-w-6xl mx-auto px-4">
        {/* TOP */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* LOGO & DESC */}
          <div className="md:col-span-2">
            <Link
              to="/"
              className="flex items-center gap-3 mb-4 group"
            >
              <img
                src="/newlogo.jpg"
                alt="AWS Student Builder Group Logo"
                className="h-8 w-8 rounded-md object-contain border border-black/10 group-hover:scale-105 transition-transform"
                onError={(e: any) => {
                  e.currentTarget.src = '/aws/aws.svg';
                }}
              />
              <span className="text-base font-semibold tracking-[-0.02em] text-[#18181b]">
                AWS
                <span className="text-[#9B5CFF]">
                  {" "}Student Builder Group MUJ
                </span>
              </span>
            </Link>

            <p className="text-sm text-[#666666] leading-relaxed max-w-sm mb-6">
              Empowering students to learn, build, and grow with
              AWS cloud technologies through workshops, collaboration,
              and hands-on learning experiences.
            </p>
            
            <div className="flex flex-col gap-2 text-xs text-[#666666]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#9B5CFF]" />
                Manipal University Jaipur, Rajasthan
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#9B5CFF]" />
                Contact the Core Team via LinkedIn
              </div>
            </div>
          </div>

          {/* QUICK LINKS (Faculty after Team!) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.08em] text-[#18181b] mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              <a href="/" className="text-[#666666] hover:text-[#9B5CFF] transition-colors">
                Home
              </a>
              <a href="#about" className="text-[#666666] hover:text-[#9B5CFF] transition-colors">
                About Us
              </a>
              <a href="#what-we-do" className="text-[#666666] hover:text-[#9B5CFF] transition-colors">
                Initiatives
              </a>
              <a href="#events" className="text-[#666666] hover:text-[#9B5CFF] transition-colors">
                Events
              </a>
              <a href="#members" className="text-[#666666] hover:text-[#9B5CFF] transition-colors">
                Team
              </a>
              <a href="#faculty" className="text-[#666666] hover:text-[#9B5CFF] transition-colors">
                Faculty
              </a>
            </div>
          </div>

          {/* CONNECT & PRELOADER TRIGGER */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.08em] text-[#18181b] mb-4">
              Connect
            </h4>
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.instagram.com/awssbg_muj/"
                target="_blank"
                rel="noopener noreferrer"
                title="Follow on Instagram"
                className="p-2.5 rounded-md border border-black/10 bg-white hover:border-[#9B5CFF]/50 hover:text-[#9B5CFF] hover:-translate-y-[2px] transition-all duration-200 shadow-sm text-[#52525b]"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/aws-cloud-club-muj/posts/"
                target="_blank"
                rel="noopener noreferrer"
                title="Connect on LinkedIn"
                className="p-2.5 rounded-md border border-black/10 bg-white hover:border-[#9B5CFF]/50 hover:text-[#9B5CFF] hover:-translate-y-[2px] transition-all duration-200 shadow-sm text-[#52525b]"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-black/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-[#666666]">
          <p>
            © 2026 AWS Student Builder Group MUJ. All rights reserved.
          </p>
          <p className="mt-3 md:mt-0 font-medium">
            Built with
            <span className="mx-1.5 text-[#9B5CFF] text-sm">
              ♥
            </span>
            by AWS Student Builder Group Team, MUJ
          </p>
        </div>
      </div>
    </footer>
  );
}