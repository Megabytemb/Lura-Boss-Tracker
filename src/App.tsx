import { useState } from "react";
import { motion } from "motion/react";

type MarkerId = "triangle" | "diamond" | "x" | "circle" | "t";

interface Marker {
  id: MarkerId;
  name: string;
  color: string;
  borderColor: string;
  shadow: string;
  dropShadow: string;
  textColor: string;
}

const MARKERS: Marker[] = [
  { id: "triangle", name: "Triangle", color: "#22c55e", borderColor: "border-green-500/30", shadow: "shadow-[inset_0_0_40px_rgba(34,197,94,0.05)]", dropShadow: "drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]", textColor: "text-green-500/70" }, // Green
  { id: "diamond", name: "Diamond", color: "#a855f7", borderColor: "border-purple-500/30", shadow: "shadow-[inset_0_0_40px_rgba(168,85,247,0.05)]", dropShadow: "drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]", textColor: "text-purple-500/70" }, // Purple
  { id: "x", name: "X", color: "#ef4444", borderColor: "border-red-500/30", shadow: "shadow-[inset_0_0_40px_rgba(239,68,68,0.05)]", dropShadow: "drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]", textColor: "text-red-500/70" }, // Red
  { id: "t", name: "T", color: "#60a5fa", borderColor: "border-blue-400/30", shadow: "shadow-[inset_0_0_40px_rgba(96,165,250,0.05)]", dropShadow: "drop-shadow-[0_0_15px_rgba(96,165,250,0.4)]", textColor: "text-blue-400/70" }, // Blue
  { id: "circle", name: "Circle", color: "#f97316", borderColor: "border-orange-500/30", shadow: "shadow-[inset_0_0_40px_rgba(249,115,22,0.05)]", dropShadow: "drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]", textColor: "text-orange-500/70" }, // Orange
];

function getIcon(id: MarkerId, color: string, dropShadow: string) {
  switch (id) {
    case "triangle":
      return (
        <svg viewBox="0 0 24 24" fill={color} className={`w-full h-full ${dropShadow}`}>
          <path d="M12 2L23 21H1L12 2Z" />
        </svg>
      );
    case "diamond":
      return (
        <svg viewBox="0 0 24 24" fill={color} className={`w-full h-full ${dropShadow}`}>
          <path d="M12 1L23 12L12 23L1 12L12 1Z" />
        </svg>
      );
    case "x":
      return (
        <svg
          viewBox="0 0 24 24"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          className={`w-full h-full ${dropShadow}`}
        >
          <line x1="4" y1="4" x2="20" y2="20" />
          <line x1="20" y1="4" x2="4" y2="20" />
        </svg>
      );
    case "circle":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="5"
          className={`w-full h-full ${dropShadow}`}
        >
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
    case "t":
      return (
        <svg
          viewBox="0 0 24 24"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-full h-full ${dropShadow}`}
        >
          <line x1="4" y1="4" x2="20" y2="4" />
          <line x1="12" y1="4" x2="12" y2="22" />
        </svg>
      );
  }
}

export default function App() {
  const [selected, setSelected] = useState<Marker[]>([]);

  const addItem = (marker: Marker) => {
    if (selected.length < 5 && !selected.find((m) => m.id === marker.id)) {
      setSelected([...selected, marker]);
    }
  };

  const removeItem = (idx: number) => {
    const newSelected = [...selected];
    newSelected.splice(idx, 1);
    setSelected(newSelected);
  };

  const clearAll = () => setSelected([]);

  return (
    <div className="min-h-[100dvh] w-full bg-[#0A0A0B] text-white flex flex-col font-sans select-none">

      {/* Header bar */}
      <header className="h-14 sm:h-16 flex items-center justify-between px-4 sm:px-8 border-b border-white/10 bg-[#0F1115] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-gray-400">Order Tracker // Active</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-mono text-gray-500 uppercase">
          <span>Target: Marker Sequence</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 gap-4 sm:gap-5 lg:gap-6">

        {/* Header Options */}
        <div className="flex flex-col gap-1 sm:gap-2 shrink-0">
          <h1 className="text-[clamp(2rem,7vw,4.5rem)] font-black italic tracking-tighter leading-none text-white/90 uppercase">
            Current Order
          </h1>
          <p className="text-gray-500 font-mono tracking-widest text-[10px] sm:text-xs uppercase">Select markers below</p>
        </div>

        {/* Target Sequence Row */}
        <div className="w-full shrink-0">
          <div className="grid grid-cols-5 gap-2 sm:gap-3 max-w-2xl">
            {[0, 1, 2, 3, 4].map((idx) => {
              const item = selected[idx];
              return (
                <div key={`slot-${idx}`} className="flex flex-col items-center">
                  <div
                    onClick={() => item && removeItem(idx)}
                    className={`w-full aspect-square rounded-lg sm:rounded-xl border-2 transition-all flex flex-col items-center justify-center p-2 sm:p-3
                      ${
                        item
                          ? `bg-[#16181D] ${item.borderColor} cursor-pointer hover:border-white/50 active:scale-95 ${item.shadow}`
                          : "bg-[#0A0A0B] border-white/5 border-dashed"
                      }`}
                  >
                    {item && (
                      <motion.div layoutId={`marker-${item.id}`} className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-12 lg:h-12">
                        {getIcon(item.id, item.color, item.dropShadow)}
                      </motion.div>
                    )}
                    {item && (
                       <span className={`mt-1 text-[8px] sm:text-[10px] font-mono uppercase tracking-widest ${item.textColor} hidden sm:block`}>
                         {item.name} [{idx + 1}]
                       </span>
                    )}
                    {!item && (
                       <span className="text-base sm:text-lg font-black text-white/10 hidden sm:block">{idx + 1}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="w-full bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
           <div className="flex flex-col gap-1 w-full sm:w-auto">
             <span className="text-[10px] uppercase tracking-widest text-gray-500 hidden sm:block">Quick Actions</span>
             <button
                onClick={clearAll}
                disabled={selected.length === 0}
                className="w-full sm:w-auto px-6 py-2 bg-white text-black font-bold text-xs uppercase tracking-tighter hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Clear Sequence
              </button>
           </div>

           <div className="text-right hidden sm:block">
              <span className="text-[10px] uppercase tracking-widest text-gray-500">Selected</span>
              <div className="text-xl lg:text-2xl font-black font-mono leading-none">{selected.length}/5</div>
           </div>
        </div>

        {/* Available Pool Row */}
        <div className="flex-1 flex flex-col pt-3 sm:pt-4 border-t border-white/10 min-h-0">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 block shrink-0">Available Markers</span>
          <div className="grid grid-cols-5 gap-2 sm:gap-4">
            {MARKERS.map((marker) => {
              const isSelected = selected.some((m) => m.id === marker.id);
              return (
                <div key={`pool-${marker.id}`} className="flex flex-col items-center">
                  <div
                    onClick={() => !isSelected && addItem(marker)}
                    className={`w-full aspect-square rounded-lg sm:rounded-xl border-2 transition-all flex flex-col items-center justify-center p-3 sm:p-4
                      ${!isSelected
                        ? `bg-[#0F1115] border-white/10 cursor-pointer hover:bg-[#16181D] hover:${marker.borderColor} active:scale-95`
                        : "bg-[#0A0A0B] border-transparent opacity-50"}`}>
                    {!isSelected && (
                      <motion.div
                        layoutId={`marker-${marker.id}`}
                        className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24"
                      >
                        {getIcon(marker.id, marker.color, marker.dropShadow)}
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
}
