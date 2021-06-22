import {useState,useEffect} from "react";
import axios from "axios";
import Post from "./Post";

function CommentPage(props) {

  const commentId = props.match.params.id;

  const [comment,setComment] = useState({});

  useEffect(() => {
    axios.get('http://localhost:4000/comments/'+commentId)
      .then(response => setComment(response.data));

  }, []);

  return (
    <div className="bg-reddit_dark py-4">
      {comment && (
        <Post {...comment} open={true} />
      )}
    </div>
  );
};
export default CommentPage;