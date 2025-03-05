```markdown
# Wordle-style Farcaster Frame v2 Game Specification

## 1. OVERVIEW

### Core Functionality
- Daily 6-letter word guessing game using trending Farcaster cast words
- 4 attempts per game with color-coded feedback:
  - Green: Correct letter & position
  - Yellow: Correct letter, wrong position
  - Red: Incorrect letter
- Real-time trending word selection from Farcaster API
- Endgame state with score display and Warpcast sharing
- Persistent client-side game state

### UX Flow
1. Initial frame loads with empty 4x6 grid
2. User inputs guess via keyboard/text input
3. System validates word length and checks against solution
4. Visual feedback with tile flip animations
5. Repeat steps 2-4 until win or 4 attempts
6. Display results with share button
7. Daily reset with new trending word

## 2. TECHNICAL REQUIREMENTS

### Frontend Components
```html
<div class="game-container">
  <div class="grid-container"></div>
  <input type="text" id="guess-input" maxlength="6"/>
  <div class="keyboard"></div>
  <div class="result-modal hidden">
    <button id="share-button">Share Score</button>
  </div>
</div>
```

### API Integrations
- `GET /farcaster/feed/trending`:
  ```typescript
  async function getDailyWord() {
    const res = await fetch('/farcaster/feed/trending?limit=50');
    const casts = await res.json();
    const words = casts.flatMap(c => c.text.split(/\s+/))
      .filter(w => w.length === 6)
      .filter(w => /^[a-z]+$/i.test(w));
    return words[Math.floor(Math.random() * words.length)].toUpperCase();
  }
  ```

### State Management
```typescript
interface GameState {
  solution: string;
  guesses: string[];
  currentGuess: string;
  gameStatus: 'active' | 'won' | 'lost';
}

const [state, setState] = useState<GameState>({
  solution: '',
  guesses: [],
  currentGuess: '',
  gameStatus: 'active'
});
```

### Mobile Responsiveness
- CSS Grid for letter tiles (6 columns)
- Viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">`
- Media queries for screen sizes:
  ```css
  @media (max-width: 480px) {
    .tile {
      width: 12vw;
      height: 12vw;
    }
  }
  ```

## 3. FRAMES v2 IMPLEMENTATION

### Interactive Elements
- Virtual keyboard with event listeners:
  ```javascript
  document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('touchstart', handleKeyPress);
  });
  ```
- Tile flip animation:
  ```css
  .tile.flip {
    animation: flip 0.6s ease;
  }

  @keyframes flip {
    0% { transform: rotateX(0deg); }
    50% { transform: rotateX(90deg); }
    100% { transform: rotateX(0deg); }
  }
  ```

### Input Handling
- Physical keyboard support:
  ```javascript
  document.addEventListener('keydown', (e) => {
    if (/^[a-z]$/i.test(e.key)) {
      updateCurrentGuess(e.key.toUpperCase());
    }
  });
  ```
- Input validation:
  ```typescript
  function validateGuess(guess: string): boolean {
    return guess.length === 6 && /^[A-Z]+$/.test(guess);
  }
  ```

### Sharing Capability
```javascript
function shareResult() {
  const text = `I scored ${state.guesses.length}/4 on Farcaster Wordle!`;
  window.open(`https://warpcast.com/~/compose?text=${encodeURIComponent(text)}`);
}
```

## 4. MOBILE CONSIDERATIONS

### Touch Interactions
- 48x48px minimum touch targets
- Touch event prevention:
  ```css
  * {
    touch-action: manipulation;
  }
  ```
- Virtual keyboard optimizations:
  ```html
  <input inputmode="verbatim" pattern="[A-Za-z]{6}"/>
  ```

### Performance
- CSS will-change property:
  ```css
  .tile {
    will-change: transform, background-color;
  }
  ```
- Debounced API calls:
  ```javascript
  const debouncedFetch = _.debounce(fetchTrendingWords, 300);
  ```

## 5. CONSTRAINTS COMPLIANCE

1. **No Database Requirements**: All state stored in URL hash and localStorage
2. **No Smart Contracts**: Pure client-side logic
3. **Approved APIs Only**: Only uses provided `/farcaster/feed/trending` endpoint
4. **Complexity Control**: 
   - No user accounts
   - No social features beyond sharing
   - No persistent history
   - Single daily word

```typescript
// State persistence example
function saveState() {
  localStorage.setItem('wordleState', JSON.stringify(state));
}
```

## Implementation Checklist

- [ ] Trending word fetch error handling
- [ ] Input validation regex patterns
- [ ] Color contrast ratios for accessibility
- [ ] Frame meta tags configuration
- [ ] Warpcast deeplink testing
- [ ] Touch event cross-browser testing
- [ ] Daily word rotation mechanism
- [ ] Animation performance testing
- [ ] Mobile viewport testing
- [ ] State serialization/deserialization
```