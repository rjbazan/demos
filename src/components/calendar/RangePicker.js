import PropTypes from 'prop-types';
import React from 'react';
import { FlatButton, Menu } from 's1-ui';
import Popover from 'material-ui/Popover';
import muiThemeable from 'material-ui/styles/muiThemeable';
import CalendarButton from './CalendarButton';

class RangePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      defaultLabel: props.defaultLabel,
      start: null,
      end: null,
    };

    this.handleSelectMonth = this.handleSelectMonth.bind(this);
  }

  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleSelectMonth(row, col) {
    const month = col;
    const year = this.props.years[row];
    const date = new Date(year, month, 1);

    if (this.state.start && this.state.end) {
      this.setState({ start: null, end: null });
    } else if (this.state.start) {
      let minDate;
      let maxDate;

      if (this.state.start <= date) {
        minDate = this.state.start;
        maxDate = date;
      } else {
        minDate = date;
        maxDate = this.state.start;
      }
      if (this.props.input) {
        this.props.input.onChange({ StartDate: minDate, EndDate: maxDate });
      }

      if (this.props.onChange) {
        this.props.onChange({ StartDate: minDate, EndDate: maxDate });
      }

      this.setState({ end: maxDate, start: minDate });
    } else {
      this.setState({ start: date });
    }
  }

  handleYearSelect(row) {
    const year = this.props.years[row];
    if (this.props.input) {
      this.props.input.onChange(year);
    }

    if (this.props.onChange) {
      this.props.onChange(year);
    }
    this.setState({
      start: new Date(year, 0, 1),
      end: new Date(year, this.props.months.length - 1, 1)
    });
  }

  renderMonthBtns = (month, col, year, row) => {
    const {start, end} = this.state;
    const rangeExists = end && start;
    const btnDate = new Date(year, col, 1);
    const btnDateString = btnDate.toDateString();
    const isSingleDate = start && start.toDateString() === btnDateString;
    return (
      <CalendarButton
        date={month[0]}
        id={btnDateString}
        selected={((start <= btnDate && end >= btnDate)) || isSingleDate}
        onClick={() => this.handleSelectMonth(row, col)}
        key={btnDateString}
        range
        min={ rangeExists && start.toDateString() === btnDateString}
        max={rangeExists && end.toDateString() === btnDateString}
        center={rangeExists && (start <= btnDate && end >= btnDate)}
      />);
  }

  renderSelectedPeriod = () => {
    let string;
    if (this.state.start && this.state.end) {
      const options = { year: 'numeric', month: 'long' };
      string = `${this.state.start.toLocaleDateString('pt-br', options)} - ${this.state.end.toLocaleDateString('en-US', options)}`
    }

    return string;
  }
  

  render() {
    const styles = {
      row: {
        display: 'flex',
        flexDirection: 'column',
        padding: '15px'
      },
      week: {
        display: 'flex',
        flexDirection: 'row',
        //justifyContent: 'space-around',
        height: 34,
        marginBottom: 2,
      }

    };

    const { months, years, isYearPicker } = this.props;

    return (
      <div>
        <FlatButton
          onClick={this.handleClick}
          style={{ height: 50, backgroundColor: 'white', width: '100%' }}
          id="calendar"
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: this.props.muiTheme.palette.secondaryColor }}>
              {this.renderSelectedPeriod()}
            </div>
          </div>
        </FlatButton>

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
          id="calendar-popover"
        >
          <Menu>
            <div style={styles.row}>
              {years.map((year, row) => <div key={row} style={styles.week}>
                <CalendarButton
                  date={year}
                  onClick={() => this.handleYearSelect(row)}
                />
                {months.map((month, col) => this.renderMonthBtns(month, col, year, row))}
              </div>)}
            </div>
            {/* <div>
              <FlatButton label="View all" labelStyle={ { textTransform: 'none', fontSize: 13 } } onClick={ () => { } } secondary />
            </div> */}
          </Menu>
        </Popover>

      </div>
    );
  }
}

RangePicker.propTypes = {
  month: PropTypes.string,
  year: PropTypes.number,
  defaultLabel: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
  muiTheme: PropTypes.object,
  input: PropTypes.object,
  onChange: PropTypes.func,
  months: PropTypes.array,
  years: PropTypes.array,
  isYearPicker: PropTypes.bool,
  locale: PropTypes.string
};

RangePicker.defaultProps = {
  locale: 'en-US'
};
export default muiThemeable()(RangePicker);
