import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../../fake-api/index";
import ArticleIntroduction from "./ArticleIntroduction";
function ArticleIntroductionList({ category_id, isHistory = false }) {
  const [articles, setArticles] = useState([]);
  const [articleNumber, setArticleNumber] = useState(0);
  const [articleIds, setArticleIds] = useState(new Set());
  const scrollEl = useRef(null);
  const params = useParams();
  async function getNewArticles(nowArticles = [], nowArticleNumber = 0, nowArticleIds = new Set()) {
    const thisArticles = [];
    const articleIds_t = new Set();
    while (thisArticles.length < 20) {
      let allArticles = [];
      if (isHistory) {

      } else {
        allArticles = (await getArticles(category_id, params.sortType, nowArticleNumber + nowArticleNumber + thisArticles.length, 20)).data.articles;
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
          if (thisArticles.length === 20) {
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
    console.log(category_id)
  }, [category_id]);
  function check() {
    if (scrollEl.current.getBoundingClientRect().bottom <= scrollEl.current.parentNode.getBoundingClientRect().bottom) {
      console.log('get new', scrollEl.current.getBoundingClientRect().bottom);
      getNewArticles(articles, articleNumber, articleIds);
    }
  }
  return (
    <div onScroll={check} className="overflow-scroll " style={{ height: `calc(100vh ${category_id ? '- 7.5rem' : '- 5rem'})` }}>
      {articles.map(({ article_id, article_info, author_user_info }) => {
        return (<ArticleIntroduction key={article_id} author={author_user_info} article={article_info} />)
      })}
      <div ref={scrollEl} />
    </div>
  )
}
export default ArticleIntroductionList;