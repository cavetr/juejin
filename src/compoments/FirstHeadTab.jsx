import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
function FirstHeadTab({ categories }) {
  const tab = useRef(0);
  useEffect(() => {
    tab.current = 0;
  }, [categories])
  function getTabStyle(index) {
    const isActive = (index === tab.current);
    const tabStyle = "text-2xl"
    return `${tabStyle}${isActive ? " text-purple-600" : ""}`;
  }
  return (
    <div className="h-16 flex flex-row justify-around w-full items-center" >
      {categories.map(({ category_id, category_name }, index) => {
        return (
          <NavLink className={(_) => getTabStyle(index)} key={category_id} to={`./${category_id}`} onClick={() => { tab.current = index }}>
            {category_name}
          </NavLink>
        );
      })}
    </div>
  )
}
export default FirstHeadTab;