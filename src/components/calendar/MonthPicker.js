import PropTypes from 'prop-types';
import React from 'react';
import { FlatButton, Menu } from 's1-ui';
import Popover from 'material-ui/Popover';
import muiThemeable from 'material-ui/styles/muiThemeable';
import CalendarButton from './CalendarButton';

class MonthPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      defaultLabel: props.defaultLabel
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
    if (this.props.input) {
      this.props.input.onChange(month);
    }

    if (this.props.onChange) {
      this.props.onChange(year, month);
    }
    this.setState({
      open: false,
      selectedMonths: [{ month: col, year: row }],
      defaultLabel: `${year} - ${this.props.months[col]}`
    });
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
      open: false,
      selectedMonths: [{ year: row }],
      defaultLabel: `${year}`
    });
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
        justifyContent: 'space-around',
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
            <div style={{ color: this.props.muiTheme.palette.secondaryColor, width: isYearPicker ? 'auto' : 150 }}>{this.props.defaultLabel}</div>
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
                  onClick={isYearPicker ? () => this.handleYearSelect(row) : undefined}
                  selected={year === this.props.year && isYearPicker}
                />
                {!isYearPicker && months.map((month, col) =>
                  <CalendarButton
                    date={month[0]}
                    selected={this.props.month === month && year === this.props.year}
                    onClick={() => this.handleSelectMonth(row, col)}
                    key={ col }
                  />
                )}
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

MonthPicker.propTypes = {
  month: PropTypes.string,
  year: PropTypes.number,
  defaultLabel: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
  muiTheme: PropTypes.object,
  input: PropTypes.object,
  onChange: PropTypes.func,
  months: PropTypes.array,
  years: PropTypes.array,
  isYearPicker: PropTypes.bool
};

export default muiThemeable()(MonthPicker);
