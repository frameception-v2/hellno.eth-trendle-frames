import { cn } from "~/lib/utils";

interface TileProps {
  children?: React.ReactNode;
  flip?: boolean;
  state?: 'empty' | 'filled' | 'correct' | 'present' | 'absent';
}

export function Tile({ children, flip }: TileProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center border-2",
        "w-[12vw] h-[12vw] md:w-[60px] md:h-[60px]", // Mobile first sizing
        "text-3xl font-bold rounded-[4px]",
        "transition-all duration-300 ease-in-out",
        flip && "scale-95 opacity-90", // Placeholder for flip animation
        state === 'empty' && "border-neutral-200 bg-transparent",
        state === 'filled' && "border-neutral-400 bg-neutral-100",
        state === 'correct' && "border-green-500 bg-green-400/30",
        state === 'present' && "border-yellow-500 bg-yellow-400/30",
        state === 'absent' && "border-neutral-400 bg-neutral-300/30"
      )}
      data-tile
      data-flip={flip}
    >
      {children}
    </div>
  );
}
