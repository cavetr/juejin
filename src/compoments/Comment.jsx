import ReplyComments from "./ReplyComments";
import getDate from "../js/getDate";

function Comment({ content, time, user, reply }) {
  return (
    <div className="m-6 ">
      <p className="flex flex-row justify-between mb-2">
        <span className="text-2xl font-bold">{user}</span>
        <span className="text-gray-500 text-lg">{getDate(time * 1000)}</span>
      </p>
      <p className="text-xl">{content}</p>
      <ReplyComments comments={reply}></ReplyComments>
    </div>
  )
}
export default Comment;