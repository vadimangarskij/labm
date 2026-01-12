import React from 'react';
import { FeedItem, FeedItemType, Track, Artist, Service } from '../types';
import { Play, Heart, Share2, ArrowRight, Globe } from 'lucide-react';
import LiquidButton from './LiquidButton';

interface FeedProps {
  items: FeedItem[];
  onPlay: (track: Track) => void;
  onItemClick?: (item: any) => void;
}

// --- Cards Components ---

const HeroCard: React.FC<{ data: any }> = ({ data }) => (
  // Adjusted height for mobile: h-[35vh] for compactness
  <div className="relative w-full h-[35vh] md:h-[65vh] min-h-[250px] rounded-[2rem] md:rounded-[3.5rem] overflow-hidden mb-8 group active:scale-[0.98] transition-transform duration-500 ease-out shadow-2xl">
    <div className="absolute inset-0">
       <img src={data.videoPoster} className="w-full h-full object-cover transition-transform duration-[15s] group-hover:scale-110" alt="Hero" />
       <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-black/40 to-transparent"></div>
       <div className="absolute inset-0 bg-[#FF2E2E]/20 mix-blend-overlay"></div>
    </div>
    
    <div className="absolute bottom-0 left-0 p-5 md:p-12 max-w-3xl w-full">
       <div className="inline-block px-3 py-1 mb-2 md:mb-4 rounded-full border border-white/20 bg-black/30 backdrop-blur-md">
         <span className="text-[10px] md:text-xs font-bold text-[#FF2E2E] tracking-widest uppercase">Главное</span>
       </div>
       <h2 className="text-2xl md:text-7xl font-black text-white leading-tight md:leading-[0.95] tracking-tighter mb-2 md:mb-4 drop-shadow-xl uppercase">
         {data.headline.split('. ').map((part: string, i: number) => (
           <span key={i} className="block">{part}</span>
         ))}
       </h2>
       <p className="text-xs md:text-xl text-gray-200 mb-4 md:mb-8 max-w-xl font-medium leading-relaxed opacity-90 line-clamp-2">{data.subline}</p>
       <div className="flex gap-3 md:gap-4">
         <LiquidButton className="text-xs md:text-base py-2.5 px-5 md:py-4">Слушать</LiquidButton>
         <LiquidButton variant="secondary" className="text-xs md:text-base py-2.5 px-5 md:py-4">Видео</LiquidButton>
       </div>
    </div>
  </div>
);

