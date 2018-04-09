import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const styles = {
  step: {
    "marginTop": "-22px",
    "marginLeft": "25px",
    "paddingTop": 12,
    "paddingLeft": "32px",
    "paddingRight": "16px",
    "overflow": "hidden"
  }
}

class StepLogs extends PureComponent {

  render() {
    return (<div style={Object.assign({}, styles.step, { "borderLeft": this.props.isLastItem ? undefined : "3px solid #4EC283" })}>
      {this.props.showFullLogs ? this.props.logs.map(x => <div>{x}</div>) : this.props.logs[0]}
    </div>)
  }
}

StepLogs.propTypes = {
  showFullLogs: PropTypes.bool,
  isLastItem: PropTypes.bool,
  logs: PropTypes.array,
}

export default StepLogs;
