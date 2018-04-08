import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import DownArrow from 'material-ui/svg-icons/navigation/expand-more';
import UpArrow from 'material-ui/svg-icons/navigation/expand-less';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';

const styles = {
  container: {
    "flex": "0 0 auto"
  },
  container2: {
    "flex": "0 0 auto",
    "marginTop": "-22px"
  },
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
  step: {
    "marginTop": "-22px",
    "marginLeft": "25px",
    "paddingTop": 12,
    "paddingLeft": "32px",
    "paddingRight": "16px",
    "overflow": "hidden"
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

class Step extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showFullLogs: false,
      hoverIndex: -1
    }
  }

  handleDropdownClick = (e) => {
    this.setState({ showFullLogs: !this.state.showFullLogs });
  }

  handleExitClick = (e) => {

  }

  onMouseEnter = () => {
    this.setState({ hoverIndex: this.props.index });
  }

  onMouseLeave = () => {
    this.setState({ hoverIndex: -1 });
  }

  render() {
    const icon = this.state.showFullLogs ? <UpArrow style={{ height: 14, width: 14 }} /> : <DownArrow style={{ height: 14, width: 14 }} />;
    return (
      <div
        style={Object.assign({}, styles.container2, { "backgroundColor": this.props.index === this.state.hoverIndex ? 'rgba(0,0,0, 0.1)' : undefined })}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <span style={styles.header}>
          <span style={styles.circle}>
            <svg viewBox="0 0 24 24" style={styles.circleSvg}>
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
          </span>
          {this.props.step.Name}
          <IconButton
            iconStyle={styles.arrow}
            style={styles.logsDropdown}
            onClick={this.handleDropdownClick}
          >
            <span>{this.props.step.Logs.length}{icon}</span>
          </IconButton>

          <IconButton

            style={styles.logsDropdown}
            onClick={this.handleExitClick}
          >
            <ExitIcon />
          </IconButton>


        </span>
        <div style={Object.assign({}, styles.step, { "borderLeft": this.props.isLastItem ? undefined : "3px solid #4EC283" })}>
          {this.state.showFullLogs ? this.props.step.Logs.map(x => <div>{x}</div>) : this.props.step.Logs[0]}
        </div>
      </div>
    )
  }
}

Step.propTypes = {
  step: PropTypes.object
}

export default Step;
