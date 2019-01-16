import uuid from 'uuid/v4'

import { groups } from '../../mock-data/groups'

export default server => server.post('/group', (req, res) => {
  const newGroup = {
    ...req.body,
    users: req.body.users || [],
    id: uuid(),
  }
  groups.push(newGroup)
  return res.status(201).jsonp(newGroup)
})
