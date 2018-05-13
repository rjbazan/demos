import PropTypes from 'prop-types';
import React from 'react';
import { SovosRaisedButton } from 's1-ui';
import { debounce } from 'lodash';
import InvoiceMonitorTable from './InvoiceMonitorTable';

class InvoiceMonitor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedInvoices: [],
      currentPage: 1,
      showDeleteModal: false,
      isFilterDrawerOpen: false,
      isColumnDrawerOpen: false
    };
    this.nextClickHandler = this.nextClickHandler.bind(this);
    this.perPageChangeHandler = this.perPageChangeHandler.bind(this);
    this.previousClickHandler = this.previousClickHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleColumnsSubmit = this.handleColumnsSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.calendarPeriodHandler = this.calendarPeriodHandler.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleQuickFilters = this.handleQuickFilters.bind(this);
    this.handleFilterDropdownChange = this.handleFilterDropdownChange.bind(this);
    this.debouncePagination = null;
  }

  componentDidMount() {
    if (this.props.invoiceNumber) {
      const params = {};
      params.CountryCode = this.props.countryCode;
      params.InvoiceNumber = this.props.invoiceNumber;
      params.ErpDocument = this.props.erpDocument;
      params.CompanyCode = this.props.companyCode;
      params.PageSize = 30;
      params.PageIndex = 1;

      this.props.getSpecificInvoice(params);
    } else {
      this.props.getInvoices(this.props.countryCode, 30, 1, this.props.selectedMonth, this.props.selectedYear, {}, 'All types', this.props.selectedQuickFilter);
    }
  }

  toggleDrawer(type) {
    if (type === 'column') {
      this.setState({ isColumnDrawerOpen: !this.state.isColumnDrawerOpen });
    } else {
      this.setState({ isFilterDrawerOpen: !this.state.isFilterDrawerOpen });
    }
  }

  nextClickHandler() {
    const next = this.props.pageIndex + 1;
    if ((((next - 1) * this.props.pageSize) + 1) > this.props.totalItems) return;
    this.setState({ currentPage: next });
    this.props.getInvoices(this.props.countryCode, this.props.pageSize, next, this.props.selectedMonth, this.props.selectedYear, this.props.filterForm, this.props.selectedDropdownFilter, this.props.selectedQuickFilter);
  }

  previousClickHandler() {
    if (this.props.pageIndex > 1) {
      const prev = this.props.pageIndex - 1;
      this.setState({ currentPage: prev });
      this.props.getInvoices(this.props.countryCode, this.props.pageSize, prev, this.props.selectedMonth, this.props.selectedYear, this.props.filterForm, this.props.selectedDropdownFilter, this.props.selectedQuickFilter);
    }
  }

  perPageChangeHandler(e, i, v) {
    this.setState({ currentPage: 1 });
    this.props.getInvoices(this.props.countryCode, v, 1, this.props.selectedMonth, this.props.selectedYear, this.props.filterForm, this.props.selectedDropdownFilter, this.props.selectedQuickFilter);
  }

  handleSubmit(form) {
    this.props.getInvoices(this.props.countryCode, this.props.pageSize, 1, this.props.selectedMonth, this.props.selectedYear, form, this.props.selectedDropdownFilter, this.props.selectedQuickFilter);
    this.setState({ isFilterDrawerOpen: false });
  }

  handleColumnsSubmit(form, columns) {
    this.props.updateColumns(form, columns);
    this.setState({ isColumnDrawerOpen: false });
  }

  handleReset() {
    this.props.getInvoices(this.props.countryCode, this.props.pageSize, 1, this.props.selectedMonth, this.props.selectedYear, {}, this.props.selectedDropdownFilter, this.props.selectedQuickFilter);
    this.setState({ isFilterDrawerOpen: false });
  }

  handleRowSelection(selectedRows) {
    const selectedInvoices = selectedRows.map(row => ({
      InvoiceNumber: this.props.invoices[row].filter(x => x.Key === '[Transaction].InvoiceNumber')[0].Value,
      CompanyCode: this.props.invoices[row].filter(x => x.Key === 'RESERVED_CompanyCode')[0].Value,
      ERPDocument: this.props.invoices[row].filter(x => x.Key === 'RESERVED_ErpDocument')[0].Value,
    }));
    this.setState({ selectedInvoices });
  }

  handleSearch(text) {
    const params = Object.assign({}, this.props.filterForm, { GenericPattern: text });
    this.props.getInvoices(this.props.countryCode, this.props.pageSize, this.props.pageIndex, this.props.selectedMonth, this.props.selectedYear, params, this.props.selectedDropdownFilter, this.props.selectedQuickFilter);
  }

  calendarPeriodHandler(selectedYear, selectedMonth) {
    if (this.debouncePagination) {
      this.debouncePagination.cancel();
    }
    this.debouncePagination = debounce(function () {
      this.props.getInvoices(this.props.countryCode, this.props.pageSize, this.props.pageIndex, selectedMonth, selectedYear, this.props.filterForm, this.props.selectedDropdownFilter, this.props.selectedQuickFilter);
      this.debouncePagination = null;
    }, 1000);
    this.debouncePagination();
  }

  handleFilterDropdownChange(e, i, value) {
    this.props.getInvoices(this.props.countryCode, this.props.pageSize, this.props.pageIndex, this.props.selectedMonth, this.props.selectedYear, this.props.filterForm, value, this.props.selectedQuickFilter);
  }

  handleQuickFilters(value) {
    const realValue = value === this.props.selectedQuickFilter ? null : value;
    this.props.getInvoices(this.props.countryCode, this.props.pageSize, this.props.pageIndex, this.props.selectedMonth, this.props.selectedYear, this.props.filterForm, this.props.selectedDropdownFilter, realValue);
  }

  render() {
    const styles = {
      mainContainer: {
        backgroundColor: '#ebeef0',
        padding: '10px 20px'
      }
    };

    const config = [
      { type: 'autocomplete', name: 'companies', fieldName: 'Company', filterTitle: 'Companies', hintText: 'Company', openOnFocus: true, dataSource: this.props.companies, dataSourceConfig: { text: 'Value', value: 'Key' } }];


    return (
      <div>

        <div style={ styles.mainContainer }>
          <InvoiceMonitorTable
            invoices={ this.props.invoices }
            actions={ this.props.actions }
            startItem={ ((this.props.pageIndex - 1) * this.props.pageSize) + 1 }
            endItem={ Math.min(this.props.pageIndex * this.props.pageSize, this.props.totalItems) }
            totalItems={ this.props.totalItems }
            itemsPerPage={ this.props.pageSize }
            onNextClicked={ this.nextClickHandler }
            onPerPageChanged={ this.perPageChangeHandler }
            onPrevClicked={ this.previousClickHandler }
            handleRowSelection={ this.handleRowSelection }
            handleSearch={ this.handleSearch }
            selectedRows={ this.state.selectedInvoices }
            selectedMonth={ this.props.selectedMonth }
            selectedYear={ this.props.selectedYear }
            calendarPeriodHandler={ this.calendarPeriodHandler }
            isLoading={ this.props.isLoading }
            handleMonthChange={ this.handleMonthChange }
            toggleDrawer={ this.toggleDrawer }
            columns={ this.props.columns }
            handleFilterDropdownChange={ this.handleFilterDropdownChange }
            typeFilters={ this.props.typeFilters }
            selectedDropdownFilter={ this.props.selectedDropdownFilter }
            handleQuickFilters={ this.handleQuickFilters }
            quickFilters={ this.props.quickFilters }
            countryCode={ this.props.countryCode }
            searchDefaultValue={ this.props.invoiceNumber }
            executeBulkAction={ this.props.executeBulkAction }
          />
        </div>
      </div>
    );
  }
}

InvoiceMonitor.propTypes = {
  invoices: PropTypes.arrayOf(PropTypes.array),
  filterForm: PropTypes.object,
  countryCode: PropTypes.string.isRequired,
  invoiceNumber: PropTypes.string,
  erpDocument: PropTypes.string,
  companyCode: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape({
    IsGreedyColumn: PropTypes.bool,
    IsVisible: PropTypes.bool,
    MetaData1: PropTypes.string,
    MetaData2: PropTypes.string,
    Name: PropTypes.string,
    ObjectPath: PropTypes.string
  })),
  allColumns: PropTypes.array,
  getInvoices: PropTypes.func.isRequired,
  getSpecificInvoice: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageIndex: PropTypes.number.isRequired,
  selectedMonth: PropTypes.number.isRequired,
  selectedYear: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  typeFilters: PropTypes.array,
  quickFilters: PropTypes.array,
  selectedDropdownFilter: PropTypes.string,
  selectedQuickFilter: PropTypes.string,
  initialValues: PropTypes.objectOf(PropTypes.bool),
  companies: PropTypes.array,
  actions: PropTypes.array,
  executeBulkAction: PropTypes.func,
  updateColumns: PropTypes.func
};


export default InvoiceMonitor;
