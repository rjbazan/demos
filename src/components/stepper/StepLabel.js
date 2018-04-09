import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import DownArrow from 'material-ui/svg-icons/navigation/expand-more';
import UpArrow from 'material-ui/svg-icons/navigation/expand-less';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';

const styles = {
  header: {
    "height": "64px",
    "color": "rgba(0, 0, 0, 0.87)",
    "display": "flex",
    "alignItems": "center",
    "paddingLeft": "14px",
    "paddingRight": "14px",
    "fontWeight": "500"
  },
  circle: {
    paddingRight: 22
  },
  circleSvg: {
    "display": "block",
    "color": "#4EC283",
    "fill": "#4EC283",
    "height": "24px",
    "width": "24px",
    "transition": "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
    "fontSize": "24px"
  },
  logsDropdown: {
    marginLeft: 5,
    "display": "flex",
    "fontSize": "11px",
    opacity: 0.5
  },
  arrow: {
    display: 'flex',
    alignItems: 'center'
  }
}

class StepLabel extends PureComponent {

  render() {
    const icon = this.props.showFullLogs ? <UpArrow style={{ height: 14, width: 14 }} /> : <DownArrow style={{ height: 14, width: 14 }} />;
    return (
      <span style={styles.header}>
        <span style={styles.circle}>
          <svg viewBox="0 0 24 24" style={styles.circleSvg}>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        </span>
        {this.props.stepName}
        <IconButton
          iconStyle={styles.arrow}
          style={styles.logsDropdown}
          onClick={this.props.handleDropdownClick}
        >
          <span>{this.props.logsCount}{icon}</span>
        </IconButton>

        <IconButton
          style={styles.logsDropdown}
          onClick={this.props.handleExitClick}
        >
          <ExitIcon />
        </IconButton>
      </span>
    )
  }
}

StepLabel.propTypes = {
  handleDropdownClick: PropTypes.func,
  handleExitClick: PropTypes.func,
  logsCount: PropTypes.number,
  stepName: PropTypes.string,
  showFullLogs: PropTypes.bool
}

export default StepLabel;
