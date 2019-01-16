import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import styles from './panel.module.scss'

const Panel = ({
  children,
  ...rest
}) => (
  <Card
    className={styles.container}
    bodyStyle={{ padding: 16 }}
    {...rest}
  >
    {children}
  </Card>
)

Panel.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Panel
