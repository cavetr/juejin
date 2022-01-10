import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../fake-api";
import ArticleHead from "../compoments/ArticleHead";
import Comments from "../compoments/CommentList";

function ArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState(null);
  useEffect(async () => {
    // console.log((await getArticleById(params.articleId)).data.article);
    setArticle((await getArticleById(params.articleId)).data.article);
    // console.log()
  }, []);
  return (
    <>
      <ArticleHead title={article?.article_info.title} />
      <div className="overflow-scroll" style={{ height: "calc(100vh - 5rem)" }}>
        <article className="p-8 ">
          <div className="text-4xl font-bold">{article?.article_info.title} </div>
          <div dangerouslySetInnerHTML={{ __html: article?.article_content }} />
        </article>
        <span className="text-2xl font-bold m-6">{`全部评论 ${article?.article_info.comment_count}`}</span>
        <Comments articleId={params.articleId} />
      </div>
    </>
  )
}
export default ArticlePage;