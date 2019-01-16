import React from 'react'
import PropTypes from 'prop-types'
import { Select as AntdSelect } from 'antd'

const Select = ({
  field,
  form,
  ...rest
}) => (
  <AntdSelect
    style={{ width: '100%' }}
    value={field.value}
    onChange={e => form.setFieldValue(field.name, e)}
    {...rest}
  />
)

Select.propTypes = {
  field: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
  }),
  form: PropTypes.shape({
    setFieldValue: PropTypes.func,
  }),
}

Select.defaultProps = {
  field: {},
  form: {},
}

export const { Option } = AntdSelect

export default Select
