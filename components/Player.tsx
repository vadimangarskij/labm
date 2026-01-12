import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Heart, Volume2, ChevronDown, Share2, MoreHorizontal, Repeat, Shuffle } from 'lucide-react';
import { Track } from '../types';

interface PlayerProps {
  currentTrack: Track | null;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  hasBottomNav?: boolean;
  onClose?: () => void;
}

const Player: React.FC<PlayerProps> = ({ 
  currentTrack, 
  isExpanded = false, 
  onToggleExpand,
  hasBottomNav = false,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);
  
  // -- Expanded Gesture Logic --
  const touchStartRef = useRef<{x: number, y: number} | null>(null);
  const [translateY, setTranslateY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // -- Mini Player Close Logic --
  const miniPlayerRef = useRef<HTMLDivElement>(null);
  const longPressTimerRef = useRef<any>(null);
  const [isDismissMode, setIsDismissMode] = useState(false); // Mode active after long press
  const [miniTranslateX, setMiniTranslateX] = useState(0);

  // Expanded handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current || !isExpanded) return;
    
    const deltaY = e.touches[0].clientY - touchStartRef.current.y;
    const deltaX = e.touches[0].clientX - touchStartRef.current.x;

    // Only allow dragging down or right
    if (deltaY > 0) setTranslateY(deltaY);
    if (deltaX > 0) setTranslateX(deltaX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsDragging(false);
    if (!touchStartRef.current) return;
    
    // Threshold to close
    if (translateY > 150 || translateX > 120) {
      if (onToggleExpand) onToggleExpand();
    }
    
    // Reset positions
    setTranslateY(0);
    setTranslateX(0);
    touchStartRef.current = null;
  };

  // -- Mini Player Handlers --
  const handleMiniTouchStart = (e: React.TouchEvent) => {
    if (isExpanded) return;
    touchStartRef.current = {
       x: e.touches[0].clientX,
       y: e.touches[0].clientY
    };
    
    // Start Long Press Timer
    longPressTimerRef.current = setTimeout(() => {
       setIsDismissMode(true);
       // Haptic Feedback
       if (navigator.vibrate) navigator.vibrate(50);
    }, 600); // 600ms hold time
  };

  const handleMiniTouchMove = (e: React.TouchEvent) => {
    if (isExpanded || !touchStartRef.current) return;
    
    // If we move too much before the timer triggers, cancel the timer (it's a scroll or tap)
    const moveX = e.touches[0].clientX - touchStartRef.current.x;
    const moveY = e.touches[0].clientY - touchStartRef.current.y;

    if (!isDismissMode) {
       if (Math.abs(moveX) > 10 || Math.abs(moveY) > 10) {
          clearTimeout(longPressTimerRef.current);
       }
    } else {
       // We are in dismiss mode, follow finger horizontally
       e.preventDefault(); // Prevent scrolling
       setMiniTranslateX(moveX);
    }
  };

  const handleMiniTouchEnd = (e: React.TouchEvent) => {
    clearTimeout(longPressTimerRef.current);
    if (isDismissMode) {
       // Check threshold to close
       if (Math.abs(miniTranslateX) > 100) {
          // Trigger Close
          if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
          if (onClose) onClose();
       } 
       // Reset
       setIsDismissMode(false);
       setMiniTranslateX(0);
    } else {
       // Just a tap?
       if (touchStartRef.current && Math.abs(e.changedTouches[0].clientX - touchStartRef.current.x) < 10) {
          // Toggle Expand if strictly a tap
          // Logic is usually handled by onClick on the div, but since we have touch listeners, 
          // we might need to rely on the onClick bubbling if we didn't preventDefault.
          // The onClick on the div below handles expansion.
       }
    }
    touchStartRef.current = null;
  };

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isExpanded]);

  if (!currentTrack) return null;

  return (
    <>
      {/* --- FULL SCREEN EXPANDED PLAYER --- */}
      <div 
        className={`fixed inset-0 z-[60] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isExpanded ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ 
          transform: isExpanded && isDragging 
            ? `translate(${translateX}px, ${translateY}px)` 
            : isExpanded ? 'translate(0,0)' : 'translateY(100%)',
          transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.32,0.72,0,1)'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[#0a0a0a] -z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a0000] via-black to-[#1a1a1a] bg-[length:400%_400%] animate-gradient -z-10 opacity-80"></div>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-3xl -z-10"></div>

        {/* Visual Handle Bar for Drag */}
        <div className="w-full flex justify-center pt-3 pb-1">
           <div className="w-12 h-1.5 bg-white/20 rounded-full"></div>
        </div>

        {/* Expanded Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <button onClick={onToggleExpand} className="text-white/70 hover:text-white p-2 bg-white/5 rounded-full">
            <ChevronDown className="w-6 h-6" />
          </button>
          <span className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">Сейчас Играет</span>
          <button className="text-white/70 hover:text-white p-2">
            <MoreHorizontal className="w-6 h-6" />
          </button>
        </div>

        {/* Expanded Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 pb-12 overflow-y-auto no-scrollbar">
          {/* Big Art with Shadow */}
          <div className="w-full max-w-[340px] aspect-square rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(255,46,46,0.25)] mb-10 border border-white/10 relative group shrink-0">
             <img src={currentTrack.cover} alt="Cover" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          {/* Titles */}
          <div className="w-full max-w-[340px] flex items-end justify-between mb-8 shrink-0">
             <div className="flex-1 pr-4">
               <h2 className="text-3xl font-black text-white mb-2 leading-tight line-clamp-2">{currentTrack.title}</h2>
               <p className="text-xl text-[#FF2E2E] font-medium tracking-wide">{currentTrack.artist}</p>
             </div>
             <button className="p-3 bg-white/5 rounded-full text-[#FF2E2E] hover:bg-[#FF2E2E] hover:text-white transition-colors flex-shrink-0 active:scale-90">
               <Heart className="w-7 h-7" />
             </button>
          </div>

          {/* Progress */}
          <div className="w-full max-w-[340px] mb-10 group cursor-pointer shrink-0" onClick={(e) => e.stopPropagation()}>
             <div className="w-full h-1.5 bg-white/10 rounded-full mb-3 overflow-hidden relative">
                <div className="absolute top-0 left-0 h-full bg-[#FF2E2E]" style={{ width: `${progress}%` }}>
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] scale-100 transition-transform"></div>
                </div>
             </div>
             <div className="flex justify-between text-xs text-gray-400 font-mono font-bold">
                <span>1:23</span>
                <span>{currentTrack.duration}</span>
             </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between w-full max-w-[340px] mb-8 shrink-0">
             <Shuffle className="w-6 h-6 text-gray-500 hover:text-white transition-colors" />
             <SkipBack className="w-9 h-9 text-white hover:scale-95 transition-transform active:text-[#FF2E2E]" />
             <button 
               onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
               className="w-20 h-20 bg-[#FF2E2E] rounded-full flex items-center justify-center text-white shadow-[0_0_40px_rgba(255,46,46,0.4)] hover:scale-105 active:scale-95 transition-transform"
             >
               {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
             </button>
             <SkipForward className="w-9 h-9 text-white hover:scale-95 transition-transform active:text-[#FF2E2E]" />
             <Repeat className="w-6 h-6 text-gray-500 hover:text-white transition-colors" />
          </div>
          
          <div className="flex gap-4 shrink-0">
             <span className="text-[10px] text-[#FF2E2E] bg-[#FF2E2E]/10 px-3 py-1 rounded-full border border-[#FF2E2E]/20 uppercase tracking-widest font-bold">Hi-Res Audio</span>
          </div>
        </div>
      </div>


      {/* --- MINI PLAYER (Docked) --- */}
      <div 
        className={`fixed z-50 transition-all duration-300 ease-in-out ${isExpanded ? 'opacity-0 pointer-events-none translate-y-20' : 'opacity-100 translate-y-0'} ${hasBottomNav ? 'bottom-[75px] left-3 right-3 md:bottom-0 md:left-0 md:right-0' : 'bottom-0 left-0 right-0'}`}
        onTouchStart={handleMiniTouchStart}
        onTouchMove={handleMiniTouchMove}
        onTouchEnd={handleMiniTouchEnd}
        style={{ transform: isDismissMode ? `translateX(${miniTranslateX}px)` : undefined }}
      >
        {/* Desktop Wrapper adjustments */}
        <div className="md:pl-[280px] md:pr-[380px] w-full">
           <div 
             onClick={() => { if(!isDismissMode && onToggleExpand) onToggleExpand(); }}
             className={`cursor-pointer mx-auto md:mx-4 md:mb-6 bg-[#1a1a1a]/90 backdrop-blur-3xl border border-white/10 rounded-2xl md:rounded-[3rem] p-2 pr-4 shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex items-center justify-between gap-3 group hover:border-white/20 transition-all ${isDismissMode ? 'scale-95 border-red-500/50 shadow-[0_0_30px_rgba(255,0,0,0.2)]' : ''}`}
           >
              {/* Info */}
              <div className="flex items-center gap-3 overflow-hidden flex-1">
                 <div className="relative w-12 h-12 shrink-0">
                    <img src={currentTrack.cover} alt="Cover" className={`w-full h-full rounded-xl object-cover md:animate-[spin_10s_linear_infinite] ${isPlaying ? 'running' : 'paused'}`} />
                 </div>
                <div className="flex-col overflow-hidden min-w-0">
                  <h4 className="text-white font-bold text-sm truncate leading-tight">{currentTrack.title}</h4>
                  <p className="text-gray-500 text-xs truncate leading-tight">{currentTrack.artist}</p>
                </div>
              </div>

              {/* Desktop Controls (Hidden on Mobile) */}
              <div className="hidden md:flex flex-1 flex-col items-center gap-2 max-w-lg px-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-6">
                  <SkipBack className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                  <button onClick={() => setIsPlaying(!isPlaying)} className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                     {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>
                  <SkipForward className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                </div>
              </div>

              {/* Mobile Play Button */}
              <div className="md:hidden">
                 <button 
                   onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
                   className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                 >
                   {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                 </button>
              </div>

               {/* Desktop Extras */}
               <div className="hidden md:flex items-center justify-end gap-4 w-1/4 min-w-[100px]" onClick={e => e.stopPropagation()}>
                  <Heart className="w-5 h-5 text-gray-400 hover:text-[#FF2E2E] cursor-pointer" />
                  <div className="flex items-center gap-2">
                      <Volume2 className="w-5 h-5 text-gray-400" />
                      <div className="w-20 h-1 bg-white/10 rounded-full">
                        <div className="w-2/3 h-full bg-gray-500"></div>
                      </div>
                  </div>
               </div>

              {/* Mobile Progress Bar Overlay */}
              <div className="md:hidden absolute bottom-0 left-4 right-4 h-[2px] bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-[#FF2E2E]" style={{ width: `${progress}%` }}></div>
              </div>
           </div>
        </div>
      </div>
    </>
  );
};

export default Player;