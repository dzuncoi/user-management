import { groups } from '../../mock-data/groups'
import findById from '../../helpers/findById'

export default server => server.delete('/group/:id', (req, res) => {
  const group = findById(groups.data)(req.params.id)
  if (!group) return res.status(404)

  groups.data = groups.data.filter(gr => gr.id !== group.id)

  return res.status(202).jsonp({})
})
