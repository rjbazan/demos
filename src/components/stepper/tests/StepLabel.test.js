import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import StepLabel from '../StepLabel';

function setup(props) {
  const enzymeWrapper = shallow(<StepLabel {...props} />);

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('StepLabel', () => {
    it('should display correct btn layout', () => {
      const obj = {
        handleDropdownClick: jest.fn(),
        handleExitClick: jest.fn(),
        logsCount: 13,
        stepName: 'First Step',
        showFullLogs: false
      }
      const { enzymeWrapper } = setup(obj);

      expect(enzymeWrapper.find('IconButton').length).toBe(2);
      expect(enzymeWrapper.find('NavigationExpandMore').length).toBe(1);
      expect(enzymeWrapper.find('NavigationExpandLess').length).toBe(0);
    });

    it('should display correct btn layout 2', () => {
      const obj = {
        handleDropdownClick: jest.fn(),
        handleExitClick: jest.fn(),
        logsCount: 13,
        stepName: 'First Step',
        showFullLogs: true
      }
      const { enzymeWrapper } = setup(obj);

      expect(enzymeWrapper.find('IconButton').length).toBe(2);
      expect(enzymeWrapper.find('NavigationExpandMore').length).toBe(0);
      expect(enzymeWrapper.find('NavigationExpandLess').length).toBe(1);
    });
  })
});
