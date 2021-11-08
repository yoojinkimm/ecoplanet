import "./App.css";
import { Home, Landing, Data, AllData, Test } from "./pages";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import React, { useEffect } from "react";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header"></header>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/data" component={Data} />
          <Route exact path="/alldata" component={AllData} />

          <Route exact path="/test" component={Test} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
