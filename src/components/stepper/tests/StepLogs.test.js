import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import StepLogs from '../StepLogs';

function setup(props) {
  const enzymeWrapper = mount(<StepLogs {...props} />);

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('StepLogs', () => {
    it('should display first log', () => {
      const obj = {
        isLastItem: false,
        logs: [1],
      }
      const { enzymeWrapper } = setup(obj);


      expect(enzymeWrapper.find('StepLogs').length).toBe(1);
      expect(enzymeWrapper.find('li').length).toBe(1);
    });

    it('should display all log', () => {
      const obj = {
        isLastItem: false,
        logs: [1, 2, 3],
      }
      const { enzymeWrapper } = setup(obj);

      expect(enzymeWrapper.find('StepLogs').length).toBe(1);
      expect(enzymeWrapper.find('li').length).toBeGreaterThan(1);
    });

    it('should display last item correctly', () => {
      const obj = {
        isLastItem: true,
        logs: [1, 2, 3],
      }
      const { enzymeWrapper } = setup(obj);

      expect(enzymeWrapper.find('div').first().props().style.borderLeft).toBe(undefined);
    });

    it('should display last item correctly 2', () => {
      const obj = {
        isLastItem: false,
        logs: [1, 2, 3],
      }
      const { enzymeWrapper } = setup(obj);

      expect(enzymeWrapper.find('div').first().props().style.borderLeft).toBe('3px solid #4EC283');
      expect(enzymeWrapper.find('a').text()).toBe('');
    });

    it('should display show more logs label', () => {
      const obj = {
        isLastItem: false,
        logs: [1, 2, 3, 4, 5, 6, 7, 8 , 9],
      }
      const { enzymeWrapper } = setup(obj);

      expect(enzymeWrapper.find('a').text()).toBe('See More (4)');
      expect(enzymeWrapper.find('li').length).toBe(5);
      expect(enzymeWrapper.instance().state.expanded).toBe(false);
      expect(enzymeWrapper.find('a').simulate('click'));
      expect(enzymeWrapper.instance().state.expanded).toBe(true);
      expect(enzymeWrapper.find('li').length).toBe(9);
    });
  })
});
