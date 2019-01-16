import GroupAPI from './group'

jest.mock('../../helpers/fetch/fetch', () => () => 'response')

describe('group-api', () => {
  ['getGroups', 'getGroups', 'createGroup', 'editGroup'].forEach((method) => {
    it(`returns response if ${method} call is successful`, async () => {
      const res = await GroupAPI[method]()
      expect(res).toEqual('response')
    })
  })
})
