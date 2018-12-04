import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Provide } from 'redux';
import CalendarButton from '../CalendarButton';
import theme from '../../../sovos-theme';

const muiTheme = getMuiTheme(theme);

function setup(props) {
  const enzymeWrapper = mount(<CalendarButton {...props} />, {
    context: { muiTheme }
  });

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('CalendarButton', () => {
    it('should render self and subcomponents', () => {
      const obj = {
        date: "February",
        selected: false,
        onClick: jest.fn()
      }
      const { enzymeWrapper } = setup(obj);
      expect(enzymeWrapper.find('EnhancedButton').length).toBe(1);
    });

    it('should not render self and subcomponents', () => {
      const obj = {
        date: null,
        selected: false,
        onClick: jest.fn()
      }
      const { enzymeWrapper } = setup(obj);
      expect(enzymeWrapper.find('EnhancedButton').length).toBe(0);
      expect(enzymeWrapper.find('span').length).toBe(1);
    });


    it('should call handleClick', () => {
      const obj = {
        date: "February",
        selected: false,
        onClick: jest.fn()
      }
      const { enzymeWrapper, props } = setup(obj);
      const enhancedBtn = enzymeWrapper.find('EnhancedButton');
      enhancedBtn.props().onClick();
      expect(enzymeWrapper.props().onClick).toHaveBeenCalled();
    });

    it('should not call handleClick', () => {
      const obj = {
        date: "February",
        selected: false,
        onClick: jest.fn(),
        disabled: true
      }
      const { enzymeWrapper, props } = setup(obj);
      const enhancedBtn = enzymeWrapper.find('EnhancedButton');
      enhancedBtn.props().onClick();
      expect(enzymeWrapper.props().onClick).not.toHaveBeenCalled();
    });

    it('should call handleMouseLeave', () => {
      const obj = {
        date: "February",
        selected: false,
        onClick: jest.fn()
      }
      const { enzymeWrapper, props } = setup(obj);
      const enhancedBtn = enzymeWrapper.find('EnhancedButton');
      enhancedBtn.props().onMouseLeave();
      expect(enzymeWrapper.instance().state.hover).toBe(false);
    });

    it('should call handleMouseEnter', () => {
      const obj = {
        date: "February",
        selected: false,
        onClick: jest.fn()
      }
      const { enzymeWrapper, props } = setup(obj);
      const enhancedBtn = enzymeWrapper.find('EnhancedButton');
      enhancedBtn.props().onMouseEnter();
      expect(enzymeWrapper.instance().state.hover).toBe(true);
    });

    it('should call handleKeyboardFocus', () => {
      const obj = {
        date: "February",
        selected: false,
        onClick: jest.fn(),
        onKeyboardFocus: jest.fn()
      }
      const { enzymeWrapper, props } = setup(obj);
      const enhancedBtn = enzymeWrapper.find('EnhancedButton');
      enhancedBtn.props().onKeyboardFocus();
      expect(enzymeWrapper.props().onKeyboardFocus).toHaveBeenCalled();
    });

    it('should not call handleKeyboardFocus', () => {
      const obj = {
        date: "February",
        selected: false,
        onClick: jest.fn(),
        onKeyboardFocus: jest.fn(),
        disabled: true
      }
      const { enzymeWrapper, props } = setup(obj);
      const enhancedBtn = enzymeWrapper.find('EnhancedButton');
      enhancedBtn.props().onKeyboardFocus();
      expect(enzymeWrapper.props().onKeyboardFocus).not.toHaveBeenCalled();
    });

    it('should render styles for max element', () => {
      const obj = {
        date: "February",
        selected: false,
        onClick: jest.fn(),
        onKeyboardFocus: jest.fn(),
        disabled: true,
        max: true
      }
      const { enzymeWrapper, props } = setup(obj);
      const enhancedBtn = enzymeWrapper.find('EnhancedButton');
      expect(enhancedBtn.find('div').props().style.borderRadius).toBe('0px 15px 15px 0px');
    });

    it('should render styles for min element', () => {
      const obj = {
        date: "February",
        selected: false,
        onClick: jest.fn(),
        onKeyboardFocus: jest.fn(),
        disabled: true,
        min: true
      }
      const { enzymeWrapper, props } = setup(obj);
      const enhancedBtn = enzymeWrapper.find('EnhancedButton');
      expect(enhancedBtn.find('div').props().style.borderRadius).toBe('15px 0px 0px 15px');
    });

    it('should render styles for center element', () => {
      const obj = {
        date: "February",
        selected: false,
        onClick: jest.fn(),
        onKeyboardFocus: jest.fn(),
        disabled: true,
        range: true,
        center: true
      }
      const { enzymeWrapper, props } = setup(obj);
      const enhancedBtn = enzymeWrapper.find('EnhancedButton');
      expect(enhancedBtn.find('div').props().style.borderRadius).toBe(undefined);
      expect(enhancedBtn.find('div').props().style.borderRadius).toBe(undefined);
    });

    it('should render styles for range element', () => {
      const obj = {
        date: "February",
        selected: false,
        onClick: jest.fn(),
        onKeyboardFocus: jest.fn(),
        disabled: true,
        range: true
      }
      const { enzymeWrapper, props } = setup(obj);
      const enhancedBtn = enzymeWrapper.find('EnhancedButton');
      expect(enhancedBtn.find('div').props().style.width).toBe('100%');
      expect(enhancedBtn.find('div').props().style.left).toBe(0);
    });

  })
});
