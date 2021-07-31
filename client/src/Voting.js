import axios from 'axios';
import {useContext} from "react";
import RootCommentContext from "./RootCommentContext";

function Voting(props) {

  const rootCommentInfo = useContext(RootCommentContext);
  const {commentsTotals, userVotes} = rootCommentInfo;
  const {commentId} = props;

  const total = commentsTotals && commentId in commentsTotals
    ? commentsTotals[commentId]
    : 0;

  const userVote = userVotes && commentId in userVotes
    ? userVotes[commentId]
    : 0;

  function sendVote(direction = 'up') {
    const directionNumber = direction === 'up' ? 1 : -1;
    if (directionNumber === userVote) {
      direction = 'unvote';
    }
    const url = 'http://localhost:4000/vote/'+props.commentId+'/'+direction;
    axios.get(url, {withCredentials:true})
      .then(() => {
        rootCommentInfo.refreshVotes();
      })
  }

  function handleVoteUp() {
    sendVote('up');
  }

  function handleVoteDown() {
    sendVote('down');
  }

  function arrowButton(directionName = 'up') {
    const directionNumber = directionName === 'up' ? 1 : -1;
    let classNames = 'inline-block h-5 relative top-1 ';

    if (directionNumber === userVote) {
      classNames += ' text-reddit_red';
    } else {
      classNames += ' text-reddit_text-darker hover:text-white';
    }

    if (directionName === 'up') {
      return (
        <button onClick={() => handleVoteUp()} className={classNames}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        </button>
      );
    } else {
      return (
        <button onClick={() => handleVoteDown()} className={classNames}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      );
    }
  }

  return (
    <div className={'inline-block mr-2'}>
      {arrowButton('up')}
      <div className={'inline-block'}>{total}</div>
      {arrowButton('down')}
    </div>
  );
}

export default Voting;