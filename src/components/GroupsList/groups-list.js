import React from 'react'
import PropTypes from 'prop-types'
import { Button, Table, Tooltip } from 'antd'
import { Link } from 'react-router-dom'

import Panel from '../Panel/panel'

import {
  NOT_LOADED,
  LOADING,
  SUCCEEDED,
  FAILED,
} from '../../constants/loading-status'

export const columns = [{
  title: 'Name',
  key: 'name',
  dataIndex: 'name',
  render: (val, group) => <Link to={`group/${group.id}`}>{val}</Link>,
}, {
  title: 'Users',
  key: 'users',
  render: (val, { users = [] }) => (users.length <= 0
    ? 'No Users'
    : (
      <Tooltip
        title={
          <React.Fragment>
            {users.map(user => <div key={user.id}>{user.firstName} {user.lastName}</div>)}
          </React.Fragment>
        }
      >
        {`${users.length} users`}
      </Tooltip>
    )
  ),
}, {
  title: 'Actions',
  key: 'actions',
  render: () => <Button type="ghost">Delete</Button>,
  fixed: 'right',
  width: 100,
}]

export const GroupsListComp = props => (
  <Panel
    title="Groups"
    extra={
      <Link to="group/new">
        <Button type="primary">New Group</Button>
      </Link>
    }
  >
    <Table
      name="groups"
      rowKey="id"
      dataSource={props.data}
      columns={columns}
      loading={props.loadingStatus === LOADING}
      scroll={{ x: true }}
    />
  </Panel>
)

GroupsListComp.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })),
  loadingStatus: PropTypes.oneOf([NOT_LOADED, LOADING, SUCCEEDED, FAILED]),
}

GroupsListComp.defaultProps = {
  data: [],
  loadingStatus: NOT_LOADED,
}

export default React.memo(GroupsListComp)
