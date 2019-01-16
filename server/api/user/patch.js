import { users } from '../../mock-data/users'
import findById from '../../helpers/findById'

export default server => server.patch('/user/:id', (req, res) => {
  const user = findById(users)(req.params.id)
  if (!user) return res.status(404)

  users.forEach((u) => {
    if (u.id !== req.params.id) return
    Object.keys(req.body).forEach((k) => { u[k] = req.body[k] }) // eslint-disable-line
  })
  return res.jsonp(req.body)
})
