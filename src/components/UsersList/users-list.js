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

export class UsersListComp extends React.Component {
  constructor(props) {
    super(props)
    this.columns = [{
      title: 'Full Name',
      key: 'fullName',
      render: (val, record) => <Link to={`user/${record.id}`}>{record.firstName} {record.lastName}</Link>,
    }, {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    }, {
      title: 'Groups',
      key: 'groups',
      render: (val, { groups = [] }) => (groups.length <= 1
        ? groups[0].name
        : (
          <Tooltip
            title={
              <React.Fragment>
                {groups.map(group => <div key={group.id}>{group.name}</div>)}
              </React.Fragment>
            }
          >
            {`${groups.length} groups`}
          </Tooltip>
        )
      ),
    }, {
      title: 'Actions',
      key: 'actions',
      render: (val, record) => <Button onClick={() => props.deleteUser(record.id)} type="ghost">Delete</Button>,
      fixed: 'right',
      width: 100,
    }]
  }

  render() {
    return (
      <Panel
        title="Users"
        extra={
          <Link to="user/new">
            <Button type="primary">New User</Button>
          </Link>
        }
      >
        <Table
          name="users"
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

UsersListComp.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  })),
  loadingStatus: PropTypes.oneOf([NOT_LOADED, LOADING, SUCCEEDED, FAILED]),
  deleteUser: PropTypes.func.isRequired,
}

UsersListComp.defaultProps = {
  data: [],
  loadingStatus: NOT_LOADED,
}

export default React.memo(UsersListComp)
