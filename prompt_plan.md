# Farcaster Wordle Implementation Prompts

## 1. Core Game State Setup
```text
Create a TypeScript React component with game state management using Zustand.
Include:
- Daily solution from localStorage
- 4x6 grid guesses storage
- Input validation
- Game status tracking
- LocalStorage persistence
Use the following schema:
interface GameState {
  solution: string
  guesses: string[]
  currentGuess: string
  gameStatus: 'active'|'won'|'lost'
  lastUpdated: number
}

Implement actions for:
- Initializing daily word
- Adding letters
- Deleting letters
- Submitting guesses
- Persisting to localStorage
- Resetting game
```

## 2. Grid UI Component
```text
Create a responsive 4x6 grid using CSS Grid.
Each cell should be:
- 60x60px desktop / 12vw mobile
- Border radius 4px
- Center-aligned text
- Background color based on guess state
- Flip animation on guess submission

Generate:
- GridContainer component with dynamic cells
- Tile component with flip animation CSS
- Color classes (gray-200 default, correct/incorrect colors)
- Media queries for mobile scaling
- PropTypes for current guesses and solution
```

## 3. Virtual Keyboard Input
```text
Create a virtual keyboard component with:
- QWERTY layout in 3 rows
- Touch/click handlers for letter input
- Visual feedback for used letters
- Backspace and Enter keys
- Disabled state when game ended

Implement:
- Keyboard UI with flex layout
- Key press handlers that update game store
- Dynamic key colors based on guess results
- Debounced click handlers
- Mobile touch event support
- Integration with game store actions
```

## 4. Farcaster API Integration
```text
Create API service to fetch daily word:
1. Implement getDailyWord() using /farcaster/feed/trending
2. Add error handling for API failures
3. Cache result in localStorage for 24h
4. Fallback to local word list if API fails
5. Add loading state during word fetch

Include:
- Axios instance with error boundaries
- Local storage timestamp check
- Word validation regex (/^[A-Z]{6}$/)
- Service integration with game store initializer
- Loading skeleton component
```

## 5. Guess Animation System
```text
Implement tile flip animations with:
1. CSS keyframe animation
2. Sequential letter reveal
3. Color transition timing
4. Animation completion callback
5. Performance optimizations

Create:
- useAnimation hook for transition control
- Dynamic class assignment based on guess state
- Will-change CSS properties
- RequestAnimationFrame integration
- Post-animation state updates
```

## 6. Result Modal & Sharing
```text
Build endgame modal with:
- Win/lose status display
- Guess distribution
- Share button with Warpcast deeplink
- Daily countdown timer
- Play again button

Implement:
- Modal component with overlay
- ShareScore function using window.open
- Dynamic message generation
- LocalStorage result tracking
- Confetti animation on win
```

## 7. Mobile Optimization
```text
Add mobile-specific enhancements:
1. Viewport meta tags
2. Touch action CSS rules
3. Input mode validation
4. Virtual keyboard toggle
5. Safe area insets

Include:
- Touch event prevention
- Input type="text" pattern validation
- CSS media queries for small screens
- Viewport height calculations
- Prevent zoom controls
```

## 8. State Hydration & Routing
```text
Implement client-side state hydration:
1. Next.js getServerSideProps
2. LocalStorage synchronization
3. URL hash state encoding
4. Daily word rotation check
5. Initial load state setup

Create:
- Custom useHydration hook
- State serialization helpers
- Daily word comparator
- Error boundaries for invalid states
- Loading transitions
```

## 9. Final Integration
```text
Wire up all components:
1. Connect store to UI components
2. Add global error boundary
3. Set up CSP headers
4. Configure frame meta tags
5. Add analytics logging

Implement:
- Root layout component
- Frame metadata generation
- CSP-compliant asset loading
- Store provider wrapper
- Final CSS polish
```

Each prompt builds on previous implementations, using a Next.js/TypeScript template with:
- src/stores/game-store.ts
- src/components/{Grid,Keyboard,Modal}
- src/utils/api.ts
- src/styles/globals.css
- App Router page structure

Implementation order ensures:
1. State management before UI
2. Core gameplay before edge cases
3. Desktop-first before mobile
4. Functionality before optimizations
5. Gradual feature integration