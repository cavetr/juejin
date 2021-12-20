import { useNavigate } from "react-router-dom";

function ArticleIntroduction ({author, article}) {
  const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`../../../article/${article.article_id}`)}>
      <p>{author.user_name}</p>
      <p>{article.brief_content}</p>
    </div>
  );
}
export default ArticleIntroduction;