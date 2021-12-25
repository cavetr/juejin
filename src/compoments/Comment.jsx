import { useEffect, useState } from "react";
import ReplyComments from "./ReplyComments";

function Comment({content, time, user, reply}) {
  const [date, setDate] = useState(null);
  useEffect(() => {
    function getComparativeDate(articleDate) {
      const newDate = new Date().getTime();
      // console.log(new Date(articleDate));
      let difS = ~~((newDate-articleDate)/1000);
      if(difS<60) {
        return `${difS}秒前`;
      }
      difS /= 60;
      if (difS<60) {
        return `${~~difS}分前`;
      }
      difS /= 60;
      if (difS<24) {
        return `${~~difS}时前`;
      }
      difS /= 24;
      if (difS<30) {
        return `${~~difS}天前`;
      }
      difS /= 30;
      if (difS<12) {
        return `${~~difS}月前`;
      }
      return `${~~(difS/12)}年前`;
    }
    setDate(getComparativeDate(new Date(time*1000)));
  },[]);
  return (
    <div>
      <p className="flex flex-row justify-between">
        <span>{user}</span>
        <span>{date}</span>
      </p>
      <p>{content}</p>
      <ReplyComments comments={reply}></ReplyComments>
    </div>
  )
}
export default Comment;