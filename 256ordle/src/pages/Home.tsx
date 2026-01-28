interface HomeProps {
  onStartGame: () => void;
}

function Home({ onStartGame }: HomeProps) {
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
        margin: 0
      }}>
        512ordle
      </h1>
      <button
        onClick={onStartGame}
        style={{
          fontSize: '32px',
          padding: '20px 40px',
          cursor: 'pointer',
          backgroundColor: '#6aaa64',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold'
        }}
      >
        Start Game
      </button>
    </div>
  )
}

export default Home
