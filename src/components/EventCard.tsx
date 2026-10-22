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
          
          {/* 1. VISUAL SECTION - object-fill stretches the image to fit completely without cutting/cropping */}
          <div className="relative w-full h-56 flex-shrink-0 bg-gray-100 overflow-hidden border-b border-gray-200">
            <img
              src={event.banner || '/images/default-banner.jpg'}
              alt={event.title}
              className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* 2. TEXT SECTION */}
          <div className="flex flex-col flex-grow p-5 sm:p-6">
            
            {/* Top Row: Status & Date */}
            <div className="flex items-center justify-between mb-3">
              {expired ? (
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-none bg-gray-100 text-gray-500">
                  Past Event
                </span>
              ) : (
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-none bg-green-50 text-green-700 flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                  </span>
                  Upcoming
                </span>
              )}
              
              <div className="flex items-center gap-1.5 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-[#9b5cff]" />
                {event.date}
              </div>
            </div>

            {/* TITLE */}
            <h3 className="text-xl font-bold text-gray-900 truncate mb-2 group-hover:text-[#9b5cff] transition-colors duration-200">
              {event.title}
            </h3>

            {/* DESCRIPTION */}
            <div className="h-[40px] mb-4">
              <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                {event.shortDescription}
              </p>
            </div>

            {/* META INFO (Venue & Time) */}
            <div className="flex flex-col gap-2 text-xs text-gray-500 mb-5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#9b5cff]" />
                <span className="truncate font-medium">{event.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#9b5cff]" />
                <span className="font-medium">{event.time}</span>
              </div>
            </div>

            {/* CTA BUTTON */}
            <div className="mt-auto w-full pt-4 border-t border-gray-100">
              <div className={`
                flex items-center justify-between w-full text-sm font-bold transition-colors duration-300
                ${expired 
                  ? 'text-gray-500 group-hover:text-gray-900' 
                  : 'text-[#9b5cff] group-hover:text-[#8040df]'
                }
              `}>
                <span>{expired ? "View Recap & Photos" : "Register Now"}</span>
                <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${!expired && 'group-hover:translate-x-1'}`} />
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </Link>
  );
}
