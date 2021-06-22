import Header from "./Header";
import {BrowserRouter as Router} from "react-router-dom";
import RoutingSwitch from "./RoutingSwitch";


function Routing() {
  return (
    <Router>
      <Header />
      <RoutingSwitch />
    </Router>
  );
}

export default Routing;