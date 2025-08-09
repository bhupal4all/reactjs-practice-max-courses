import React from "react";
import ResultModel from "./ResultModel";

export default function TimerChallenge({title, targetTime}) {
  const [remainingTime, setRemainingTime] = React.useState(targetTime*1000);

  const timer = React.useRef();
  const dailog = React.useRef();

  const timerIsActive = remainingTime>0 && remainingTime < targetTime*1000;

  if (remainingTime <= 0) {
    dailog.current.open();
    clearTimeout(timer.current);
  }

  function handleReset() {
    setRemainingTime(targetTime*1000);
  }
  
  function handleStart() {
    timer.current = setInterval(() => {
      setRemainingTime(preRemainingTime => preRemainingTime-100);
    }, 100);
  }

  function handleStop() {
    dailog.current.open();
    clearTimeout(timer.current);
  }

  return <>
  <ResultModel ref={dailog} targetTime={targetTime} remainingTime={remainingTime} handleReset={handleReset} />
  <section className="challenge">
    <h2>{title}</h2>
    
    <p className="challenge-time">
      {targetTime} second{targetTime > 1 ? 's' : ''}
    </p>
    <p>Remaing Time: {remainingTime/1000} seconds</p>
    <p>
    <button onClick={timerIsActive ? handleStop: handleStart}>{timerIsActive?'Stop':'Start'} Challenge</button>
    </p>
    <p className={timerIsActive?'active':''}>
      {timerIsActive? 'Time is Running...':'Timer inactive'}
    </p>
  </section>
</>;
}