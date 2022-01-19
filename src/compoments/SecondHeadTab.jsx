// import { , useRef } from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
function SecondHeadTab({ categories = [] }) {
  const [tab, setTab] = useState(0);
  useEffect(() => {
    setTab(0);
  }, [categories]);
  function getTabStyle(index) {
    const isActive = (index === tab);
    const tabStyle = "text-xl mx-2 px-4 border rounded-full"
    return `${tabStyle}${isActive ? " text-white bg-purple-600" : ""}`;
  }
  return (
    <div className={`${categories.length ? "h-14 flex flex-row w-full items-center bg-gray-100" : ""}`}>
      {categories.length > 0 &&
        <NavLink className={(_) => getTabStyle(0)} to={'./'} onClick={() => { setTab(0) }}>
          全部
        </NavLink>}
      {categories.map(({ category_id, category_name }, index) => {
        return (
          <NavLink className={(_) => getTabStyle(index + 1)} key={category_id} to={'./' + category_id} onClick={() => { setTab(index + 1) }}>
            {category_name}
          </NavLink>
        );
      })}
    </div>
  )
}
export default SecondHeadTab;