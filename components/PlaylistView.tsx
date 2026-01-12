import React from 'react';
import { ArrowLeft, Play, Shuffle, Clock, MoreHorizontal, Heart } from 'lucide-react';
import { Track } from '../types';
import { MOCK_TRACKS } from '../constants';

interface PlaylistViewProps {
  playlist: any;
  onClose: () => void;
  onPlay: (track: Track) => void;
}

const PlaylistView: React.FC<PlaylistViewProps> = ({ playlist, onClose, onPlay }) => {
  // Mock playlist tracks by repeating mock tracks
  const playlistTracks = [...MOCK_TRACKS, ...MOCK_TRACKS].slice(0, 8);

  return (
    <div className="fixed inset-0 z-[60] bg-black overflow-y-auto animate-fade-in custom-scrollbar">
      {/* Header Image Background */}
      <div className="relative h-[45vh] w-full">
         <img src={playlist.image} className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black"></div>
         
         {/* Back Button */}
         <button 
           onClick={onClose}
           className="absolute top-safe left-4 mt-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10 active:scale-90 transition-transform z-20"
         >
            <ArrowLeft className="w-6 h-6" />
         </button>
      </div>

      <div className="px-4 -mt-20 relative z-10 pb-32">
         {/* Playlist Info */}
         <div className="flex flex-col items-center text-center mb-8">
            <h1 className="text-4xl font-black text-white mb-2 leading-none">{playlist.name}</h1>
            <p className="text-gray-400 font-medium mb-4">{playlist.followers}</p>
            
            <div className="flex items-center gap-4">
               <button className="w-14 h-14 rounded-full bg-[#FF2E2E] flex items-center justify-center text-white shadow-[0_0_30px_#FF2E2E] active:scale-90 transition-transform">
                  <Play className="w-6 h-6 fill-current ml-1" />
               </button>
               <button className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/10 active:scale-90 transition-transform">
                  <Shuffle className="w-6 h-6" />
               </button>
            </div>
         </div>

         {/* Tracks List */}
         <div className="flex flex-col gap-1">
            {playlistTracks.map((track, idx) => (
               <div 
                  key={`${track.id}-${idx}`}
                  onClick={() => onPlay(track)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors cursor-pointer group"
               >
                  <span className="text-gray-500 font-mono text-sm w-4">{idx + 1}</span>
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5 relative">
                     <img src={track.cover} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-4 h-4 text-white fill-current" />
                     </div>
                  </div>
                  <div className="flex-1 min-w-0">
                     <h4 className="text-white font-bold text-sm truncate">{track.title}</h4>
                     <p className="text-gray-400 text-xs truncate">{track.artist}</p>
                  </div>
                  <div className="flex items-center gap-3">
                     <Heart className="w-4 h-4 text-gray-600 hover:text-[#FF2E2E]" />
                     <span className="text-gray-600 text-xs font-mono">{track.duration}</span>
                     <MoreHorizontal className="w-4 h-4 text-gray-600" />
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default PlaylistView;