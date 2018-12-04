import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'redux-form-material-ui';

class NewDatePickerField extends React.PureComponent {

  render() {
    const { label, name, style, textFieldStyle, markAsRequired, labelStyle, ...rest } = this.props;
    return (
      <div className="left-label-text-field" style={ style }>
        <label htmlFor={ name } style={ labelStyle }>{ label }{markAsRequired && <span className="required-red">*</span>}</label>
        <DatePicker
          underlineStyle={ { borderColor: '#555' } }
          underlineFocusStyle={ { borderColor: '#14B9F1' } }
          style={ textFieldStyle }
          container="inline"
          mode="landscape"
          autoOk
          { ...rest }
        />
      </div>
    );
  }
}

NewDatePickerField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  style: PropTypes.object,
  textFieldStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  markAsRequired: PropTypes.bool
};

export default NewDatePickerField;
