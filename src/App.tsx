import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useWeb3React } from '@web3-react/core';
import { NavBar } from './components/NavBar/NavBar';
import { Swap } from './pages/Swap/Swap';
import { Liquidity } from './pages/Liquidity/Liquidity';
import { injected } from './utils/connectors';

import './App.css';

function App() {

  const {
    chainId,
    account,
    active,
    activate,
    deactivate
  } = useWeb3React();
  const [addState, setAddState] = React.useState(true);

  function handleConnect() {
    if (active) {
      deactivate();
      return;
    }

    activate(injected, (error) => {
      if (error) {
        alert(error);
      }
    })
  }

  return (
    <div className="App">
      <div>
        <p>Account: {account}</p>
        <p>ChainId: {chainId}</p>
      </div>
      <div>
        <button onClick={handleConnect}>{active ? 'DisConnect' : 'Connect'}</button>
      </div>

      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Swap account={account} network={chainId} />} ></Route>
          <Route path="/liquidity" element={<Liquidity account={account} network={chainId} />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
