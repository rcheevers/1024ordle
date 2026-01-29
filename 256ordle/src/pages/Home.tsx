interface HomeProps {
  onStartGame: (wordCount: number) => void;
}

function Home({ onStartGame }: HomeProps) {
  const boardCounts = [1, 2, 4, 8, 16, 32, 64, 128, 256, 1024, 2048];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: '40px',
      padding: '20px'
    }}>
      <h1 style={{
        fontSize: '72px',
        fontWeight: 'bold',
        margin: 0
      }}>
        Multiordle
      </h1>
      <div style={{
        fontSize: '16px',
        maxWidth: '700px',
        textAlign: 'left',
        lineHeight: '1.8'
      }}>
        <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>
          Solve multiple Wordle boards at once!
        </p>
        <p><strong>How to play:</strong></p>
        <ul style={{ marginTop: '10px', marginBottom: '20px' }}>
          <li>Type 5-letter words and press <strong>Enter</strong> to submit</li>
          <li>Each guess applies to all boards simultaneously</li>
          <li>Green tiles show correct letters in the correct position</li>
          <li>Yellow tiles show correct letters in the wrong position</li>
          <li>Words with all 5 positions known are automatically solved</li>
          <li>Boards are sorted by most known letters (green + yellow)</li>
        </ul>
        <p><strong>Understanding the board (this is different from regular Wordle!):</strong></p>
        <ul style={{ marginTop: '10px', marginBottom: '20px' }}>
          <li>Each board shows <strong>5 vertical columns</strong>, one for each letter position</li>
          <li>Each column has <strong>6 rows</strong>:
            <ul style={{ marginLeft: '20px', marginTop: '5px' }}>
              <li><strong>Row 1 (green):</strong> The correct letter if you've guessed it in this position</li>
              <li><strong>Rows 2-5 (yellow):</strong> Letters you've guessed that are in the word but wrong position</li>
              <li><strong>Row 6 (bottom):</strong> Your current typed letter (darker border)</li>
            </ul>
          </li>
          <li>Empty white squares mean you haven't guessed any useful info for that slot yet</li>
          <li>When a position has a green letter, that position is solved</li>
          <li>Yellow letters tell you those letters exist in the word but belong elsewhere</li>
          <li>Once all 5 positions show green, the word is automatically solved</li>
        </ul>
        <p><strong>Controls:</strong></p>
        <ul style={{ marginTop: '10px', marginBottom: '20px' }}>
          <li><strong>Arrow Left/Right</strong> or click buttons to navigate between boards</li>
          <li><strong>Backspace</strong> to delete letters</li>
          <li><strong>A-Z</strong> to type letters</li>
          <li><strong>Enter</strong> to submit your guess</li>
        </ul>
        <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', marginTop: '30px' }}>
          Select number of boards:
        </p>
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        justifyContent: 'center',
        maxWidth: '600px'
      }}>
        {boardCounts.map(count => (
          <button
            key={count}
            onClick={() => onStartGame(count)}
            style={{
              fontSize: '24px',
              padding: '15px 30px',
              cursor: 'pointer',
              backgroundColor: '#6aaa64',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              minWidth: '100px'
            }}
          >
            {count}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Home
