import React from 'react';
import { Home, Mic2, Radio, Building2, Info, Settings, Disc } from 'lucide-react';
import LiquidButton from './LiquidButton';

const NavItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div className={`group flex items-center gap-4 p-4 rounded-[2rem] cursor-pointer transition-all duration-300 ${active ? 'bg-[#FF2E2E]/10 text-[#FF2E2E]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
    <Icon className={`w-6 h-6 transition-transform group-hover:scale-110 ${active ? 'drop-shadow-[0_0_8px_rgba(255,46,46,0.8)]' : ''}`} />
    <span className="font-medium text-lg tracking-wide">{label}</span>
  </div>
);

const SidebarLeft: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-between p-6">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 text-[#FF2E2E] mb-2">
          <div className="w-10 h-10 rounded-full bg-[#FF2E2E] flex items-center justify-center shadow-[0_0_20px_rgba(255,46,46,0.6)] animate-pulse">
            <Disc className="w-6 h-6 text-black animate-spin-slow" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter">RED FLOW</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2">
        <NavItem icon={Home} label="Поток" active />
        <NavItem icon={Mic2} label="Артисты" />
        <NavItem icon={Radio} label="Услуги" />
        <NavItem icon={Building2} label="Студии" />
        <NavItem icon={Info} label="О Нас" />
      </nav>

      {/* Bottom Actions */}
      <div className="mt-8 flex flex-col gap-6">
        <LiquidButton fullWidth>
          Отправить Демо
        </LiquidButton>

        <div className="flex items-center gap-3 pt-6 border-t border-white/10">
          <img src="https://picsum.photos/seed/user/100/100" alt="User" className="w-12 h-12 rounded-full border-2 border-[#FF2E2E]" />
          <div className="flex-1">
            <p className="text-white font-bold">Alex K.</p>
            <p className="text-xs text-gray-500">Продюсер</p>
          </div>
          <Settings className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
        </div>
      </div>
    </div>
  );
};

export default SidebarLeft;
