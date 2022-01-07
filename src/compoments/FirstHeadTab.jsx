import { NavLink } from "react-router-dom";
function FirstHeadTab({categories}) {
  function getTabStyle({ isActive }) {
    const tabStyle = "text-xl"
    return `${tabStyle}${isActive ? " text-purple-600" : ""}`;
  }
  return (
    <div className="h-10 flex flex-row justify-around w-full items-center border-b" >
      {categories.map(({ category_id, category_name }) => {
        return (
          <NavLink className={getTabStyle} key={category_id} to={`./${category_id}`}>
            {category_name}
          </NavLink>
        );
      })}
    </div>
  )
}
export default FirstHeadTab;