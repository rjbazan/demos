import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import StepLog from './StepLog';

const styles = {
  step: {
    "marginTop": "-22px",
    "marginLeft": "25px",
    "paddingTop": 12,
    "paddingLeft": "32px",
    "paddingRight": "16px",
    "overflow": "hidden"
  },
  ul: {
    paddingLeft: 0,
    listStyleType: 'none'
  }
}

class StepLogs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      number: 5,
      expanded: false
    }
  }

  handleMoreLogsClick = () => {
    this.setState({ number: this.props.logs.length, expanded: true });
  }

  render() {
    return (<div style={Object.assign({}, styles.step, { "borderLeft": this.props.isLastItem ? undefined : "3px solid #4EC283" })}>
      <ul style={styles.ul}>
        {this.props.logs.slice(0, this.state.number).map(log => <StepLog log={log} key={ log.Id } isLastItem={ this.props.isLastItem } />)}
      </ul>
      <a onClick={this.handleMoreLogsClick} role="button">
        {this.props.logs.length > 5 && !this.state.expanded ? `See More (${this.props.logs.length - 5})` : ''}
      </a>
    </div>)
  }
}

StepLogs.propTypes = {
  isLastItem: PropTypes.bool,
  logs: PropTypes.array,
}

export default StepLogs;
