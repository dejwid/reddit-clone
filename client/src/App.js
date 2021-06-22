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
import Post from "./Post";
import PostsListing from "./PostsListing";
import CommentPage from "./CommentPage";
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import {useLocation} from "react-router-dom";
import Board from "./Board";
import Routing from "./Routing";

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
        <Routing />
        <AuthModal />
      </UserContext.Provider>
    </AuthModalContext.Provider>
  );
}

export default App;
