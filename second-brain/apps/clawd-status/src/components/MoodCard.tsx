// Mood Card Component
// Displays current mood, energy level, and thoughts

interface MoodCardProps {
  mood: string;
  emoji: string;
  energy: number;
  thought: string;
}

export function MoodCard({ mood, emoji, energy, thought }: MoodCardProps) {
  return (
    <div className="bg-[#1a1a3e] rounded-xl p-6 border border-[#7c3aed]/30">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-sm text-gray-400 uppercase tracking-wider mb-1">Current Mood</h2>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{emoji}</span>
            <span className="text-xl font-semibold capitalize">{mood}</span>
          </div>
        </div>
        
        {/* Energy Bar */}
        <div className="text-right">
          <p className="text-sm text-gray-400 mb-1">Energy</p>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-[#0f0f23] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] transition-all duration-500"
                style={{ width: `${energy}%` }}
              />
            </div>
            <span className="text-sm font-medium">{energy}%</span>
          </div>
        </div>
      </div>
      
      {/* Thought Bubble */}
      <div className="mt-4 p-4 bg-[#0f0f23] rounded-lg border border-[#7c3aed]/20">
        <p className="text-sm text-gray-300">
          <span className="text-[#a78bfa] mr-2">💭</span>
          {thought}
        </p>
      </div>
    </div>
  );
}

export default MoodCard;
