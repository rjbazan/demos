import PropTypes from 'prop-types';
import React from 'react';
import { translate } from 'react-i18next';
import { Card, CardText } from 's1-ui';
import AlertError from 'material-ui/svg-icons/alert/error';
import CommentsWidget from '../filingDetails/CommentsWidget';
import InvoiceOverviewCard from './InvoiceOverviewCard';
import { redMedium, white } from '../../layouts/sovos-colors';
import Stepper from '../shared/stepper/Steps';
import { ColumnsObject, CommentsArray } from './Proptypes';

const OverviewTab = ({
  middleColumns,
  tableColumns,
  invoiceNumber,
  countryCode,
  invoice,
  transactionId,
  comments,
  audits,
  steps,
  categories,
  dateFormat,
  fileError,
  addComentHandler,
  addFileHandler,
  documents,
  isSelf,
  error,
  t
}) => (<div style={ { display: 'flex', padding: '16px 16px 16px 6px', flexWrap: 'wrap' } }>
  <div className="col-sm-12 col-md-8">
    <InvoiceOverviewCard
      columns={ middleColumns }
      tableColumns={ tableColumns }
      invoiceNumber={ invoiceNumber }
      countryCode={ countryCode }
      invoice={ invoice }
    />
    <CommentsWidget
      filingId={ transactionId }
      comments={ comments }
      audits={ audits }
      addComentHandler={ addComentHandler }
      addFileHandler={ addFileHandler }
      documents={ documents }
      dateFormat={ dateFormat }
      fileError={ fileError }
      isSelf={ isSelf }
      t={ t }
    />

  </div>

  <div className="col-sm-12 col-md-4">
    {
      error && <Card style={ { backgroundColor: redMedium, color: white, textAlign: 'center', marginBottom: 20 } }>
        <CardText color="#ffffff">
          <AlertError color="#ffffff" style={ { width: '50px', height: '50px', marginBottom: '30px' } } />
          <div>We were unable to transmit: {error}</div>
        </CardText>
      </Card>
    }
    <Stepper
      steps={ steps }
      handleStepClick={ (step, index) => console.log(step, index) }
      categories={ categories }
    />
  </div>
</div>);

OverviewTab.propTypes = {
  transactionId: PropTypes.string,
  comments: CommentsArray,
  audits: PropTypes.array,
  dateFormat: PropTypes.string,
  fileError: PropTypes.bool,
  addComentHandler: PropTypes.func.isRequired,
  addFileHandler: PropTypes.func.isRequired,
  documents: PropTypes.arrayOf(PropTypes.object),
  isSelf: PropTypes.bool,
  t: PropTypes.func,
  error: PropTypes.string,
  invoiceNumber: PropTypes.string,
  countryCode: PropTypes.string,
  middleColumns: PropTypes.arrayOf(ColumnsObject),
  invoice: PropTypes.array,
  tableColumns: PropTypes.array,
  steps: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.string)
};

export default translate('filingDetails')(OverviewTab);
