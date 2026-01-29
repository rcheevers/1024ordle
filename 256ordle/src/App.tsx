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

  const handleStartGame = () => {
    // Generate 1024 random words from tempWords
    const shuffled = [...tempWords].sort(() => Math.random() - 0.5);
    const selectedWords = shuffled.slice(0, 1024);
    setGameWordList(selectedWords);
    setGameStarted(true);
    setGameWon(false);
  };

  const handleWin = (guessCount: number) => {
    setFinalGuessCount(guessCount);
    setGameWon(true);
  };

  return (
    <div>
      {!gameStarted ? (
        <Home onStartGame={handleStartGame} />
      ) : gameWon ? (
        <WinPage guessCount={finalGuessCount} />
      ) : (
        <OrdlePage wordList={gameWordList} onWin={handleWin} />
      )}
    </div>
  )
}

export default App