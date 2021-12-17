import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../fake-api/index"
function SecondHeadTab() {
  const [categories, setCategories] = useState([]);
  useEffect(async () => {
    // const firstTab = (await getCategories()).data.categories.filter(element=>element.category_id===);
    
    // setCategories();
  }, [])
  return (
    <>
      {categories.map(({ category_id, category_name }) => {
        return (
          <Link key={category_id} to={'./'+category_id}>
            {category_name}
          </Link>
        );
      })}
    </>
  )
}
export default SecondHeadTab;