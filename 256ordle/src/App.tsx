import './App.css'
import { useState } from 'react'
import Home from './pages/Home'
import OrdlePage from './pages/OrdlePage'

function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div>
      {!gameStarted ? (
        <Home onStartGame={handleStartGame} />
      ) : (
        <OrdlePage />
      )}
    </div>
  )
}

export default App