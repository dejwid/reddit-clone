import Comment from "./Comment";

function CommentPage(props) {

  const commentId = props.match.params.id;

  return (
    <div className="py-4 px-6 bg-reddit_dark">
      <div className="bg-reddit_dark-brighter p-3 rounded-md">
        <Comment id={commentId} />
      </div>
    </div>
  );
}
export default CommentPage;