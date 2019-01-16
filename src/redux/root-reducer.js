import { combineReducers } from 'redux'
import users from './user/user.reducers'
import groups from './group/group.reducers'

const combinedReducers = combineReducers({
  users,
  groups,
})

export default combinedReducers
