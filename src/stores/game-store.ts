import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface GameState {
  solution: string
  guesses: string[]
  currentGuess: string
  gameStatus: 'active'|'won'|'lost'
  lastUpdated: number
}

interface GameActions {
  addLetter: (letter: string) => void
  deleteLetter: () => void
  submitGuess: () => void
  resetGame: () => void
  initializeDailyWord: () => void
}

const getDailyWord = () => {
  // Temporary implementation until API integration
  const stored = localStorage.getItem('dailyWord')
  const storedDate = localStorage.getItem('dailyWordDate')
  
  // Check if we have a valid stored word for today
  if (stored && storedDate) {
    const storedDay = new Date(parseInt(storedDate))
    storedDay.setHours(0, 0, 0, 0) // Normalize to midnight
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (storedDay.getTime() === today.getTime()) {
      return stored
    }
  }
  
  // Generate new daily word at midnight
  const words = ['REACTS', 'FRAMES', 'ZUSTAND', 'MOBILE', 'TEMPLATE']
  const dailyWord = words[Math.floor(Math.random() * words.length)]
  
  // Store with midnight timestamp
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0) // Next midnight
  localStorage.setItem('dailyWord', dailyWord)
  localStorage.setItem('dailyWordDate', midnight.getTime().toString())
  return dailyWord
}

export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      initializeDailyWord: () => {
        const now = Date.now()
        const lastUpdate = get().lastUpdated
        if (now - lastUpdate > 86400000) { // 24 hours
          set({ solution: getDailyWord() })
        }
      },
      solution: getDailyWord(),
      guesses: [],
      currentGuess: '',
      gameStatus: 'active',
      lastUpdated: Date.now(),
      
      addLetter: (letter: string) => {
        const validLetter = letter.toUpperCase().match(/^[A-Z]$/)
        if (!validLetter) return
        
        set((state) => ({
          currentGuess: state.currentGuess.length < 6 ? state.currentGuess + validLetter[0] : state.currentGuess
        }))
      },
      
      deleteLetter: () => {
        set((state) => ({
          currentGuess: state.currentGuess.slice(0, -1)
        }))
      },
      
      submitGuess: () => {
        set((state) => {
          // Prevent submission if game is over or guess is invalid
          if (state.gameStatus !== 'active' || state.currentGuess.length !== 6) return state
          if (!/^[A-Z]{6}$/.test(state.currentGuess)) return state
          
          const newGuesses = [...state.guesses, state.currentGuess]
          const isCorrect = state.currentGuess === state.solution
          const isLost = newGuesses.length >= 6 && !isCorrect
          
          localStorage.setItem('wordle-game-storage', JSON.stringify({
            solution: state.solution,
            guesses: newGuesses,
            gameStatus: isCorrect ? 'won' : isLost ? 'lost' : 'active',
            lastUpdated: Date.now()
          }))
          
          return {
            guesses: newGuesses,
            currentGuess: '',
            gameStatus: isCorrect ? 'won' : isLost ? 'lost' : 'active',
            lastUpdated: Date.now()
          }
        })
      },
      
      resetGame: () => {
        const newSolution = getDailyWord()
        localStorage.setItem('wordle-game-storage', JSON.stringify({
          solution: newSolution,
          guesses: [],
          currentGuess: '',
          gameStatus: 'active',
          lastUpdated: Date.now()
        }))
        
        set({
          solution: newSolution,
          guesses: [],
          currentGuess: '',
          gameStatus: 'active',
          lastUpdated: Date.now()
        })
      }
    }),
    {
      name: 'wordle-game-storage',
      partialize: (state) => ({
        guesses: state.guesses,
        currentGuess: state.currentGuess,
        gameStatus: state.gameStatus,
        lastUpdated: state.lastUpdated
      })
    }
  )
)
