import React, { useRef, useState, useEffect } from 'react';
import { Track } from '../types';
import { Heart, Share2, MoreHorizontal, Disc, FlaskConical, Play, Pause } from 'lucide-react';
import { MOCK_TRACKS } from '../constants';

interface LaboratoryProps {
  onPlay: (track: Track) => void;
  currentTrack: Track | null;
}

const Laboratory: React.FC<LaboratoryProps> = ({ onPlay, currentTrack }) => {
  // Use MOCK_TRACKS but duplicated to ensure we have enough to scroll
  const labTracks = [...MOCK_TRACKS, ...MOCK_TRACKS, ...MOCK_TRACKS].map((t, i) => ({...t, uniqueId: `${t.id}-${i}`}));
  
  // Intersection Observer logic could go here to auto-play, 
  // but for now we stick to manual play or simple UI state
  
  return (
    <div className="h-full w-full bg-black overflow-y-scroll snap-y snap-mandatory no-scrollbar">
      {labTracks.map((track, index) => (
        <LabCard 
          key={track.uniqueId} 
          track={track} 
          onPlay={onPlay}
          isActive={currentTrack?.id === track.id} 
        />
      ))}
    </div>
  );
};

const LabCard: React.FC<{ track: Track & { uniqueId: string }, onPlay: (t: Track) => void, isActive: boolean }> = ({ track, onPlay, isActive }) => {
  const [isPlayingLocal, setIsPlayingLocal] = useState(false);

  // Sync local playing state with global active state roughly
  useEffect(() => {
    setIsPlayingLocal(isActive);
  }, [isActive]);

  const togglePlay = () => {
    onPlay(track);
    setIsPlayingLocal(!isPlayingLocal);
  };

  return (
    <div className="w-full h-full snap-start relative flex flex-col justify-end pb-24 md:pb-10 overflow-hidden border-b border-white/5">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <img src={track.cover} alt="bg" className="w-full h-full object-cover opacity-60 blur-3xl scale-125" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#000000] opacity-90"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 px-6 mb-8 flex flex-col items-center">
        
        {/* Disc / Art Animation */}
        <div className="mb-12 relative w-64 h-64 md:w-80 md:h-80">
           {/* Rotating ring */}
           <div className={`absolute inset-0 rounded-full border-2 border-dashed border-white/20 ${isPlayingLocal ? 'animate-[spin_10s_linear_infinite]' : ''}`}></div>
           
           {/* Album Art */}
           <div className={`absolute inset-4 rounded-full overflow-hidden border-4 border-[#111] shadow-[0_0_50px_rgba(255,46,46,0.3)] ${isPlayingLocal ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
              <img src={track.cover} className="w-full h-full object-cover" />
           </div>

           {/* Central Hub */}
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 cursor-pointer active:scale-90 transition-transform" onClick={togglePlay}>
                 {isPlayingLocal ? (
                    <div className="flex gap-1 h-6 items-end">
                       <div className="w-1 bg-[#FF2E2E] equalizer-bar" style={{animationDelay: '0s'}}></div>
                       <div className="w-1 bg-[#FF2E2E] equalizer-bar" style={{animationDelay: '0.2s'}}></div>
                       <div className="w-1 bg-[#FF2E2E] equalizer-bar" style={{animationDelay: '0.4s'}}></div>
                    </div>
                 ) : (
                    <Play className="w-6 h-6 text-white ml-1 fill-white" />
                 )}
              </div>
           </div>
        </div>

        {/* Info & Controls */}
        <div className="w-full flex items-end justify-between">
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                   <div className="px-2 py-0.5 rounded bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-1">
                      <FlaskConical className="w-3 h-3 text-[#FF2E2E]" />
                      <span className="text-[10px] font-bold text-[#FF2E2E] uppercase">Lab Demo</span>
                   </div>
                </div>
                <h2 className="text-3xl font-black text-white mb-1 leading-none drop-shadow-lg">{track.title}</h2>
                <p className="text-lg text-gray-300 font-medium">{track.artist}</p>
            </div>

            {/* Sidebar Actions */}
            <div className="flex flex-col gap-6 items-center ml-4 pb-2">
               <button className="flex flex-col items-center gap-1 group">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-active:scale-90 transition-transform">
                     <Heart className="w-6 h-6 text-white group-hover:text-[#FF2E2E] transition-colors" />
                  </div>
                  <span className="text-[10px] font-bold text-white">4.2k</span>
               </button>

               <button className="flex flex-col items-center gap-1 group">
                   <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-active:scale-90 transition-transform">
                     <Share2 className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-white">Share</span>
               </button>

               <button className="flex flex-col items-center gap-1 group">
                   <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-active:scale-90 transition-transform">
                     <Disc className="w-6 h-6 text-white animate-spin-slow" />
                  </div>
               </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Laboratory;