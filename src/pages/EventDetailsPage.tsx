import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ArrowLeft, Lock, Unlock } from 'lucide-react';
import { motion } from 'motion/react';
import { EVENTS } from '../constants';

export default function EventDetailsPage() {
  const { id } = useParams();
  const event = EVENTS.find((e) => e.id === id);

  const [activeTab, setActiveTab] = useState<'meetup' | 'classes'>('meetup');
  const [accessCode, setAccessCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const isEventExpired = (eventDate: string) => {
    const today = new Date();
    const eventD = new Date(eventDate);
    today.setHours(0, 0, 0, 0);
    eventD.setHours(0, 0, 0, 0);
    return eventD < today;
  };

  const expired = event ? isEventExpired(event.date) : false;

  const handleUnlock = () => {
    if (accessCode.trim() === "AWS2026") {
      setIsUnlocked(true);
      setActiveTab("classes");
    } else {
      alert("Invalid Code ❌");
    }
  };

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
                <>
                  {/* UNLOCK SECTION */}
                  {!isUnlocked && (
                    <div className="mb-6 p-5 bg-[#fcfcfc] border border-black/5 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Lock className="w-4 h-4 text-[#9B5CFF]" />
                        <h4 className="font-semibold text-sm">Access Event Resources</h4>
                      </div>
                      <p className="text-xs text-[#666666] mb-4">
                        Enter the code provided during the session to unlock attendance and class resources.
                      </p>
                      <input
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        className="aws-input mb-3 bg-white"
                        placeholder="e.g. AWS2026"
                        type="password"
                      />
                      <button
                        onClick={handleUnlock}
                        className="aws-button-primary w-full text-sm flex justify-center items-center gap-2"
                      >
                        <Unlock className="w-4 h-4" /> Unlock Access
                      </button>
                    </div>
                  )}

                  {/* TABS */}
                  <div className="flex gap-2 mb-5 p-1 bg-[#f3f4f6] rounded-lg">
                    {['meetup', 'classes'].map((tab) => {
                      const locked = !isUnlocked && tab !== 'meetup';
                      return (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab as any)}
                          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md transition-all ${
                            activeTab === tab
                              ? 'bg-white text-[#7C3AED] shadow-sm'
                              : 'text-[#666666] hover:text-[#18181b]'
                          }`}
                        >
                          <span className="capitalize">{tab}</span>
                          {locked && <Lock className="w-3 h-3 opacity-60" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* MEETUP CONTENT */}
                  {activeTab === 'meetup' && (
                    <a
                      href={event.meetupLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aws-button-primary w-full flex justify-center text-sm"
                    >
                      Register on Meetup
                    </a>
                  )}

                  {/* CLASSES CONTENT */}
                  {activeTab === 'classes' && (
                    !isUnlocked ? (
                      <div className="text-center py-10 border-2 border-dashed border-black/10 rounded-lg">
                        <Lock className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                        <p className="text-[#666666] text-sm font-medium">
                          Content Locked
                        </p>
                      </div>
                    ) : (
                      <iframe
                        src="https://forms.office.com/Pages/ResponsePage.aspx?id=3S8oJwtM-026kSKM2D_fcRezTgSnBGVIthb_f4OG52FUNkJNVkpMSjY0ODMwRjhTOUJYMzA2SkVLVC4u&embed=true"
                        className="w-full h-[460px] rounded-lg border border-black/10 bg-[#f9f9f9]"
                      />
                    )
                  )}
                </>
              )}
            </div>

            {/* STEPS TO ACCESS */}
            {!expired && (
              <div className="bg-white border border-black/10 rounded-xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                <h3 className="text-base font-semibold mb-5 tracking-tight">
                  Steps to Access
                </h3>
                <div className="space-y-4 text-sm text-[#52525b]">
                  {[
                    "Register on the official Meetup page.",
                    "Attend the event to receive the secret access code.",
                    "Enter the code in the widget above.",
                    "Unlock the attendance and feedback forms.",
                    "Submit your details to mark your attendance."
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-3">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#9B5CFF]/15 text-[#7C3AED] font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="leading-snug">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}