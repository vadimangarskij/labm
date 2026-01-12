
import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  className?: string;
  size?: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ className = "", size = 24 }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; color: string; left: number; duration: number; size: number }[]>([]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    
    // Create explosion effect
    const newHearts = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      color: ['#FF2E2E', '#FF5E5E', '#FFB7B7', '#E53E3E'][Math.floor(Math.random() * 4)],
      left: Math.random() * 100 - 50, // Range -50 to 50
      duration: 0.6 + Math.random() * 0.8,
      size: 10 + Math.random() * 15,
    }));

    setHearts(prev => [...prev, ...newHearts]);

    // Cleanup
    setTimeout(() => {
      setHearts(prev => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
    }, 1500);

    if (navigator.vibrate) navigator.vibrate(40);
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <button 
        onClick={handleLike}
        className={`relative z-10 transition-all duration-300 active:scale-75 ${isLiked ? 'text-[#FF2E2E] scale-110' : 'text-gray-500 hover:text-white'}`}
      >
        <Heart className={`w-[${size}px] h-[${size}px] ${isLiked ? 'fill-current' : ''}`} style={{ width: size, height: size }} />
      </button>

      {/* Heart Explosion Particles */}
      {hearts.map(heart => (
        <div 
          key={heart.id}
          className="absolute pointer-events-none z-0"
          style={{
            left: '50%',
            top: '50%',
            color: heart.color,
            animation: `heart-float ${heart.duration}s ease-out forwards`,
            transform: `translateX(${heart.left}px)`,
          }}
        >
          <Heart 
            className="fill-current" 
            style={{ width: heart.size, height: heart.size }} 
          />
        </div>
      ))}
    </div>
  );
};

export default LikeButton;
