// import { useEffect, useState } from "react";
import { getCategories } from "../../fake-api/index"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function FirstHeadTab({categories}) {
  return (
    <div>
      {categories.map(({ category_id, category_name }) => {
        return (
          <Link key={category_id} to={'./'+category_id}>
            {category_name}
          </Link>
        );
      })}
    </div>
  )
}
export default FirstHeadTab;