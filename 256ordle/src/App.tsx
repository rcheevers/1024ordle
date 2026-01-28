import './App.css'
import Board from './components/board'
import { useState, useEffect } from 'react'
import Keyboard from './components/Keyboard';
import tempWordsFile from './assets/tempWords.txt?raw';
import wordsFile from './assets/words.txt?raw';

interface guessedLettersProps {
  letters: [string[], string[], string[], string[], string[], string[]];
}

const tempWords = tempWordsFile.trim().split('\n').map(word => word.trim());
const words = wordsFile.trim().split('\n').map(word => word.trim());

function App() {
  const [guessedLetters, setGuessedLetters] = useState<guessedLettersProps>({
    letters: [[], [], [], [], [], []]
  });
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [currentInput, setCurrentInput] = useState<string>('');

  const handleLetterInput = (letter: string) => {
    if (currentInput.length < 5) {
      setCurrentInput(currentInput + letter);
    }
  };

  const handleBackspace = () => {
    setCurrentInput(currentInput.slice(0, -1));
  };

  const handleEnter = () => {
    if (currentInput.length === 5) {
      if (tempWords.includes(currentInput) || words.includes(currentInput)) {
        setGuessedLetters(prev => {
          const newLetters = [...prev.letters] as [string[], string[], string[], string[], string[], string[]];

          // Add all 5 letters to the first list if not already in it
          for (let i = 0; i < 5; i++) {
            const letter = currentInput[i];
            if (!newLetters[0].includes(letter)) {
              newLetters[0].push(letter);
            }
          }

          // Add letter to corresponding lists (1st letter to 2nd list, etc.)
          for (let i = 0; i < 5; i++) {
            const letter = currentInput[i];
            const targetList = i + 1; // 0th letter goes to list[1], 1st to list[2], etc.
            if (!newLetters[targetList].includes(letter)) {
              newLetters[targetList].push(letter);
            }
          }

          return { letters: newLetters };
        });
        setCurrentInput('');
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (key === 'enter') {
        handleEnter();
      } else if (key === 'backspace') {
        handleBackspace();
      } else if (key === 'arrowleft') {
        handlePreviousBoard();
      } else if (key === 'arrowright') {
        handleNextBoard();
      } else if (key.length === 1 && key >= 'a' && key <= 'z') {
        handleLetterInput(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentInput, wordIndex]);

  const handlePreviousBoard = () => {
    setWordIndex(wordIndex === 0 ? 255 : wordIndex - 1);
  };

  const handleNextBoard = () => {
    setWordIndex(wordIndex === 255 ? 0 : wordIndex + 1);
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          <button
            onClick={handlePreviousBoard}
            style={{
              fontSize: '48px',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            ←
          </button>
          <div>Correct: 000 / 256</div>
          <button
            onClick={handleNextBoard}
            style={{
              fontSize: '48px',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            →
          </button>
        </div>
        <Board word={tempWords[wordIndex]} guessedLetters={guessedLetters} currentInput={currentInput} />
      </div>
      <Keyboard guessedLetters={guessedLetters} onLetterClick={handleLetterInput} />
    </div>
  )
}

export default App
