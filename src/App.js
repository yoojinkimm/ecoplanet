import "./App.css";
import { Home, Landing, Data } from "./pages";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header"></header>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/data" component={Data} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
