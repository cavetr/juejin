import { Routes, Route, Navigate } from 'react-router-dom';
import FrontPage from './FrontPage';
import HistoryPage from './HistoryPage'
import BottomTab from '../compoments/BottomTab';
import ErrorPage from './ErrorPage';
import ArticlePage from './ArticlePage';
function NewPage() {
  return (
    <FrontPage />
  );
}
function HotPage() {
  return (
    <FrontPage />
  )
}
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="hot/hot/0"/>}></Route>
        {/* <Route path="hot/*" element={<FrontPage/>}></Route>
        <Route path="new/*" element={<FrontPage/>}></Route> */}
        <Route path="hot/:sortType/*" element={<HotPage/>}></Route>
        <Route path="new/:sortType/*" element={<NewPage/>}></Route>
        <Route path="history/history" element={<HistoryPage />}></Route>
        <Route path="article/:articleId" element={<ArticlePage />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
      <BottomTab></BottomTab>
    </div>
  )
}

export default App
