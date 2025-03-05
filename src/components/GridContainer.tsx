import { useGameStore } from "~/stores/game-store"

export default function GridContainer() {
  const { guesses, solution, currentGuess } = useGameStore()
  
  // Create array of 6 rows (max guesses)
  const rows = Array.from({ length: 6 })
  
  // Calculate current row index
  const currentRow = guesses.length
  
  return (
    <div className="grid grid-cols-6 gap-2 p-4 max-w-[360px] mx-auto">
      {rows.map((_, rowIndex) => {
        // Get guess for completed rows
        const guess = guesses[rowIndex] || ''
        // Use current guess for active row
        const letters = rowIndex === currentRow ? currentGuess.padEnd(6) : guess.padEnd(6)
        
        return (
          <div key={rowIndex} className="grid grid-cols-6 gap-2 w-full">
            {letters.split('').map((letter: string, cellIndex: number) => (
              <Tile
                key={cellIndex}
                letter={letter}
                isActive={rowIndex === currentRow && cellIndex === currentGuess.length}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}

interface TileProps {
  letter: string
  isActive?: boolean
}

function Tile({ letter, isActive }: TileProps) {
  const isEmpty = letter === ' '
  const isFilled = !isEmpty && !isActive
  
  return (
    <div className={`
      w-12 h-12 border-2 flex items-center justify-center text-2xl font-bold
      ${isActive ? 'border-purple-500 animate-pulse' : 
        isEmpty ? 'border-neutral-200' : 
        'border-neutral-400 bg-neutral-100'}
      rounded-md
    `}>
      {!isEmpty && letter}
    </div>
  )
}
