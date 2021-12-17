import { Routes, Route, Navigate } from 'react-router-dom';
import ArticleIntroductionList from "../compoments/ArticleIntroductionList"
import SecondHeadTab from "../compoments/SecondHeadTab";
import ErrorPage from './ErrorPage';
function SecondPage() {
  return (
    <>
      <SecondHeadTab/>
      <Routes>
        <Route path="/" element={<Navigate to="0" />}></Route>
        <Route path=':id' element={<ArticleIntroductionList />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </>

  );
}
export default SecondPage;