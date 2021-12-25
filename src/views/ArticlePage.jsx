import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../fake-api";
import ArticleHead from "../compoments/ArticleHead";
import Comments from "../compoments/Comments";

function ArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState(null);
  useEffect(async () => {
    // console.log((await getArticleById(params.articleId)).data.article);
    setArticle((await getArticleById(params.articleId)).data.article);
    // console.log()
  }, []);
  return (
    <div>
      <ArticleHead title={article?.article_info.title} />
      <div className="overflow-scroll" style={{ height: "calc(100vh - 5rem)" }}>
        <article className="p-8 ">
          <div className="text-3xl">{article?.article_info.title} </div>
          <div dangerouslySetInnerHTML={{ __html: article?.article_content }} />
        </article>
        <Comments articleId={params.articleId} />
      </div>

    </div>
  )
}
export default ArticlePage;