import { NavLink } from "react-router-dom";

function BottomTab() {
  const tabs = [{
    path: 'hot',
    tab: '热门',
  }, {
    path: 'new',
    tab: '最新',
  }, {
    path: 'history',
    tab: '历史'
  }];
  function getTabStyle({ isActive }) {
    const tabStyle = "text-xl"
    return `${tabStyle}${isActive ? " text-purple-600" : ""}`;
  }
  return (
    <div className="h-10 flex flex-row justify-around w-full items-center">
      {tabs.map(({ path, tab }, index) => {
        return (
          <NavLink className={getTabStyle} key={index} to={`${path}/${path}`}>
            {tab}
          </NavLink>
        );
      })}
    </div>
  )
}
export default BottomTab;