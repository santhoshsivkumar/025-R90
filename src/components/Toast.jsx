import { useEffect, useRef } from "react";

export default function Toast({ message, visible }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.classList.toggle("show", visible);
    }
  }, [visible]);

  return (
    <div className={`toast${visible ? " show" : ""}`} ref={ref}>
      <div className="toast-body">{message}</div>
    </div>
  );
}
