import { users } from '../../mock-data/users'
import { groups } from '../../mock-data/groups'
import findById from '../../helpers/findById'

export default server => server.patch('/user/:id', (req, res) => {
  const user = findById(users.data)(req.params.id)
  if (!user) return res.status(404)

  users.data.forEach((u) => {
    if (u.id !== req.params.id) return
    Object.keys(req.body).forEach((k) => { u[k] = req.body[k] }) // eslint-disable-line
  })

  const newGroups = (user.groups || [])

  groups.data = groups.data.map((group) => {
    // user not belongs to this group
    if (newGroups.indexOf(group.id) < 0) {
      const index = group.users.indexOf(user.id)
      if (index > -1) group.users.splice(index, 1)
      return group
    }
    // user belongs to this group
    return {
      ...group,
      users: Array.from(new Set([...(group.users || []), user.id])),
    }
  })

  return res.jsonp(req.body)
})
