// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function FirstHeadTab({categories}) {
  
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
export default FirstHeadTab;