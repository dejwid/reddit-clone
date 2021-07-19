import './style.css';
import AuthModalContext from "./AuthModalContext";
import {useState,useEffect} from "react";
import axios from 'axios';
import UserContext from "./UserContext";
import Routing from "./Routing";
import PostFormModalContext from "./PostFormModalContext";

function App() {
  const [showAuthModal,setShowAuthModal] = useState(false);
  const [showPostFormModal,setShowPostFormModal] = useState(false);
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
      <PostFormModalContext.Provider value={{show:showPostFormModal,setShow:setShowPostFormModal}}>
        <UserContext.Provider value={{...user, logout, setUser}}>
          <Routing />
        </UserContext.Provider>
      </PostFormModalContext.Provider>
    </AuthModalContext.Provider>
  );
}

export default App;
