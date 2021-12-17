import FirstHeadTab from "../compoments/FirstHeadTab";
import SecondPage from "./SecondPage";
import { getCategories } from "../../fake-api/index"
import { Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { useEffect, useState } from "react";

function FrontPage() {
  const [categories, setCategories] = useState([]);
  useEffect(async () => {
    setCategories((await getCategories()).data.categories);
  }, []);
  return (
    <>
      <FirstHeadTab categories={categories} />
      <Routes>
        {/* <Route path="/" element={<Navigate to={categories[0].category_id} />}></Route> */}
        <Route path="/" element={<Navigate to="0" />}></Route>
        <Route path=":id/*" element={<SecondPage />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>

    </>
  )
}
export default FrontPage;