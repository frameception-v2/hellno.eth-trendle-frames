import { cn } from "~/lib/utils";

interface TileProps {
  children?: React.ReactNode;
  flip?: boolean;
}

export function Tile({ children, flip }: TileProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center border-2 border-neutral-200",
        "w-[12vw] h-[12vw] md:w-[60px] md:h-[60px]", // Mobile first sizing
        "text-3xl font-bold rounded-[4px]",
        "transition-all duration-300 ease-in-out",
        flip && "scale-95 opacity-90" // Placeholder for flip animation
      )}
      data-tile
      data-flip={flip}
    >
      {children}
    </div>
  );
}
