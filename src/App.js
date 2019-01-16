import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './containers/Home/home'
import UserDetail from './containers/UserDetail/user-detail'
import GroupDetail from './containers/GroupDetail/group-detail'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/user/:id" component={UserDetail} />
    <Route exact path="/group/:id" component={GroupDetail} />
  </Switch>
)

export default App
