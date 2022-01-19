import { useEffect, useRef } from "react";
import goTop from "../img/goTop.svg";
function GoTop({ el }) {
  const goTopBox = useRef(null);
  useEffect(() => {
    goTopBox.current?.addEventListener("touchmove", move, { passive: false });
  }, [goTopBox]);
  function move(e) {
    goTopBox.current.style.top = e.targetTouches[0].pageY + 'px';
    e.preventDefault();
  }
  return (
    <button ref={goTopBox} className="h-14 absolute right-4 bottom-20 bg-white rounded-full" onClick={() => { el.scrollTop = 0 }}>
      <img src={goTop} alt="Go Top" className="h-14 rounded-full border" />
    </button>
  )
}
export default GoTop;