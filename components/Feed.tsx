
import React, { useState, useEffect } from 'react';
import { FeedItem, FeedItemType, Track, Artist, Service } from '../types';
import { Play, Share2, ArrowRight, Globe, Zap } from 'lucide-react';
import LiquidButton from './LiquidButton';
import LikeButton from './LikeButton';

interface FeedProps {
  items: FeedItem[];
  onPlay: (track: Track) => void;
  onItemClick?: (item: any) => void;
}

const HeroCard: React.FC<{ data: any[] }> = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [data.length]);

  const slide = data[currentSlide];

  return (
    <div className="relative w-full h-[25vh] md:h-[40vh] min-h-[200px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden mb-8 group active:scale-[0.99] transition-all duration-500 shadow-2xl">
      <div key={currentSlide} className="absolute inset-0 animate-fade-in">
         <img src={slide.videoPoster} className="w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-110" alt="Hero" />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
         <div className="absolute inset-0 bg-[#FF2E2E]/5 mix-blend-overlay"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 p-5 md:p-8 max-w-2xl w-full">
         <h2 className="text-xl md:text-4xl font-black text-white leading-tight tracking-tighter mb-2 uppercase drop-shadow-lg">
           {slide.headline}
         </h2>
         <p className="text-[10px] md:text-sm text-gray-300 mb-4 max-w-md font-medium leading-relaxed opacity-90 line-clamp-1">{slide.subline}</p>
         <div className="flex gap-3">
           <LiquidButton className="px-5 py-2.5 text-xs md:text-sm h-10 md:h-12">Слушать</LiquidButton>
         </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 right-6 flex gap-1.5">
         {data.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === currentSlide ? 'w-4 bg-[#FF2E2E]' : 'w-1.5 bg-white/20'}`}></div>
         ))}
      </div>
    </div>
  );
};

const ReleaseCard: React.FC<{ data: Track, onPlay: (t: Track) => void, className?: string }> = ({ data, onPlay, className = "" }) => (
  <div className={`bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[1.8rem] p-3 mb-2 active:bg-white/5 transition-all duration-300 ${className}`}>
    <div className="flex flex-row gap-4 items-center">
      <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-[1.2rem] overflow-hidden shadow-xl shrink-0 group cursor-pointer" onClick={() => onPlay(data)}>
        <img src={data.cover} alt={data.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
           <Play className="text-white fill-current w-6 h-6" />
        </div>
      </div>
      
      <div className="flex-1 min-w-0 flex flex-row items-center justify-between">
        <div className="min-w-0 pr-2">
           <h3 className="text-sm md:text-lg font-bold text-white mb-0.5 truncate">{data.title}</h3>
           <p className="text-gray-500 text-[10px] md:text-sm truncate font-medium">{data.artist}</p>
        </div>
        
        <div className="flex flex-col items-center shrink-0">
          <LikeButton size={18} className="mb-0.5" />
        </div>
      </div>
    </div>
  </div>
);

const HorizontalSquareList: React.FC<{ title?: string, items: any[], onItemClick?: (item: any) => void }> = ({ title, items, onItemClick }) => (
  <div className="mb-8 -mx-4 md:mx-0">
    {title && <h3 className="text-white font-black text-lg mb-3 px-4 md:px-0 tracking-tight uppercase opacity-80">{title}</h3>}
    <div className="flex overflow-x-auto gap-3 px-4 md:px-0 pb-2 no-scrollbar snap-x snap-mandatory">
       {items.map((item: any, idx) => (
         <div 
            key={idx} 
            onClick={() => onItemClick && onItemClick(item)}
            className="snap-start shrink-0 w-[130px] md:w-[160px] flex flex-col gap-2 group active:scale-95 transition-all cursor-pointer"
         >
            <div className="w-full aspect-square rounded-[1.8rem] overflow-hidden relative shadow-lg bg-white/5 isolate">
               <img src={item.image || item.cover} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name || item.title} />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>
            <div className="px-1">
               <h4 className="text-white font-bold text-xs md:text-sm truncate leading-tight">{item.name || item.title}</h4>
               <p className="text-gray-500 text-[9px] md:text-[10px] truncate">{item.followers}</p>
            </div>
         </div>
       ))}
    </div>
  </div>
);

const HorizontalWideList: React.FC<{ title?: string, items: Track[], onPlay: (t: Track) => void }> = ({ title, items, onPlay }) => (
  <div className="mb-8 -mx-4 md:mx-0">
    {title && <h3 className="text-white font-black text-lg mb-3 px-4 md:px-0 tracking-tight uppercase opacity-80">{title}</h3>}
    <div className="flex overflow-x-auto gap-3 px-4 md:px-0 pb-2 no-scrollbar snap-x snap-mandatory">
       {items.map((item, idx) => (
         <div key={idx} className="snap-start shrink-0 w-[80vw] md:w-[320px]">
            <ReleaseCard data={item} onPlay={onPlay} className="mb-0 h-full" />
         </div>
       ))}
    </div>
  </div>
);

const Feed: React.FC<FeedProps> = ({ items, onPlay, onItemClick }) => {
  return (
    <div className="flex flex-col gap-0">
      {items.map((item) => {
        switch (item.type) {
          case FeedItemType.HERO:
            return <HeroCard key={item.id} data={item.data} />;
          case FeedItemType.HORIZONTAL_LIST:
            if (item.id === 'new_releases') {
              return <HorizontalWideList key={item.id} title={item.title} items={item.data} onPlay={onPlay} />;
            }
            return <HorizontalSquareList key={item.id} title={item.title} items={item.data} onItemClick={onItemClick} />;
          case FeedItemType.RELEASE:
            return <ReleaseCard key={item.id} data={item.data} onPlay={onPlay} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default Feed;
