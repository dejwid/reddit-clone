import Avatar from "./avatar.png";
import {useContext} from "react";
import PostFormModalContext from "./PostFormModalContext";

function PostForm() {
  const modalContext = useContext(PostFormModalContext);
  return (
    <div className="bg-reddit_dark px-6 py-4 text-gray-400">

      <div className="border border-reddit_border p-2 rounded-md flex bg-reddit_dark-brighter">
        <div className="rounded-full bg-gray-600 overflow-hidden w-10 h-10">
          <img src={Avatar} alt="" style={{filter:'invert(100%)'}} />
        </div>
        <form action="" className="flex-grow bg-reddit_dark-brightest border border-reddit_border ml-4 mr-2 rounded-md">
          <input type="text"
                 onFocus={e => {
                   e.preventDefault();
                   modalContext.setShow(true);
                 }}
                 className="bg-reddit_dark-brightest p-2 px-3 text-sm block w-full rounded-md" placeholder="New post" />
        </form>
      </div>

    </div>
  );
}

export default PostForm;