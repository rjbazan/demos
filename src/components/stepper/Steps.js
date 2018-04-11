import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Step from './Step';
import StepHeader from './StepHeader';

const header = {
  "padding": "10px",
  "fontSize": "18px",
  "borderBottom": "1px solid #F5F5F5"
}
const styles = {
  "display": "flex",
  "flexDirection": "column",
  "placeContent": "center space-between",
  "alignItems": "stretch"
}

const wrapper = {
  "maxWidth": "380px",

  "margin": "auto",
  fontSize: 12,
  textAlign: 'left'
}

const fillerDiv = {
  "flex": "1 1 auto",
  "marginLeft": "25px"
}

const fillerSpan = {
  "display": "block",
  "borderColor": "#4EC283",
  "minHeight": "28px"
}

class Steps extends PureComponent {

  getStatusColor = (status) => {

  }

  render() {
    return (<Paper style={wrapper}>
      <div style={header}>Status</div>
      <div style={styles}>
        {this.props.categories.map((cat, catIndex) =>
          <Fragment key={cat}>
            <StepHeader category={cat} />
            {this.props.steps.filter(s => s.Category === cat).map((step, stepIndex) =>
              <Fragment key={step.Id}>
                <Step
                  step={step}
                  index={stepIndex}
                  isLastItem={catIndex === this.props.categories.length - 1 && stepIndex === this.props.steps.filter(s => s.Category === cat).length - 1}
                  handleStepClick={this.props.handleStepClick}
                  statusColor={this.getStatusColor()}
                />
                <div style={Object.assign({}, fillerDiv, { "borderLeft": catIndex === this.props.categories.length - 1 && stepIndex === this.props.steps.filter(s => s.Category === cat).length - 1 ? undefined : "3px solid #4EC283" })}>
                  <span style={fillerSpan} />
                </div>
              </Fragment>)}
          </Fragment>
        )}
      </div>
    </Paper>)
  }
}

Steps.propTypes = {
  steps: PropTypes.array,
  handleStepClick: PropTypes.func
}

export default Steps;
