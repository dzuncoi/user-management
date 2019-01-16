import React from 'react'
import PropTypes from 'prop-types'
import {
  Layout,
  Menu,
  Icon,
} from 'antd'
import { Link, withRouter } from 'react-router-dom'

import styles from './layout.module.scss'

const {
  Content, Footer, Sider,
} = Layout

const AppLayout = props => (
  <Layout className={styles.app}>
    <Sider collapsible>
      <div className={styles.fakeLogo} />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['home']}
        selectedKeys={[props.location.pathname]}
      >
        <Menu.Item key="/">
          <Link to="/">
            <Icon type="home" />
            <span>Dashboard</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/user/new">
          <Link to="/user/new">
            <Icon type="user" />
            <span>User</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/group/new">
          <Link to="/group/new">
            <Icon type="usergroup-add" />
            <span>Group</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Content className={styles.content}>
        {props.children}
      </Content>
      <Footer className={styles.footer}>
        Dung Huynh ©2019 User Management.
      </Footer>
    </Layout>
  </Layout>
)

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default withRouter(AppLayout)
