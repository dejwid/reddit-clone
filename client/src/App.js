import './style.css';
import Header from "./Header";
import BoardHeader from "./BoardHeader";
import Avatar from './avatar.png';
import PostForm from "./PostForm";
import AuthModal from "./AuthModal";
import AuthModalContext from "./AuthModalContext";
import {useState,useEffect} from "react";
import axios from 'axios';
import UserContext from "./UserContext";

function App() {
  const [showAuthModal,setShowAuthModal] = useState(false);
  const [user,setUser] = useState({});
  useEffect(() => {
    axios.get('http://localhost:4000/user', {withCredentials:true})
      .then(response => setUser(response.data));
  }, []);
  function logout() {
    axios.post('http://localhost:4000/logout', {}, {withCredentials:true})
      .then(() => setUser({}));
  }
  return (
    <AuthModalContext.Provider value={{show:showAuthModal,setShow:setShowAuthModal}}>
      <UserContext.Provider value={{...user, logout, setUser}}>
        <Header />
        <AuthModal />
        <BoardHeader />
        <PostForm />
        <div className="px-6 bg-reddit_dark text-reddit_text">
          <div className="border border-reddit_border bg-reddit_dark-brighter p-2 rounded-md">
            <h5 className="text-reddit_text-darker text-sm mb-1"> Posted by u/test123 5 hours ago</h5>
            <h2 className="text-xl mb-3">A year into my switch from WordPress to Craft. My general findings...</h2>
            <div className="text-sm leading-6">
              <p>I am a freelance dev and the bulk of my work are CMS builds. Roughly a year ago I stopped recommending WP to clients and chose Craft. Some clients always want WP, so I still worked with it when needed. But if the client had no preference I would suggest Craft. After a year, and 5 Craft builds I have come to the following conclusions (as an FYI I build completely custom WP themes, I do not work with paid themes or page builders):</p>

              Craft is a far better development experience. At least as far as day-to-day code writing is concerned. With template development you do start with a completely blank canvas and are not battling against the CMS (e.g. no need for various filters to remove the sort of crap WP injects into every page).

              With Craft I never had the need to explain I knew what I was doing. Almost every client had a bad experience with their previous WP dev (usually someone who installed a page builder and dozens of plugins). I often had to fight against that perception.

              But! WordPress is more stable in general. I've had numerous issues with clients getting various errors in the Craft dashboard. Nothing that could be tracked down easily using Crafts overly verbose logs. These tended to be strange server errors. But nothing I ever encountered with WP or other systems.

              The Craft update process is not seamless. I've had numerous issues on different sites updating minor versions.

              The Craft documentation often leaves you digging through the source code to figure things out. While I don't mind that - ain't nobody got time for that!

              I don't care for twig. it does nothing that I can't do with PHP directly. And often using PHP directly is much faster for me.

              Importing content is a show stopper. if you have to import content into Craft, and you often do, you can use the FeedMe plugin. But there is a longstanding bug where you lose your WYSIWYG field formatting. Not for every entry, but more than enough to be a huge issue. You can resolve this by manually going into every entry and resaving. But who has time to go through a thousand blog posts to resave? There's no way to do this through code alone. I've tried resaving entries via my own module, but it doesn't fix the formatting. Since the FeedMe plugin was built by the Craft team this is very problematic.

              Craft in theory has better security, sure, but if you aren't loading your WP site with plugins you can avoid that easily enough.

              But, the final issue and the thing I missed most about WP - the Advanced Custom Fields plugin. It may be the best software I have ever worked with. And there is nothing close in Craft. The SuperTable and Neo plugins don't even come close. ACF is really a game changer.

              So, I am going to put this experiment to bed. It actually pains me to say this, but I am just sticking to WordPress going forward.
            </div>
          </div>
        </div>
      </UserContext.Provider>
    </AuthModalContext.Provider>
  );
}

export default App;
