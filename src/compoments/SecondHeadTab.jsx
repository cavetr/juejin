import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../fake-api/index"
function SecondHeadTab({ categories = [] }) {
  return (
    <div className={`${categories.length ? "h-10 flex flex-row justify-around w-full items-center" : ""}`}>
      {categories.map(({ category_id, category_name }) => {
        return (
          <Link key={category_id} to={'./' + category_id}>
            {category_name}
          </Link>
        );
      })}
    </div>
  )
}
export default SecondHeadTab;