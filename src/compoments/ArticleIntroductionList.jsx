import { useEffect } from "react";
import { getArticles } from "../../fake-api/index"
import ArticleIntroduction from "./ArticleIntroduction"
function ArticleIntroductionList() {
  const arr = [1, 2, 3];
  useEffect(async () => {
    await getArticles();
  })
  return (
    <>
      {arr.map((item, index) => {
        return <ArticleIntroduction key={item + index} />
      })}
    </>
  )
}
export default ArticleIntroductionList;