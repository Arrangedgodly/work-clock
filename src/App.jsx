import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [breakCount, setBreakCount] = useState(5);
  const [sessionCount, setSessionCount] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerDisplay, setTimerDisplay] = useState("25:00");
  const [isRunning, setIsRunning] = useState(false);
  const [activeTimer, setActiveTimer] = useState("Session");
  const intervalRef = useRef(null);
  const beep = document.getElementById("beep");

  useEffect(() => {
    if (sessionCount < 1) {
      setSessionCount(1);
    }
    if (sessionCount > 60) {
      setSessionCount(60);
    }
  }, [sessionCount]);

  useEffect(() => {
    if (breakCount < 1) {
      setBreakCount(1);
    }
    if (breakCount > 60) {
      setBreakCount(60);
    }
  }, [breakCount]);

  useEffect(() => {
    if ((activeTimer === "Session") && (!isRunning)) {
      setTimeLeft(sessionCount * 60);
    }
  }, [sessionCount]);

  useEffect(() => {
    if ((activeTimer === "Break") && (!isRunning)) {
      setTimeLeft(breakCount * 60);
    }
  }, [breakCount]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);

      return () => clearInterval(intervalRef.current);
    }
  }, [isRunning, sessionCount, breakCount]);

  useEffect(() => {
    if (timeLeft === -1) {
      beep.play();
      if (activeTimer === "Session") {
        setTimeLeft(breakCount * 60);
        setActiveTimer("Break");
      } else {
        setTimeLeft(sessionCount * 60);
        setActiveTimer("Session");
      }
    }
  }, [timeLeft]);

  const resetTimer = () => {
    setIsRunning(false);
    setSessionCount(25);
    setBreakCount(5);
    setTimeLeft(25 * 60);
    setActiveTimer("Session");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    beep.pause();
    beep.currentTime = 0;
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    setTimerDisplay(formatTime(timeLeft));
  }, [timeLeft]);

  return (
    <main className="main">
      <h1 className="title">25 + 5 Clock</h1>
      <div className="clock-buttons">
        <div className="clock-button">
          <h2 className="clock-button-title" id="break-label">
            Break Length
          </h2>
          <div className="clock-button-container">
            <button
              className="clock-button-decrement"
              id="break-decrement"
              onClick={() => setBreakCount(breakCount - 1)}
            >
              -
            </button>
            <h2 className="clock-button-length" id="break-length">
              {breakCount}
            </h2>
            <button
              className="clock-button-increment"
              id="break-increment"
              onClick={() => setBreakCount(breakCount + 1)}
            >
              +
            </button>
          </div>
        </div>
        <div className="clock-button">
          <h2 className="clock-button-title" id="session-label">
            Session Length
          </h2>
          <div className="clock-button-container">
            <button
              className="clock-button-decrement"
              id="session-decrement"
              onClick={() => setSessionCount(sessionCount - 1)}
            >
              -
            </button>
            <h2 className="clock-button-length" id="session-length">
              {sessionCount}
            </h2>
            <button
              className="clock-button-increment"
              id="session-increment"
              onClick={() => setSessionCount(sessionCount + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="clock">
        <h2 className="clock-title" id="timer-label">
          {activeTimer}
        </h2>
        <h2 className="clock-length" id="time-left">
          {timerDisplay}
        </h2>
      </div>
      <div className="clock-controls">
        <button className="clock-control" id="start_stop" onClick={() => {setIsRunning(!isRunning)}}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="clock-control" id="reset" onClick={resetTimer}>
          Reset
        </button>
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </main>
  );
}

export default App;
