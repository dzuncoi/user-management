import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { Button, message } from 'antd'
import { Formik } from 'formik'

import Panel from '../../components/Panel/panel'
import UserForm from '../../components/UserForm/user-form'

import { getGroupsList } from '../../redux/group/group.actions'
import { getGroupsList as getGroupsListSelector } from '../../redux/group/group.selectors'

import { getUser, createUser, editUser } from '../../redux/user/user.actions'
import { getCurrentUserData } from '../../redux/user/user.selectors'

export class UserDetailComp extends React.Component {
  constructor(props) {
    super(props)
    this.paramId = props.match.params.id
    this.isAddingNew = this.paramId === 'new'
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    if (!this.isAddingNew) this.props.actions.getUser(this.paramId)
    this.props.actions.getGroupsList()
  }

  async submit(values, { setSubmitting }) {
    if (!values.groups || values.groups.length <= 0) {
      message.error('Please choose at least 1 group!')
      return setSubmitting(false)
    }
    setSubmitting(true)
    if (this.isAddingNew) await this.props.actions.createUser(values)
    else await this.props.actions.editUser(this.paramId, values)
    setSubmitting(false)
    this.props.history.push('/')
    return message.success(`${this.isAddingNew ? 'Create' : 'Edit'} user successfully!`)
  }

  render() {
    const {
      currentUser,
      groups,
    } = this.props
    const formInitialValues = (!this.isAddingNew && currentUser)
      ? ({
        ...currentUser,
        groups: currentUser.groups.map(gr => gr.id),
      })
      : undefined
    return (
      <Formik
        enableReinitialize
        initialValues={formInitialValues}
        onSubmit={this.submit}
        render={props => (
          <Panel
            title={this.isAddingNew ? 'Create New User' : 'Edit User'}
            actions={[
              <Button
                type="primary"
                onClick={props.submitForm}
                loading={props.isSubmitting}
                disabled={props.isSubmitting}
              >
                {this.isAddingNew ? 'Create' : 'Save'}
              </Button>,
            ]}
          >
            <UserForm
              {...props}
              groups={groups}
              user={currentUser}
            />
          </Panel>
        )}
      />
    )
  }
}

UserDetailComp.propTypes = {
  actions: PropTypes.shape({
    getGroupsList: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired,
  }).isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })),
  currentUser: PropTypes.shape({
    id: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}

UserDetailComp.defaultProps = {
  groups: [],
  currentUser: undefined,
}

export const mapStateToProps = state => ({
  groups: getGroupsListSelector(state),
  currentUser: getCurrentUserData(state),
})

export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getGroupsList,
    getUser,
    createUser,
    editUser,
  }, dispatch),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(UserDetailComp)
