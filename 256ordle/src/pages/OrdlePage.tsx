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
  onWin: (guessCount: number) => void;
}

const tempWords = tempWordsFile.trim().split('\n').map(word => word.trim());
const words = wordsFile.trim().split('\n').map(word => word.trim());

function OrdlePage({ wordList, onWin }: OrdlePageProps) {
  const [guessedLetters, setGuessedLetters] = useState<guessedLettersProps>({
    letters: [[], [], [], [], [], []]
  });
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [guessCount, setGuessCount] = useState<number>(0);
  const [currentWordList, setCurrentWordList] = useState<string[]>(wordList);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [toasts, setToasts] = useState<Array<{id: number, message: string}>>([]);
  const [toastQueue, setToastQueue] = useState<string[]>([]);
  const [isProcessingQueue, setIsProcessingQueue] = useState<boolean>(false);

  const addToast = (message: string) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2000);
  };

  const addToQueue = (messages: string[]) => {
    setToastQueue(prev => [...prev, ...messages]);
  };

  useEffect(() => {
    if (toastQueue.length > 0 && !isProcessingQueue) {
      setIsProcessingQueue(true);
      const [nextMessage, ...rest] = toastQueue;
      setToastQueue(rest);
      addToast(nextMessage);
      setTimeout(() => {
        setIsProcessingQueue(false);
      }, 2000);
    }
  }, [toastQueue, isProcessingQueue]);

  useEffect(() => {
    if (currentWordList.length === 0) {
      onWin(guessCount);
    }
  }, [currentWordList, guessCount, onWin]);

  const calculateScore = (word: string, guessedLetters: guessedLettersProps) => {
    let greens = 0;
    let yellows = 0;

    // Count greens (exact position matches)
    for (let i = 0; i < 5; i++) {
      if (guessedLetters.letters[i + 1].includes(word[i])) {
        greens++;
      }
    }

    // Count yellows (unique letters that are in the word, we've guessed, but aren't green)
    const uniqueLetters = new Set(word);
    uniqueLetters.forEach(letter => {
      // Check if letter is green at any position in this word
      const isGreen = word.split('').some((char, idx) =>
        char === letter && guessedLetters.letters[idx + 1].includes(letter)
      );

      // Check if we've guessed this letter
      const isGuessed = guessedLetters.letters[0].includes(letter);

      if (isGuessed && !isGreen) {
        yellows++;
      }
    });

    return { greens, yellows };
  };

  const sortWordList = (wordList: string[], guessedLetters: guessedLettersProps) => {
    return [...wordList].sort((a, b) => {
      const scoreA = calculateScore(a, guessedLetters);
      const scoreB = calculateScore(b, guessedLetters);

      // Sort by total known letters (greens + yellows) descending
      const totalA = scoreA.greens + scoreA.yellows;
      const totalB = scoreB.greens + scoreB.yellows;
      return totalB - totalA;
    });
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
        const updatedLetters = [...guessedLetters.letters] as [string[], string[], string[], string[], string[], string[]];

        // Add all 5 letters to the first list if not already in it
        for (let i = 0; i < 5; i++) {
          const letter = currentInput[i];
          if (!updatedLetters[0].includes(letter)) {
            updatedLetters[0].push(letter);
          }
        }

        // Add letter to corresponding lists (1st letter to 2nd list, etc.)
        for (let i = 0; i < 5; i++) {
          const letter = currentInput[i];
          const targetList = i + 1; // 0th letter goes to list[1], 1st to list[2], etc.
          if (!updatedLetters[targetList].includes(letter)) {
            updatedLetters[targetList].push(letter);
          }
        }

        const newGuessedLetters = { letters: updatedLetters };
        setGuessedLetters(newGuessedLetters);
        setGuessCount(guessCount + 1);

        // Check if the guessed word is anywhere in the word list
        const foundIndex = currentWordList.indexOf(currentInput);

        // Check for auto-solved words
        const wordsToRemove: string[] = [];
        currentWordList.forEach((word) => {
          const allPositionsKnown =
            newGuessedLetters.letters[1].includes(word[0]) &&
            newGuessedLetters.letters[2].includes(word[1]) &&
            newGuessedLetters.letters[3].includes(word[2]) &&
            newGuessedLetters.letters[4].includes(word[3]) &&
            newGuessedLetters.letters[5].includes(word[4]);

          if (allPositionsKnown && word !== currentInput) {
            wordsToRemove.push(word);
          }
        });

        // Update word list: remove guessed word, auto-solved words, and sort
        let updatedWordList = [...currentWordList];

        // Build list of toast messages
        const toastMessages: string[] = [];

        if (foundIndex !== -1) {
          updatedWordList.splice(foundIndex, 1);
          setCorrectCount(prev => prev + 1);
          toastMessages.push(`Correct! "${currentInput}" found!`);
        }

        wordsToRemove.forEach(word => {
          const idx = updatedWordList.indexOf(word);
          if (idx !== -1) {
            updatedWordList.splice(idx, 1);
          }
        });

        // Sort the updated list
        updatedWordList = sortWordList(updatedWordList, newGuessedLetters);
        setCurrentWordList(updatedWordList);
        setWordIndex(0); // Reset to first word after sorting

        if (wordsToRemove.length > 0) {
          setCorrectCount(prevCount => prevCount + wordsToRemove.length);
          setGuessCount(prevCount => prevCount + wordsToRemove.length);
          // Add auto-solved words to toast messages
          wordsToRemove.forEach(word => {
            toastMessages.push(`Auto-solved: "${word}"!`);
          });
        }

        // Add all messages to the queue at once
        if (toastMessages.length > 0) {
          addToQueue(toastMessages);
        }

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
        {currentWordList.length > 0 && (
          <Board word={currentWordList[wordIndex]} guessedLetters={guessedLetters} currentInput={currentInput} />
        )}
      </div>
      <Keyboard guessedLetters={guessedLetters} onLetterClick={handleLetterInput} />
    </div>
  )
}

export default OrdlePage
