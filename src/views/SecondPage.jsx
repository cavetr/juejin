import { Routes, Route, Navigate } from 'react-router-dom';
import ArticleIntroductionList from "../compoments/ArticleIntroductionList"
import SecondHeadTab from "../compoments/SecondHeadTab";
import ErrorPage from './ErrorPage';

function SecondPage({ beforeId, categories = [] }) {
  console.log(categories)
  return (
    <>
      <SecondHeadTab categories={categories} />
      <Routes>
        <Route index element={<ArticleIntroductionList category_id={beforeId} />}></Route>
        {(categories).map(({ category_id }) => {
          console.log(category_id);
          return (
            <Route key={category_id} path={`${category_id}`} element={<ArticleIntroductionList category_id={category_id} />}></Route>
          );
        })}
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </>

  );
}
export default SecondPage;