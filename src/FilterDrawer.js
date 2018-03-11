import PropTypes from 'prop-types';
import React from 'react';
import { IconButton, Avatar, Popover, FlatButton, Menu, Checkbox } from 'material-ui';
import SlideInTransitionGroup from 'material-ui/internal/SlideIn';
import EButton from 'material-ui/DatePicker/DayButton';

const styles = {
  button: {
    padding: 0,
    height: 20,
    width: 20
  },
  tooltip: {
    top: 25
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    fontWeight: 400,
    height: 228,
    lineHeight: 2,
    position: 'relative',
    textAlign: 'center',
    MozPaddingStart: 0,
    padding: 18
  },
  week: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 34,
    marginBottom: 2,
  }
};

class FilterDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      slide: false,
      initialValues: {
        Col1: true,
        Col2: true,
        Col3: false
      }
    }
  }

  handlePopoveropen = (event) => this.setState({ open: !this.state.open, anchorEl: event.currentTarget, slide: !this.state.slide });

  handleSelectMonth = (row, col) => this.setState({ row, col });

  handleSelectMonth2 = (row, col) => {
    if (this.state.columns.includes(col)) {
      this.setState({ rows: [], columns: [] })
    } else {
      this.setState({ rows: this.state.rows.concat(row).sort(), columns: this.state.columns.concat(col).sort() });
    }
  }

  handleYearMonth = (row) => this.setState({ row });

  render() {
    let enabled = [];
    let disabled = [];

    Object.keys(this.state.initialValues).forEach(x => {
      if (this.state.initialValues[x]) {
        enabled.push(x);
      } else {
        disabled.push(x);
      }

    })
    const styles = {
      wrapper: {
/*         display: 'flex',
        alignItems: 'center', */
        position: 'absolute',
        padding: '0 10px 0 15px',
        right: this.state.slide ? -100 : 0,
        transition: 'right 400ms ease-in-out',
        backgroundColor: 'red'
      },
      container: {
        display: 'flex'
      },
      container2: {
        width: 200,
        backgroundColor: 'red'
      }
    }
    return (
      <div style={styles.container}>

        <div>
          <div>
            <FlatButton
              onClick={this.handlePopoveropen}
              style={{ height: 50 }}
              id="calendar"
              label="Save"
            >
            </FlatButton>

            <FlatButton
              onClick={this.handlePopoveropen}
              style={{ height: 50 }}
              id="calendar"
              label="Cancel"
            >
            </FlatButton>

          </div>
          <div>
            <div>
              {enabled.map(x => <Checkbox labelPosition="left" label={x} checked={this.state.initialValues[x]} />)}
            </div>
            <div>
              {disabled.map(x => <Checkbox labelPosition="left" label={x} checked={this.state.initialValues[x]} />)}
            </div>
          </div>
          <div style={styles.wrapper}>
          <p>Test</p>
          </div>
        </div>

        

      </div>
    );
  }
}

FilterDrawer.propTypes = {
  months: PropTypes.array
};

/* FilterDrawer.defaultProps = {
  isSmall: false,
  name: undefined,
  surname: undefined,
  backgroundColor: grayMedium,
  color: undefined
}; */

export default FilterDrawer;
