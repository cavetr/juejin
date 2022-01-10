import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

function BottomTab() {
  const wtab = useRef(0);
  useEffect(() => {
    wtab.current = 0;
  }, []);
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
  function getTabStyle(index) {
    const isActive = (index === wtab.current);
    const tabStyle = "text-xl";
    return `${tabStyle}${isActive ? " text-purple-600" : ""}`;
  }
  return (
    <div className="h-10 flex flex-row justify-around w-full items-center border-t">
      {tabs.map(({ path, tab }, index) => {
        return (
          <NavLink className={(_) => getTabStyle(index)} key={index} to={`${path}/${path}`} onClick={() => { wtab.current = index }}>
            {tab}
          </NavLink>
        );
      })}
    </div>
  )
}
export default BottomTab;