function ArticleHead({ title }) {
  return (
    <div className="h-10 flex flex-row items-center">
      <button className="fixed justify-self-start" onClick={() => window.history.back(-1)}>返</button>
      <span className="flex justify-center w-full">
        <span className="max-w-sm truncate text-2xl">{title}</span>
      </span>
    </div>
  )
}
export default ArticleHead;