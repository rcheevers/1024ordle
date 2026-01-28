import './App.css'
import Board from './components/board'
import { useState } from 'react'
import Keyboard from './components/Keyboard';

interface guessedLettersProps {
  letters: [string[], string[], string[], string[], string[], string[]];
}

function App() {
  const [guessedLetters, setGuessedLetters] = useState<guessedLettersProps>({
    letters: [[], [], [], [], [], []]
  });
  const [wordIndex, setWordIndex] = useState<number>(0);
  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Board word={'hello'} guessedLetters={guessedLetters} />
      </div>
      <Keyboard guessedLetters={guessedLetters}/>
    </div>
  )
}

export default App
