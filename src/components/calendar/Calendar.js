import PropTypes from 'prop-types';
import React from 'react';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import muiThemeable from 'material-ui/styles/muiThemeable';
import SovosIconButton from 's1-ui/sovos-icon-button/index';
import MonthPicker from './MonthPicker';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: props.selectedMonth,
      year: props.selectedYear
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.yearDecrement = this.yearDecrement.bind(this);
    this.yearIncrement = this.yearIncrement.bind(this);
    this.handleDatePickerMonthChange = this.handleDatePickerMonthChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedMonth !== this.state.month || nextProps.selectedYear !== this.state.year) {
      this.setState({
        month: nextProps.selectedMonth,
        year: nextProps.selectedYear
      });
    }
  }

  increment() {
    const newMonth = this.state.month !== 12 ? this.state.month + 1 : 1;
    const newYear = newMonth === 1 ? this.state.year + 1 : this.state.year;
    this.setState({
      month: newMonth,
      year: newYear
    });
    this.props.onPeriodChange(newYear, newMonth);
  }

  decrement() {
    const newMonth = this.state.month !== 1 ? this.state.month - 1 : 12;
    const newYear = newMonth === 12 ? this.state.year - 1 : this.state.year;
    this.setState({
      month: newMonth,
      year: newYear
    });
    this.props.onPeriodChange(newYear, newMonth);
  }

  yearDecrement() {
    const newYear = this.state.year - 1;
    this.setState({
      year: newYear
    });
    this.props.onPeriodChange(newYear, this.state.month);
  }

  yearIncrement() {
    const newYear = this.state.year + 1;
    this.setState({
      year: newYear
    });
    this.props.onPeriodChange(newYear, this.state.month);
  }

  handleDatePickerMonthChange(year, month) {
    this.setState({
      month: month + 1,
      year
    });
    this.props.onPeriodChange(year, month + 1);
  }

  render() {
    const labelForMonthMode = this.state.year === this.state.todayYear ? this.props.months[this.state.month - 1] : `${this.state.year} - ${this.props.months[this.state.month - 1]}`;
    const labelForYearMode = this.state.year;

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MonthPicker
          onChange={this.handleDatePickerMonthChange}
          month={this.props.months[this.state.month - 1]}
          year={this.state.year}
          defaultLabel={this.props.isYearPicker ? labelForYearMode : labelForMonthMode}
          months={this.props.months}
          years={this.props.years}
          isYearPicker={this.props.isYearPicker}
        />

        <SovosIconButton onClick={this.props.isYearPicker ? this.yearDecrement : this.decrement} id="calendar-left">
          <ArrowLeft color={this.props.muiTheme.palette.secondaryColor} />
        </SovosIconButton>
        <SovosIconButton onClick={this.props.isYearPicker ? this.yearIncrement : this.increment} id="calendar-right">
          <ArrowRight color={this.props.muiTheme.palette.secondaryColor} />
        </SovosIconButton>
      </div>
    );
  }
}

Calendar.propTypes = {
  onPeriodChange: PropTypes.func.isRequired,
  selectedMonth: PropTypes.number,
  selectedYear: PropTypes.number,
  muiTheme: PropTypes.object,
  months: PropTypes.array,
  years: PropTypes.array,
  isYearPicker: PropTypes.bool
};

Calendar.defaultProps = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  years: [2018, 2017, 2016, 2015, 2014],
  isYearPicker: false,
  selectedMonth: new Date().getMonth(),
  selectedYear: new Date().getFullYear()
};

export default muiThemeable()(Calendar);
