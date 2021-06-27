import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Search from './pages/Search'
import Footer from './components/Footer'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/search/:keyword" component={Search} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    )
  }
}
