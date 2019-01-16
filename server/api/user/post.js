import uuid from 'uuid/v4'

import { users } from '../../mock-data/users'

export default server => server.post('/user', (req, res) => {
  const newUser = {
    ...req.body,
    id: uuid(),
  }
  users.push(newUser)
  return res.status(201).jsonp(newUser)
})
