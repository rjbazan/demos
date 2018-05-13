import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import InvoiceMonitor from '../InvoiceMonitor';
import theme from '../../../sovos-theme';

const muiTheme = getMuiTheme(theme);

function setup(props) {
  const enzymeWrapper = shallow(<InvoiceMonitor {...props} />, {
    context: { muiTheme }
  });

  return {
    props,
    enzymeWrapper
  }
}


describe('components', () => {
  describe('InvoiceMonitor', () => {
    it('should render self and subcomponents', () => {
      const props = {
        invoices: [],
        filterForm: {},
        countryCode: 'HU',
        invoiceNumber: 'invoice-1',
        erpDocument: 'erp-1',
        companyCode: 'ASD',
        columns: [],
        allColumns: [],
        getInvoices: jest.fn(),
        getSpecificInvoice: jest.fn(),
        totalItems: 100,
        pageSize: 10,
        pageIndex: 1,
        selectedMonth: 1,
        selectedYear: 2019,
        isLoading: false,
        typeFilters: [],
        quickFilters: [],
        selectedDropdownFilter: 'string',
        selectedQuickFilter: 'string',
        initialValues: {},
        companies: [],
        actions: [],
        executeBulkAction: jest.fn(),
        updateColumns: jest.fn()
      }
      const { enzymeWrapper } = setup(props);

      expect(enzymeWrapper.find('InvoiceMonitorList').length).toBe(1);

    });

  })
});
