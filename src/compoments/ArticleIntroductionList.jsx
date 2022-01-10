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
  const height = `calc(100vh ${category_id ? '- 7.5rem' : (isHistory ? '- 2.5rem' : '- 5rem')})`;
  async function getNewArticles(nowArticles = [], nowArticleNumber = 0, nowArticleIds = new Set()) {
    const thisArticles = [];
    const articleIds_t = new Set();
    while (thisArticles.length < 20) {
      let allArticles = [];
      if (isHistory) {
        const begin = nowArticleNumber + nowArticleNumber + thisArticles.length;
        allArticles = localStorage
          .getItem("myHistory")
          .split(/(?<=}),,/g)
          .slice(begin, begin + 20)
          .map((item) => {
            return JSON.parse(item);
          });
      } else {
        allArticles = (await getArticles(category_id, params.sortType, nowArticleNumber + nowArticleNumber + thisArticles.length, 20)).data.articles;
      }
      if (!allArticles.length) {
        // console.log('over');
        break;
      }
      for (const article of allArticles) {
        if (nowArticleIds.has(article.article_id || article.articleId) || articleIds_t.has(article.article_id || article.articleId)) {
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
      // console.log('get new', scrollEl.current.getBoundingClientRect().bottom);
      getNewArticles(articles, articleNumber, articleIds);
    }
  }
  return (
    <div onScroll={check} className="overflow-scroll " style={{ height }}>
      {articles.map((item) => {
        let articleId, author, content, title, time;
        if (isHistory) {
          ({ articleId, author, content, title, time } = item);
        } else {
          ({ article_id: articleId, article_info: { brief_content: content, title, ctime: time }, author_user_info: { user_name: author } } = item);
        }
        return (<ArticleIntroduction key={articleId} articleId={articleId} author={author} content={content} title={title} time={time} />)
      })}
      <div ref={scrollEl} />
      <div className="h-20 flex items-center justify-center text-xl">没有更多了！</div>
    </div>
  )
}
export default ArticleIntroductionList;