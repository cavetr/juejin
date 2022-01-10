import { Routes, Route, Navigate } from 'react-router-dom';
import ArticleIntroductionList from "../compoments/ArticleIntroductionList"
import SecondHeadTab from "../compoments/SecondHeadTab";
import ErrorPage from './ErrorPage';

function SecondPage({ beforeId, categories = [] }) {
  return (
    <div>
      <SecondHeadTab categories={categories}/>
      <Routes>
        <Route path="/" element={<ArticleIntroductionList category_id={beforeId} />}></Route>
        {(categories).map(({ category_id }) => {
          return (
            <Route key={category_id} path={`${category_id}`} element={<ArticleIntroductionList category_id={category_id} />}></Route>
          );
        })}
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </div>

  );
}
export default SecondPage;