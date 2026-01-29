interface WinPageProps {
  guessCount: number;
  onBackToHome: () => void;
}

function WinPage({ guessCount, onBackToHome }: WinPageProps) {
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
      <button
        onClick={onBackToHome}
        style={{
          fontSize: '24px',
          padding: '15px 30px',
          cursor: 'pointer',
          backgroundColor: '#6aaa64',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold'
        }}
      >
        Back to Home
      </button>
    </div>
  );
}

export default WinPage;
