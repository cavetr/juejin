import FirstHeadTab from "../compoments/FirstHeadTab";
import SecondPage from "./SecondPage";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { getCategories } from "../../fake-api/index"
import { useEffect, useState } from "react";

function FrontPage() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getTheCategories() {
      setCategories((await getCategories()).data.categories);
    }
    getTheCategories();
  }, []);
  return (
    <div>
      <FirstHeadTab categories={categories} />
      <Routes>
        <Route path="/" element={<SecondPage/>}></Route>
        {(categories).map(({ category_id, children }) => {
          return (
            <Route key={category_id} path={`${category_id}/*`} element={<SecondPage categories={children} beforeId={category_id} />}></Route>
          );
        })}
      </Routes>
    </div>
  )
}
export default FrontPage;