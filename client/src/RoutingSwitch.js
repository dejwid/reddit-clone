import {Route, Switch, useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import Board from "./Board";
import CommentPage from "./CommentPage";
import CommentModal from "./CommentModal";
import SearchResultsPage from "./SearchResultsPage";

function RoutingSwitch() {

  const [postOpen, setPostOpen] = useState(false);
  // const [commentId, setCommentId] = useState(null);

  let location = useLocation();
  let commentId = null;

  if (location.state && location.state.commentId) {
    location.pathname = '/';
    if (postOpen) {
      commentId = location.state.commentId;
    } else {
      location.state.commentId = null;
    }

  }

  useEffect(() => {
    setPostOpen(true);
  }, [commentId]);

  useEffect(() => {
    commentId = null;
  }, [postOpen]);

  return (
    <div>
      {commentId && (
        <div>
          <CommentModal
            id={commentId}
            open={postOpen}
            onClickOut={() => setPostOpen(false)} />
        </div>
      )}
      <Switch location={location}>
        <Route exact path="/" component={Board} />
        <Route exact path="/comments/:id" component={CommentPage} />
        <Route exact path="/search/:text" component={SearchResultsPage} />
      </Switch>
    </div>
  );
}

export default RoutingSwitch;