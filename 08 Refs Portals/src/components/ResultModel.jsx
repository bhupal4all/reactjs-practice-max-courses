import React, { forwardRef, useImperativeHandle } from "react"
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModel({targetTime, remainingTime, handleReset}, ref) {
  const _selfRef = React.useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime/1000).toFixed(2);
  const score = Math.round((1-remainingTime/(targetTime*1000))*100);

  useImperativeHandle(ref, ()=>{
    return {
      open: () => _selfRef.current.showModal()
    };
  });

  return createPortal(
    <dialog ref={_selfRef} className="result-modal" onClose={handleReset}>
      {userLost && <h2>You Lost</h2>}
      {!userLost && <h2>Score: {score}</h2>}
      <p>Target Time was <strong>{targetTime} seconds</strong>.</p>
      <p>You stopped the timer with <strong>{formattedRemainingTime} seconds</strong> left.</p>
      <form method="dialog" onSubmit={handleReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  )
});

export default ResultModal;