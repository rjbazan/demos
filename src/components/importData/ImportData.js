import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/shared/SovosHeader';
import ConfirmationModal from 'components/modal/ConfirmationModal';
import ImportDataForm from './ImportDataForm';
import Console from './Console';

class ImportProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialValues: { ImportBehavior: 1 },
      form: {}
    };
  }

  componentWillMount() {
    document.title = 'Import Data';
  }

  componentDidMount() {
    this.props.getProfiles();
    this.props.getCompanies();
  }

  handleSubmit = (form) => {
    this.props.importData(form);
    this.setState({ form });
  }

  handleCancelUpload = (id) => {
    this.props.cancelJob(id);
  }

  handleClose = () => {
    this.props.toggleConfirmation(null);
  }

  handleConfirmation = () => {
    const form = this.state.form;
    form.Overwrite = true;
    this.props.importData(form);
    this.handleClose();
  }

  render() {
    return (
      <div className="manage-imp-profile__page react-page">
        <Header text="Import Data" />
        <div>
          <ImportDataForm
            profiles={ this.props.profiles }
            onSubmit={ this.handleSubmit }
            companies={ this.props.companies }
            initialValues={ this.state.initialValues }
          />
          {this.props.jobIds.map(id =>
            <Console
              key={ id }
              id={ id }
              lines={ this.props.state[id] ? this.props.state[id].lines : [] }
              log={ this.props.state[id] ? this.props.state[id].log : undefined }
              handleCancel={ this.handleCancelUpload }
            />)}
        </div>
        <ConfirmationModal
          open={ this.props.open }
          onClose={ this.handleClose }
          onConfirmation={ this.handleConfirmation }
          modalText={ `The following file(s) ${this.props.duplicatedFiles} seem to have been imported already into the application. 
          Please verify. If you select Cancel you can verify and try again if needed. If you select Continue, the import will continue.` }
          title="Confirm"
        />
      </div>
    );
  }
}

ImportProfile.propTypes = {
  getProfiles: PropTypes.func,
  importData: PropTypes.func,
  getCompanies: PropTypes.func,
  toggleConfirmation: PropTypes.func,
  cancelJob: PropTypes.func,
  profiles: PropTypes.array,
  companies: PropTypes.array,
  jobIds: PropTypes.array,
  state: PropTypes.object,
  duplicatedFiles: PropTypes.string,
  open: PropTypes.bool
};

export default ImportProfile;
