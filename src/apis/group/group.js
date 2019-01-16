import fetch from '../../helpers/fetch/fetch'

export default {
  getGroups: async () => (
    fetch(`${process.env.REACT_APP_API_URL}/groups`, {
      method: 'GET',
    })
  ),
  getGroup: async id => (
    fetch(`${process.env.REACT_APP_API_URL}/group/${id}`, {
      method: 'GET',
    })
  ),
  createGroup: async body => (
    fetch(`${process.env.REACT_APP_API_URL}/group`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ),
  editGroup: async (id, body) => (
    fetch(`${process.env.REACT_APP_API_URL}/group/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ),
}
