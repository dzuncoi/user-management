import React from 'react'
import { Form, Field } from 'formik'

import TextInput from '../Input/input'

import {
  required as requiredValidation,
} from '../../helpers/validations/validations'

const GroupForm = () => (
  <Form>
    <Field
      type="text"
      name="name"
      id="name"
      placeholder="Group Name"
      component={TextInput}
      validate={requiredValidation('Group name is required!')}
    />
  </Form>
)

export default GroupForm
