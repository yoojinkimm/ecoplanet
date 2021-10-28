import "./App.css";
import { Home, Landing, Data, AllData } from "./pages";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import React, { useEffect } from "react";
// import { fire } from "./firebase";

function App() {
  useEffect(() => {
    // fire();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header"></header>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/data" component={Data} />
          <Route exact path="/alldata" component={AllData} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
