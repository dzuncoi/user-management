import { groups } from '../../mock-data/groups'
import findById from '../../helpers/findById'

export default server => server.patch('/group/:id', (req, res) => {
  const group = findById(groups.data)(req.params.id)
  if (!group) return res.status(404)

  groups.data = groups.data.map((gr) => {
    if (gr.id !== group.id) return gr
    const users = (req.body.users || []).map(user => user.id)
    return {
      ...gr,
      ...req.body,
      users: Array.from(new Set([...gr.users, ...users])),
    }
  })
  return res.jsonp(req.body)
})
