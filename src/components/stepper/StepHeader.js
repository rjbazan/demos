import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const styles = {
  groupHeader: {
    "flex": "1 1 auto",
    "marginLeft": "25px",
    "borderLeft": "3px solid #4EC283",
    paddingLeft: 32,
    paddingBottom: 21,
    color: '#699DC2'
  },
  fillerSpan: {
    "display": "block",
    "borderColor": "#4EC283",
    "minHeight": "28px"
  }
}

class StepHeader extends PureComponent {

  render() {
    return (<div style={styles.groupHeader}>
      <span style={styles.fillerSpan}></span>
      <span>{this.props.category}</span>
    </div>)
  }
}

StepHeader.propTypes = {
  category: PropTypes.string
}

export default StepHeader;
