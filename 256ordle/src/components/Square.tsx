interface SquareProps {
  letter: string | null;
  backgroundColor: "green" | "yellow" | "white" | "grey";
  isInputRow?: boolean;
}

const Square = ({ letter, backgroundColor, isInputRow = false }: SquareProps) => {
  const getBorderColor = () => {
    if (backgroundColor !== 'white') {
      return 'transparent';
    }
    if (isInputRow && letter) {
      return '#333333';
    }
    return '#d3d3d3';
  };

  return (
    <div style={{
        height: 20,
        width: 20,
        borderWidth: 2,
        borderColor: getBorderColor(),
        borderStyle: 'solid',
        backgroundColor: backgroundColor,
        color: 'black',
        padding: 20,
        fontSize: 40,
        fontWeight:'bold',
        margin: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        {letter}
    </div>
  )
}

export default Square