import { useState } from 'react'
import './App.css'

function App() {
  const [breakCount, setBreakCount] = useState(5)
  const [sessionCount, setSessionCount] = useState(25)

  return (
    <main className='main'>
      <h1 className='title'>25 + 5 Clock</h1>
      <div className='clock-buttons'>
        <div className='clock-button'>
          <h2 className='clock-button-title' id='break-label'>
            Break Length
          </h2>
          <div className='clock-button-container'>
            <button
              className='clock-button-decrement'
              id='break-decrement'
              onClick={() => setBreakCount(breakCount - 1)}
            >
              -
            </button>
            <h2 className='clock-button-length' id='break-length'>
              {breakCount}
            </h2>
            <button
              className='clock-button-increment'
              id='break-increment'
              onClick={() => setBreakCount(breakCount + 1)}
            >
              +
            </button>
          </div>
        </div>
        <div className='clock-button'>
          <h2 className='clock-button-title' id='session-label'>
            Session Length
          </h2>
          <div className='clock-button-container'>
            <button
              className='clock-button-decrement'
              id='session-decrement'
              onClick={() => setSessionCount(sessionCount - 1)}
            >
              -
            </button>
            <h2 className='clock-button-length' id='session-length'>
              {sessionCount}
            </h2>
            <button
              className='clock-button-increment'
              id='session-increment'
              onClick={() => setSessionCount(sessionCount + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className='clock'>
      </div>
    </main>
  )
}

export default App
