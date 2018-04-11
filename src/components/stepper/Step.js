import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import StepLabel from './StepLabel';
import StepLogs from './StepLogs';

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
    this.props.handleStepClick(this.props.step, this.props.index);
  }

  onMouseEnter = () => {
    this.setState({ hoverIndex: this.props.index });
  }

  onMouseLeave = () => {
    this.setState({ hoverIndex: -1 });
  }

  render() {
    const logs = this.state.showFullLogs ? this.props.step.Logs : [];
    return (
      <div
        style={Object.assign({}, styles.container2, { "backgroundColor": this.props.index === this.state.hoverIndex ? 'rgba(0,0,0, 0.1)' : undefined })}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <StepLabel
          handleDropdownClick={this.handleDropdownClick}
          handleExitClick={this.handleExitClick}
          logsCount={this.props.step.Logs.length}
          stepName={this.props.step.Name}
          showFullLogs={this.state.showFullLogs}
        />
        <StepLogs
          showFullLogs={this.state.showFullLogs}
          isLastItem={this.props.isLastItem}
          logs={logs}
        />
      </div>
    )
  }
}

Step.propTypes = {
  step: PropTypes.object,
  isLastItem: PropTypes.bool,
  handleStepClick: PropTypes.func
}

export default Step;
