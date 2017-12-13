import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './components/utility/Routes';
import Navbar from './components/utility/Navbar';


import './scss/style.scss';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="container">
          <header>
            <h1>Welcome to Ho Ho Hosts!</h1>
          </header>
          <main>
            <Routes />
            <Navbar />
          </main>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
