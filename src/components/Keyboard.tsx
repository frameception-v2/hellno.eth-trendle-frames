"use client";

import { useGameStore } from "~/stores/game-store";
import { cn } from "~/lib/utils";

const QWERTY_LAYOUT = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
];

export function Keyboard() {
  const { addLetter, deleteLetter, submitGuess, gameStatus, guesses, solution } = useGameStore();

  const handleKeyPress = (key: string) => {
    if (gameStatus !== "active") return;
    
    if (key === "⌫") {
      deleteLetter();
    } else if (key === "ENTER") {
      submitGuess();
    } else if (key.length === 1) {
      addLetter(key);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-4 select-none">
      {QWERTY_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 justify-center">
          {row.map((key) => (
            <button
              key={key}
              className={cn(
                "min-w-8 h-12 px-2 flex items-center justify-center",
                "rounded-md font-semibold text-sm",
                "bg-gray-200 hover:bg-gray-300 active:bg-gray-400",
                "transition-colors duration-100",
                key === "ENTER" && "min-w-16",
                "touch-manipulation" // Optimize for touch interfaces
              )}
              onClick={() => handleKeyPress(key)}
              data-key={key}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
