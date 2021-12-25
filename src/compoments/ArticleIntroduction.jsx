import { useNavigate } from "react-router-dom";

function ArticleIntroduction({articleId, author, content, title }) {
  const navigate = useNavigate();
  function toArticle() {
    const article = {
      articleId,
      author,
      content,
      title,
    }
    console.log(article);
    navigate(`../../../article/${articleId}`);
    const nowHistory = localStorage.getItem("myHistory");
    localStorage.setItem("myHistory", `${JSON.stringify(article)}${nowHistory ? "," + nowHistory : ""}`);
    console.log(localStorage.getItem("myHistory").split("},").slice(0,20));
  }
  return (
    <div onClick={toArticle} className="text-purple-700">
      <p>{author}</p>
      <p>{content}</p>
    </div>
  );
}
export default ArticleIntroduction;