import Input from "./Input";
import Button from "./Button";
import {useState,useContext} from 'react';
import axios from 'axios';
import AuthModalContext from "./AuthModalContext";
import ClickOutHandler from 'react-clickout-handler';
import UserContext from "./UserContext";

function AuthModal() {
  const [modalType,setModalType] = useState('login');
  const [email,setEmail] = useState('');
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const modalContext = useContext(AuthModalContext);
  const user = useContext(UserContext);

  const visibleClass = modalContext.show ? 'block' : 'hidden';
  if (modalContext.show && modalContext.show !== modalType) {
    setModalType(modalContext.show);
  }

  function register(e) {
    e.preventDefault();
    const data = {email,username,password};
    axios.post('http://localhost:4000/register', data, {withCredentials:true})
      .then(() => {
        user.setUser({username});
        modalContext.setShow(false);
        setEmail('');
        setPassword('');
        setUsername('');
      });
  }

  function login() {
    const data = {username,password};
    axios.post('http://localhost:4000/login', data, {withCredentials:true})
	  .then(() => {
	    modalContext.setShow(false);
	    user.setUser({username})
	  });
  }

  return (
    <div className={"w-screen h-screen fixed top-0 left-0 z-30 flex "+visibleClass} style={{backgroundColor:'rgba(0,0,0,.6)'}}>
      <ClickOutHandler onClickOut={() => modalContext.setShow(false)}>
        <div className="border border-reddit_dark-brightest w-3/4 sm:w-1/2 lg:w-1/4 bg-reddit_dark p-5 text-reddit_text self-center mx-auto rounded-md">
          {modalType === 'login' && (
            <h1 className="text-2xl mb-5">Login</h1>
          )}
          {modalType === 'register' && (
            <h1 className="text-2xl mb-5">Sign Up</h1>
          )}
          {modalType === 'register' && (
            <label>
              <span className="text-reddit_text-darker text-sm">E-mail:</span>
              <Input type="email" className="mb-3 w-full" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
          )}
          <label>
            <span className="text-reddit_text-darker text-sm">Username:</span>
            <Input type="text" className="mb-3 w-full" value={username} onChange={e => setUsername(e.target.value)} />
          </label>

          <label>
            <span className="text-reddit_text-darker text-sm">Password:</span>
            <Input type="password" className="mb-3 w-full" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          {modalType === 'login' && (
            <Button className="w-full py-2 mb-3" style={{borderRadius:'.3rem'}} onClick={()=>login()}>
              Log In
            </Button>
          )}
          {modalType === 'register' && (
            <Button className="w-full py-2 mb-3" style={{borderRadius:'.3rem'}} onClick={e => register(e)}>
              Sign Up
            </Button>
          )}

          {modalType === 'login' && (
            <div>
              New to Reddit? <button className="text-blue-600" onClick={() => modalContext.setShow('register')}>SIGN UP</button>
            </div>
          )}
          {modalType === 'register' && (
            <div>
              Already have an account? <button className="text-blue-600" onClick={() => modalContext.setShow('login')}>LOG IN</button>
            </div>
          )}
        </div>
      </ClickOutHandler>
    </div>
  );
}

export default AuthModal;
