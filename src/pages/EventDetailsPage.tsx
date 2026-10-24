import { useParams, Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Calendar, MapPin, Clock, ArrowLeft, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { EVENTS } from '../constants';

export default function EventDetailsPage() {
  const { id } = useParams();
  const event = EVENTS.find((e) => e.id === id);

  const isEventExpired = (eventDate: string) => {
    const today = new Date();
    const eventD = new Date(eventDate);
    today.setHours(0, 0, 0, 0);
    eventD.setHours(0, 0, 0, 0);
    return eventD < today;
  };

  const expired = event ? isEventExpired(event.date) : false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f3ef]">
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
    <div className="pt-24 pb-24 bg-[#f5f3ef] min-h-screen text-[#18181b] aws-grid-bg">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* BACK LINK */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#666666] hover:text-[#9B5CFF] transition-colors mb-10 text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* LEFT CONTENT */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="lg:col-span-2"
          >
            {/* TITLE */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.05em] leading-[0.95] mb-6 text-[#18181b]">
              {event.title}
            </h1>

            {/* META LABELS */}
            <div className="flex flex-wrap gap-6 text-[#666666] text-sm mb-10 p-5 bg-white rounded-xl border border-black/10 shadow-sm">
              <div className="flex items-center gap-2.5 font-medium">
                <div className="p-2 bg-[#9B5CFF]/10 rounded-md"><Calendar className="w-4 h-4 text-[#9B5CFF]" /></div>
                {event.date}
              </div>
              <div className="flex items-center gap-2.5 font-medium">
                <div className="p-2 bg-[#9B5CFF]/10 rounded-md"><Clock className="w-4 h-4 text-[#9B5CFF]" /></div>
                {event.time}
              </div>
              <div className="flex items-center gap-2.5 font-medium">
                <div className="p-2 bg-[#9B5CFF]/10 rounded-md"><MapPin className="w-4 h-4 text-[#9B5CFF]" /></div>
                {event.venue}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mb-14">
              <h3 className="text-2xl font-semibold tracking-tight mb-4">
                About the Event
              </h3>
              <p className="text-[#52525b] text-base leading-relaxed">
                {event.fullDescription}
              </p>
            </div>

            {/* SPEAKERS */}
            {event.speakers.length > 0 && (
              <div className="mb-14">
                <h3 className="text-2xl font-bold tracking-tight mb-6">Featured Speakers</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {event.speakers.map((speaker, i) => (
                    <div key={i} className="aws-card p-5 flex items-center gap-4">
                      <img src={speaker.image} alt={speaker.name} className="w-16 h-16 rounded-full object-cover border border-black/10" />
                      <div>
                        <h4 className="font-bold text-lg text-[#18181b]">{speaker.name}</h4>
                        <p className="text-sm text-[#7C3AED] font-semibold">{speaker.designation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RECAP */}
            {expired && event.recap && (
              <div className="border-t border-black/10 pt-10">
                <h3 className="text-2xl font-bold tracking-tight mb-5">
                  {event.recap.title}
                </h3>
                <div className="space-y-4 text-[#52525b] text-base leading-relaxed mb-8">
                  {event.recap.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {event.recap.photos.map((img, i) => (
                    <img
                      key={i}
                      src={img}
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
            {/* WIDGET PANEL */}
            <div className="bg-white border border-black/10 rounded-xl p-6 sticky top-24 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              {expired ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <h3 className="text-[#18181b] text-lg font-bold mb-1">
                    Event Completed
                  </h3>
                  <p className="text-[#666666] text-sm">
                    Registrations are closed
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-base font-semibold mb-1 tracking-tight">
                    Register for Event
                  </h3>
                  <p className="text-xs text-[#666666] mb-4">
                    Secure your spot directly below without leaving the page.
                  </p>
                  <iframe
                    src={event.meetupLink}
                    title="Meetup Registration"
                    className="w-full h-[460px] rounded-lg border border-black/10 bg-[#f9f9f9]"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
