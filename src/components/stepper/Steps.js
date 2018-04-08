import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Step from './Step';

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

const groupHeader = {
  "flex": "1 1 auto",
  "marginLeft": "25px",
  "borderLeft": "3px solid #4EC283",

  paddingLeft: 32,
  paddingBottom: 21,
  color: '#699DC2'
}
class Steps extends PureComponent {

  render() {
    return (<Paper style={wrapper}>
    <div style={header}>Status</div>
      <div style={styles}>
        <div style={groupHeader}>
          <span style={fillerSpan}></span>
          <span>COMPLIANCE</span>
        </div>
        {this.props.steps.map((step, i) =>
          <Fragment key={step.Id}>
            <Step
              step={step}
              index={i}
              isLastItem={i === this.props.steps.length - 1}
            />
            <div style={Object.assign({}, fillerDiv, {"borderLeft": i === this.props.steps.length - 1 ? undefined : "3px solid #4EC283"})}>
              <span style={fillerSpan} />
            </div>
          </Fragment>)}
      </div>
    </Paper>)
  }
}

Steps.propTypes = {
  steps: PropTypes.array
}

export default Steps;
