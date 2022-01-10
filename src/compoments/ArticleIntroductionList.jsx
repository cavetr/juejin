import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../../fake-api/index";

import ArticleIntroduction from "./ArticleIntroduction";
import GoTop from "./GoTop";
function ArticleIntroductionList({ category_id, isHistory = false }) {
  const [articles, setArticles] = useState([]);
  const articleNumber = useRef(0);
  const articleIds = useRef(new Set());
  const scrollEl = useRef(null);
  const scrollBody = useRef(null);
  const params = useParams();
  const height = `calc(100vh ${category_id ? '- 7.5rem' : (isHistory ? '- 2.5rem' : '- 5rem')})`;
  async function getNewArticles(nowArticles = []) {
    const thisArticles = [];
    while (thisArticles.length < 20) {
      let allArticles = null;
      if (isHistory) {
        const begin = articleNumber.current;
        allArticles = localStorage
          .getItem("myHistory")
          .split(/(?<=}),,/g)
          .slice(begin, begin + 20)
          .map((item) => {
            return JSON.parse(item);
          });
      } else {
        allArticles = (await getArticles(category_id, params.sortType, articleNumber.current, 20)).data.articles;
      }
      if (!allArticles.length) {
        break;
      }
      for (const article of allArticles) {
        articleNumber.current++;
        if (!articleIds.current.has(article.article_id || article.articleId)) {
          thisArticles.push(article);
          articleIds.current.add(article.article_id || article.articleId);
          if (thisArticles.length === 20) {
            break;
          }
        }
      }
    };
    console.log('over');
    setArticles([...nowArticles, ...thisArticles]);
  }
  useEffect(() => {
    articleIds.current = new Set();
    articleNumber.current = 0;
    getNewArticles();
  }, [category_id, isHistory]);
  function check() {
    if (scrollEl.current.getBoundingClientRect().bottom <= scrollEl.current.parentNode.getBoundingClientRect().bottom) {
      getNewArticles(articles);
    }
  }
  return (
    <>
      <div onScroll={check} className="overflow-scroll " style={{ height }} ref={scrollBody}>
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
      <GoTop el={scrollBody.current}/>
    </>
  )
}
export default ArticleIntroductionList;