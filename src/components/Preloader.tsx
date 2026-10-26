import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const TITLE_WORDS = ['AWS', 'STUDENT', 'BUILDER', 'GROUP'];
const TITLE_PHRASE = 'AWS STUDENT BUILDER GROUP';
const SUBTITLE_WORDS = ['MANIPAL', 'UNIVERSITY', 'JAIPUR'];
const SUBTITLE_PHRASE = 'MANIPAL UNIVERSITY JAIPUR';
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const JUMBLE_COLORS = [
  '#B784FF', '#FAF8F5', '#9B5CFF', '#FFFFFF', '#D8B4FE',
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const [titleResolvedCount, setTitleResolvedCount] = useState<number>(0);
  const [titleDisplayChars, setTitleDisplayChars] = useState<string[]>(() =>
    TITLE_PHRASE.split('').map((char) => (char === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
  );
  const [titleColors, setTitleColors] = useState<string[]>(() =>
    TITLE_PHRASE.split('').map(() => JUMBLE_COLORS[Math.floor(Math.random() * JUMBLE_COLORS.length)])
  );

  const [subResolvedCount, setSubResolvedCount] = useState<number>(0);
  const [subDisplayChars, setSubDisplayChars] = useState<string[]>(() =>
    SUBTITLE_PHRASE.split('').map((char) => (char === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
  );
  const [subColors, setSubColors] = useState<string[]>(() =>
    SUBTITLE_PHRASE.split('').map(() => JUMBLE_COLORS[Math.floor(Math.random() * JUMBLE_COLORS.length)])
  );

  const animFrameRef = useRef<number | null>(null);
  const lastColorFlipRef = useRef<number>(0);

  const handleEnd = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 1000);
  };

  useEffect(() => {
    if (!isExiting) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExiting]);

  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 6000); 
    }, 6000);
    return () => clearTimeout(safetyTimer);
  }, []);

  useEffect(() => {
    const titleTotal = TITLE_PHRASE.length;
    const subTotal = SUBTITLE_PHRASE.length;

    const titleStart = 2200; 
    const titleDuration = 1800; 
    const subStart = 2700; 
    const subDuration = 1400; 

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const shouldFlipColors = now - lastColorFlipRef.current > 60;
      if (shouldFlipColors) lastColorFlipRef.current = now;

      if (elapsed < titleStart) {
        setTitleDisplayChars((prev) =>
          prev.map((_, i) => TITLE_PHRASE[i] === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])
        );
        if (shouldFlipColors) setTitleColors(TITLE_PHRASE.split('').map(() => JUMBLE_COLORS[Math.floor(Math.random() * JUMBLE_COLORS.length)]));
      } else {
        const titleProgress = Math.min((elapsed - titleStart) / titleDuration, 1);
        const resolved = Math.floor(titleProgress * titleTotal);
        setTitleResolvedCount(resolved);
        setTitleDisplayChars(() =>
          TITLE_PHRASE.split('').map((targetChar, idx) => {
            if (targetChar === ' ') return ' ';
            if (idx < resolved) return targetChar; 
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]; 
          })
        );
        if (shouldFlipColors) {
          setTitleColors((prev) =>
            prev.map((color, idx) => idx < resolved ? '#FAF8F5' : JUMBLE_COLORS[Math.floor(Math.random() * JUMBLE_COLORS.length)])
          );
        }
      }

      if (elapsed < subStart) {
        setSubDisplayChars((prev) =>
          prev.map((_, i) => SUBTITLE_PHRASE[i] === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])
        );
        if (shouldFlipColors) setSubColors(SUBTITLE_PHRASE.split('').map(() => JUMBLE_COLORS[Math.floor(Math.random() * JUMBLE_COLORS.length)]));
      } else {
        const subProgress = Math.min((elapsed - subStart) / subDuration, 1);
        const resolved = Math.floor(subProgress * subTotal);
        setSubResolvedCount(resolved);
        setSubDisplayChars(() =>
          SUBTITLE_PHRASE.split('').map((targetChar, idx) => {
            if (targetChar === ' ') return ' ';
            if (idx < resolved) return targetChar; 
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
        );
        if (shouldFlipColors) {
          setSubColors((prev) =>
            prev.map((color, idx) => idx < resolved ? '#FAF8F5' : JUMBLE_COLORS[Math.floor(Math.random() * JUMBLE_COLORS.length)])
          );
        }
      }

      const allFinished = elapsed >= titleStart + titleDuration && elapsed >= subStart + subDuration;
      if (!allFinished) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        setTitleResolvedCount(titleTotal);
        setTitleDisplayChars(TITLE_PHRASE.split(''));
        setTitleColors(TITLE_PHRASE.split('').map(() => '#FAF8F5'));
        setSubResolvedCount(subTotal);
        setSubDisplayChars(SUBTITLE_PHRASE.split(''));
        setSubColors(SUBTITLE_PHRASE.split('').map(() => '#FAF8F5'));

        setTimeout(() => {
          handleEnd();
        }, 900);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  let titleCharPtr = 0;
  const renderedTitleWords = TITLE_WORDS.map((word) => {
    const startIndex = titleCharPtr;
    const chars = titleDisplayChars.slice(startIndex, startIndex + word.length);
    const colors = titleColors.slice(startIndex, startIndex + word.length);
    titleCharPtr += word.length + 1; 
    return { word, chars, colors, startIndex };
  });

  let subCharPtr = 0;
  const renderedSubWords = SUBTITLE_WORDS.map((word) => {
    const startIndex = subCharPtr;
    const chars = subDisplayChars.slice(startIndex, startIndex + word.length);
    const colors = subColors.slice(startIndex, startIndex + word.length);
    subCharPtr += word.length + 1;
    return { word, chars, colors, startIndex };
  });

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          key="decipher-preloader"
          initial={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          animate={
            isExiting
              ? { opacity: 0, filter: 'blur(10px)', scale: 1.03 }
              : { opacity: 1, filter: 'blur(0px)', scale: 1 }
          }
          exit={{ opacity: 0, filter: 'blur(12px)', scale: 1.04 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] h-[100dvh] w-full select-none overflow-hidden bg-[#08040F] pointer-events-none"
        >
          <div className="absolute inset-0 bg-radial from-[#9b5cff]/20 via-[#08040F] to-[#05020a] pointer-events-none" />

          <motion.div
            animate={{
              scale: [0.95, 1.25, 0.95],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[600px] aspect-[4/3] bg-gradient-to-tr from-[#9b5cff]/25 via-[#b784ff]/15 to-transparent rounded-full blur-[80px] sm:blur-3xl pointer-events-none"
          />

          {/* ABSOLUTELY CENTERED CORE */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl flex flex-col items-center justify-center text-center z-10 px-2 sm:px-8">
            <div className="w-full flex flex-col items-center justify-center">
              
              <motion.div
                initial={{ scale: 1.35, y: 80 }}
                animate={{ scale: [1.35, 1.35, 1.0], y: [80, 80, 0] }}
                transition={{ times: [0, 0.65, 1.0], duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-44 h-32 sm:w-64 sm:h-44 md:w-80 md:h-56 lg:w-96 lg:h-64 mb-4 sm:mb-8 mx-auto flex items-center justify-center overflow-visible origin-center"
              >
                <svg viewBox="0 0 640 500" className="w-full h-full overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <filter id="creamyPurpleGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <motion.path
                    d="M124.625519,366.367706 C90.049614,323.323853 113.159302,258.476105 166.787689,247.171188 C174.381729,245.570358 174.381714,245.570358 175.179276,237.827911 C178.830551,202.382675 220.192154,182.180435 250.478439,201.059662 C252.854919,202.541046 255.165329,204.128433 257.736664,205.817825 C259.788757,201.881851 261.597931,198.172379 263.615417,194.579865 C280.509094,164.497345 306.033051,146.140198 339.944366,140.475937 C393.607391,131.512527 444.557404,165.049271 458.904541,216.262772 C461.129272,224.204178 461.859100,232.595398 462.866608,240.829208 C463.198792,243.543945 464.048950,244.879776 466.546234,245.921234 C494.206421,257.456512 511.231476,277.907837 516.430725,307.453430 C520.763489,332.075317 513.782776,353.913086 497.962860,373.050385 C497.294617,373.858734 496.239563,374.347382 494.525024,374.318390 C495.113800,373.331757 495.578766,372.240906 496.309082,371.373444 C531.494324,329.583557 515.994202,268.086517 465.081451,247.862701 C461.944519,246.616653 460.886200,244.909805 460.723694,241.617249 C459.387543,214.544754 449.447723,191.098404 430.281799,171.839783 C378.627167,119.935379 289.817474,137.135651 261.209564,204.502716 C260.577057,205.992172 259.898468,207.462021 258.940887,209.617386 C257.030487,208.314316 255.549530,207.395630 254.166702,206.347473 C227.581207,186.196732 190.805511,197.117828 179.823349,228.597870 C178.308716,232.939499 177.317780,237.715057 177.358414,242.278381 C177.400314,246.983566 175.345520,248.196182 171.390976,248.792679 C157.149292,250.940765 144.719086,257.037476 134.166183,266.787872 C120.255821,279.640381 112.350319,295.447876 110.776390,314.464691 C107.809517,350.311707 129.849503,374.561401 154.477051,386.554077 C173.295471,395.717957 193.005753,401.246185 213.978790,402.049530 C214.893066,402.084564 215.795242,402.436096 217.466431,402.811798 C216.400726,403.614441 215.949707,404.248718 215.528259,404.229614 C182.613403,402.739777 152.613174,393.671204 128.125992,370.406128 C126.925354,369.265442 125.930725,367.907867 124.625519,366.367706 Z"
                    fill="none" stroke="#FAF8F5" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" filter="url(#creamyPurpleGlow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.g
                    initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
                    animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
                    transition={{ clipPath: { duration: 0.6, delay: 0.65, ease: 'easeOut' }, opacity: { duration: 0.05, delay: 0.65 } }}
                  >
                    <path
                      d="M118 73.348c-4.432.063-9.664 1.052-13.621 3.832-1.223.883-1.012 2.062.336 1.894 4.508-.547 14.44-1.726 16.21.547 1.77 2.23-1.976 11.62-3.663 15.79-.504 1.26.59 1.769 1.726.8 7.41-6.231 9.348-19.242 7.832-21.137-.757-.925-4.388-1.79-8.82-1.726zM1.63 75.859c-.927.116-1.347 1.236-.368 2.121 16.508 14.902 38.359 23.872 62.613 23.872 17.305 0 37.43-5.43 51.281-15.66 2.273-1.688.297-4.254-2.02-3.204-15.534 6.57-32.421 9.77-47.788 9.77-22.778 0-44.8-6.273-62.653-16.633-.39-.231-.755-.304-1.064-.266z"
                      transform="translate(200, 160) scale(1.75)" fill="#FAF8F5" filter="url(#creamyPurpleGlow)"
                    />
                  </motion.g>
                </svg>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center justify-center w-full px-2"
              >
                <div className="relative overflow-visible w-full flex items-center justify-center px-2">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight flex flex-nowrap items-center justify-center gap-x-1.5 sm:gap-x-4 md:gap-x-5 flex-wrap">
                    {renderedTitleWords.map((wordObj, wIdx) => (
                      <span key={wIdx} className="inline-flex items-center flex-nowrap whitespace-nowrap">
                        {wordObj.chars.map((char, cIdx) => {
                          const globalIdx = wordObj.startIndex + cIdx;
                          const isLocked = globalIdx < titleResolvedCount;
                          const isJustLocked = globalIdx === titleResolvedCount - 1;
                          const currentColor = wordObj.colors[cIdx] || '#FAF8F5';
                          return (
                            <span key={cIdx} style={{ color: isLocked ? '#FAF8F5' : currentColor }}
                              className={`inline-block font-bold transition-colors duration-100 ${
                                isLocked ? isJustLocked ? 'drop-shadow-[0_0_16px_#b784ff]' : 'drop-shadow-[0_0_10px_rgba(250,248,245,0.35)]' : 'drop-shadow-[0_0_8px_rgba(183,132,255,0.7)]'
                              }`}
                            >
                              {char}
                            </span>
                          );
                        })}
                      </span>
                    ))}
                  </h1>
                </div>

                <div className="relative mt-2.5 sm:mt-5 overflow-visible w-full flex items-center justify-center px-4">
                  <h2 className="text-xs sm:text-[11px] md:text-sm lg:text-base font-semibold tracking-[0.2em] sm:tracking-[0.25em] flex flex-wrap items-center justify-center gap-x-1.5 sm:gap-x-3.5 md:gap-x-4.5 uppercase">
                    {renderedSubWords.map((wordObj, wIdx) => (
                      <span key={wIdx} className="inline-flex items-center flex-nowrap whitespace-nowrap">
                        {wordObj.chars.map((char, cIdx) => {
                          const globalIdx = wordObj.startIndex + cIdx;
                          const isLocked = globalIdx < subResolvedCount;
                          const isJustLocked = globalIdx === subResolvedCount - 1;
                          const currentColor = wordObj.colors[cIdx] || '#FAF8F5';
                          return (
                            <span key={cIdx} style={{ color: isLocked ? '#FAF8F5' : currentColor }}
                              className={`inline-block font