const ReleaseCard: React.FC<{ data: Track, onPlay: (t: Track) => void, className?: string }> = ({ data, onPlay, className = "" }) => (
  <div className={`bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2rem] p-4 md:p-6 mb-4 active:bg-white/10 active:scale-[0.99] transition-all duration-300 ${className}`}>
    <div className="flex flex-row gap-4 items-center">
      <div className="relative w-16 h-16 md:w-32 md:h-32 rounded-[1.2rem] md:rounded-[1.5rem] overflow-hidden shadow-2xl shrink-0 group cursor-pointer" onClick={() => onPlay(data)}>
        <img src={data.cover} alt={data.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
           <Play className="text-white fill-current w-6 h-6 md:w-8 md:h-8" />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
           <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#FF2E2E] shadow-[0_0_5px_#FF2E2E]"></span>
           <span className="text-[#FF2E2E] text-[10px] font-bold tracking-widest uppercase">Новинка</span>
        </div>
        <h3 className="text-base md:text-2xl font-bold text-white mb-0.5 truncate">{data.title}</h3>
        <p className="text-gray-400 text-xs md:text-lg mb-2 md:mb-3 truncate">{data.artist}</p>
        
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-[#FF2E2E] transition-colors"><Heart className="w-4 h-4 md:w-5 md:h-5" /></button>
          <button className="text-gray-500 hover:text-white transition-colors"><Share2 className="w-4 h-4 md:w-5 md:h-5" /></button>
          <span className="text-gray-600 text-[10px] md:text-xs font-mono ml-auto">{data.duration}</span>
        </div>
      </div>
    </div>
  </div>
);

const ServiceCard: React.FC<{ data: Service }> = ({ data }) => (
  <div className="bg-gradient-to-br from-[#111] to-black border border-white/5 rounded-[2.5rem] p-6 mb-4 relative overflow-hidden active:scale-[0.99] transition-transform duration-300 group">
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF2E2E]/10 rounded-full blur-[40px] translate-x-10 -translate-y-10 group-hover:bg-[#FF2E2E]/20 transition-colors"></div>
    
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#FF2E2E] border border-white/10">
           <Globe className="w-5 h-5" />
        </div>
        <span className="bg-[#FF2E2E] text-black text-xs font-bold px-2 py-1 rounded-md">{data.price}</span>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">{data.title}</h3>
      <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2">{data.description}</p>
      
      <div className="mt-auto flex items-center text-white font-bold text-sm group cursor-pointer">
        <span>Подробнее</span>
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </div>
);

// --- Horizontal Scroll Containers ---

// 1. Square Cards (Artists / Popular Releases)
const HorizontalSquareList: React.FC<{ title?: string, items: any[], onItemClick?: (item: any) => void }> = ({ title, items, onItemClick }) => (
  <div className="mb-6 -mx-4 md:mx-0">
    {title && <h3 className="text-white font-bold text-lg mb-3 px-4 md:px-0 tracking-tight">{title}</h3>}
    <div className="flex overflow-x-auto gap-3 px-4 md:px-0 pb-4 no-scrollbar snap-x snap-mandatory scroll-pl-4">
       {items.map((item: any, idx) => (
         // Added transform-gpu and mask logic to prevent border-radius breaking on scale
         <div 
            key={idx} 
            onClick={() => onItemClick && onItemClick(item)}
            className="snap-start shrink-0 w-[130px] md:w-[180px] flex flex-col gap-2 group active:scale-95 transition-transform transform-gpu cursor-pointer"
         >
            <div className="w-full aspect-square rounded-[1.8rem] md:rounded-[2rem] overflow-hidden relative shadow-lg bg-white/5 isolate">
               <img src={item.image || item.cover} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name || item.title} />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
               {/* Optional Tag: Genre or Artist Name for Tracks */}
               <div className="absolute bottom-2 left-0 right-0 text-center px-1">
                  <span className="text-[10px] bg-[#FF2E2E]/90 text-white px-1.5 py-0.5 rounded font-bold backdrop-blur-sm truncate max-w-full block">
                    {item.genre || item.artist}
                  </span>
               </div>
            </div>
            <div className="px-1">
               <h4 className="text-white font-bold text-xs md:text-sm truncate leading-tight">{item.name || item.title}</h4>
               {item.followers && <p className="text-gray-500 text-[10px] md:text-xs truncate">{item.followers}</p>}
            </div>
         </div>
       ))}
    </div>
  </div>
);

// 2. Wide Cards (New Releases - Scrollable)
const HorizontalWideList: React.FC<{ title?: string, items: Track[], onPlay: (t: Track) => void }> = ({ title, items, onPlay }) => (
  <div className="mb-6 -mx-4 md:mx-0">
    {title && <h3 className="text-white font-bold text-lg mb-3 px-4 md:px-0 tracking-tight">{title}</h3>}
    <div className="flex overflow-x-auto gap-4 px-4 md:px-0 pb-4 no-scrollbar snap-x snap-mandatory scroll-pl-4">
       {items.map((item, idx) => (
         <div key={idx} className="snap-start shrink-0 w-[85vw] md:w-[400px]">
            {/* Reuse ReleaseCard but remove bottom margin since we are in a flex row */}
            <ReleaseCard data={item} onPlay={onPlay} className="mb-0 h-full" />
         </div>
       ))}
    </div>
  </div>
);

const ArtistCard: React.FC<{ data: Artist }> = ({ data }) => (
  <div className="relative h-[250px] md:h-[300px] rounded-[2.5rem] overflow-hidden mb-4 active:scale-[0.99] transition-transform duration-300 group">
    <img src={data.image} alt={data.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
    
    <div className="absolute bottom-0 left-0 p-5 w-full">
       <div className="flex items-end justify-between">
         <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{data.name}</h3>
            <div className="flex items-center gap-2">
               <span className="text-[#FF2E2E] text-xs font-bold bg-[#FF2E2E]/10 px-2 py-0.5 rounded">{data.genre}</span>
               <span className="text-gray-400 text-xs">{data.followers}</span>
            </div>
         </div>
         <button className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-[#FF2E2E] hover:text-white transition-colors">
           <ArrowRight className="w-5 h-5 -rotate-45" />
         </button>
       </div>
    </div>
  </div>
);

const Feed: React.FC<FeedProps> = ({ items, onPlay, onItemClick }) => {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => {
        switch (item.type) {
          case FeedItemType.HERO:
            return <HeroCard key={item.id} data={item.data} />;
          
          case FeedItemType.HORIZONTAL_LIST:
            // Check ID to determine which style of horizontal list to render
            if (item.id === 'new_releases') {
              return <HorizontalWideList key={item.id} title={item.title} items={item.data} onPlay={onPlay} />;
            }
            // Default to Square list (Popular Releases, Artists, Playlists)
            return <HorizontalSquareList key={item.id} title={item.title} items={item.data} onItemClick={onItemClick} />;
            
          case FeedItemType.RELEASE:
            return <ReleaseCard key={item.id} data={item.data} onPlay={onPlay} />;
          case FeedItemType.SERVICE:
            return <ServiceCard key={item.id} data={item.data} />;
          case FeedItemType.ARTIST:
            return <ArtistCard key={item.id} data={item.data} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default Feed;