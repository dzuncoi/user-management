import React from 'react'
import { message } from 'antd'

import { UserDetailComp } from './user-detail'

jest.mock('formik', () => ({
  Formik: () => 'Formik',
}))
jest.mock('../../components/Panel/panel', () => 'Panel')
jest.mock('../../components/UserForm/user-form', () => 'UserForm')

describe('user-detail', () => {
  let props

  beforeEach(() => {
    props = {
      actions: {
        getGroupsList: jest.fn(),
        getUser: jest.fn(),
        createUser: jest.fn(),
        editUser: jest.fn(),
      },
      groups: [{
        id: '1',
      }],
      currentUser: {
        id: 'user-id',
        groups: [],
      },
      match: {
        params: {
          id: 'new',
        },
      },
      history: {
        push: jest.fn(),
      },
    }
  })

  it('renders', () => {
    expect(shallow(<UserDetailComp {...props} />)).toMatchSnapshot()
  })

  it('always get list of groups after initialize', () => {
    shallow(<UserDetailComp {...props} />)
    expect(props.actions.getGroupsList).toHaveBeenCalled()
  })

  describe('calling getUser conditionally', () => {
    it('call getUser if url is not user/new', () => {
      shallow(<UserDetailComp {...props} match={{ params: { id: 'id' } }} />)
      expect(props.actions.getUser).toHaveBeenCalledWith('id')
    })

    it('not call getUser if url is user/new', () => {
      shallow(<UserDetailComp {...props} match={{ params: { id: 'new' } }} />)
      expect(props.actions.getUser).not.toHaveBeenCalled()
    })
  })

  it('transform user\'s groups into array of group id in Formik initialValues', () => {
    const newProps = {
      ...props,
      match: {
        params: {
          id: 'id',
        },
      },
      currentUser: {
        firstName: 'first name',
        lastName: 'last name',
        email: 'email',
        groups: [{ id: '1' }, { id: '2' }],
      },
    }
    const wrapper = shallow(<UserDetailComp {...newProps} />)
    expect(wrapper.find('Formik').props().initialValues).toEqual({
      firstName: 'first name',
      lastName: 'last name',
      email: 'email',
      groups: ['1', '2'],
    })
  })

  it('pass undefined as Formik initialValues if creating new user', () => {
    const wrapper = shallow(<UserDetailComp {...props} />)
    expect(wrapper.find('Formik').props().initialValues).toBeUndefined()
  })

  it('pass undefined as Formik initialValues if currentUser props is empty', () => {
    const wrapper = shallow(<UserDetailComp {...props} currentUser={undefined} />)
    expect(wrapper.find('Formik').props().initialValues).toBeUndefined()
  })

  describe('render text conditionally', () => {
    it('render "Create New User" & "Create" text in adding-new-mode', () => {
      const wrapper = shallow(<UserDetailComp {...props} />)
      const Panel = wrapper.find('Formik').props().render(props)
      expect(Panel.props.title).toEqual('Create New User')
      expect(Panel.props.actions[0].props.children).toEqual('Create')
    })

    it('render "Edit User" & "Save" text in adding-new-mode', () => {
      const wrapper = shallow(<UserDetailComp {...props} match={{ params: { id: 'id' } }} />)
      const Panel = wrapper.find('Formik').props().render(props)
      expect(Panel.props.title).toEqual('Edit User')
      expect(Panel.props.actions[0].props.children).toEqual('Save')
    })
  })

  describe('Form submit', () => {
    let mockedForm
    let submittedValue
    let w

    beforeEach(() => {
      mockedForm = { setSubmitting: jest.fn() }
      submittedValue = { name: 'name', groups: [1, 2] }
      message.success = jest.fn()
      message.error = jest.fn()
    })

    it('show error if there is no group in submitted values', async () => {
      w = shallow(<UserDetailComp {...props} />)
      await w.find('Formik').simulate('submit', { name: 'name' }, mockedForm)
      expect(message.error).toHaveBeenCalledWith('Please choose at least 1 group!')
    })

    it('call createUser with submitted value then setSubmitting is called with false and redirect to home and display notification', async () => {
      w = shallow(<UserDetailComp {...props} />)
      await w.find('Formik').simulate('submit', submittedValue, mockedForm)
      expect(props.actions.createUser).toHaveBeenCalledWith(submittedValue)
      expect(mockedForm.setSubmitting).toHaveBeenCalledTimes(2)
      expect(props.history.push).toHaveBeenCalledWith('/')
      expect(message.success).toHaveBeenCalledWith('Create user successfully!')
    })

    it('call editUser instead of createUser in case of editting', async () => {
      w = shallow(<UserDetailComp {...props} match={{ params: { id: 'id' } }} />)
      await w.find('Formik').simulate('submit', submittedValue, mockedForm)
      expect(props.actions.editUser).toHaveBeenCalledWith('id', submittedValue)
      expect(props.actions.createUser).not.toHaveBeenCalled()
    })
  })
})
