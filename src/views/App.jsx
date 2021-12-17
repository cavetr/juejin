import { Routes, Route, Navigate } from 'react-router-dom';
import FrontPage from './FrontPage';
import HistoryPage from './HistoryPage'
import BottomTab from '../compoments/BottomTab';
import ErrorPage from './ErrorPage';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="hot" />}></Route>
        <Route path="hot/*" element={<FrontPage />}></Route>
        <Route path="new/*" element={<FrontPage />}></Route>
        <Route path="history" element={<HistoryPage />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
      <BottomTab></BottomTab>
    </>
  )
}

export default App
