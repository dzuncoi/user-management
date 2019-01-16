import { users } from '../../mock-data/users'
import { groups } from '../../mock-data/groups'
import findById from '../../helpers/findById'

const populateGroup = user => ({
  ...user,
  groups: user.groups.map(gr => findById(groups)(gr)),
})

export const single = server => server.get('/user/:id', (req, res) => {
  const user = findById(users)(req.params.id)
  if (!user) {
    return res.status(404).jsonp({
      code: 'USER_NOT_FOUND',
    })
  }

  // populate group object
  const response = populateGroup(user)
  return res.jsonp(response)
})

export const multiple = server => server.get('/users', (req, res) => (
  res.jsonp(users.map(populateGroup))
))
