import React from 'react';
import PropTypes from 'prop-types';
import { SelectField } from 'redux-form-material-ui';

class DropDownAccumulator extends React.PureComponent {

  render() {
    const { label, children, labelStyle, markAsRequired, name, ...rest } = this.props;
    return (
      <div className="dropdown-accumulator">
        <label htmlFor={ name } style={ labelStyle }>{ label }{markAsRequired && <span className="required-red">*</span>}</label>
        <SelectField
          underlineStyle={{ borderColor: '#555' }}
          underlineFocusStyle={{ borderColor: '#14B9F1' }}
          className="dropdown-accumulator__select-field"
          { ...rest }
        >
          {children}
        </SelectField>
      </div>
    );
  }
}

DropDownAccumulator.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  markAsRequired: PropTypes.bool
};

export default DropDownAccumulator;
