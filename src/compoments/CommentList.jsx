import { useEffect, useRef, useState } from "react";
import { getCommentsByArticleId } from "../../fake-api";
import Comment from "./Comment";

function Comments({ articleId }) {
  const [comments, setComments] = useState([]);
  const commentNumber = useRef(0);
  const scrollEl = useRef(null);
  useEffect(() => {
    const parent = scrollEl.current.parentNode;
    getNewComments();
    parent.addEventListener("scroll", check);
    return () => {
      parent.removeEventListener("scroll", check)
    };
  }, []);
  async function getNewComments() {
    const t = (await getCommentsByArticleId(articleId, commentNumber.current, 20)).data.comments;
    setComments((prevState) => [...prevState, ...t]);
    commentNumber.current += 20;
  }
  function check() {
    if (scrollEl.current.getBoundingClientRect().bottom <= scrollEl.current.parentNode.getBoundingClientRect().bottom + 1) {
      getNewComments();
    }
  }
  return (
    <>
      {comments.map(({ comment_id, comment_info: { comment_content, ctime }, reply_infos, user_info }) => {
        return <Comment key={comment_id} content={comment_content} time={ctime} user={user_info.user_name} reply={reply_infos} />
      })}
      <div ref={scrollEl} />
    </>
  )
}
export default Comments;