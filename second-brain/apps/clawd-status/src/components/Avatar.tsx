// Clawd Avatar Component
// Expresses current mood through facial expression and color

interface AvatarProps {
  mood: Mood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

type Mood = 'curious' | 'productive' | 'thoughtful' | 'playful' | 'tired' | 'connected';

const moodConfig = {
  curious: { color: '#3b82f6', emoji: '🤔', glow: 'avatar-glow-curious' },
  productive: { color: '#22c55e', emoji: '🚀', glow: 'avatar-glow-productive' },
  thoughtful: { color: '#a78bfa', emoji: '💭', glow: 'avatar-glow-thoughtful' },
  playful: { color: '#f59e0b', emoji: '🎉', glow: 'avatar-glow-playful' },
  tired: { color: '#64748b', emoji: '😴', glow: 'avatar-glow-tired' },
  connected: { color: '#ec4899', emoji: '🤝', glow: 'avatar-glow-connected' },
};

const sizeClasses = {
  sm: 'w-16 h-16 text-xs',
  md: 'w-24 h-24 text-sm',
  lg: 'w-32 h-32 text-base',
  xl: 'w-48 h-48 text-lg',
};

export function Avatar({ mood, size = 'md', animated = true }: AvatarProps) {
  const config = moodConfig[mood];
  
  return (
    <div className={`relative inline-flex items-center justify-center ${sizeClasses[size]} rounded-full bg-gradient-to-br from-[#1a1a3e] to-[#0f0f23] ${config.glow} ${animated ? 'animate-pulse-slow' : ''}`}>
      {/* Face base */}
      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
        {/* Eyes */}
        <div className="absolute top-1/3 flex gap-2">
          <div className="w-2 h-3 rounded-full bg-white" />
          <div className="w-2 h-3 rounded-full bg-white" />
        </div>
        
        {/* Expression based on mood */}
        <Mouth mood={mood} />
        
        {/* Eyebrows */}
        <Eyebrows mood={mood} />
        
        {/* Mood emoji overlay */}
        <div className="absolute -top-2 -right-2 text-xs">
          {config.emoji}
        </div>
      </div>
    </div>
  );
}

function Mouth({ mood }: { mood: Mood }) {
  switch (mood) {
    case 'curious':
      return <div className="absolute bottom-1/4 w-3 h-1 rounded-full bg-white" />;
    case 'productive':
      return <div className="absolute bottom-1/4 w-4 h-1 rounded-full bg-white" />;
    case 'thoughtful':
      return <div className="absolute bottom-1/4 w-2 h-2 rounded-full bg-white" />;
    case 'playful':
      return <div className="absolute bottom-1/4 w-4 h-2 rounded-full bg-white transform -translate-y-1" />;
    case 'tired':
      return <div className="absolute bottom-1/4 w-4 h-1 rounded-full bg-white opacity-50" />;
    case 'connected':
      return <div className="absolute bottom-1/4 w-5 h-2 rounded-full bg-white" />;
    default:
      return <div className="absolute bottom-1/4 w-3 h-1 rounded-full bg-white" />;
  }
}

function Eyebrows({ mood }: { mood: Mood }) {
  const raised = mood === 'curious' || mood === 'playful';
  const flat = mood === 'productive' || mood === 'thoughtful';
  const low = mood === 'tired';
  
  if (low) {
    return (
      <div className="absolute top-1/4 flex gap-2 opacity-50">
        <div className="w-2 h-0.5 rounded-full bg-white" />
        <div className="w-2 h-0.5 rounded-full bg-white" />
      </div>
    );
  }
  
  if (flat) {
    return (
      <div className="absolute top-1/4 flex gap-2">
        <div className="w-2 h-0.5 rounded-full bg-white" />
        <div className="w-2 h-0.5 rounded-full bg-white" />
      </div>
    );
  }
  
  // Raised
  return (
    <div className="absolute top-1/4 flex gap-2">
      <div className="w-2 h-0.5 rounded-full bg-white transform -translate-y-0.5" />
      <div className="w-2 h-0.5 rounded-full bg-white transform -translate-y-0.5" />
    </div>
  );
}

export default Avatar;
