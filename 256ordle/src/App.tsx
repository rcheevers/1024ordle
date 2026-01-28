import './App.css'
import { useState } from 'react'
import Home from './pages/Home'
import OrdlePage from './pages/OrdlePage'
import tempWordsFile from './assets/tempWords.txt?raw';

const tempWords = tempWordsFile.trim().split('\n').map(word => word.trim());

function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameWordList, setGameWordList] = useState<string[]>([]);

  const handleStartGame = () => {
    // Generate 1024 random words from tempWords
    const shuffled = [...tempWords].sort(() => Math.random() - 0.5);
    const selectedWords = shuffled.slice(0, 1024);
    setGameWordList(selectedWords);
    setGameStarted(true);
  };

  return (
    <div>
      {!gameStarted ? (
        <Home onStartGame={handleStartGame} />
      ) : (
        <OrdlePage wordList={gameWordList} />
      )}
    </div>
  )
}

export default App