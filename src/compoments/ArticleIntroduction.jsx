import { useNavigate } from "react-router-dom";
import getDate from "../js/getDate";
function ArticleIntroduction({ articleId, author, content, title, time }) {
  const navigate = useNavigate();
  function toArticle() {
    const article = {
      articleId,
      author,
      content,
      title,
      time,
    }
    // console.log(article);
    navigate(`../../../article/${articleId}`);
    const nowHistory = localStorage.getItem("myHistory");
    localStorage.setItem("myHistory", `${JSON.stringify(article)}${nowHistory ? ",," + nowHistory : ""}`);
    // console.log(localStorage.getItem("myHistory").split("},").slice(0, 20));
  }
  return (
    <div onClick={toArticle} className=" mx-6 py-4 border-b">
      <p className="flex flex-row justify-between mb-2">
        <span className="text-xl">{author}</span>
        <span className="text-gray-500 text-lg">{getDate(time * 1000)}</span>
      </p>
      <p className="max-w-xs truncate text-2xl font-bold m-2">{title}</p>
      <p className="text-xl">{content}</p>
    </div>
  );
}
export default ArticleIntroduction;