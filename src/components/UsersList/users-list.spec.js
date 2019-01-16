import React from 'react'

import { UsersListComp } from './users-list'
import { LOADING, NOT_LOADED } from '../../constants/loading-status'

jest.mock('antd', () => ({
  Button: () => 'Button',
  Table: () => 'Table',
  Tooltip: () => 'Tooltip',
}))
jest.mock('react-router-dom', () => ({
  Link: () => 'Link',
}))
jest.mock('../Panel/panel', () => 'Panel')

describe('users-list', () => {
  let props

  beforeEach(() => {
    props = {
      loadingStatus: NOT_LOADED,
      data: [{
        id: '1',
        name: 'data-1',
      }, {
        id: '2',
        name: 'data-2',
      }],
      deleteUser: jest.fn(),
    }
  })

  it('renders', () => {
    expect(shallow(<UsersListComp {...props} />)).toMatchSnapshot()
  })

  it('renders loading on table if loadingStatus is LOADING', () => {
    const wrapper = shallow(<UsersListComp {...props} loadingStatus={LOADING} />)
    expect(wrapper.find('Table').props().loading).toBeTruthy()
  })

  describe('table columns', () => {
    let cols

    beforeEach(() => {
      const w = shallow(<UsersListComp {...props} />)
      cols = w.instance().columns
    })

    it('renders fullName with Link to edit user', () => {
      const Col = cols[0].render(null, {
        id: 'id',
        firstName: 'first name',
        lastName: 'last name',
      })
      expect(Col.props.to).toEqual('user/id')
      expect(Col.props.children.join('')).toEqual('first name last name')
    })

    it('renders group name if user belongs to only 1 group', () => {
      const Col = cols[2].render(null, {
        groups: [{ name: 'unique group' }],
      })
      expect(Col).toEqual('unique group')
    })

    it('renders amount of groups if user belongs to multiple groups', () => {
      const Col = cols[2].render(null, {
        groups: [{ name: 'group 1', id: '1' }, { name: 'group 2', id: '2' }],
      })
      expect(Col.props.children).toEqual('2 groups')
    })
  })
})
