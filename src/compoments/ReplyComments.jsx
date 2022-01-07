import Comment from "./Comment";
function ReplyComments({ comments = [] }) {
  return (
    <div className="ml-5 bg-gray-100">
      {comments.map(({ reply_id, reply_info: { reply_content, ctime }, user_info }) => {
        return <Comment key={reply_id} content={reply_content} time={ctime} user={user_info.user_name} />
      })}
    </div>
  )
}
export default ReplyComments;