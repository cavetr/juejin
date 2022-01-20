import goBack from '../img/goBack.svg';
function ArticleHead({ title }) {
  return (
    <div className="h-16 flex flex-row items-center">
      <button className="fixed justify-self-start" onClick={() => window.history.back(-1)}>
        <img src={goBack} alt="返回" className="h-6 m-3"/>
      </button>
      <span className="flex justify-center w-full">
        <span className="max-w-sm truncate text-2xl">{title}</span>
      </span>
    </div>
  )
}
export default ArticleHead;