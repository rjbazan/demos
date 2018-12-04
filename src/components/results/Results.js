import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

const styles = {
  container: {
    height: '100vh',
    textAlign: 'center'
  }
}

class Results extends React.Component {

  componentWillMount() {
    document.title = 'Resultados';
  }

  render() {
    return (
      <div style={ styles.container }>
        <p>{this.props.status}La bota elec es invalda</p>
        <Link to="/">
          <RaisedButton
            type="button"
            label="Volver"
            secondary
          />
        </Link>
      </div>
    );
  }
}

Results.propTypes = {
  status: PropTypes.string
};

export default Results;
