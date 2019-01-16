import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { Button, message } from 'antd'
import { Formik } from 'formik'

import Panel from '../../components/Panel/panel'
import GroupForm from '../../components/GroupForm/group-form'

import { getGroup, createGroup, editGroup } from '../../redux/group/group.actions'
import { getCurrentGroupData } from '../../redux/group/group.selectors'

class GroupDetailComp extends React.Component {
  constructor(props) {
    super(props)
    this.paramId = props.match.params.id
    this.isAddingNew = this.paramId === 'new'
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    if (!this.isAddingNew) this.props.actions.getGroup(this.paramId)
  }

  async submit(values, { setSubmitting }) {
    setSubmitting(true)
    if (this.isAddingNew) await this.props.actions.createGroup(values)
    else await this.props.actions.editGroup(this.paramId, values)
    setSubmitting(false)
    this.props.history.push('/')
    message.success(`${this.isAddingNew ? 'Create' : 'Edit'} group successfully!`)
  }

  render() {
    const {
      currentGroup,
    } = this.props
    const formInitialValues = (!this.isAddingNew && currentGroup) ? currentGroup : undefined
    return (
      <Formik
        enableReinitialize
        initialValues={formInitialValues}
        onSubmit={this.submit}
        render={props => (
          <Panel
            title={this.isAddingNew ? 'Create New Group' : 'Edit Group'}
            actions={[
              <Button
                type="primary"
                onClick={props.submitForm}
                loading={props.isSubmitting}
              >
                {this.isAddingNew ? 'Create' : 'Save'}
              </Button>,
            ]}
          >
            <GroupForm />
          </Panel>
        )}
      />
    )
  }
}

GroupDetailComp.propTypes = {
  actions: PropTypes.shape({
    getGroup: PropTypes.func.isRequired,
    createGroup: PropTypes.func.isRequired,
    editGroup: PropTypes.func.isRequired,
  }).isRequired,
  currentGroup: PropTypes.shape({
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

GroupDetailComp.defaultProps = {
  currentGroup: undefined,
}

export const mapStateToProps = state => ({
  currentGroup: getCurrentGroupData(state),
})

export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getGroup,
    createGroup,
    editGroup,
  }, dispatch),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(GroupDetailComp)
