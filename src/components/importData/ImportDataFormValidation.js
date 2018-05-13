const ImportDataFormValidation = (values) => {
  const errors = {};
  const requiredFields = ['CompanyIds', 'ProfileId', 'ImportBehavior', 'FileName'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

export default ImportDataFormValidation;
