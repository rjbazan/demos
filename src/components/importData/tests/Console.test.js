import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Console from '../Console';

function setup(props) {
  const enzymeWrapper = shallow(<Console {...props} />);

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('Console', () => {
    it('should display correct console layout', () => {
      const obj = {
        lines: [{Progress: 10}, {Text: '2'}],
        log: {FileSettings: {Filename: 'testfile.xlxs'}},
        id: '101'
      }
      const { enzymeWrapper } = setup(obj);

      expect(enzymeWrapper.find('LinearProgress').length).toBe(1);
      expect(enzymeWrapper.find('b').text()).toBe('testfile.xlxs');
    });

    it('should display two progress bars', () => {
      const obj = {
        lines: [{Progress: 10}, {Text: '2'}, {Text: '3'}, {Text: '4'},
        {Text: '5'}, {Text: '6'}, {Text: '7'}, {Text: '8'},
        {Text: '9'},{Text: '10'},{Text: '11'},
        {Progress: 100}],
        log: {FileSettings: {Filename: 'testfile.xlxs'}},
        id: '101'
      }
      const { enzymeWrapper } = setup(obj);

      expect(enzymeWrapper.find('LinearProgress').length).toBe(2);
      expect(enzymeWrapper.find('span').length).toBe(11);
    });

    it('should handle cancel click', () => {
      const obj = {
        lines: [{Progress: 10}, {Text: '2'}],
        log: {FileSettings: {Filename: 'testfile.xlxs'}},
        id: '101',
        handleCancel: jest.fn()
      }
      const { enzymeWrapper, props } = setup(obj);
      enzymeWrapper.find('IconButton').simulate('touchTap');

      expect(props.handleCancel).toHaveBeenCalledWith('101');
    });
  });
});
