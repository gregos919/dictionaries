import React, { Component } from 'react';
import DictionaryOverview from './components/dictionaries/DictionaryOverview';
import DictionaryCreate from './components/dictionaries/DictionaryCreateEdit';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <main className="content">
          <Route exact path='/' render={() => (<Redirect to="/dictionaries" />)}/>
          <Route exact path='/dictionaries' component={DictionaryOverview}/>
          <Route exact path='/dictionaries/create' component={DictionaryCreate}/>
          <Route exact path='/dictionaries/edit' component={DictionaryCreate}/>
        </main>
      </div>
    );
  }
}

export default App;
