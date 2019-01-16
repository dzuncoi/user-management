import React from 'react'

import UserForm from './user-form'

jest.mock('formik', () => ({
  Form: () => 'Form',
  Field: () => 'Field',
}))
jest.mock('antd', () => ({
  Row: () => 'Row',
  Col: () => 'Col',
}))
jest.mock('../Input/input', () => 'TextInput')
jest.mock('../Select/select', () => ({
  default: () => 'Select',
  Option: () => 'Option',
}))

describe('user-form', () => {
  let props

  beforeEach(() => {
    props = {
      groups: [{
        id: '1',
        name: 'group 1',
      }],
    }
  })

  it('renders', () => {
    expect(shallow(<UserForm {...props} />)).toMatchSnapshot()
  })
})
