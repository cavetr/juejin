import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import HotImg from "../img/HotImg";
import NewImg from "../img/NewImg"
import HistoryImg from "../img/HistoryImg";

function BottomTab() {
  const wtab = useRef(0);
  useEffect(() => {
    wtab.current = 0;
  }, []);
  const tabs = [{
    path: 'hot',
    tab: '热门',
    src: <HotImg />,
  }, {
    path: 'new',
    tab: '最新',
    src: <NewImg />,
  }, {
    path: 'history',
    tab: '历史',
    src: <HistoryImg />,
  }];
  function getTabStyle(index) {
    const isActive = (index === wtab.current);
    const tabStyle = "text-xl flex flex-col items-center";
    return `${tabStyle}${isActive ? " text-purple-600" : ""}`;
  }
  return (
    <div className="h-20 flex flex-row justify-around w-full items-center border-t">
      {tabs.map(({ path, tab, src }, index) => {
        return (
          <NavLink className={(_) => getTabStyle(index)} key={index} to={`${path}/${path}`} onClick={() => { wtab.current = index }}>
            {src}
            {tab}
          </NavLink>
        );
      })}
    </div>
  )
}
export default BottomTab;