import { comment } from "postcss";
import { useEffect, useState } from "react";
import { getCommentsByArticleId } from "../../fake-api";
import Comment from "./Comment";

function Comments({articleId}) {
  const [comments, setComments] = useState([]);
  useEffect(async () => {
    // console.log((await getArticleById(params.articleId)).data.article);
    setComments((await getCommentsByArticleId(articleId)).data.comments);
    console.log(comments);
  }, []);
  return (
    <>
      {
        comments.map(({comment_id, comment_info, reply_infos, user_info})=>{
          return <Comment key={comment_id} content={comment_info.comment_content} />
        })
      }
      
    </>
  )
}
export default Comments;