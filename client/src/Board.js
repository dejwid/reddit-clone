import BoardHeader from "./BoardHeader";
import PostForm from "./PostForm";
import PostsListing from "./PostsListing";

function Board() {
  return (<div>
    <BoardHeader />
    <PostForm />
    <PostsListing />
  </div>);
}

export default Board;