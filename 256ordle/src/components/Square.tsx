interface SquareProps {
  letter: string | null;
  backgroundColor: "green" | "yellow" | "white" | "grey";
}

const Square = ({ letter }: SquareProps) => {

  return (
    <div style={{
        height: 20,
        width: 20,
        borderWidth: 2,
        borderColor: 'black', 
        borderStyle: 'solid', 
        color: 'black',
        padding: 20, 
        fontSize: 40, 
        fontWeight:'bold', 
        lineHeight: 0,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
    }}>
        {letter}
    </div>
  )
}

export default Square