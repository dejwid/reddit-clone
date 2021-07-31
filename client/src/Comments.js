import TimeAgo from 'timeago-react';
import Button from "./Button";
import CommentForm from "./CommentForm";
import {useState, useContext} from 'react';
import RootCommentContext from "./RootCommentContext";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Voting from "./Voting";

function Comments(props) {
  const [showForm,setShowForm] = useState(false);
  const comments = props.comments.filter(comment => props.parentId === comment.parentId);
  const rootCommentInfo = useContext(RootCommentContext);

  return (
    <div className={'my-2 text-reddit_text'}>
      {comments.map(comment => {
        const replies = props.comments.filter(c => c.parentId === comment._id);
        return (
          <div className={'mb-2'}>
            <div className="flex mb-2">
              <div className="bg-reddit_text w-10 h-10 rounded-full mr-2"/>
              <div className="leading-10 pr-2 text-lg font-sans">{comment.author}</div>
              <TimeAgo className="leading-10 text-md font-sans" datetime={comment.postedAt}/>
            </div>
            <div className="border-l-2 border-reddit_text-darker p-3 pb-0"
                 style={{marginLeft:'18px'}}>
              <div className="pl-4 -mt-4">
                <div>
                  <ReactMarkdown remarkPlugins={[gfm]} children={comment.body} />
                </div>
                <Voting commentId={comment._id} />
                <Button type={'button'}
                        onClick={() => setShowForm(comment._id)}
                        className="bg-reddit_dark-brighter text-reddit_text-darker border-none py-2 pl-0 pr-0">Reply</Button>
                {comment._id === showForm && (
                  <CommentForm
                    parentId={comment._id}
                    rootId={props.rootId}
                    onSubmit={() => {
                      setShowForm(false);
                      rootCommentInfo.refreshComments();
                    }}
                    showAuthor={false}
                    onCancel={e => setShowForm(false)}/>
                )}
                {replies.length > 0 && (
                  <Comments comments={props.comments} parentId={comment._id} rootId={props.rootId} />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Comments;