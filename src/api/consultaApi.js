import axios from 'axios';

class ConsultaApi {
  static ConsultaFormulario(form) {
    return axios.post('/Filings/ExportReportLogs', form)
    .then(response => response)
    .catch((error) => { throw error; });
  }
}

export default ConsultaApi;
