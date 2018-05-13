import React, { Fragment } from 'react';
import Enzyme, { mount } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { SovosThemeProvider } from 's1-ui';
import theme from '../../../sovos-theme';
import Steps from '../Steps';

const muiTheme = getMuiTheme(theme);
function setup(props) {
const enzymeWrapper = mount(<SovosThemeProvider theme={muiTheme}><Steps {...props} /></SovosThemeProvider>, {
    context: { muiTheme }
  });

  return {
    props,
    enzymeWrapper
  }
}

const steps = [{
  Name: 'Transmit to Government',
  Category: 'Government Auth',
  Logs: ['Succesfully packaged and transmitted', 'The import falied. Go to import catches and upload a batch again', '2', '3'],
  Id: 'a'
}, {
  Name: 'Government Authorization',
  Category: 'Government Auth',
  Logs: ['1', '2', '3'],
  Id: 'b'
}, {
  Name: 'Print PDFs',
  Category: 'Bussiness Automation',
  Logs: ['1', '2', '3'],
  Id: 'c'
}, {
  Name: 'Integration',
  Category: 'Bussiness Automation',
  Logs: ['1', '2', '3'],
  Id: 'd'
}, {
  Name: 'Sales Demo',
  Category: 'Sales',
  Logs: ['1', '2', '3'],
  Id: 'd'
}];

describe('components', () => {
  describe('Steps', () => {
    it('should display correct components structure', () => {
      const obj = {
        steps,
        categories: ['Transmit to Government', 'Bussiness Automation', 'Integration', 'Sales Demo']
      }
      const { enzymeWrapper } = setup(obj);

      expect(enzymeWrapper.find('Steps').length).toBe(1);
      expect(enzymeWrapper.find('Paper').length).toBe(1);
    });

    it('should display correct number of steps', () => {
      const obj = {
        steps,
        categories: ['Government Auth', 'Bussiness Automation', 'Sales']
      }
      const { enzymeWrapper } = setup(obj);

      expect(enzymeWrapper.find('Step').length).toBe(5);
      expect(enzymeWrapper.find('StepHeader').length).toBe(3);
    });
  });
});
