import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [breakCount, setBreakCount] = useState(5)
  const [sessionCount, setSessionCount] = useState(25)

  useEffect(() => {
    if (sessionCount < 1) {
      setSessionCount(1)
    }
  }, [sessionCount])

  useEffect(() => {
    if (breakCount < 1) {
      setBreakCount(1)
    }
  }, [breakCount])

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
          <h2 className='clock-title' id='timer-label'>
            Session
          </h2>
          <h2 className='clock-length' id='time-left'>
            {sessionCount}:00
          </h2>
      </div>
      <div className='clock-controls'>
        <button className='clock-control' id='start_stop'>
          Start/Stop
        </button>
        <button className='clock-control' id='reset'>
          Reset
        </button>
      </div>
    </main>
  )
}

export default App
