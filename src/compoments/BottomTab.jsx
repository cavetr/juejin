import { Link } from "react-router-dom";

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
  return (
    <div className="h-10 flex flex-row justify-around w-full items-center">
      {tabs.map(({ path, tab }, index) => {
        return (
          <Link key={index} to={`${path}/${path}`}>
            {tab}
          </Link>
        );
      })}
    </div>
  )
}
export default BottomTab;