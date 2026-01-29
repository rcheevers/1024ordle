import './App.css'
import { useState } from 'react'
import Home from './pages/Home'
import OrdlePage from './pages/OrdlePage'
import WinPage from './pages/WinPage'
import tempWordsFile from './assets/tempWords.txt?raw';

const tempWords = tempWordsFile.trim().split('\n').map(word => word.trim());

function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameWordList, setGameWordList] = useState<string[]>([]);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [finalGuessCount, setFinalGuessCount] = useState<number>(0);
  const [finalElapsedTime, setFinalElapsedTime] = useState<number>(0);

  const handleStartGame = (wordCount: number) => {
    // Generate random words from tempWords
    const shuffled = [...tempWords].sort(() => Math.random() - 0.5);
    const selectedWords = shuffled.slice(0, wordCount);
    setGameWordList(selectedWords);
    setGameStarted(true);
    setGameWon(false);
  };

  const handleWin = (guessCount: number, elapsedTime: number) => {
    setFinalGuessCount(guessCount);
    setFinalElapsedTime(elapsedTime);
    setGameWon(true);
  };

  const handleBackToHome = () => {
    setGameStarted(false);
    setGameWon(false);
  };

  return (
    <div>
      {!gameStarted ? (
        <Home onStartGame={handleStartGame} />
      ) : gameWon ? (
        <WinPage guessCount={finalGuessCount} elapsedTime={finalElapsedTime} onBackToHome={handleBackToHome} />
      ) : (
        <OrdlePage wordList={gameWordList} onWin={handleWin} />
      )}
    </div>
  )
}

export default App