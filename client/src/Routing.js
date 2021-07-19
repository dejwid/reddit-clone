import Header from "./Header";
import {BrowserRouter as Router} from "react-router-dom";
import RoutingSwitch from "./RoutingSwitch";
import PostFormModal from "./PostFormModal";
import AuthModal from "./AuthModal";


function Routing() {
  return (
    <Router>
      <Header />
      <RoutingSwitch />
      <PostFormModal />
      <AuthModal />
    </Router>
  );
}

export default Routing;