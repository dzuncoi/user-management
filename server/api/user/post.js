import uuid from 'uuid/v4'

import { users } from '../../mock-data/users'
import { groups } from '../../mock-data/groups'

export default server => server.post('/user', (req, res) => {
  const newUser = {
    ...req.body,
    id: uuid(),
  }
  users.data.push(newUser)

  const newGroups = (newUser.groups || [])

  groups.data = groups.data.map((group) => {
    // user not belongs to this group
    if (newGroups.indexOf(group.id) < 0) {
      const index = group.users.indexOf(newUser.id)
      if (index > -1) group.users.splice(index, 1)
      return group
    }
    // user belongs to this group
    return {
      ...group,
      users: Array.from(new Set([...(group.users || []), newUser.id])),
    }
  })

  return res.status(201).jsonp(newUser)
})
