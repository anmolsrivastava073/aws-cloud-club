import React from 'react';
import { Calendar, MapPin, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Event } from '../types/index';
import { motion } from 'motion/react';

export default function EventCard({
  event,
  index
}: {
  event: Event;
  index: number;
  key?: string;
}) {
  const isEventExpired = (eventDate: string) => {
    const today = new Date();
    const eventD = new Date(eventDate);
    today.setHours(0, 0, 0, 0);
    eventD.setHours(0, 0, 0, 0);
    return eventD < today;
  };

  const expired = isEventExpired(event.date);

  return (
    <Link
      to={`/event/${event.id}`}
      className="block h-full group"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.3 }}
        className="h-full"
      >
        {/* CARD CONTAINER - 0% Rounded Corners */}
        <div className="flex flex-col h-full bg-white rounded-none border border-gray-200 overflow-hidden shadow-sm group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
          
          {/* FADED SECTION (Image & Text details faded to 50% for past events, full on hover) */}
          <div className={`transition-opacity duration-300 flex-1 ${expired ? 'opacity-50 group-hover:opacity-100' : 'opacity-100'}`}>
            
            {/* 1. VISUAL SECTION */}
            <div className="relative w-full h-56 flex-shrink-0 bg-gray-100 overflow-hidden border-b border-gray-200">
              <img
                src={event.banner || '/images/default-banner.jpg'}
                alt={event.title}
                className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* 2. TEXT SECTION */}
            <div className="p-5 sm:p-6 pb-2">
              
              {/* Top Row: Date aligned to the right */}
              <div className="flex items-center justify-end mb-3">
                <div className="flex items-center gap-1.5 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-[#9b5cff]" />
                  {event.date}
                </div>
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#9b5cff] transition-colors duration-200">
                {event.title}
              </h3>

              {/* DESCRIPTION - Height unconstrained to prevent zoom truncation */}
              <div className="min-h-[3rem] h-auto mb-4">
                <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                  {event.shortDescription}
                </p>
              </div>

              {/* META INFO (Venue & Time) */}
              <div className="flex flex-col gap-2 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#9b5cff] shrink-0" />
                  <span className="font-medium">{event.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#9b5cff] shrink-0" />
                  <span className="font-medium">{event.time}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. CTA BUTTON SECTION - Kept 100% opaque and prominent regardless of expiration fade */}
          <div className="mt-auto p-5 sm:p-6 pt-4 border-t border-gray-100 bg-white">
            <div className={`
              flex items-center justify-between w-full text-sm font-bold transition-colors duration-300
              ${expired 
                ? 'text-gray-900 group-hover:text-[#9b5cff]' 
                : 'text-[#9b5cff] group-hover:text-[#8040df]'
              }
            `}>
              <span>{expired ? "View Recap & Photos" : "Register Now"}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>

        </div>
      </motion.div>
    </Link>
  );
}
