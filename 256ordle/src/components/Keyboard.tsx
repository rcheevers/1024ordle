import Square from "./square"

interface guessedLettersProps {
  letters: [string[], string[], string[], string[], string[], string[]];
}

interface KeyboardProps {
  guessedLetters: guessedLettersProps;
}

const Keyboard = ({guessedLetters}: KeyboardProps) => {

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    }}>
      <KeyboardRow word={"qwertyuiop"} guessedLetters={guessedLetters.letters[0]} />
      <KeyboardRow word={"asdfghjkl "} guessedLetters={guessedLetters.letters[0]} />
      <KeyboardRow word={" zxcvbnm  "} guessedLetters={guessedLetters.letters[0]} />
    </div>
  )
}

interface RowProps {
  word: string;
  guessedLetters: string[];
}

const KeyboardRow = ({word, guessedLetters}: RowProps) => {

  return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 5, 
        paddingBottom: 5
      }}>
        {word.split('').map((item: string) => <Square letter={item} backgroundColor={item in guessedLetters ? 'grey' : 'white'} />)}
      </div>
  )
}

export default Keyboard