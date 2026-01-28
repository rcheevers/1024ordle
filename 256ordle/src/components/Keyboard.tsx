import Square from "./square"

interface guessedLettersProps {
  letters: [string[], string[], string[], string[], string[], string[]];
}

interface KeyboardProps {
  guessedLetters: guessedLettersProps;
  onLetterClick: (letter: string) => void;
}

const Keyboard = ({guessedLetters, onLetterClick}: KeyboardProps) => {

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    }}>
      <KeyboardRow word={"qwertyuiop"} guessedLetters={guessedLetters.letters[0]} onLetterClick={onLetterClick} />
      <KeyboardRow word={"asdfghjkl "} guessedLetters={guessedLetters.letters[0]} onLetterClick={onLetterClick} />
      <KeyboardRow word={" zxcvbnm  "} guessedLetters={guessedLetters.letters[0]} onLetterClick={onLetterClick} />
    </div>
  )
}

interface RowProps {
  word: string;
  guessedLetters: string[];
  onLetterClick: (letter: string) => void;
}

const KeyboardRow = ({word, guessedLetters, onLetterClick}: RowProps) => {

  return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 5,
        paddingBottom: 5
      }}>
        {word.split('').map((item: string, index: number) => (
          <div key={index} onClick={() => item.trim() && onLetterClick(item)}>
            <Square letter={item} backgroundColor={guessedLetters.includes(item) ? 'grey' : 'white'} />
          </div>
        ))}
      </div>
  )
}

export default Keyboard