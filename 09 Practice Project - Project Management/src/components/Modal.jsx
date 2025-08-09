import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom"
import Button from "./Button";

export default forwardRef(function Modal({ buttonCaption, children }, ref) {
  const _selfRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        _selfRef.current.showModal();
      }
    }
  })

  return createPortal(<dialog ref={_selfRef} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
    {children}
    <form method="dialog" className="mt-4 text-right">
      <Button>{buttonCaption}</Button>
    </form>
  </dialog>, document.getElementById('modal-root'));
})