import UserAPI from './user'

jest.mock('../../helpers/fetch/fetch', () => () => 'response')

describe('user-api', () => {
  ['getUsers', 'getUser', 'createUser', 'editUser', 'deleteUser'].forEach((method) => {
    it(`returns response if ${method} call is successful`, async () => {
      const res = await UserAPI[method]()
      expect(res).toEqual('response')
    })
  })
})
