import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import ImportProfileTable from '../importProfileTable';

function setup(props) {
  const enzymeWrapper = shallow(<ImportProfileTable {...props} />);

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('ImportProfileTable', () => {
    it('should display correct ImportProfileTable empty layout', () => {
      const obj = {
        input: {},
        onRowSelection: jest.fn(),
        profiles: null
      }
      const { enzymeWrapper } = setup(obj);

      expect(enzymeWrapper.find('CircularProgress').length).toBe(1);

    });

    it('should display correct ImportProfileTable rows layout', () => {
      const obj = {
        input: {},
        onRowSelection: jest.fn(),
        profiles: [{Profile_Id: 1, Guid: '1'}, {Profile_Id: 2, Guid: '2'}, {Profile_Id: 2, Guid: '2'}]
      }
      const { enzymeWrapper } = setup(obj);

      expect(enzymeWrapper.find('TableRow').length).toBe(4);

    });

    it('should handle row selection', () => {
      const obj = {
        input: {
          onChange: jest.fn()
        },
        onRowSelection: jest.fn(),
        profiles: [{Profile_Id: 1, Guid: '1'}, {Profile_Id: 2, Guid: '2'}, {Profile_Id: 3, Guid: '3'}]
      }
      const { enzymeWrapper, props } = setup(obj);
      const table = enzymeWrapper.find('Table');

      table.props().onCellClick(1, 1);

      expect(props.input.onChange).toHaveBeenCalledWith(2);
      expect(props.onRowSelection).toHaveBeenCalledWith('2');
    });

    it('should handle row hovering', () => {
      const obj = {
        input: {
          onChange: jest.fn()
        },
        onRowSelection: jest.fn(),
        profiles: [{Profile_Id: 1, Guid: '1'}, {Profile_Id: 2, Guid: '2'}, {Profile_Id: 3, Guid: '3'}]
      }
      const { enzymeWrapper, props } = setup(obj);
      const table = enzymeWrapper.find('Table');

      table.props().onRowHover(1);
      expect(enzymeWrapper.instance().state.hoveredRow).toBe(1);
      table.props().onRowHoverExit();
      expect(enzymeWrapper.instance().state.hoveredRow).toBe(-1);
    });

    xit('should handle row edition', () => {
      const obj = {
        input: {
          onChange: jest.fn()
        },
        onRowSelection: jest.fn(),
        profiles: [{Profile_Id: 1, Guid: '1'}, {Profile_Id: 2, Guid: '2'}, {Profile_Id: 3, Guid: '3'}]
      }
      const { enzymeWrapper, props } = setup(obj);
      const table = enzymeWrapper.find('Table');

      table.props().onRowHover(1);

      enzymeWrapper.find('IconButton').simulate('click');
      expect(enzymeWrapper.instance().handleMoreVert).toBeHaveBeenCalled();
    });
  });
});
