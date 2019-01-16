import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col } from 'antd'

import { getUsersList, deleteUser } from '../../redux/user/user.actions'
import {
  getUsersList as getUsersListSelector,
  getUsersListLoadingStatus,
} from '../../redux/user/user.selectors'

import { getGroupsList, deleteGroup } from '../../redux/group/group.actions'
import {
  getGroupsList as getGroupsListSelector,
  getGroupsListLoadingStatus,
} from '../../redux/group/group.selectors'

import UsersList from '../../components/UsersList/users-list'
import GroupsList from '../../components/GroupsList/groups-list'

class HomeComp extends React.Component {
  componentDidMount() {
    this.props.actions.getUsersList()
    this.props.actions.getGroupsList()
  }

  render() {
    return (
      <Row type="flex" gutter={8}>
        <Col span={24} lg={{ span: 14 }}>
          <UsersList
            data={this.props.users}
            loadingStatus={this.props.usersLoadingStatus}
            deleteUser={this.props.actions.deleteUser}
          />
        </Col>
        <Col span={24} lg={{ span: 10 }}>
          <GroupsList
            data={this.props.groups}
            loadingStatus={this.props.groupsLoadingStatus}
            deleteGroup={this.props.actions.deleteGroup}
          />
        </Col>
      </Row>
    )
  }
}

HomeComp.propTypes = {
  actions: PropTypes.shape({
    getUsersList: PropTypes.func.isRequired,
    getGroupsList: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired,
  }).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })),
  usersLoadingStatus: PropTypes.string,
  groups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })),
  groupsLoadingStatus: PropTypes.string,
}

HomeComp.defaultProps = {
  users: [],
  usersLoadingStatus: undefined,
  groups: [],
  groupsLoadingStatus: undefined,
}

export const mapStateToProps = state => ({
  users: getUsersListSelector(state),
  usersLoadingStatus: getUsersListLoadingStatus(state),
  groups: getGroupsListSelector(state),
  groupsLoadingStatus: getGroupsListLoadingStatus(state),
})

export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getUsersList,
    getGroupsList,
    deleteUser,
    deleteGroup,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeComp)
