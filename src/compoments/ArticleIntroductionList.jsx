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
        const begin = nowArticleNumber + nowArticleNumber + thisArticles.length;
        allArticles = localStorage
          .getItem("myHistory")
          .split(/(?<=}),/g)
          .slice(begin, begin + 20)
          .map((item) => {
            console.log(item);
            return JSON.parse(item);
          });
      } else {
        allArticles = (await getArticles(category_id, params.sortType, nowArticleNumber + nowArticleNumber + thisArticles.length, 20)).data.articles;
      }
      if (!allArticles.length) {
        console.log('over');
        break;
      }
      for (const article of allArticles) {
        if (nowArticleIds.has(article.article_id || article.articleId) || articleIds_t.has(article.article_id  || article.articleId)) {
          nowArticleNumber++;
        } else {
          thisArticles.push(article);
          articleIds_t.add(article.article_id || article.articleId);
          if (thisArticles.length === 20) {
            break;
          }
        }
      }
      // console.log(nowArticleIds, articleIds_t);
    };
    setArticleNumber(nowArticleNumber);
    setArticleIds(new Set([...nowArticleIds, ...articleIds_t]));
    setArticles([...nowArticles, ...thisArticles]);
  }
  useEffect(() => {
    getNewArticles();
  }, [category_id]);
  function check() {
    if (scrollEl.current.getBoundingClientRect().bottom <= scrollEl.current.parentNode.getBoundingClientRect().bottom) {
      console.log('get new', scrollEl.current.getBoundingClientRect().bottom);
      getNewArticles(articles, articleNumber, articleIds);
    }
  }
  return (
    <div onScroll={check} className="overflow-scroll " style={{ height: `calc(100vh ${category_id ? '- 7.5rem' : '- 5rem'})` }}>
      {articles.map((item) => {
        if (isHistory) {
          console.log(articles);
          const { articleId, author, content, title } = item;
          return (<ArticleIntroduction key={articleId} articleId={articleId} author={author} content={content} title={title} />)
        }
        const { article_id, article_info: { brief_content, title }, author_user_info: { user_name } } = item;
        return (<ArticleIntroduction key={article_id} articleId={article_id} author={user_name} content={brief_content} title={title} />)
      })}
      <div ref={scrollEl} />
    </div>
  )
}
export default ArticleIntroductionList;