import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const styles = {
  list: {
    marginTop: 10
  }
}

const StepLog = ({ log }) => (
  <li style={styles.list}>
    <div>{log.LogDate}</div>
    <div>{log.Error}</div>
  </li>
);

StepLog.propTypes = {
  log: PropTypes.any
}

export default StepLog;
