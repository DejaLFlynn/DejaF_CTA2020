import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Error from "./Components/Error";
function App() {
  return (
    <div className="App">
      Imstagram "The imitation of Instagram"
      <NavBar />
      <Switch>
        <Route exact path={"/"}>
          Landing Page
        </Route>
        <Route exact path={"/posts"}>
          Explore Page
        </Route>
        <Route path={"/users/:id"}>Users Page</Route>
        <Route path="*" component={Error} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
