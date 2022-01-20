import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../../fake-api/index";

import InfiniteScroll from "./InfiniteScroll"
import ArticleIntroduction from "./ArticleIntroduction";
import GoTop from "./GoTop";
function ArticleIntroductionList({ category_id, isHistory = false }) {
  const [articles, setArticles] = useState([]);
  const articlesRef = useRef([]);
  const articleNumber = useRef(0);
  const articleIds = useRef(new Set());
  const scrollBody = useRef(null);
  const params = useParams();
  const height = `calc(100vh ${category_id ? '- 12.5rem' : (isHistory ? '- 5rem' : '- 9rem')})`;
  async function getNewArticles(nowArticles = []) {
    const thisArticles = [];
    while (thisArticles.length < 20) {
      let allArticles = null;
      // 获取文章
      if (isHistory) {
        const begin = articleNumber.current;
        allArticles = localStorage
          .getItem("myHistory")
          ?.split(/(?<=}),,/g)
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
      // 将文章加入列表中
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
    articlesRef.current=[...nowArticles, ...thisArticles];
    setArticles([...articlesRef.current]);
  }
  useEffect(() => {
    // 初始化
    articleIds.current = new Set();
    articleNumber.current = 0;
    articlesRef.current = [];
    scrollBody.current.scrollTop = 0;
    getNewArticles();
  }, [category_id, isHistory]);
  const getMoreArticles = useCallback(() => {
    getNewArticles(articlesRef.current);
  }, [articlesRef.current]);
  return (
    <>
      <div className="overflow-scroll " style={{ height }} ref={scrollBody}>
        {articles.map((item) => {
          let articleId, author, content, title, time;
          if (isHistory) {
            ({ articleId, author, content, title, time } = item);
          } else {
            ({ article_id: articleId, article_info: { brief_content: content, title, ctime: time }, author_user_info: { user_name: author } } = item);
          }
          return (<ArticleIntroduction key={articleId} articleId={articleId} author={author} content={content} title={title} time={time} />)
        })}
        <InfiniteScroll getMore={getMoreArticles}></InfiniteScroll>
        <div className="h-20 flex items-center justify-center text-xl">没有更多了！</div>
      </div>
      <GoTop el={scrollBody.current} />
    </>
  )
}
export default ArticleIntroductionList;