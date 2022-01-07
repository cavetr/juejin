import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../fake-api/index"
function SecondHeadTab({ categories = [] }) {
  const params = useParams()
  function getTabStyle({ isActive }) {
    const tabStyle = "text-lg mx-2 px-4 border rounded-full"
    return `${tabStyle}${isActive ? " text-white bg-purple-600" : ""}`;
  }
  return (
    <div className={`${categories.length ? "h-10 flex flex-row w-full items-center" : ""}`}>
      {categories.length>0 &&
        <NavLink className={getTabStyle} to={'./'}>
          全部
        </NavLink>}
      {categories.map(({ category_id, category_name }) => {
        return (
          <NavLink className={getTabStyle} key={category_id} to={'./' + category_id}>
            {category_name}
          </NavLink>
        );
      })}
    </div>
  )
}
export default SecondHeadTab;