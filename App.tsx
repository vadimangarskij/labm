
import React, { useState } from 'react';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import Feed from './components/Feed';
import Player from './components/Player';
import Laboratory from './components/Laboratory';
import PlaylistView from './components/PlaylistView';
import { FEED_ITEMS, MUSIC_FEED_ITEMS, MOCK_TRACKS, MOCK_SERVICES } from './constants';
import { Track } from './types';
import { Home, Search, MessageSquare, User, Settings, LogOut, X, Music, FlaskConical, Calendar, ArrowRight, Zap, Globe } from 'lucide-react';
import LiquidButton from './components/LiquidButton';

type Tab = 'flow' | 'events' | 'chat' | 'profile' | 'music' | 'lab';

const App: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(MOCK_TRACKS[0]);
  const [activeTab, setActiveTab] = useState<Tab>('flow');
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null);

  const handleProfileClick = () => {
    setIsProfileMenuOpen(false);
    setActiveTab('profile');
  };

  const handlePlaylistClick = (playlist: any) => {
    if (playlist.genre === 'Плейлист' || activeTab === 'music') {
       setSelectedPlaylist(playlist);
    }
  };

  const renderMobileContent = () => {
    switch (activeTab) {
      case 'flow':
        return (
          <div className="animate-fade-in pb-32">
             <Feed items={FEED_ITEMS} onPlay={setCurrentTrack} onItemClick={handlePlaylistClick} />
          </div>
        );
      case 'music':
        return (
          <div className="animate-fade-in pb-32">
             <Feed items={MUSIC_FEED_ITEMS} onPlay={setCurrentTrack} onItemClick={handlePlaylistClick} />
          </div>
        );
      case 'lab':
        return (
          <div className="h-[100dvh] animate-fade-in absolute inset-0 z-10 bg-black">
             <Laboratory onPlay={setCurrentTrack} currentTrack={currentTrack} />
          </div>
        );
      case 'events':
        return (
          <div className="animate-fade-in p-4 pb-32">
             <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight opacity-90">Мероприятия</h2>
             <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                   <div key={i} className="flex flex-col gap-2 group cursor-pointer active:scale-95 transition-all">
                      <div className="relative aspect-square rounded-[1.8rem] overflow-hidden border border-white/5 bg-white/5">
                        <img src={`https://picsum.photos/seed/event${i}/400/400`} className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        <div className="absolute top-2 left-2">
                           <span className="bg-[#FF2E2E] text-white text-[8px] font-black px-2 py-0.5 rounded-md uppercase">
                              {i % 2 === 0 ? '24 МАЯ' : '15 ИЮНЯ'}
                           </span>
                        </div>
                      </div>
                      <div className="px-1">
                         <h3 className="text-[11px] font-black text-white uppercase leading-tight line-clamp-2">
                            {i === 1 ? 'CYBER FOLK' : i === 2 ? 'INDUSTRIAL' : i === 3 ? 'BASS NIGHT' : 'TECHNO LAB'}
                         </h3>
                         <p className="text-gray-500 text-[9px] mt-0.5 font-bold uppercase tracking-tighter">MAX LAB SESSION</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        );
      case 'chat':
        return (
          <div className="h-[calc(100dvh-140px)] animate-fade-in relative">
             <SidebarRight isMobile />
          </div>
        );
      case 'profile':
        return (
           <div className="flex flex-col items-center pt-10 animate-fade-in px-4 pb-40">
              <div className="relative w-32 h-32 mb-6">
                <div className="absolute inset-0 bg-[#FF2E2E] rounded-full blur-xl opacity-40 animate-pulse-slow"></div>
                <img src="https://picsum.photos/seed/user/200/200" className="relative w-full h-full rounded-full object-cover border-2 border-white" />
              </div>
              <h2 className="text-3xl font-black text-white mb-1 tracking-tight">ALEX MAX</h2>
              <div className="flex items-center gap-2 mb-8">
                <span className="px-3 py-1 bg-[#FF2E2E]/10 rounded-full text-xs font-bold text-[#FF2E2E] uppercase tracking-wider border border-[#FF2E2E]/20">Resident Artist</span>
              </div>
              <div className="w-full space-y-4 max-w-md">
                 <LiquidButton fullWidth variant="secondary" className="justify-between group">
                    <span>Личный Кабинет</span>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                 </LiquidButton>
                 <LiquidButton fullWidth variant="ghost" className="justify-center text-red-500 mt-8 border border-red-500/10 bg-red-500/5">Выйти</LiquidButton>
              </div>
           </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black text-white font-sans overflow-hidden">
      
      {/* Search Overlay */}
      <div className={`fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl transition-all duration-500 flex flex-col ${isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
         <div className="p-6 flex items-center gap-4">
            <div className="flex-1 relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
               <input autoFocus={isSearchOpen} type="text" placeholder="Поиск по лаборатории..." className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-lg focus:outline-none focus:border-[#FF2E2E]" />
            </div>
            <button onClick={() => setIsSearchOpen(false)} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10"><X /></button>
         </div>
         <div className="p-6">
            <h4 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">Недавние поиски</h4>
            <div className="flex flex-wrap gap-2">
               {['Industrial', 'Nemiga', 'Cyberpunk', '2077'].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/5 rounded-full text-sm border border-white/5">{tag}</span>
               ))}
            </div>
         </div>
      </div>

      {selectedPlaylist && <PlaylistView playlist={selectedPlaylist} onClose={() => setSelectedPlaylist(null)} onPlay={setCurrentTrack} />}

      {/* Profile/Services Sheet */}
      <div className={`fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isProfileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsProfileMenuOpen(false)} />
      <div className={`fixed bottom-0 left-0 right-0 z-[71] bg-[#0a0a0a] rounded-t-[3rem] border-t border-white/10 md:hidden transform transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${isProfileMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="w-full p-6 pb-safe">
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8"></div>
            <div className="flex items-center gap-4 mb-10">
                <img src="https://picsum.photos/seed/user/200/200" className="w-16 h-16 rounded-full border-2 border-[#FF2E2E]" />
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-white">ALEX MAX</h3>
                  <p className="text-gray-500 text-sm tracking-tight">Pro Account</p>
                </div>
                <button onClick={() => setIsProfileMenuOpen(false)} className="p-3 bg-white/5 rounded-full"><X className="w-5 h-5" /></button>
            </div>

            <div className="mb-8">
               <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4 ml-2">Услуги MAX LAB</h4>
               <div className="space-y-3">
                  {MOCK_SERVICES.map(service => (
                     <div key={service.id} className="p-5 bg-white/5 rounded-[1.8rem] border border-white/5 flex items-center justify-between group active:scale-95 transition-all">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-[#FF2E2E]/10 flex items-center justify-center text-[#FF2E2E]">
                              {service.id === 's1' ? <Zap className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                           </div>
                           <div>
                              <p className="text-white font-bold">{service.title}</p>
                              <p className="text-xs text-gray-500">{service.description}</p>
                           </div>
                        </div>
                        <span className="text-[#FF2E2E] font-black text-sm">{service.price}</span>
                     </div>
                  ))}
               </div>
            </div>

            <nav className="space-y-3">
                <button onClick={handleProfileClick} className="w-full p-5 bg-white/5 rounded-[1.5rem] flex items-center gap-4 hover:bg-white/10 active:scale-[0.98] transition-all">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="font-bold text-lg">Профиль</span>
                </button>
                <button className="w-full p-5 bg-white/5 rounded-[1.5rem] flex items-center gap-4 text-red-400">
                  <LogOut className="w-5 h-5" />
                  <span className="font-bold text-lg">Выйти</span>
                </button>
            </nav>
          </div>
      </div>

      <div className="relative z-10 h-full flex flex-col md:flex-row">
        <aside className="hidden md:block w-[280px] h-full border-r border-white/5 bg-black/20 backdrop-blur-3xl z-20">
          <SidebarLeft />
        </aside>

        <main className="flex-1 h-full relative flex flex-col overflow-hidden">
           {activeTab !== 'lab' && !selectedPlaylist && (
             <div className="md:hidden flex-none z-40 bg-black/80 backdrop-blur-xl border-b border-white/5 pt-safe px-6 pb-4 flex justify-between items-center h-[90px]">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-[#FF2E2E] flex items-center justify-center shadow-[0_0_15px_rgba(255,46,46,0.5)]">
                    <FlaskConical className="w-5 h-5 text-black" />
                 </div>
                 <span className="text-white font-black text-2xl tracking-tighter">MAX LAB</span>
               </div>
               <div className="flex items-center gap-4">
                  <button onClick={() => setIsSearchOpen(true)} className="p-2 bg-white/5 rounded-full"><Search className="w-5 h-5" /></button>
                  <button onClick={() => setIsProfileMenuOpen(true)} className="relative active:scale-95 transition-transform">
                    <img src="https://picsum.photos/seed/user/100/100" className="w-10 h-10 rounded-full border border-white/20" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#FF2E2E] rounded-full border-2 border-black"></div>
                 </button>
               </div>
             </div>
           )}

           <div className={`flex-1 overflow-y-auto no-scrollbar ${activeTab === 'chat' || activeTab === 'lab' ? 'overflow-hidden' : ''}`}>
             <div className={`max-w-4xl mx-auto h-full md:p-8 ${activeTab === 'lab' ? 'p-0 max-w-none' : ''}`}>
               <div className="md:hidden h-full">
                  <div className={`h-full ${activeTab === 'flow' || activeTab === 'music' ? 'px-4 pt-4' : ''}`}>
                    {renderMobileContent()}
                  </div>
               </div>
               <div className="hidden md:block">
                  <Feed items={FEED_ITEMS} onPlay={setCurrentTrack} onItemClick={handlePlaylistClick} />
               </div>
             </div>
           </div>
        </main>

        <aside className="hidden xl:block w-[380px] h-full border-l border-white/5 bg-black/20 backdrop-blur-3xl z-20">
          <SidebarRight />
        </aside>
      </div>

      {activeTab !== 'lab' && (
        <Player 
          currentTrack={currentTrack} 
          isExpanded={isPlayerExpanded} 
          onToggleExpand={() => setIsPlayerExpanded(!isPlayerExpanded)} 
          hasBottomNav={true}
          onClose={() => setCurrentTrack(null)}
        />
      )}

      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-[50] pb-safe transition-all duration-300 ${activeTab === 'lab' ? 'bg-transparent border-t-0' : 'bg-black/95 backdrop-blur-xl border-t border-white/5'}`}>
        <div className="flex justify-around items-center h-16 px-2">
          <NavButton icon={Home} isActive={activeTab === 'flow'} onClick={() => setActiveTab('flow')} />
          <NavButton icon={Calendar} isActive={activeTab === 'events'} onClick={() => setActiveTab('events')} />
          
          <div className="relative z-50 flex items-center justify-center w-16 h-16">
             <button 
                onClick={() => setActiveTab('lab')}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl
                  ${activeTab === 'lab' 
                    ? 'bg-[#FF2E2E] shadow-[0_0_30px_#FF2E2E] scale-110' 
                    : 'bg-[#111] border border-[#FF2E2E] hover:scale-105'
                  }`}
             >
               <FlaskConical className={`w-7 h-7 transition-colors ${activeTab === 'lab' ? 'text-black' : 'text-[#FF2E2E]'}`} />
               {activeTab !== 'lab' && <div className="absolute inset-0 rounded-full animate-lab-pulse -z-10"></div>}
             </button>
          </div>

          <NavButton icon={MessageSquare} isActive={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
          <NavButton icon={Music} isActive={activeTab === 'music'} onClick={() => setActiveTab('music')} />
        </div>
      </div>
    </div>
  );
};

const NavButton = ({ icon: Icon, isActive, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-2 w-16 transition-all duration-300 ${isActive ? 'text-[#FF2E2E]' : 'text-gray-500'}`}
  >
    <Icon className={`w-7 h-7 ${isActive ? 'fill-current' : ''}`} />
    <div className={`mt-1.5 w-1 h-1 rounded-full bg-[#FF2E2E] transition-all duration-300 ${isActive ? 'opacity-100 scale-100 shadow-[0_0_8px_#FF2E2E]' : 'opacity-0 scale-0'}`}></div>
  </button>
);

export default App;
