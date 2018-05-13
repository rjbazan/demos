import PropTypes from 'prop-types';
import React from 'react';
import { Paper } from 's1-ui';

import { grayMedium } from '../../layouts/sovos-colors';
import { ColumnsObject, InvoiceArray } from './Proptypes';

const styles = {
  invoiceInfo: { display: 'flex', padding: '30px', borderBottom: `1px solid ${grayMedium}` },
  middleColumn: {
    marginRight: 20,
    primary: {
      fontSize: '1.1rem'
    },
    width: '30%',
    label: {
      color: grayMedium,
      marginBottom: 10
    }
  },
  list: {
    padding: 30,
    listStyleType: 'none',
    margin: 0,
    maxWidth: 700
  },
  listItem: { height: 50, display: 'flex', alignItems: 'center' },
};

class InvoiceOverviewCard extends React.Component { // eslint-disable-line

  render() {
    return (
      <Paper>
        <div style={ styles.invoiceInfo }>
          {this.props.columns.map((col, index) => <div key={ index } style={ styles.middleColumn }>
            <div style={ styles.middleColumn.label }>{col.Name}</div>
            <div style={ styles.middleColumn.primary }>{this.props.invoice.length > 0 ? this.props.invoice.find(x => x.Key === col.ObjectPath).Value : null}</div>
            { col.MetaData1 ? <div>{this.props.invoice.length > 0 ? this.props.invoice.find(x => x.Key === col.MetaData1.ObjectPath).Value : null}</div> : null }
            { col.MetaData2 ? <div>{this.props.invoice.length > 0 ? this.props.invoice.find(x => x.Key === col.MetaData2.ObjectPath).Value : null}</div> : null }
          </div>)}
        </div>
        <ul style={ styles.list }>
          {this.props.tableColumns.map((tableCol, index) =>
            <li key={ index } style={ Object.assign({}, styles.listItem, { borderTop: index > 0 ? `1px solid ${grayMedium}` : undefined }) }>
              <span style={ { marginRight: 8, width: 100 } }>{tableCol.Name}</span>
              <span style={ { marginLeft: 'auto', color: grayMedium } }>
                {this.props.invoice.length > 0 ? this.props.invoice.find(x => x.Key === tableCol.ObjectPath).Value : null}
              </span>

            </li>)}
        </ul>
      </Paper>
    );
  }
}

InvoiceOverviewCard.propTypes = {
  columns: PropTypes.arrayOf(ColumnsObject),
  tableColumns: PropTypes.arrayOf(ColumnsObject),
  invoice: InvoiceArray,
};

export default InvoiceOverviewCard;
