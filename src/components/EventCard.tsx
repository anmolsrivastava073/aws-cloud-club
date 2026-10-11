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
        <div
          className={`
            bg-white
            border
            border-black/10
            rounded-xl
            p-7
            flex
            flex-col
            h-full
            min-h-[280px]
            transition-all
            duration-300
            shadow-sm

            ${!expired && `
              group-hover:border-[#9b5cff]/40
              group-hover:shadow-[0_12px_40px_rgba(155,92,255,0.1)]
            `}
          `}
        >
          {/* PAST BADGE */}
          {expired && (
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md bg-red-50 text-red-600 mb-5 w-fit border border-red-100">
              Past Event
            </span>
          )}

          {/* DATE */}
          <div className="flex items-center gap-2 text-[#666666] mb-3 text-xs font-medium uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-[#9b5cff]" />
            {event.date}
          </div>

          {/* TITLE */}
          <h3 className="text-xl font-semibold mb-3 text-[#18181b] leading-snug tracking-tight group-hover:text-[#9b5cff] transition-colors duration-200">
            {event.title}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-[#52525b] text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
            {event.shortDescription}
          </p>

          {/* META */}
          <div className="flex flex-col gap-2.5 text-xs text-[#666666] mb-6 pt-5 border-t border-black/5">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#9b5cff]" />
              {event.venue}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#9b5cff]" />
              {event.time}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-auto flex items-center gap-2 text-[#9b5cff] text-sm font-semibold tracking-tight">
            {expired ? "View Recap" : "View Details"}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}