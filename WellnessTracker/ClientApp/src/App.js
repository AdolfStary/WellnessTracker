import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import MakeEntry from './components/MakeEntry';
import EntryList from './components/EntryList';
import EntryDetail from './components/EntryDetail';
import Today from './components/Today';
import './custom.css'


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
            <Route path='/Login' component={Login} />
            <Route path='/MakeEntry' component={MakeEntry} />
            <Route path='/Notebook' component={EntryList} />
            <Route path='/EntryDetail' component={EntryDetail} />
            <Route path='/Today' component={Today} />
        <Route path='/Register' component={Register} />
        <Route path='/Logout' component={Logout} />
      </Layout>
    );
  }
}
