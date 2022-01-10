import { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../fake-api/index"
function SecondHeadTab({ categories = [] }) {
  const params = useParams();
  const tab = useRef(0);
  useEffect(() => {
    tab.current = 0;
  },[categories])
  function getTabStyle(index) {
    const isActive = (index === tab.current);
    const tabStyle = "text-lg mx-2 px-4 border rounded-full"
    return `${tabStyle}${isActive ? " text-white bg-purple-600" : ""}`;
  }
  return (
    <div className={`${categories.length ? "h-10 flex flex-row w-full items-center" : ""}`}>
      {categories.length > 0 &&
        <NavLink className={(_) => getTabStyle(0)} to={'./'} onClick={() => { tab.current = 0 }}>
          全部
        </NavLink>}
      {categories.map(({ category_id, category_name }, index) => {
        return (
          <NavLink className={(_) => getTabStyle(index + 1)} key={category_id} to={'./' + category_id} onClick={() => { tab.current = index + 1 }}>
            {category_name}
          </NavLink>
        );
      })}
    </div>
  )
}
export default SecondHeadTab;