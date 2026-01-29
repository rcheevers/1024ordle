interface WinPageProps {
  guessCount: number;
}

function WinPage({ guessCount }: WinPageProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: '40px'
    }}>
      <h1 style={{
        fontSize: '72px',
        fontWeight: 'bold',
        margin: 0,
        color: '#6aaa64'
      }}>
        You Win!
      </h1>
      <div style={{
        fontSize: '32px',
        fontWeight: 'bold'
      }}>
        Total Guesses: {guessCount}
      </div>
    </div>
  );
}

export default WinPage;
