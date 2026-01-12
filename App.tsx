import React, { useState } from 'react';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import Feed from './components/Feed';
import Player from './components/Player';
import Laboratory from './components/Laboratory';
import PlaylistView from './components/PlaylistView';
import { FEED_ITEMS, MUSIC_FEED_ITEMS, MOCK_TRACKS } from './constants';
import { Track } from './types';
import { Home, Search, MessageSquare, User, Settings, LogOut, X, Music, FlaskConical } from 'lucide-react';
import LiquidButton from './components/LiquidButton';

type Tab = 'flow' | 'explore' | 'chat' | 'profile' | 'music' | 'lab';

const App: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(MOCK_TRACKS[0]);
  const [activeTab, setActiveTab] = useState<Tab>('flow');
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null);

  const handleProfileClick = () => {
    setIsProfileMenuOpen(false);
    setActiveTab('profile');
  };

  const handlePlaylistClick = (playlist: any) => {
     // Check if it looks like a playlist (for now simply by checking 'genre' or if it's in the music tab)
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
        // Laboratory takes full height, no bottom padding needed inside because it handles it
        return (
          <div className="h-[100dvh] animate-fade-in absolute inset-0 z-10 bg-black">
             <Laboratory onPlay={setCurrentTrack} currentTrack={currentTrack} />
          </div>
        );
      case 'chat':
        return (
          // Height calculation: 100dvh minus header and bottom spacing
          <div className="h-[calc(100dvh-140px)] animate-fade-in relative">
             <SidebarRight isMobile />
          </div>
        );
      case 'explore':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500 animate-fade-in">
             <Search className="w-16 h-16 mb-6 opacity-20" />
             <p className="font-medium text-lg">Поиск скоро будет доступен</p>
             <p className="text-xs text-gray-600 mt-2">Индексация базы...</p>
          </div>
        );
      case 'profile':
        return (
           <div className="flex flex-col items-center pt-10 animate-fade-in px-4 pb-32">
              <div className="relative w-32 h-32 mb-6">
                <div className="absolute inset-0 bg-[#FF2E2E] rounded-full blur-xl opacity-40 animate-pulse-slow"></div>
                <img src="https://picsum.photos/seed/user/200/200" className="relative w-full h-full rounded-full object-cover border-2 border-white" />
                <div className="absolute bottom-1 right-1 bg-black rounded-full p-1 border border-white/20">
                    <div className="w-4 h-4 bg-[#FF2E2E] rounded-full"></div>
                </div>
              </div>
              
              <h2 className="text-3xl font-black text-white mb-1 tracking-tight">Alex K.</h2>
              <div className="flex items-center gap-2 mb-8">
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-[#FF2E2E] uppercase tracking-wider">PRO Продюсер</span>
              </div>
              
              <div className="w-full space-y-4 max-w-md">
                 <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                        <span className="block text-2xl font-bold text-white">12</span>
                        <span className="text-xs text-gray-400 uppercase">Релизов</span>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                        <span className="block text-2xl font-bold text-white">45k</span>
                        <span className="text-xs text-gray-400 uppercase">Слушателей</span>
                    </div>
                 </div>
                 <LiquidButton fullWidth variant="secondary" className="justify-between group">
                    <span>Мои Демо</span>
                    <span className="w-2 h-2 rounded-full bg-[#FF2E2E] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                 </LiquidButton>
                 <LiquidButton fullWidth variant="secondary" className="justify-start">Статистика</LiquidButton>
                 <LiquidButton fullWidth variant="ghost" className="justify-center text-red-500 mt-8 border border-red-500/20 bg-red-500/5">Выйти из аккаунта</LiquidButton>
              </div>
           </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-[#000000] text-white font-sans overflow-hidden selection:bg-[#FF2E2E] selection:text-white">
      
      {/* Playlist Detail View Overlay */}
      {selectedPlaylist && (
        <PlaylistView 
           playlist={selectedPlaylist} 
           onClose={() => setSelectedPlaylist(null)} 
           onPlay={setCurrentTrack}
        />
      )}

      {/* --- User Profile Sheet (Mobile Bottom Sheet) --- */}
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isProfileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsProfileMenuOpen(false)}
      />
      
      {/* Sheet */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-[71] bg-[#111] rounded-t-[2.5rem] border-t border-white/10 md:hidden transform transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${isProfileMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
          <div className="w-full p-6 pb-safe">
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-8"></div>
            
            <div className="flex items-center gap-4 mb-8">
                <img src="https://picsum.photos/seed/user/200/200" className="w-16 h-16 rounded-full border-2 border-[#FF2E2E]" />
                <div>
                  <h3 className="font-bold text-xl text-white">Alex K.</h3>
                  <p className="text-gray-400 text-sm">alex.k@redflow.by</p>
                </div>
                <button 
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="ml-auto p-2 bg-white/5 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
            </div>

            <nav className="space-y-3">
                {/* New: Link to Profile Page */}
                <button 
                  onClick={handleProfileClick}
                  className="w-full p-5 bg-white/5 rounded-[1.5rem] flex items-center gap-4 text-left hover:bg-white/10 active:scale-[0.98] transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FF2E2E]/10 flex items-center justify-center text-[#FF2E2E]">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-lg">Мой Профиль</span>
                </button>

                <button className="w-full p-5 bg-white/5 rounded-[1.5rem] flex items-center gap-4 text-left hover:bg-white/10 active:scale-[0.98] transition-all">
                  <div className="w-10 h-10 rounded-full bg-gray-500/10 flex items-center justify-center text-gray-400">
                    <Settings className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-lg">Настройки</span>
                </button>
                <button className="w-full p-5 bg-white/5 rounded-[1.5rem] flex items-center gap-4 text-left hover:bg-white/10 active:scale-[0.98] transition-all text-red-400">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                    <LogOut className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-lg">Выйти</span>
                </button>
            </nav>
            <div className="mt-8 text-center text-xs text-gray-600 font-mono">
               Версия 4.0.2 (Beta)
            </div>
          </div>
      </div>

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
         <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[50%] bg-[#FF2E2E]/10 rounded-full blur-[120px] animate-pulse-slow"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[40%] bg-[#0a0a20] rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col md:flex-row">
        {/* Left Sidebar (Desktop Only) */}
        <aside className="hidden md:block w-[280px] h-full border-r border-white/5 bg-black/20 backdrop-blur-3xl z-20">
          <SidebarLeft />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 h-full relative flex flex-col">
           {/* Mobile Top Bar - Hide in Laboratory Mode for Full Screen */}
           {activeTab !== 'lab' && !selectedPlaylist && (
             <div className="md:hidden flex-none z-40 bg-[#000000]/90 backdrop-blur-xl border-b border-white/5 pt-safe px-4 pb-3 flex justify-between items-center transition-all duration-300">
               <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-[#FF2E2E] flex items-center justify-center shadow-[0_0_10px_#FF2E2E]">
                   <div className="w-3 h-3 bg-black rounded-full animate-pulse"></div>
                 </div>
                 <span className="text-white font-black text-lg tracking-tighter">RED FLOW</span>
               </div>
               
               {/* Profile Avatar Trigger - Fixed Alignment */}
               <div className="flex items-center">
                 <button onClick={() => setIsProfileMenuOpen(true)} className="relative group active:scale-95 transition-transform block">
                    <img src="https://picsum.photos/seed/user/100/100" className="w-9 h-9 rounded-full border border-white/20 block" />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#FF2E2E] rounded-full border-2 border-black"></div>
                 </button>
               </div>
             </div>
           )}

           {/* Scrollable Content */}
           <div className={`flex-1 overflow-y-auto custom-scrollbar no-scrollbar ${activeTab === 'chat' || activeTab === 'lab' ? 'overflow-hidden' : ''}`}>
             <div className={`max-w-4xl mx-auto h-full md:p-8 md:pt-10 ${activeTab === 'lab' ? 'p-0 max-w-none' : ''}`}>
               {/* Desktop View */}
               <div className="hidden md:block p-8">
                  <Feed items={FEED_ITEMS} onPlay={setCurrentTrack} onItemClick={handlePlaylistClick} />
               </div>
               {/* Mobile View */}
               <div className="md:hidden h-full">
                  <div className={`h-full ${activeTab === 'flow' || activeTab === 'music' ? 'px-4 pt-4' : ''}`}>
                    {renderMobileContent()}
                  </div>
               </div>
             </div>
           </div>
        </main>

        {/* Right Sidebar (Desktop Only) */}
        <aside className="hidden xl:block w-[380px] h-full border-l border-white/5 bg-black/20 backdrop-blur-3xl z-20">
          <SidebarRight />
        </aside>
      </div>

      {/* Global Player - Hide when in Lab mode to avoid overlap with lab controls? Or keep it? 
          Let's keep it but maybe it sits on top. For now, native apps usually hide the miniplayer when in a specific "Focus" feed.
          Let's hide global player in 'lab' mode because lab has its own controls.
      */}
      {activeTab !== 'lab' && (
        <Player 
          currentTrack={currentTrack} 
          isExpanded={isPlayerExpanded} 
          onToggleExpand={() => setIsPlayerExpanded(!isPlayerExpanded)} 
          hasBottomNav={true}
          onClose={() => setCurrentTrack(null)}
        />
      )}

      {/* Mobile Bottom Nav */}
      {/* We make the background transparent in Lab mode for immersion */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-[50] pb-safe transition-all duration-300 ${activeTab === 'lab' ? 'bg-gradient-to-t from-black via-black/80 to-transparent border-t-0' : 'bg-[#050505]/95 backdrop-blur-xl border-t border-white/5'}`}>
        <div className="flex justify-around items-center h-16 px-2">
          <NavButton 
            icon={Home} 
            label="Поток" 
            isActive={activeTab === 'flow'} 
            onClick={() => setActiveTab('flow')} 
          />
          <NavButton 
            icon={Search} 
            label="Обзор" 
            isActive={activeTab === 'explore'} 
            onClick={() => setActiveTab('explore')} 
          />
          
          {/* Central Action Button - ANIMATED LAB BUTTON */}
          <div className="relative -top-6 group z-50">
             <button 
                onClick={() => setActiveTab('lab')}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 
                  ${activeTab === 'lab' 
                    ? 'bg-[#FF2E2E] shadow-[0_0_30px_#FF2E2E] scale-110' 
                    : 'bg-[#111] border border-[#FF2E2E] animate-lab-pulse'
                  }`}
             >
               <FlaskConical className={`w-7 h-7 transition-colors ${activeTab === 'lab' ? 'text-white' : 'text-[#FF2E2E]'}`} />
               {/* Inner Liquid Wave Effect (CSS) */}
               {activeTab !== 'lab' && (
                 <div className="absolute inset-1 rounded-full bg-[#FF2E2E] opacity-20 blur-sm animate-pulse"></div>
               )}
             </button>
          </div>

          <NavButton 
            icon={MessageSquare} 
            label="Чат" 
            isActive={activeTab === 'chat'} 
            onClick={() => setActiveTab('chat')} 
          />
          
          <NavButton 
            icon={Music} 
            label="Музыка" 
            isActive={activeTab === 'music'} 
            onClick={() => setActiveTab('music')} 
          />
        </div>
      </div>
    </div>
  );
};

const NavButton = ({ icon: Icon, label, isActive, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 p-2 w-16 transition-all duration-300 ${isActive ? 'text-[#FF2E2E]' : 'text-gray-500'}`}
  >
    <Icon className={`w-6 h-6 ${isActive ? 'fill-current drop-shadow-[0_0_8px_rgba(255,46,46,0.6)]' : ''}`} />
    <span className={`text-[10px] font-medium tracking-wide ${isActive ? 'opacity-100' : 'opacity-70'}`}>{label}</span>
  </button>
);

export default App;