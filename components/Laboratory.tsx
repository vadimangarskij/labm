
import React, { useRef, useState, useEffect } from 'react';
import { Track } from '../types';
import { Share2, Disc, FlaskConical, Play, Pause } from 'lucide-react';
import { MOCK_TRACKS } from '../constants';
import LikeButton from './LikeButton';

interface LaboratoryProps {
  onPlay: (track: Track) => void;
  currentTrack: Track | null;
}

const Laboratory: React.FC<LaboratoryProps> = ({ onPlay, currentTrack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const labTracks = [...MOCK_TRACKS, ...MOCK_TRACKS].map((t, i) => ({...t, uniqueId: `${t.id}-${i}`}));

  return (
    <div 
      ref={containerRef}
      className="h-full w-full bg-black overflow-y-scroll snap-y snap-mandatory no-scrollbar"
    >
      {labTracks.map((track) => (
        <LabCard 
          key={track.uniqueId} 
          track={track} 
          onPlay={onPlay}
          isGloballyActive={currentTrack?.id === track.id} 
        />
      ))}
    </div>
  );
};

const LabCard: React.FC<{ track: Track & { uniqueId: string }, onPlay: (t: Track) => void, isGloballyActive: boolean }> = ({ track, onPlay, isGloballyActive }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.8) {
          setIsIntersecting(true);
          onPlay(track); // Auto-play when scrolled to
        } else {
          setIsIntersecting(false);
        }
      },
      { threshold: 0.8 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [track, onPlay]);

  const isActive = isIntersecting || isGloballyActive;

  return (
    <div ref={cardRef} className="w-full h-full snap-start relative flex flex-col justify-end pb-32 md:pb-10 overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 z-0">
        <img src={track.cover} alt="bg" className="w-full h-full object-cover opacity-40 blur-[80px] scale-150 transition-transform duration-[10s] ease-linear" style={{ transform: isActive ? 'scale(1.8) rotate(5deg)' : 'scale(1.5)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black opacity-100"></div>
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isActive ? 'opacity-30' : 'opacity-0'} bg-[#FF2E2E]/10`}></div>
      </div>

      <div className="relative z-10 px-6 mb-12 flex flex-col items-center">
        {/* Animated Disc Container */}
        <div className="mb-16 relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
           <div className={`absolute inset-0 rounded-full border border-white/10 ${isActive ? 'animate-[spin_20s_linear_infinite]' : ''}`}></div>
           <div className={`absolute inset-8 rounded-full border-2 border-dashed border-[#FF2E2E]/30 ${isActive ? 'animate-[spin_10s_linear_infinite]' : ''}`}></div>
           
           {/* Disc Art */}
           <div className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-[6px] border-[#111] shadow-[0_0_80px_rgba(255,46,46,0.2)] transition-transform duration-1000 ${isActive ? 'scale-105 rotate-[360deg]' : 'scale-90'}`}>
              <img src={track.cover} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent"></div>
           </div>

           {/* Central Equalizer Overlay */}
           {isActive && (
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex gap-1.5 h-10 items-end">
                   {[0, 0.2, 0.4, 0.1, 0.3].map((delay, i) => (
                     <div key={i} className="w-1.5 bg-[#FF2E2E] rounded-full equalizer-bar shadow-[0_0_10px_#FF2E2E]" style={{animationDelay: `${delay}s`}}></div>
                   ))}
                </div>
             </div>
           )}
        </div>

        {/* Labels & Controls */}
        <div className="w-full flex items-end justify-between">
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                   <div className="px-3 py-1 rounded-full bg-[#FF2E2E]/20 backdrop-blur-md border border-[#FF2E2E]/30 flex items-center gap-2">
                      <FlaskConical className="w-3.5 h-3.5 text-[#FF2E2E]" />
                      <span className="text-[10px] font-bold text-[#FF2E2E] uppercase tracking-widest">Lab Exclusive</span>
                   </div>
                </div>
                <h2 className="text-4xl font-black text-white mb-1 leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">{track.title}</h2>
                <p className="text-xl text-gray-300 font-medium opacity-80">{track.artist}</p>
            </div>

            <div className="flex flex-col gap-8 items-center ml-4 pb-2">
               <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-xl flex items-center justify-center border border-white/10 shadow-2xl">
                     <LikeButton size={28} />
                  </div>
                  <span className="text-[10px] font-bold text-white/60">4.2k</span>
               </div>

               <button className="flex flex-col items-center gap-2 group">
                   <div className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-xl flex items-center justify-center border border-white/10 group-active:scale-90 transition-transform">
                     <Share2 className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-white/60">Share</span>
               </button>

               <div className="w-12 h-12 rounded-full border-2 border-[#FF2E2E]/20 p-1">
                  <img src={track.cover} className={`w-full h-full rounded-full object-cover ${isActive ? 'animate-spin-slow' : ''}`} />
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Laboratory;
