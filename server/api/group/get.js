import { users } from '../../mock-data/users'
import { groups } from '../../mock-data/groups'
import findById from '../../helpers/findById'

const populateUser = group => ({
  ...group,
  users: group.users.map(user => findById(users)(user)),
})

export const single = server => server.get('/group/:id', (req, res) => {
  const group = findById(groups)(req.params.id)
  if (!group) return res.status(404)

  // populate user object
  const response = populateUser(group)
  return res.jsonp(response)
})

export const multiple = server => server.get('/groups', (req, res) => (
  res.jsonp(groups.map(populateUser))
))
