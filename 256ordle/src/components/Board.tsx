import Square from "./square"

interface BoardProps {
  word: string;
  guessedLetters: guessedLettersProps;
}

interface guessedLettersProps {
  letters: [string[], string[], string[], string[], string[], string[]];
}

const Board = ({word, guessedLetters}: BoardProps) => {
  var column1: ColumnProps = {
    greenLetter: word[0] in guessedLetters.letters[1] ? word[0] : null,
    yellowLetters: guessedLetters.letters[1].filter((char: string) => word.includes(char)),
  }
  var column2: ColumnProps = {
    greenLetter: word[1] in guessedLetters.letters[2] ? word[1] : null,
    yellowLetters: guessedLetters.letters[2].filter((char: string) => word.includes(char)),
  }
  var column3: ColumnProps = {
    greenLetter: word[2] in guessedLetters.letters[3] ? word[2] : null,
    yellowLetters: guessedLetters.letters[3].filter((char: string) => word.includes(char)),
  }
  var column4: ColumnProps = {
    greenLetter: word[3] in guessedLetters.letters[4] ? word[3] : null,
    yellowLetters: guessedLetters.letters[4].filter((char: string) => word.includes(char)),
  }
  var column5: ColumnProps = {
    greenLetter: word[4] in guessedLetters.letters[5] ? word[4] : null,
    yellowLetters: guessedLetters.letters[5].filter((char: string) => word.includes(char)),
  }


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    }}>
      <WordColumn {...column1} />
      <WordColumn {...column2} />
      <WordColumn {...column3} />
      <WordColumn {...column4} />
      <WordColumn {...column5} />
    </div>
  )
}

interface ColumnProps {
  greenLetter: string | null;
  yellowLetters: string[];
}

const WordColumn = ({greenLetter, yellowLetters}: ColumnProps) => {

  return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: 5, 
        paddingBottom: 5
      }}>
        <Square letter={greenLetter} backgroundColor={greenLetter==null ? 'white' : 'green' } />
        <Square letter={yellowLetters[0]} backgroundColor={yellowLetters[0]==null ? 'white' : 'yellow' }/>
        <Square letter={yellowLetters[1]} backgroundColor={yellowLetters[1]==null ? 'white' : 'yellow' }/>
        <Square letter={yellowLetters[2]} backgroundColor={yellowLetters[2]==null ? 'white' : 'yellow' }/>
        <Square letter={yellowLetters[3]} backgroundColor={yellowLetters[3]==null ? 'white' : 'yellow' }/>
        <Square letter={null} backgroundColor={'white'}/>
      </div>
      
  )
}

export default Board