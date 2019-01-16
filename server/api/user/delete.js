import { users } from '../../mock-data/users'
import { groups } from '../../mock-data/groups'
import findById from '../../helpers/findById'

export default server => server.delete('/user/:id', (req, res) => {
  const user = findById(users.data)(req.params.id)
  if (!user) {
    return res.status(404).jsonp({
      code: 'USER_NOT_FOUND',
    })
  }

  users.data = users.data.filter(u => u.id !== user.id)

  groups.data = groups.data.map((group) => {
    const index = group.users.indexOf(user.id)
    if (index > -1) group.users.splice(index, 1)
    return group
  })

  return res.status(202).jsonp({})
})
