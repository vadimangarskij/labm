import React from 'react';

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  fullWidth?: boolean;
}

const LiquidButton: React.FC<LiquidButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  fullWidth = false,
  ...props 
}) => {
  const baseStyles = "relative overflow-hidden rounded-[2rem] font-bold transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 py-4 px-8 z-10 group";
  
  const variants = {
    primary: "bg-[#FF2E2E] text-white shadow-[0_0_30px_rgba(255,46,46,0.4)] hover:shadow-[0_0_50px_rgba(255,46,46,0.6)] border border-[#FF2E2E]",
    secondary: "bg-white/5 text-white backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-[#FF2E2E]/50",
    ghost: "bg-transparent text-gray-400 hover:text-[#FF2E2E]"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12" />
      )}
    </button>
  );
};

export default LiquidButton;
