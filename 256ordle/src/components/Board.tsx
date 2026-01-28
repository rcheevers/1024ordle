import Square from "./square"

interface BoardProps {
  word: string;
  guessedLetters: guessedLettersProps;
  currentInput: string;
}

interface guessedLettersProps {
  letters: [string[], string[], string[], string[], string[], string[]];
}

const Board = ({word, guessedLetters, currentInput}: BoardProps) => {
  const green1 = guessedLetters.letters[1].includes(word[0]) ? word[0] : null;
  const green2 = guessedLetters.letters[2].includes(word[1]) ? word[1] : null;
  const green3 = guessedLetters.letters[3].includes(word[2]) ? word[2] : null;
  const green4 = guessedLetters.letters[4].includes(word[3]) ? word[3] : null;
  const green5 = guessedLetters.letters[5].includes(word[4]) ? word[4] : null;

  const allGreens = [green1, green2, green3, green4, green5].filter(g => g !== null);

  var column1: ColumnProps = {
    greenLetter: green1,
    yellowLetters: guessedLetters.letters[1].filter((char: string) => word.includes(char) && char !== word[0] && !allGreens.includes(char)),
    currentInputLetter: currentInput[0] || null,
  }
  var column2: ColumnProps = {
    greenLetter: green2,
    yellowLetters: guessedLetters.letters[2].filter((char: string) => word.includes(char) && char !== word[1] && !allGreens.includes(char)),
    currentInputLetter: currentInput[1] || null,
  }
  var column3: ColumnProps = {
    greenLetter: green3,
    yellowLetters: guessedLetters.letters[3].filter((char: string) => word.includes(char) && char !== word[2] && !allGreens.includes(char)),
    currentInputLetter: currentInput[2] || null,
  }
  var column4: ColumnProps = {
    greenLetter: green4,
    yellowLetters: guessedLetters.letters[4].filter((char: string) => word.includes(char) && char !== word[3] && !allGreens.includes(char)),
    currentInputLetter: currentInput[3] || null,
  }
  var column5: ColumnProps = {
    greenLetter: green5,
    yellowLetters: guessedLetters.letters[5].filter((char: string) => word.includes(char) && char !== word[4] && !allGreens.includes(char)),
    currentInputLetter: currentInput[4] || null,
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
  currentInputLetter: string | null;
}

const WordColumn = ({greenLetter, yellowLetters, currentInputLetter}: ColumnProps) => {

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
        <Square letter={currentInputLetter} backgroundColor={'white'} isInputRow={true} />
      </div>

  )
}

export default Board