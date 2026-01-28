import Board from '../components/board'
import { useState, useEffect } from 'react'
import Keyboard from '../components/Keyboard';
import tempWordsFile from '../assets/tempWords.txt?raw';
import wordsFile from '../assets/words.txt?raw';

interface guessedLettersProps {
  letters: [string[], string[], string[], string[], string[], string[]];
}

interface OrdlePageProps {
  wordList: string[];
}

const tempWords = tempWordsFile.trim().split('\n').map(word => word.trim());
const words = wordsFile.trim().split('\n').map(word => word.trim());

function OrdlePage({ wordList }: OrdlePageProps) {
  const [guessedLetters, setGuessedLetters] = useState<guessedLettersProps>({
    letters: [[], [], [], [], [], []]
  });
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [guessCount, setGuessCount] = useState<number>(0);
  const [currentWordList, setCurrentWordList] = useState<string[]>(wordList);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [toasts, setToasts] = useState<Array<{id: number, message: string}>>([]);

  const addToast = (message: string) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2000);
  };

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
        setGuessCount(guessCount + 1);

        // Check if the guessed word is anywhere in the word list
        const foundIndex = currentWordList.indexOf(currentInput);
        if (foundIndex !== -1) {
          setCurrentWordList(prev => {
            const newList = [...prev];
            newList.splice(foundIndex, 1);
            return newList;
          });
          setCorrectCount(prev => prev + 1);
          // Show toast notification
          addToast(`Correct! "${currentInput}" found!`);
          // Adjust wordIndex if the removed word was before or at current position
          if (foundIndex < wordIndex) {
            setWordIndex(wordIndex - 1);
          } else if (foundIndex === wordIndex && wordIndex >= currentWordList.length - 1) {
            setWordIndex(0);
          }
        }

        // After updating guessedLetters, check for any words that are fully solved
        setTimeout(() => {
          const wordsToRemove: string[] = [];
          currentWordList.forEach((word) => {
            const allPositionsKnown =
              guessedLetters.letters[1].includes(word[0]) &&
              guessedLetters.letters[2].includes(word[1]) &&
              guessedLetters.letters[3].includes(word[2]) &&
              guessedLetters.letters[4].includes(word[3]) &&
              guessedLetters.letters[5].includes(word[4]);

            if (allPositionsKnown && word !== currentInput) {
              wordsToRemove.push(word);
            }
          });

          if (wordsToRemove.length > 0) {
            setCurrentWordList(prevList => {
              let newList = [...prevList];
              let indexAdjustment = 0;
              wordsToRemove.forEach(word => {
                const idx = newList.indexOf(word);
                if (idx !== -1) {
                  newList.splice(idx, 1);
                  if (idx < wordIndex) {
                    indexAdjustment++;
                  }
                }
              });
              if (indexAdjustment > 0) {
                setWordIndex(wordIndex - indexAdjustment);
              }
              return newList;
            });
            setCorrectCount(prevCount => prevCount + wordsToRemove.length);
            setGuessCount(prevCount => prevCount + wordsToRemove.length);
            // Show individual toast for each auto-solved word
            wordsToRemove.forEach((word, index) => {
              setTimeout(() => {
                addToast(`Auto-solved: "${word}"!`);
              }, index * 2000); // Stagger toasts by 2000ms so they appear one at a time
            });
          }
        }, 100);

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
    setWordIndex(wordIndex === 0 ? currentWordList.length - 1 : wordIndex - 1);
  };

  const handleNextBoard = () => {
    setWordIndex(wordIndex === currentWordList.length - 1 ? 0 : wordIndex + 1);
  };

  return (
    <div>
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center'
      }}>
        {toasts.map(toast => (
          <div key={toast.id} style={{
            backgroundColor: '#6aaa64',
            color: 'white',
            padding: '16px 24px',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            {toast.message}
          </div>
        ))}
      </div>
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
          <div style={{ display: 'flex', gap: '40px' }}>
            <div>Guesses: {String(guessCount).padStart(4, '0')}</div>
            <div>Correct: {String(correctCount).padStart(4, '0')} / 1024</div>
          </div>
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
        <Board word={currentWordList[wordIndex]} guessedLetters={guessedLetters} currentInput={currentInput} />
      </div>
      <Keyboard guessedLetters={guessedLetters} onLetterClick={handleLetterInput} />
    </div>
  )
}

export default OrdlePage
