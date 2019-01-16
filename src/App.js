import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AppLayout from './Layout'

import Home from './containers/Home/home'
import UserDetail from './containers/UserDetail/user-detail'
import GroupDetail from './containers/GroupDetail/group-detail'

const App = () => (
  <AppLayout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/user/:id" component={UserDetail} />
      <Route exact path="/group/:id" component={GroupDetail} />
    </Switch>
  </AppLayout>
)

export default App
