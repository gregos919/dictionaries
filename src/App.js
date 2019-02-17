import React, { Component } from 'react';
import NavBar from './components/nav/NavBar';
import DictionaryOverview from './components/dictionaries/DictionaryOverview';
import DictionaryCreate from './components/dictionaries/DictionaryCreate';
import { Switch, Route } from 'react-router-dom';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <main className="content">
          <Route exact path='/dictionaries' component={DictionaryOverview}/>
          <Route exact path='/dictionaries/create' component={DictionaryCreate}/>
        </main>
      </div>
    );
  }
}

export default App;
