import Home from './Views/Home.js';
import Navigation from './Components/Navigation';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Creatures from './Views/Creatures.js';
import Attacks from './Views/Attacks.js';
import Footer from './Components/Footer.js';
import AttackBuilder from './Views/AttackBuilder.js';
import CreatureBuilder from './Views/CreatureBuilder.js';
import Items from './Views/Items.js';
import ItemBuilder from './Views/ItemBuilder.js';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen h-full w-screen flex flex-col items-center">
      <Router>
        <Navigation/>
        <div>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/creatures">
              <Creatures/>
            </Route>
            <Route exact path="/attacks">
              <Attacks/>
            </Route>
            <Route exact path="/items">
              <Items/>
            </Route>
            <Route exact path="/attack-builder">
              <AttackBuilder/>
            </Route>
            <Route exact path="/creature-builder">
              <CreatureBuilder/>
            </Route>
            <Route exact path="/item-builder">
              <ItemBuilder/>
            </Route>
          </Switch>
        </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
