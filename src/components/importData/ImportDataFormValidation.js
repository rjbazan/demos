const ImportDataFormValidation = (values) => {
  const errors = {};
  const requiredFields = ['Name', 'Password'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

export default ImportDataFormValidation;
