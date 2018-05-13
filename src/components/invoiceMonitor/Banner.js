import PropTypes from 'prop-types';
import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import CartIcon from 'material-ui/svg-icons/action/shopping-cart';
import EuroIcon from 'material-ui/svg-icons/action/euro-symbol';
import DateIcon from 'material-ui/svg-icons/action/date-range';
import VatwareCircularProgress from '../shared/VatwareCircularProgress';
import { ColumnsObject, InvoiceArray } from './Proptypes';

const Icons = [
  <EuroIcon color="white" />,
  <CartIcon color="white" />,
  <DateIcon color="white" />
];

const getBackground = (status) => {
  if (status && status.Value === 'Rejected') return 'url(\'/content/img/hero-bg-red.png\')';
  if (status && status.Value === 'Approved') return 'url(\'/content/img/hero-bg-green.png\')';
  return 'url(\'/content/img/hero-bg-blue.png\')';
};

const SovosHeroBanner = ({ invoiceNumber, attempts, exeuctingAction, invoice, columns, containerStyle, textStyle, muiTheme, isLoading }) => {
  const styles = {
    container: {
      backgroundImage: isLoading ? 'none' : getBackground(invoice.find(x => x.Key === 'RESERVED_CurrentState')),
      height: 210,
      opacity: 0.9,
      lineHeight: '18px',
      display: 'flex',
      alignItems: 'center',
      padding: 20,
      ...containerStyle
    },
    title: {
      ...muiTheme.heroBanner.title,
      ...textStyle
    },
    subtitles: {
      ...muiTheme.heroBanner.subtitles,
      ...textStyle
    },
    statusSubtitle: {
      ...muiTheme.heroBanner.subtitles,
      ...textStyle,
      fontSize: '0.9rem'
    },
    icons: { color: 'rgb(255, 255, 255)', fontFamily: 'Roboto, sans-serif', fontSize: '18px', fontWeight: '300', margin: '1.25rem 50px 1.25rem 0px' },
    sideContainer: { width: '100%', display: 'flex', justifyContent: 'flex-end' },
    text: { position: 'relative', top: '-5px', padding: '5px' },
    status: { backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', textAlign: 'center', borderRadius: '3px', height: '65px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }
  };

  const getDisplayStatus = (status) => {
    if (status === null) return 'Pending';
    return status;
  };

  return (
    <div>
      <div style={ styles.container }>
        <div className="col-sm-8 col-md-9">
          <span style={ styles.title }>Sale #{invoiceNumber}</span>
          <div style={ { display: 'flex', alignItems: 'center' } }>
            {columns.length > 0 ? columns.map((col, index) => <div style={ styles.icons } key={ index }>
              {Icons[index]}<span style={ styles.text }>{`${invoice.find(x => x.Key === col.ObjectPath).Value} ${col.Name}`}</span>
            </div>) : null}
          </div>
        </div>
        <div className="col-sm-4 col-md-3">
          <div style={ styles.status }>
            { exeuctingAction && <VatwareCircularProgress /> }
            { !exeuctingAction && <div>
              { !isLoading && <p style={ styles.subtitles }>{getDisplayStatus(invoice.find(x => x.Key === 'RESERVED_CurrentState').Value)}</p>}
              { !isLoading && attempts > 0 && <p style={ styles.statusSubtitle }>{`${attempts} attempts`}</p> }
            </div> }
          </div>
        </div>
      </div>
    </div>
  );
};

SovosHeroBanner.propTypes = {
  invoiceNumber: PropTypes.string,
  attempts: PropTypes.number,
  columns: PropTypes.arrayOf(ColumnsObject),
  invoice: InvoiceArray,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  muiTheme: PropTypes.object.isRequired,
  exeuctingAction: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool
};

SovosHeroBanner.defaultProps = {
  invoice: [],
  attempts: 0
};

export default muiThemeable()(SovosHeroBanner);
