import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import Logout from './screens/Logout';
import MakeEntry from './screens/MakeEntry';
import EntryList from './screens/EntryList';
import EntryDetail from './screens/EntryDetail';
import Today from './screens/Today';
import Summary from './screens/Summary';
import ProtectedRoute from './components/ProtectedRoute';
import './css/custom.css'


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
            <Route path='/Login' component={Login} />
            <ProtectedRoute path='/MakeEntry' component={MakeEntry} />
            <ProtectedRoute path='/Notebook' component={EntryList} />
            <ProtectedRoute path='/EntryDetail' component={EntryDetail} />
            <ProtectedRoute path='/Today' component={Today} />
            <ProtectedRoute path='/Summary' component={Summary} />
        <Route path='/Register' component={Register} />
        <Route path='/Logout' component={Logout} />
      </Layout>
    );
  }
}
