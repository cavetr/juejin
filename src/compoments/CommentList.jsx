import { useEffect, useRef, useState } from "react";
import { getCommentsByArticleId } from "../../fake-api";
import Comment from "./Comment";
import InfiniteScroll from "./InfiniteScroll"
function Comments({ articleId }) {
  const [comments, setComments] = useState([]);
  const commentNumber = useRef(0);
  useEffect(() => {
    getNewComments();
  }, []);
  async function getNewComments() {
    const t = (await getCommentsByArticleId(articleId, commentNumber.current, 20)).data.comments;
    setComments((prevState) => [...prevState, ...t]);
    commentNumber.current += 20;
  }
  return (
    <>
      {comments.map(({ comment_id, comment_info: { comment_content, ctime }, reply_infos, user_info }) => {
        return <Comment key={comment_id} content={comment_content} time={ctime} user={user_info.user_name} reply={reply_infos} />
      })}
      <InfiniteScroll getMore={getNewComments}></InfiniteScroll>
    </>
  )
}
export default Comments;