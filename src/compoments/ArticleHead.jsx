function ArticleHead({title}) {
  return (
    <div>
      <button onClick={()=>window.history.back(-1)}>fanhui</button>
      <span>{title}</span>
    </div>
  )
}
export default ArticleHead;