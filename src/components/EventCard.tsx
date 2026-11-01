import React from 'react';
import { Calendar, MapPin, ArrowUpRight, Clock, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Event } from '../types/index';
import { motion } from 'motion/react';

/**
 * Optional extras. Add any of these to your Event type in types/index.ts
 * (all optional) and the card will pick them up automatically.
 * Nothing breaks if they are missing.
 */
type EventExtras = {
  type?: string;          // 'Workshop' | 'Hackathon' | 'Study jam'
  speaker?: string;       // 'Name Surname'
  speakerRole?: string;   // 'AWS Community Builder'
  tags?: string[];        // ['Lambda', 'S3']
  attendees?: number;     // shown on past events
};

export type EventStatus = 'upcoming' | 'today' | 'past';

const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

// Exported so LandingPage can split upcoming / past without duplicating logic
export const getEventStatus = (dateStr: string): EventStatus => {
  const today = startOfDay(new Date()).getTime();
  const eventDay = startOfDay(new Date(dateStr)).getTime();
  if (eventDay < today) return 'past';
  if (eventDay === today) return 'today';
  return 'upcoming';
};

const initials = (name: string) =>
  name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

export default function EventCard({
  event,
  index
}: {
  event: Event;
  index: number;
  key?: string;
}) {
  const e = event as Event & EventExtras;
  const status = getEventStatus(event.date);
  const expired = status === 'past';
  const today = status === 'today';

  const parsed = new Date(event.date);
  const validDate = !isNaN(parsed.getTime());
  const day = validDate ? parsed.toLocaleDateString('en-IN', { day: '2-digit' }) : '';
  const month = validDate ? parsed.toLocaleDateString('en-IN', { month: 'short' }) : '';
  const year = validDate ? parsed.getFullYear() : '';

  const daysLeft = validDate
    ? Math.ceil((startOfDay(parsed).getTime() - startOfDay(new Date()).getTime()) / 86_400_000)
    : 0;

  const statusLabel = today
    ? 'Happening today'
    : expired
    ? 'Completed'
    : daysLeft === 1
    ? 'Tomorrow'
    : `In ${daysLeft} days`;

  return (
    <Link to={`/event/${event.id}`} className="block h-full group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.3 }}
        className="h-full"
      >
        {/* Sharp corners kept on purpose, to match the rest of the site */}
        <div
          className={`relative flex flex-col h-full bg-white rounded-none border overflow-hidden transition-all duration-300 ${
            today
              ? 'border-[#9b5cff]/70 shadow-[0_0_0_3px_rgba(155,92,255,0.12),0_16px_44px_rgba(155,92,255,0.18)]'
              : 'border-gray-200 shadow-sm group-hover:border-[#9b5cff]/50 group-hover:shadow-[0_16px_44px_rgba(155,92,255,0.14)]'
          }`}
        >
          {/* Accent bar that grows on hover */}
          <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#9b5cff] via-[#c084fc] to-[#7c3aed] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-30" />

          {/* 1. BANNER */}
          <div className="relative w-full h-56 flex-shrink-0 bg-gradient-to-br from-[#1e1b2e] to-[#120f1d] overflow-hidden">
            <img
              src={event.banner || '/images/default-banner.jpg'}
              alt={event.title}
              loading="lazy"
              className={`w-full h-full object-cover brightness-[0.8] group-hover:brightness-[0.92] transition-all duration-700 group-hover:scale-105 ${
                expired ? 'grayscale-[60%] group-hover:grayscale-0' : ''
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/60 pointer-events-none" />

            {/* Date block */}
            {validDate && (
              <div className="absolute top-4 left-4 flex flex-col items-center justify-center w-14 py-2 bg-white shadow-lg">
                <span className="text-xl font-extrabold leading-none text-gray-900">{day}</span>
                <span className="text-[11px] font-semibold text-[#7c3aed] mt-1 leading-none">{month}</span>
                <span className="text-[9px] text-gray-400 mt-0.5 leading-none">{year}</span>
              </div>
            )}

            {/* Status chip */}
            <div
              className={`absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold ${
                today
                  ? 'bg-[#9b5cff] text-white'
                  : expired
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'bg-[#18181b]/90 text-white backdrop-blur ring-1 ring-white/20'
              }`}
            >
              {today && (
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
              )}
              {statusLabel}
            </div>

            {/* Type tag */}
            {e.type && (
              <span className="absolute bottom-4 left-4 px-2.5 py-1 bg-[#9b5cff] text-white text-[11px] font-semibold">
                {e.type}
              </span>
            )}
          </div>

          {/* 2. DETAILS */}
          <div className="flex-1 p-5 sm:p-6 pb-3">
            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#9b5cff] transition-colors duration-200">
              {event.title}
            </h3>

            <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed min-h-[3rem] mb-4">
              {event.shortDescription}
            </p>

            <div className="flex flex-col gap-2 text-xs text-gray-500 mb-4">
              {!validDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#9b5cff] shrink-0" />
                  <span className="font-medium">{event.date}</span>
                </div>
              )}
              {event.venue && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#9b5cff] shrink-0" />
                  <span className="font-medium">{event.venue}</span>
                </div>
              )}
              {event.time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#9b5cff] shrink-0" />
                  <span className="font-medium">{event.time}</span>
                </div>
              )}
            </div>

            {/* Speaker (only if provided) */}
            {e.speaker && (
              <div className="flex items-center gap-3 p-2.5 bg-[#faf8f5] border border-gray-100 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#9b5cff]/15 border border-[#9b5cff]/30 flex items-center justify-center text-[11px] font-bold text-[#7c3aed] shrink-0">
                  {initials(e.speaker)}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-gray-900 truncate">{e.speaker}</div>
                  {e.speakerRole && (
                    <div className="text-[11px] text-gray-500 truncate">{e.speakerRole}</div>
                  )}
                </div>
                <Mic className="w-3.5 h-3.5 text-[#9b5cff] ml-auto shrink-0" />
              </div>
            )}

            {/* Tags (only if provided) */}
            {e.tags && e.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {e.tags.slice(0, 4).map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-purple-50 text-[#7c3aed] text-[11px] font-medium">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 3. FOOTER / CTA */}
          <div className="mt-auto px-5 sm:px-6 py-4 border-t border-gray-100 bg-white flex items-center justify-between gap-3">
            <span className="text-xs text-gray-400 font-medium">
              {expired && e.attendees ? `${e.attendees} attended` : expired ? 'Event completed' : 'Free for MUJ students'}
            </span>

            <span
              className={`inline-flex items-center gap-1.5 text-sm font-bold transition-colors duration-300 ${
                expired
                  ? 'text-gray-900 group-hover:text-[#9b5cff]'
                  : 'text-[#9b5cff] group-hover:text-[#8040df]'
              }`}
            >
              {expired ? 'View Recap & Photos' : today ? 'Join Today' : 'Register Now'}
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
