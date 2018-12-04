import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'redux-form-material-ui';


class NewTextField extends React.PureComponent {

  render() {
    const { label, name, style, textFieldStyle, markAsRequired, labelStyle, ...rest } = this.props;
    return (
      <div className="left-label-text-field" style={ style }>
        <label htmlFor={ name } style={ labelStyle }>{ label }{markAsRequired && <span className="required-red">*</span>}</label>
        <TextField
          underlineStyle={ { borderColor: '#555' } }
          underlineFocusStyle={ { borderColor: '#14B9F1' } }
          style={ textFieldStyle }
          { ...rest }
        />
      </div>
    );
  }
}

NewTextField.propTypes = {
  label: PropTypes.string.isRequired,
  labelStyle: PropTypes.object,
  name: PropTypes.string,
  style: PropTypes.object,
  markAsRequired: PropTypes.bool,
  textFieldStyle: PropTypes.object
};

export default NewTextField;
