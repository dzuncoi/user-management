import React from 'react'
import PropTypes from 'prop-types'
import { Input, Form } from 'antd'

const TextInput = ({
  field,
  form,
  ...rest
}) => (
  <Form.Item
    hasFeedback={!!form.errors[field.name]}
    validateStatus={form.errors[field.name] && 'error'}
    help={form.errors[field.name]}
  >
    <Input
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      {...rest}
    />
  </Form.Item>
)

TextInput.propTypes = {
  field: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
  }),
  form: PropTypes.shape({
    errors: PropTypes.shape({}),
  }),
}

TextInput.defaultProps = {
  field: {},
  form: {},
}

export default TextInput
