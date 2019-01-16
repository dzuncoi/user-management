import fetch from '../../helpers/fetch/fetch'

export default {
  getUsers: async () => (
    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: 'GET',
    })
  ),
  getUser: async id => (
    fetch(`${process.env.REACT_APP_API_URL}/user/${id}`, {
      method: 'GET',
    })
  ),
  createUser: async body => (
    fetch(`${process.env.REACT_APP_API_URL}/user`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ),
  editUser: async (id, body) => (
    fetch(`${process.env.REACT_APP_API_URL}/user/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ),
}
