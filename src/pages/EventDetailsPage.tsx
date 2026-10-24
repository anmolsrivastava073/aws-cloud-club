import { useParams, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, ArrowLeft, Lock, ExternalLink, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { EVENTS } from '../constants';

export default function EventDetailsPage() {
  const { id } = useParams();
  const event = EVENTS.find((e) => e.id === id);

  const [attendeeCount, setAttendeeCount] = useState<number>(0);
  const [isLoadingCount, setIsLoadingCount] = useState(true);

  const isEventExpired = (eventDate: string) => {
    const today = new Date();
    const eventD = new Date(eventDate);
    today.setHours(0, 0, 0, 0);
    eventD.setHours(0, 0, 0, 0);
    return eventD < today;
  };

  const expired = event ? isEventExpired(event.date) : false;

  // Fetch the genuine Meetup RSVP count on load
  useEffect(() => {
    window.scrollTo(0, 0);

    if (expired || !event || !event.meetupLink) {
      setIsLoadingCount(false);
      return;
    }

    const fetchMeetupCount = async () => {
      try {
        // Calls the Vercel Serverless Function we created in the /api folder
        const response = await fetch(`/api/meetup-rsvps?url=${encodeURIComponent(event.meetupLink)}`);
        const data = await response.json();

        if (data.count !== undefined && data.count > 0) {
          setAttendeeCount(data.count);
        } else {
          // Fallback to constants.ts if the API fails or returns 0
          setAttendeeCount((event as any).attendeeCount || 0);
        }
      } catch (err) {
        console.error('Error fetching Meetup count:', err);
        setAttendeeCount((event as any).attendeeCount || 0);
      } finally {
        setIsLoadingCount(false);
      }
    };

    fetchMeetupCount();
  }, [expired, event]);

  if (!event) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-[#f5f3ef] px-4">
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
    <div className="pt-20 sm:pt-28 pb-16 sm:pb-24 bg-[#f5f3ef] min-h-[100dvh] text-[#18181b] aws-grid-bg overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BACK LINK */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-[#666666] hover:text-[#9B5CFF] transition-colors mb-6 sm:mb-10 text-xs sm:text-sm font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Back to Events
          </Link>
        </motion.div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* LEFT CONTENT */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="lg:col-span-2 space-y-8 sm:space-y-10 order-last lg:order-first"
          >
            {/* TITLE */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight sm:tracking-[-0.03em] leading-tight sm:leading-[1.05] text-[#18181b]">
              {event.title}
            </h1>

            {/* META LABELS */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 text-[#666666] text-xs sm:text-sm p-4 sm:p-5 bg-white rounded-2xl border border-black/10 shadow-sm">
              <div className="flex items-center gap-2.5 sm:gap-3 font-medium sm:pr-4 sm:border-r border-black/10">
                <div className="p-1.5 sm:p-2 bg-[#9B5CFF]/10 rounded-lg shrink-0"><Calendar className="w-4 h-4 text-[#9B5CFF]" /></div>
                <span className="truncate">{event.date}</span>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 font-medium sm:pr-4 sm:border-r border-black/10">
                <div className="p-1.5 sm:p-2 bg-[#9B5CFF]/10 rounded-lg shrink-0"><Clock className="w-4 h-4 text-[#9B5CFF]" /></div>
                <span className="truncate">{event.time}</span>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 font-medium">
                <div className="p-1.5 sm:p-2 bg-[#9B5CFF]/10 rounded-lg shrink-0"><MapPin className="w-4 h-4 text-[#9B5CFF]" /></div>
                <span className="truncate">{event.venue}</span>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <h3 className="text-lg sm:text-2xl font-semibold tracking-tight mb-2.5 sm:mb-4">
                About the Event
              </h3>
              <p className="text-[#52525b] text-sm sm:text-base leading-relaxed">
                {event.fullDescription}
              </p>
            </div>

            {/* SPEAKERS */}
            {event.speakers.length > 0 && (
              <div>
                <h3 className="text-lg sm:text-2xl font-bold tracking-tight mb-4 sm:mb-6">Featured Speakers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                  {event.speakers.map((speaker, i) => (
                    <div key={i} className="aws-card p-4 sm:p-5 flex items-center gap-3.5 sm:gap-4 bg-white rounded-2xl border border-black/10">
                      <img src={speaker.image} alt={speaker.name} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border border-black/10 shrink-0" />
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm sm:text-lg text-[#18181b] truncate">{speaker.name}</h4>
                        <p className="text-[11px] sm:text-sm text-[#7C3AED] font-semibold truncate">{speaker.designation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RECAP */}
            {expired && event.recap && (
              <div className="border-t border-black/10 pt-8 sm:pt-10">
                <h3 className="text-lg sm:text-2xl font-bold tracking-tight mb-3 sm:mb-5">
                  {event.recap.title}
                </h3>
                <div className="space-y-3 sm:space-y-4 text-[#52525b] text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                  {event.recap.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 gap-3 sm:gap-4 pb-4 sm:pb-0 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {event.recap.photos.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="Event recap"
                      className="rounded-xl border border-black/10 object-cover h-40 sm:h-48 w-64 sm:w-full shrink-0 snap-center hover:opacity-90 transition duration-300 shadow-sm"
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* RIGHT SIDEBAR (Registration) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="space-y-6 order-first lg:order-last mb-4 lg:mb-0"
          >
            <div className="bg-white border sm:border-2 border-[#9B5CFF]/20 sm:border-[#9B5CFF]/30 rounded-2xl p-5 sm:p-7 lg:sticky lg:top-24 shadow-md sm:shadow-[0_12px_40px_rgba(155,92,255,0.08)] relative overflow-hidden">
              
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#9B5CFF]/10 rounded-full blur-2xl pointer-events-none" />

              {expired ? (
                <div className="text-center py-5 sm:py-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  </div>
                  <h3 className="text-[#18181b] text-base sm:text-lg font-bold mb-1">
                    Event Completed
                  </h3>
                  <p className="text-[#666666] text-xs sm:text-sm">
                    Registrations are closed for this session.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-5 relative z-10">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold tracking-tight mb-1">
                      Event Registration
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#666666] leading-relaxed">
                      Secure your spot on our official Meetup page to get instant calendar invites.
                    </p>
                  </div>

                  {/* GENUINE MEETUP ATTENDEE BADGE */}
                  <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 bg-[#9B5CFF]/5 border border-[#9B5CFF]/15 rounded-xl">
                    <div className="p-2 sm:p-2.5 bg-[#9B5CFF]/15 rounded-lg text-[#7C3AED]">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] sm:text-xs text-[#666666] font-medium">Current RSVPs</span>
                      <div className="text-xs sm:text-sm font-bold text-[#18181b] flex items-center gap-1 sm:gap-1.5">
                        {isLoadingCount ? (
                          <div className="w-4 h-4 border-2 border-[#9B5CFF] border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <motion.span 
                            key={attendeeCount}
                            initial={{ scale: 1.2, color: "#7C3AED" }}
                            animate={{ scale: 1, color: "#18181b" }}
                            transition={{ duration: 0.3 }}
                          >
                            {attendeeCount}
                          </motion.span>
                        )}
                        <span>Attending</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={event.meetupLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aws-button-primary w-full flex justify-center items-center gap-2 text-xs sm:text-sm py-3.5 sm:py-4 shadow-md shadow-[#9B5CFF]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Register on Meetup <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>

                  <p className="text-center text-[10px] sm:text-xs text-[#888888]">
                    Free Admission • Open to all students
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
