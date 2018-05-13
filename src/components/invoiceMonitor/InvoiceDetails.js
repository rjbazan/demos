import PropTypes from 'prop-types';
import React from 'react';
import { Tabs, Tab, IconMenu, IconButton, MenuItem, SovosRaisedButton } from 's1-ui';
import MoreIcon from 'material-ui/svg-icons/navigation/more-vert';
import NewPageHeader from '../shared/NewPageHeader';
import Banner from './Banner';
import OverviewTab from './OverviewTab';
import LineDetails from '../transactionLog/details/LineDetails';
import { ColumnsObject, ActionsArray, InvoiceArray, CommentsArray } from './Proptypes';

const styles = {
  tabItem: {
    backgroundColor: 'transparent',
    justifyContent: 'left',
    color: '#1a1a1a',
    fontSize: 16
  },
  button: { backgroundColor: 'transparent', color: 'white' },
  tabsContainer: {
    position: 'relative',
    bottom: 48,
    left: 5
  }
};

class InvoiceDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'a'
    };
  }

  componentDidMount() {
    this.props.getInvoiceDetails(this.props.countryCode, this.props.invoiceNumber, this.props.erpDocument, this.props.companyCode);
  }

  handleTabChange = (selectedTab) => {
    this.setState({ selectedTab });
  }

  addComentHandler = (form) => {
    this.props.saveComment(form.Comment, this.props.invoice.find(r => r.Key === 'RESERVED_Transaction_Id').Value, form.File,
      this.props.countryCode, this.props.invoiceNumber, this.props.erpDocument, this.props.companyCode);
  }

  addFileHandler = (file) => {
    this.props.saveComment(null, this.props.invoice.find(r => r.Key === 'RESERVED_Transaction_Id').Value, file,
      this.props.countryCode, this.props.invoiceNumber, this.props.erpDocument, this.props.companyCode);
  }

  render() {
    const actions = this.props.actions.map(action =>
      <MenuItem key={ action.Code } value={ action.Code } primaryText={ action.Label } />
    );

    const documents = this.props.comments
      ? this.props.comments.filter(c => c.FileName !== null).map(c => ({
        fileUrl: c.FileUrl,
        name: c.FileName,
        dateFormat: c.DateFormat,
        timestamp: c.PostedTimestampToDisplay
      }))
      : null;

    return (
      <div>
        <NewPageHeader
          parentUrl={ `/invoiceMonitor/${this.props.countryCode}` }
          parentTitle={ 'Invoices' }
          title={ `#${this.props.invoiceNumber}` }
        >
          <IconMenu
            menuItemStyle={ null }
            anchorOrigin={ { vertical: 'bottom', horizontal: 'right' } }
            targetOrigin={ { vertical: 'top', horizontal: 'right' } }
            iconButtonElement={ <IconButton><MoreIcon /></IconButton> }
            onChange={ (event, child) => this.props.executeAction(child, this.props.countryCode, this.props.invoiceNumber, this.props.erpDocument, this.props.companyCode) }
          >
            { actions }
          </IconMenu>
          { this.props.xmlUrl && <SovosRaisedButton type="primary" label="XML" href={ this.props.xmlUrl } /> }
        </NewPageHeader>
        <div>
          <Banner
            columns={ this.props.headerColumns }
            invoiceNumber={ this.props.invoiceNumber }
            invoice={ this.props.invoice }
            isLoading={ this.props.invoice === null }
            attempts={ this.props.attempts }
            exeuctingAction={ this.props.executingAction }
          />
          <Tabs
            value={ this.state.selectedTab }
            tabItemContainerStyle={ { width: '30%', backgroundColor: 'transparent', color: 'white' } }
            inkBarStyle={ { backgroundColor: 'white' } }
            onChange={ this.handleTabChange }
            style={ styles.tabsContainer }
          >
            <Tab
              label={ <div style={ { marginBottom: 8 } }> {'Overview'}</div> }
              value="a"
              style={ styles.tabItem }
              buttonStyle={ styles.button }
            >
              <OverviewTab
                middleColumns={ this.props.middleColumns }
                tableColumns={ this.props.tableColumns }
                invoiceNumber={ this.props.invoiceNumber }
                countryCode={ this.props.countryCode }
                invoice={ this.props.invoice }
                comments={ this.props.comments }
                audits={ [] }
                dateFormat={ 'en-US' }
                addComentHandler={ this.addComentHandler }
                addFileHandler={ this.addFileHandler }
                documents={ documents }
                fileError={ false }
                error={ this.props.error }
                categories={ this.props.categories }
                steps={ this.props.steps }
              />
            </Tab>
            <Tab
              label={ 'Line Items' }
              value="b"
              style={ styles.tabItem }
              buttonStyle={ styles.button }
            >
              <div style={ { padding: 20 } }>
                <LineDetails
                  lines={ this.props.lines }
                  dateFormat="en-US"
                />
              </div>
            </Tab>
          </Tabs>
        </div>

      </div>
    );
  }
}

InvoiceDetails.propTypes = {
  getInvoiceDetails: PropTypes.func.isRequired,
  actions: ActionsArray,
  executeAction: PropTypes.func,
  invoiceNumber: PropTypes.string,
  companyCode: PropTypes.string,
  erpDocument: PropTypes.string,
  attempts: PropTypes.number,
  countryCode: PropTypes.string,
  headerColumns: PropTypes.arrayOf(ColumnsObject),
  middleColumns: PropTypes.arrayOf(ColumnsObject),
  invoice: InvoiceArray,
  tableColumns: PropTypes.arrayOf(ColumnsObject),
  lines: PropTypes.array,
  saveComment: PropTypes.func,
  error: PropTypes.string,
  executingAction: PropTypes.bool,
  comments: CommentsArray,
  xmlUrl: PropTypes.string,
  steps: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.array
};

export default InvoiceDetails;
