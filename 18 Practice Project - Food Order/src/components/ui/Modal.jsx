import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({children, open, onClose, className = ''}) {
  const ref = useRef();

  useEffect(() => {   
    const modal = ref.current;
    
    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={ref} className={`modal ${className}`} onClose={onClose}>{children}</dialog>, 
    document.getElementById('modal')
  );
}