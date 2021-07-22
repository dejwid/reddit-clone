import {useContext, useState} from "react";
import UserContext from "./UserContext";
import Textarea from "./Textarea";
import Button from "./Button";
import axios from "axios";

function CommentForm (props) {
  const userInfo = useContext(UserContext);
  const [commentBody,setCommentBody] = useState('');
  function postComment(e) {
    e.preventDefault();
    const data = {body:commentBody, parentId:props.parentId,rootId:props.rootId,};
    axios.post('http://localhost:4000/comments', data, {withCredentials:true})
      .then(response => {
        setCommentBody('');
        if (props.onSubmit) {
          props.onSubmit();
        }
      });
  }
  return (
    <div className={'text-reddit_text'}>
      {userInfo.username && props.showAuthor && (
        <div className="mb-2">
          Comment as {userInfo.username}
        </div>
      )}

      <form onSubmit={e => postComment(e)}>
        <Textarea className="w-full mb-3 border border-reddit_border"
                  onChange={e => setCommentBody(e.target.value)}
                  value={commentBody}
                  placeholder={'Your comment. You can use markdown here'} />
        <div className="text-right">
          {!!props.onCancel && (
            <Button outline
                    className="p-2 mr-2"
                    onClick={e => props.onCancel()}>Cancel</Button>
          )}
          <Button className="p-2">Comment</Button>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;