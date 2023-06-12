import { useState, useEffect, useRef } from 'react';
import './App.css'

function App() {
  const [breakCount, setBreakCount] = useState(5);
  const [sessionCount, setSessionCount] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (sessionCount < 1) {
      setSessionCount(1);
    }
  }, [sessionCount]);

  useEffect(() => {
    if (breakCount < 1) {
      setBreakCount(1);
    }
  }, [breakCount]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);

      return () => clearInterval(intervalRef.current);
    }
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSessionCount(25);
    setBreakCount(5);
    setTimeLeft(25 * 60);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

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
      <div className="clock">
        <h2 className="clock-title" id="timer-label">
          Session
        </h2>
        <h2 className="clock-length" id="time-left">
          {formatTime(timeLeft)}
        </h2>
      </div>
      <div className="clock-controls">
        <button className="clock-control" id="start_stop" onClick={toggleTimer}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button className="clock-control" id="reset" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </main>
  )
}

export default App
