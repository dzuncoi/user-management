import React from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'formik'
import { Row, Col } from 'antd'

import TextInput from '../Input/input'
import Select, { Option } from '../Select/select'

import {
  email as emailValidation,
  required as requiredValidation,
} from '../../helpers/validations/validations'

import styles from './user-form.module.scss'

const UserForm = props => (
  <div className={styles.container}>
    <Form>
      <Row type="flex" gutter={16} className={styles.formRow}>
        <Col span={24} md={{ span: 12 }}>
          <Field
            type="name"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            component={TextInput}
            validate={requiredValidation('First name is required!')}
          />
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Field
            type="name"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            component={TextInput}
            validate={requiredValidation('Last name is required!')}
          />
        </Col>
      </Row>
      <Row type="flex" gutter={16} className={styles.formRow}>
        <Col span={24} md={{ span: 12 }}>
          <Field
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            component={TextInput}
            validate={emailValidation}
          />
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Field
            type="text"
            name="groups"
            id="groups"
            component={Select}
            placeholder="Select group(s)"
            mode="multiple"
            optionFilterProp="children"
          >
            {props.groups.map(group => (
              <Option key={group.id} value={group.id}>{group.name}</Option>
            ))}
          </Field>
        </Col>
      </Row>
    </Form>
  </div>
)

UserForm.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })),
}

UserForm.defaultProps = {
  groups: [],
}

export default UserForm
