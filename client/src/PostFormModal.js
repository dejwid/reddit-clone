import ClickOutHandler from 'react-clickout-handler';
import {useState,useContext} from 'react';
import {Redirect} from 'react-router-dom';
import Input from "./Input";
import Textarea from "./Textarea";
import Button from "./Button";
import PostFormModalContext from "./PostFormModalContext";
import AuthModalContext from "./AuthModalContext";
import axios from "axios";

function PostFormModal () {

  const modalContext = useContext(PostFormModalContext);
  const authModalContext = useContext(AuthModalContext);

  const visibleClass = modalContext.show ? 'block' : 'hidden';

  const [title,setTitle] = useState('');
  const [body,setBody] = useState('');
  const [newPostId, setNewPostId] = useState(null);

  function createPost() {
    const data = {title,body};
    axios.post('http://localhost:4000/comments', data, {withCredentials:true})
      .then(response => {
        setNewPostId(response.data._id);
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          authModalContext.setShow('login');
        }
      });
  }

  if (newPostId) {
    return (<Redirect to={'/comments/'+newPostId} />);
  }

  return (
    <div
      className={"w-screen h-screen fixed top-0 left-0 z-20 flex "+visibleClass}  style={{backgroundColor:'rgba(0,0,0,.8)'}}>
      <ClickOutHandler onClickOut={() => {}  }>
        <div className="border border-reddit_dark-brightest w-3/4 md:w-2/4 bg-reddit_dark p-5 text-reddit_text self-center mx-auto rounded-md">
          <h1 className="text-2xl mb-5">Create a post</h1>
          <Input
            className={'w-full mb-3'}
            placeholder={'Title'}
            onChange={e => setTitle(e.target.value)}
            value={title} />
          <Textarea
            className={'w-full mb-3'}
            placeholder={'Post text (you can use markdown)'}
            onChange={e => setBody(e.target.value)}
            value={body} />
          <div className={'text-right'}>
            <Button onClick={() => modalContext.setShow(false)}
                    outline className={'px-4 py-2 mr-3'}>Cancel</Button>
            <Button onClick={() => createPost()} className={'px-4 py-2'}>POST</Button>
          </div>
        </div>
      </ClickOutHandler>
    </div>
  );
}

export default PostFormModal;