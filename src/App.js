import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/main/home";
import Transactions from "./components/main/transactions";
import Address from "./components/main/address";
import Blocks from "./components/main/block";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-black ">
      <Router>
        <h1 className="text-7xl mb-16">
          <Link to={"/"}>
            <span className="text-blue-500">Alchemy</span>{" "}
            <span className="text-white">Explorer</span>
          </Link>
        </h1>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Home {...props} alchemy={alchemy} />}
          />
          <Route
            path="/transaction/:id"
            render={(props) => <Transactions {...props} alchemy={alchemy} />}
          />
          <Route
            path="/address/:id"
            render={(props) => <Address {...props} alchemy={alchemy} />}
          />
          <Route
            path="/block/:id"
            render={(props) => <Blocks {...props} alchemy={alchemy} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
