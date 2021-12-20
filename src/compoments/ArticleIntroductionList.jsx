import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../../fake-api/index"
import ArticleIntroduction from "./ArticleIntroduction"
function ArticleIntroductionList({ category_id, isHistory = false }) {
  const [articles, setArticles] = useState([]);
  const [articleNumber, setArticleNumber] = useState(0);
  const [articleIds, setArticleIds] = useState(new Set());
  const params = useParams();
  async function getNewArticles(nowArticleNumber = 0, nowArticleIds = new Set(), nowArticles = []) {
    const thisArticles = [];
    const articleIds_t = new Set();
    while (thisArticles.length < 10) {
      const allArticles = [];
      if (isHistory) {

      } else {
        allArticles = (await getArticles(category_id, params.sortType, nowArticleNumber + nowArticleNumber + thisArticles.length, 10)).data.articles;
      }
      if (!allArticles.length) {
        console.log('over');
        break;
      }
      for (const article of allArticles) {
        console.log(nowArticleIds.has(article.article_id) || articleIds_t.has(article.article_id));
        if (nowArticleIds.has(article.article_id) || articleIds_t.has(article.article_id)) {
          nowArticleNumber++;
        } else {
          thisArticles.push(article);
          articleIds_t.add(article.article_id);
          if (thisArticles.length === 10) {
            break;
          }
        }
      }
    };
    setArticleNumber(nowArticleNumber);
    setArticleIds(new Set([...nowArticleIds, ...articleIds_t]));
    setArticles([...nowArticles, ...thisArticles]);
  }
  useEffect(() => {
    getNewArticles();
  }, [category_id]);

  return (
    <div>
      {articles.map(({ article_id, article_info, author_user_info }) => {
        return (<ArticleIntroduction key={article_id} author={author_user_info} article={article_info} />)
      })}
    </div>
  )
}
export default ArticleIntroductionList;