import pipe from '../../src/helpers/pipe/pipe'

import {
  single as getUser,
  multiple as getUsers,
} from './user/get'
import patchUser from './user/patch'
import postUser from './user/post'
import {
  single as getGroup,
  multiple as getGroups,
} from './group/get'
import patchGroup from './group/patch'
import postGroup from './group/post'

require('dotenv').config()

const jsonServer = require('json-server')

const server = jsonServer.create()
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

export default pipe(
  getUser,
  getUsers,
  patchUser,
  postUser,
  getGroup,
  getGroups,
  patchGroup,
  postGroup,
)(server)

const API_PORT = process.env.REACT_APP_API_URL || 3001
server.listen(API_PORT, () => {
  console.log(`JSON Server is running on port ${API_PORT}`) //eslint-disable-line
})
