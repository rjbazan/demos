import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Transition from 'material-ui/styles/transitions';
import EnhancedButton from 'material-ui/internal/EnhancedButton';

function getStyles(props, context, state) {
  const {disabled, selected, range, min, max, center} = props;
  const {hover} = state;
  const {baseTheme, datePicker} = context.muiTheme;

  let labelColor = baseTheme.palette.textColor;
  let buttonStateOpacity = 0;
  let buttonStateTransform = 'scale(0)';
  let borderRadius;

  if (max) {
    borderRadius = '0px 15px 15px 0px';
  } else if (min) {
    borderRadius = '15px 0px 0px 15px';
  } else if (center) {
    borderRadius = undefined;
  } else {
    borderRadius = '50%';
  }

  if (hover || selected) {
    labelColor = datePicker.selectTextColor;
    buttonStateOpacity = selected ? 1 : 0.6;
    buttonStateTransform = 'scale(1)';
  }

  return {
    root: {
      boxSizing: 'border-box',
      fontWeight: '400',
      opacity: disabled && '0.4',
      padding: range ? null : '4px 0px',
      position: 'relative',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      width: 42,
      fontSize: 13
    },
    label: {
      color: labelColor,
      fontWeight: '400',
      position: 'relative',
    },
    buttonState: {
      backgroundColor: baseTheme.palette.secondaryColor,
      borderRadius,
      height: 34,
      left: range ? 0 : 4,
      opacity: buttonStateOpacity,
      position: 'absolute',
      top: 0,
      transform: buttonStateTransform,
      transition: Transition.easeOut(),
      width: range ? '100%' : 34,
    },
  };
}

class CalendarButton extends Component {
  static propTypes = {
    DateTimeFormat: PropTypes.func,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    locale: PropTypes.string,
    onClick: PropTypes.func,
    onKeyboardFocus: PropTypes.func,
    selected: PropTypes.bool,
  };

  static defaultProps = {
    selected: false,
    disabled: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    hover: false,
  };

  handleMouseEnter = () => {
    if (!this.props.disabled) {
      this.setState({hover: true});
    }
  };

  handleMouseLeave = () => {
    if (!this.props.disabled) {
      this.setState({hover: false});
    }
  };

  handleClick = (event) => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick(event, this.props.date);
    }
  };

  handleKeyboardFocus = (event, keyboardFocused) => {
    if (!this.props.disabled && this.props.onKeyboardFocus) {
      this.props.onKeyboardFocus(event, keyboardFocused, this.props.date);
    }
  };

  render() {
    const {
      DateTimeFormat,
      date,
      disabled,
      locale,
      onClick, // eslint-disable-line no-unused-vars
      selected, // eslint-disable-line no-unused-vars
      range, // eslint-disable-line no-unused-vars
      center, // eslint-disable-line no-unused-vars
      max, // eslint-disable-line no-unused-vars
      min, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);

    return date ? (
      <EnhancedButton
        {...other}
        disabled={disabled}
        disableFocusRipple={true}
        disableTouchRipple={true}
        onKeyboardFocus={this.handleKeyboardFocus}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
        style={styles.root}
      >
        <div style={prepareStyles(styles.buttonState)} />
        <span style={prepareStyles(styles.label)}>
          {date}
        </span>
      </EnhancedButton>
    ) : (
      <span style={prepareStyles(styles.root)} />
    );
  }
}

export default CalendarButton;
