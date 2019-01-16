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

export class GroupsListComp extends React.Component {
  constructor(props) {
    super(props)
    this.columns = [{
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
      render: (val, record) => (record.users.length <= 0
        ? <Button onClick={() => props.deleteGroup(record.id)} type="ghost">Delete</Button>
        : null
      ),
      fixed: 'right',
      width: 100,
    }]
  }

  render() {
    return (
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
          dataSource={this.props.data}
          columns={this.columns}
          loading={this.props.loadingStatus === LOADING}
          scroll={{ x: true }}
        />
      </Panel>
    )
  }
}

GroupsListComp.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })),
  loadingStatus: PropTypes.oneOf([NOT_LOADED, LOADING, SUCCEEDED, FAILED]),
  deleteGroup: PropTypes.func.isRequired,
}

GroupsListComp.defaultProps = {
  data: [],
  loadingStatus: NOT_LOADED,
}

export default React.memo(GroupsListComp)
