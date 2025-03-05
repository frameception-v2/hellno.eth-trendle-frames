import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GameState {
  solution: string
  guesses: string[]
  currentGuess: string
  gameStatus: 'active'|'won'|'lost'
  lastUpdated: number
}

const getDailyWord = () => {
  // Temporary implementation until API integration
  const stored = localStorage.getItem('dailyWord')
  const storedDate = localStorage.getItem('dailyWordDate')
  
  if (stored && storedDate && Date.now() - parseInt(storedDate) < 86400000) {
    return stored
  }
  
  // Fallback to local word list (to be replaced with API)
  const words = ['REACTS', 'FRAMES', 'ZUSTAND', 'MOBILE', 'TEMPLATE']
  const dailyWord = words[Math.floor(Math.random() * words.length)]
  
  localStorage.setItem('dailyWord', dailyWord)
  localStorage.setItem('dailyWordDate', Date.now().toString())
  return dailyWord
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      solution: getDailyWord(),
      guesses: [],
      currentGuess: '',
      gameStatus: 'active',
      lastUpdated: Date.now(),
      
      addLetter: (letter: string) => set((state) => ({
        currentGuess: state.currentGuess.length < 6 ? state.currentGuess + letter.toUpperCase() : state.currentGuess
      })),
      
      deleteLetter: () => set((state) => ({
        currentGuess: state.currentGuess.slice(0, -1)
      })),
      
      submitGuess: () => set((state) => {
        if (state.currentGuess.length !== 6) return state
        
        const newGuesses = [...state.guesses, state.currentGuess]
        const isCorrect = state.currentGuess === state.solution
        const isLost = newGuesses.length >= 6 && !isCorrect
        
        return {
          guesses: newGuesses,
          currentGuess: '',
          gameStatus: isCorrect ? 'won' : isLost ? 'lost' : 'active',
          lastUpdated: Date.now()
        }
      }),
      
      resetGame: () => set({
        solution: getDailyWord(),
        guesses: [],
        currentGuess: '',
        gameStatus: 'active',
        lastUpdated: Date.now()
      })
    }),
    {
      name: 'wordle-game-storage',
      partialize: (state) => ({
        solution: state.solution,
        guesses: state.guesses,
        gameStatus: state.gameStatus,
        lastUpdated: state.lastUpdated
      })
    }
  )
)
