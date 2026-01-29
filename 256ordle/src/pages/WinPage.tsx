interface WinPageProps {
  guessCount: number;
  elapsedTime: number;
  onBackToHome: () => void;
}

function WinPage({ guessCount, elapsedTime, onBackToHome }: WinPageProps) {
  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    } else if (minutes > 0) {
      return `${minutes}:${String(seconds).padStart(2, '0')}`;
    } else {
      return `${seconds}s`;
    }
  };

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
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div>Total Guesses: {guessCount}</div>
        <div>Time: {formatTime(elapsedTime)}</div>
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
