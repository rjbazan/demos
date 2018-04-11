import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Step from '../Step';

function setup(props) {
  const enzymeWrapper = shallow(<Step {...props} />);

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('Step', () => {
    it('should display correct components layout', () => {
      const obj = {
        step: {
          Logs: [],
          Name: 'Step Name',
        },
        isLastItem: false
      }
      const { enzymeWrapper } = setup(obj);

      expect(enzymeWrapper.find('StepLabel').length).toBe(1);
      expect(enzymeWrapper.find('StepLogs').length).toBe(1);
    });

    it('should handle dropdown toggle click', () => {
      const obj = {
        step: {
          Logs: [],
          Name: 'Step Name',
        },
        isLastItem: false
      }
      const { enzymeWrapper } = setup(obj);
      expect(enzymeWrapper.instance().state.showFullLogs).toBe(false);
      enzymeWrapper.find('StepLabel').props().handleDropdownClick();
      expect(enzymeWrapper.instance().state.showFullLogs).toBe(true);
    });

    it('should handle onMouseEnter', () => {
      const obj = {
        step: {
          Logs: [],
          Name: 'Step Name',
        },
        isLastItem: false,
        index: 1
      }
      const { enzymeWrapper } = setup(obj);

      expect(enzymeWrapper.instance().state.hoverIndex).toBe(-1);
      enzymeWrapper.simulate('mouseEnter');
      expect(enzymeWrapper.instance().state.hoverIndex).toBe(1);
      expect(enzymeWrapper.props().style.backgroundColor).toBe('rgba(0,0,0, 0.1)');
    });

    it('should handle onMouseLeave', () => {
      const obj = {
        step: {
          Logs: [],
          Name: 'Step Name',
        },
        isLastItem: false,
        index: 1
      }
      const { enzymeWrapper } = setup(obj);

      expect(enzymeWrapper.instance().state.hoverIndex).toBe(-1);
      enzymeWrapper.simulate('mouseEnter');
      expect(enzymeWrapper.instance().state.hoverIndex).toBe(1);
      enzymeWrapper.simulate('mouseLeave');
      expect(enzymeWrapper.props().style.backgroundColor).toBe(undefined);
      expect(enzymeWrapper.instance().state.hoverIndex).toBe(-1);
    });

    it('should handle step selection', () => {
      const obj = {
        step: {
          Logs: [],
          Name: 'Step Name',
        },
        isLastItem: false,
        handleStepClick: jest.fn()
      }
      const { enzymeWrapper } = setup(obj);

    });
  });
});
