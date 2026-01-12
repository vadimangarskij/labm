import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, TrendingUp, Bell } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

interface SidebarRightProps {
  isMobile?: boolean;
}

const SidebarRight: React.FC<SidebarRightProps> = ({ isMobile = false }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'model', text: 'Привет. Я AI Лейбла. Помогу с контрактами и анализом треков. Спрашивай.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
    const responseText = await sendMessageToGemini(userMsg.text, history);

    const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className={`flex flex-col h-full ${isMobile ? 'pb-0' : 'p-6'}`}>
      
      {!isMobile && (
        <div className="flex justify-end gap-4 mb-2 flex-none">
           <div className="relative cursor-pointer group">
              <Bell className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF2E2E] rounded-full shadow-[0_0_10px_#FF2E2E]"></span>
           </div>
        </div>
      )}

      {!isMobile && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-5 flex-none mb-4">
          <div className="flex items-center gap-2 mb-4 text-[#FF2E2E]">
            <TrendingUp className="w-4 h-4" />
            <h3 className="font-bold text-xs tracking-wider uppercase">В тренде (Минск)</h3>
          </div>
          {/* ... Trending List Content ... */}
           <ul className="space-y-3">
            {[1, 2, 3].map((i) => (
              <li key={i} className="flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-1 rounded-xl transition-colors">
                <span className="text-gray-600 font-mono text-xs">0{i}</span>
                <div className="w-8 h-8 rounded-lg bg-gray-800 overflow-hidden">
                  <img src={`https://picsum.photos/seed/trend${i}/100/100`} alt="Album" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">Neon Nights {i}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Chat Container */}
      <div className={`flex-1 flex flex-col overflow-hidden relative shadow-2xl ${isMobile ? 'rounded-none' : 'bg-gradient-to-b from-white/5 to-transparent backdrop-blur-2xl border border-white/10 rounded-[2rem]'}`}>
        
        {/* Chat Header */}
        <div className={`p-4 border-b border-white/5 flex items-center justify-between ${isMobile ? 'bg-transparent' : 'bg-white/[0.02]'}`}>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-[#FF2E2E]/20 flex items-center justify-center border border-[#FF2E2E]/30">
                <Sparkles className="w-5 h-5 text-[#FF2E2E]" />
             </div>
             <div>
               <span className="font-bold text-white block text-base">FlowBot 4.0</span>
               <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E2E] animate-pulse"></span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Онлайн</span>
               </div>
             </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/20" ref={scrollRef}>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                msg.role === 'user' 
                  ? 'bg-[#FF2E2E] text-white rounded-tr-sm' 
                  : 'bg-[#1e1e1e] text-gray-200 border border-white/5 rounded-tl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
               <div className="bg-[#1e1e1e] p-4 rounded-2xl rounded-tl-sm flex gap-1.5 items-center border border-white/5">
                 <div className="w-1.5 h-1.5 bg-[#FF2E2E] rounded-full animate-bounce"></div>
                 <div className="w-1.5 h-1.5 bg-[#FF2E2E] rounded-full animate-bounce delay-75"></div>
                 <div className="w-1.5 h-1.5 bg-[#FF2E2E] rounded-full animate-bounce delay-150"></div>
               </div>
             </div>
          )}
        </div>

        {/* Input Area */}
        <div className={`p-4 ${isMobile ? 'bg-black/60 pb-20' : 'bg-black/40 backdrop-blur-md border-t border-white/5'}`}>
          <div className="relative flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Спроси что-нибудь..."
              className="w-full bg-white/10 border border-white/10 rounded-full py-4 pl-5 pr-14 text-base text-white focus:outline-none focus:border-[#FF2E2E]/50 focus:bg-white/15 transition-all placeholder:text-gray-500"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 w-10 h-10 bg-[#FF2E2E] rounded-full text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-90 transition-all"
            >
              <Send className="w-5 h-5 ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarRight;