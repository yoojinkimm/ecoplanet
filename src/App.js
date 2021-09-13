import "./App.css";
import { Home } from "./pages";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header"></header>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
