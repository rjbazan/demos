import PropTypes from 'prop-types';
import React from 'react';
import {
  MenuItem,
  SovosToolbar,
  SovosToolbarActions,
  SovosToolbarFilter,
  SovosToolbarColumn,
  SovosToolbarSearch,
  SovosToolbarBulkActions,
  SovosToolbarDropdown,
  SovosToolbarToggle,
  SovosToolbarToggles,
  SovosTableCard,
  SovosTable,
  SovosSnackbar
} from 's1-ui';

import ImageLens from 'material-ui/svg-icons/image/lens';
import SovosToolbarSpace from 's1-ui/sovos-toolbar/components/SovosToolbarSpace';
import { Link } from 'react-router';
import { CircularProgress } from 'material-ui';
import Calendar from '../calendar/Calendar';


const linkStyles = {
  display: 'block',
  padding: '2em',
  margin: '-2em',
  cursor: 'pointer'
};

class InvoiceMonitorList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  handleExecuteBulkAction(code, countryCode, selectedRows) {
    this.props.executeBulkAction(code, countryCode, selectedRows);
    this.setState({ open: true });
  }

  render() {
    const { invoices, startItem, endItem, totalItems, itemsPerPage, onNextClicked, onPrevClicked,
      onPerPageChanged, onCellClick, handleRowSelection, handleSearch, selectedRows, selectedMonth, toggleDrawer,
      selectedYear, calendarPeriodHandler, isLoading, handleFilterDropdownChange,
      handleQuickFilters, columns, typeFilters, selectedDropdownFilter, quickFilters, countryCode, searchDefaultValue, actions } = this.props;

    const getColumnWidth = (col) => {
      if (col.IsGreedyColumn) return 'greedy';
      return col.Name === '' ? '20px' : undefined;
    };

    const mappedColumns = columns.map(col => ({
      title: col.Name,
      id: col.Name,
      width: getColumnWidth(col),
      component: ({ content }) =>
        <Link
          to={ `/invoiceDetails/${countryCode}&${content['[Transaction].InvoiceNumber']}&${content.RESERVED_ErpDocument}&${content.RESERVED_CompanyCode}` }
          className="link"
          style={ linkStyles }
        >
          <div>{content[col.ObjectPath]}</div>
        </Link>
    }));


    const getColor = (status) => {
      if (status === 'Rejected') { return 'red'; }
      if (status === 'Approved') { return 'green'; }

      return yellowMedium;
    };

    const mappedInvoices = invoices.map((a) => {
      const x = {};
      for (let i = 0; i < a.length; i++) {
        if (a[i].Key === 'TransmitalInvoiceState.State') {
          x[a[i].Key] = <ImageLens style={ { width: '15px', height: '15px', verticalAlign: 'middle', color: getColor(a[i].Value) } } />;
        } else {
          x[a[i].Key] = a[i].Value;
        }
      }
      return x;
    });
    let table;

    if (isLoading) {
      table = <CircularProgress />;
    } else {
      table = (<SovosTable
        columns={ mappedColumns }
        data={ mappedInvoices }
        onRowSelection={ handleRowSelection }
        selectable
        handleRowClick={ onCellClick }
      />);

    }

    const actionButtons = actions.map(action => <MenuItem
      style={ { color: 'white' } }
      key={ action.Code }
      value={ action.Code }
      primaryText={ action.Label }
      onClick={ () => this.handleExecuteBulkAction(action.Code, countryCode, selectedRows) }
    />);

    return (
      <div>
        <SovosTableCard>
          <SovosToolbar>
            <SovosToolbarBulkActions count={ selectedRows.length }>
              {actionButtons}
            </SovosToolbarBulkActions>


            <Calendar
              onPeriodChange={ calendarPeriodHandler }
              selectedMonth={ selectedMonth }
              selectedYear={ selectedYear }
            />

            <SovosToolbarDropdown
              value={ selectedDropdownFilter }
              onChange={ handleFilterDropdownChange }
            >
              {typeFilters.map(x => <MenuItem value={ x } key={ x } primaryText={ x } />)}
            </SovosToolbarDropdown>

            <SovosToolbarToggles>
              {quickFilters.map(x => <SovosToolbarToggle key={ x.Key } selected={ x.Selected } onClick={ () => handleQuickFilters(x.Key) } title={ x.Key }>{x.Value}</SovosToolbarToggle>)}
            </SovosToolbarToggles>
            <SovosToolbarSpace>&nbsp;</SovosToolbarSpace>
            <SovosToolbarActions>
              <SovosToolbarSearch onSearch={ handleSearch } defaultValue={ searchDefaultValue } id="invoices-search" />
              <SovosToolbarColumn onClick={ () => { toggleDrawer('column'); } } />
              <SovosToolbarFilter onClick={ toggleDrawer } />
            </SovosToolbarActions>
          </SovosToolbar>
          {table}

        </SovosTableCard>
        <SovosSnackbar
          message="Processing your request - this could take a few minutes."
          snackBarType="confirmation"
          open={ this.state.open }
          closeSovosSnackbar={ () => this.setState({ open: false }) }
        />
      </div>
    );
  }
}

InvoiceMonitorList.propTypes = {
  invoices: PropTypes.arrayOf(PropTypes.array),
  columns: PropTypes.array,
  startItem: PropTypes.number.isRequired,
  endItem: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onNextClicked: PropTypes.func.isRequired,
  onPrevClicked: PropTypes.func.isRequired,
  onPerPageChanged: PropTypes.func.isRequired,
  onCellClick: PropTypes.func,
  handleRowSelection: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.object),
  selectedMonth: PropTypes.number.isRequired,
  selectedYear: PropTypes.number.isRequired,
  calendarPeriodHandler: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func,
  handleFilterDropdownChange: PropTypes.func,
  handleQuickFilters: PropTypes.func,
  typeFilters: PropTypes.array,
  selectedDropdownFilter: PropTypes.string,
  quickFilters: PropTypes.array,
  countryCode: PropTypes.string,
  searchDefaultValue: PropTypes.string,
  actions: PropTypes.array,
  executeBulkAction: PropTypes.func
};

export default InvoiceMonitorList;
