import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ArrowLeft, Lock, ExternalLink, Users, Radio, Ticket } from 'lucide-react';
import { motion } from 'motion/react';
import { EVENTS } from '../constants';

export default function EventDetailsPage() {
  const { id } = useParams();
  const event = EVENTS.find((e) => e.id === id);

  // Live RSVP Simulator State
  const [attendeeCount, setAttendeeCount] = useState<number>(() => {
    return (event as any)?.attendeeCount || 42;
  });
  const [isLiveUpdating, setIsLiveUpdating] = useState(false);

  const isEventExpired = (eventDate: string) => {
    const today = new Date();
    const eventD = new Date(eventDate);
    today.setHours(0, 0, 0, 0);
    eventD.setHours(0, 0, 0, 0);
    return eventD < today;
  };

  const expired = event ? isEventExpired(event.date) : false;

  // Real-time live update simulator effect
  useEffect(() => {
    if (expired) return;

    // Simulate real-time RSVP updates every 8 seconds
    const interval = setInterval(() => {
      setIsLiveUpdating(true);
      
      // Randomly add 1 or 2 new attendees to mimic live user activity
      setAttendeeCount((prev) => prev + (Math.random() > 0.4 ? 1 : 0));

      setTimeout(() => {
        setIsLiveUpdating(false);
      }, 1000); // Pulse glow effect duration
    }, 8000);

    return () => clearInterval(interval);
  }, [expired]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f3ef] px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4 text-[#18181b]">
            Event not found
          </h2>
          <Link to="/" className="aws-button-primary">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 sm:pt-24 pb-20 sm:pb-24 bg-[#f5f3ef] min-h-screen text-[#18181b] aws-grid-bg overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BACK LINK */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#666666] hover:text-[#9B5CFF] transition-colors mb-6 sm:mb-10 text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* LEFT CONTENT */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="lg:col-span-2 space-y-8 sm:space-y-10"
          >
            {/* TITLE */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] sm:tracking-[-0.05em] leading-[1.05] sm:leading-[0.95] text-[#18181b]">
              {event.title}
            </h1>

            {/* META LABELS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[#666666] text-sm p-4 sm:p-5 bg-white rounded-2xl border border-black/10 shadow-sm">
              <div className="flex items-center gap-3 font-medium">
                <div className="p-2 bg-[#9B5CFF]/10 rounded-lg shrink-0"><Calendar className="w-4 h-4 text-[#9B5CFF]" /></div>
                <span className="truncate">{event.date}</span>
              </div>
              <div className="flex items-center gap-3 font-medium">
                <div className="p-2 bg-[#9B5CFF]/10 rounded-lg shrink-0"><Clock className="w-4 h-4 text-[#9B5CFF]" /></div>
                <span className="truncate">{event.time}</span>
              </div>
              <div className="flex items-center gap-3 font-medium">
                <div className="p-2 bg-[#9B5CFF]/10 rounded-lg shrink-0"><MapPin className="w-4 h-4 text-[#9B5CFF]" /></div>
                <span className="truncate">{event.venue}</span>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-3 sm:mb-4">
                About the Event
              </h3>
              <p className="text-[#52525b] text-base sm:text-lg leading-relaxed">
                {event.fullDescription}
              </p>
            </div>

            {/* SPEAKERS */}
            {event.speakers.length > 0 && (
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-4 sm:mb-6">Featured Speakers</h3>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  {event.speakers.map((speaker, i) => (
                    <div key={i} className="aws-card p-4 sm:p-5 flex items-center gap-4 bg-white rounded-2xl border border-black/10">
                      <img src={speaker.image} alt={speaker.name} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border border-black/10 shrink-0" />
                      <div className="min-w-0">
                        <h4 className="font-bold text-base sm:text-lg text-[#18181b] truncate">{speaker.name}</h4>
                        <p className="text-xs sm:text-sm text-[#7C3AED] font-semibold truncate">{speaker.designation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RECAP */}
            {expired && event.recap && (
              <div className="border-t border-black/10 pt-8 sm:pt-10">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-4 sm:mb-5">
                  {event.recap.title}
                </h3>
                <div className="space-y-4 text-[#52525b] text-base leading-relaxed mb-6 sm:mb-8">
                  {event.recap.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {event.recap.photos.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="Event recap"
                      className="rounded-xl border border-black/10 object-cover h-48 w-full hover:opacity-90 transition duration-300 shadow-sm"
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* RIGHT SIDEBAR */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="space-y-6"
          >
            <div className="bg-white border-2 border-[#9B5CFF]/30 rounded-2xl p-6 sm:p-7 lg:sticky lg:top-24 shadow-[0_12px_40px_rgba(155,92,255,0.08)] relative overflow-hidden">
              
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#9B5CFF]/10 rounded-full blur-2xl pointer-events-none" />

              {expired ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <h3 className="text-[#18181b] text-lg font-bold mb-1">
                    Event Completed
                  </h3>
                  <p className="text-[#666666] text-sm">
                    Registrations are closed for this session.
                  </p>
                </div>
              ) : (
                <div className="space-y-5 relative z-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold tracking-tight">
                      Event Registration
                    </h3>
                    <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <Radio className="w-3 h-3 animate-pulse" /> Live Sync
                    </span>
                  </div>

                  <p className="text-xs text-[#666666] -mt-3">
                    Secure your spot on our official Meetup page.
                  </p>

                  {/* REAL-TIME ATTENDEE BADGE */}
                  <div className={`flex items-center gap-3 p-3.5 bg-[#9B5CFF]/5 border rounded-xl transition-all duration-300 ${isLiveUpdating ? 'border-[#9B5CFF] shadow-[0_0_12px_rgba(155,92,255,0.2)] bg-[#9B5CFF]/10' : 'border-[#9B5CFF]/15'}`}>
                    <div className="p-2.5 bg-[#9B5CFF]/15 rounded-lg text-[#7C3AED]">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs text-[#666666] font-medium">Live RSVPs</span>
                      <div className="text-sm font-bold text-[#18181b] flex items-center gap-1.5">
                        <motion.span 
                          key={attendeeCount}
                          initial={{ scale: 1.2, color: "#7C3AED" }}
                          animate={{ scale: 1, color: "#18181b" }}
                          transition={{ duration: 0.3 }}
                        >
                          {attendeeCount}
                        </motion.span>
                        <span>People Attending</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={event.meetupLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aws-button-primary w-full flex justify-center items-center gap-2 text-sm py-4 shadow-lg shadow-[#9B5CFF]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Register on Meetup <ExternalLink className="w-4 h-4" />
                  </a>

                  <p className="text-center text-xs text-[#888888]">
                    Takes less than 30 seconds • Instant RSVP confirmation
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
