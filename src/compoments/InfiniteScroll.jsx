import { useEffect, useRef } from "react";
import throttle from "../js/throttle";

function InfiniteScroll({ getMore }) {
  const scrollEl = useRef(null);
  const func = throttle(getMore, 500);
  useEffect(() => {
    const parent = scrollEl.current.parentNode;
    parent.addEventListener("scroll", check);
    return () => {
      parent.removeEventListener("scroll", check)
    };
  }, []);
  
  function check() {
    if (scrollEl.current.getBoundingClientRect().bottom <= scrollEl.current.parentNode.getBoundingClientRect().bottom + 1) {
      func();
    }
  }
  return (
    <div ref={scrollEl} ></div>
  )
}
export default InfiniteScroll;