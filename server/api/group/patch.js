import { groups } from '../../mock-data/groups'
import findById from '../../helpers/findById'

export default server => server.patch('/group/:id', (req, res) => {
  const group = findById(groups)(req.params.id)
  if (!group) return res.status(404)

  groups.forEach((gr) => {
    if (gr.id !== req.params.id) return
    Object.keys(req.body).forEach((k) => { gr[k] = req.body[k] }) // eslint-disable-line
  })
  return res.jsonp(req.body)
})
