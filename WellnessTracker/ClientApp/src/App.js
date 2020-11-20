import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import MakeEntry from './components/MakeEntry';
import EntryList from './components/EntryList';
import './custom.css'


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/makeentry' component={MakeEntry} />
            <Route path='/listentry' component={EntryList} />
        <Route path='/register' component={Register} />
        <Route path='/logout' component={Logout} />
      </Layout>
    );
  }
}
