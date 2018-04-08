import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Provide } from 'redux';
import CalendarButton from '../CalendarButton';
import theme from '../../../sovos-theme';

Enzyme.configure({ adapter: new Adapter() });

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

  })
});
