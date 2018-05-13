import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const styles = {
  list: {
    marginTop: 10
  },
  tick: {
    height: '1px',
    background: '#4EC283',
    position: 'relative',
    width: '10px',
    left: '-35px',
    top: '8px'
  }
}

const StepLog = ({ log, isLastItem }) => (
  <li style={styles.list}>
    {!isLastItem && <div style={styles.tick}></div>}
    <div>{log.LogDate}</div>
    <div>{log.Error}</div>
  </li>
);

StepLog.propTypes = {
  log: PropTypes.any
}

export default StepLog;
