import React from 'react'

import {
  NOT_LOADED,
  LOADING,
} from '../../constants/loading-status'
import { GroupsListComp } from './groups-list'

jest.mock('antd', () => ({
  Button: () => 'Button',
  Table: () => 'Table',
  Tooltip: () => 'Tooltip',
}))
jest.mock('react-router-dom', () => ({
  Link: () => 'Link',
}))
jest.mock('../Panel/panel', () => 'Panel')

describe('groups-list', () => {
  let props

  beforeEach(() => {
    props = {
      loadingStatus: NOT_LOADED,
      data: [{
        id: '1',
        name: 'group 1',
      }],
      deleteGroup: jest.fn(),
    }
  })

  it('renders', () => {
    expect(shallow(<GroupsListComp {...props} />)).toMatchSnapshot()
  })

  it('renders loading on table if loadingStatus is LOADING', () => {
    const wrapper = shallow(<GroupsListComp {...props} loadingStatus={LOADING} />)
    expect(wrapper.find('Table').props().loading).toBeTruthy()
  })

  describe('table columns', () => {
    let cols

    beforeEach(() => {
      const w = shallow(<GroupsListComp {...props} />)
      cols = w.instance().columns
    })

    it('renders group name with link to edit group page', () => {
      const Col = cols[0].render('name', { id: 'id' })
      expect(Col.props.to).toEqual('group/id')
      expect(Col.props.children).toEqual('name')
    })

    it('renders No users if groups does not contain any users', () => {
      const Col = cols[1].render(null, { users: [] })
      expect(Col).toEqual('No Users')
    })

    it('renders amount of users belonging to this group', () => {
      const Col = cols[1].render(null, {
        users: [{
          id: '1',
        }, {
          id: '2',
        }],
      })
      expect(Col.props.children).toEqual('2 users')
    })
  })
})
