import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Calendar from '../Calendar';
import theme from '../../../sovos-theme';

const muiTheme = getMuiTheme(theme);

function setup() {
  const props = {
    onPeriodChange: jest.fn()
  }
  const enzymeWrapper = mount(<Calendar {...props} />, {
    context: { muiTheme }
  });

  return {
    props,
    enzymeWrapper
  }
}

function setup2() {
  const props = {
    onPeriodChange: jest.fn(),
    isYearPicker: true
  }
  const enzymeWrapper = mount(<Calendar {...props} />, {
    context: { muiTheme }
  });

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('Calendar', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find('MonthPicker').length).toBe(1);
      expect(enzymeWrapper.find('SovosIconButton').length).toBe(2);

    });
    it('should call handleDatePickerMonthChange', () => {
      const { enzymeWrapper, props } = setup();
      const monthPicker = enzymeWrapper.find('MonthPicker');
      monthPicker.props().onChange(2018, 10);
      expect(enzymeWrapper.childAt(0).instance().state.month).toBe(11);
      expect(enzymeWrapper.childAt(0).instance().state.year).toBe(2018);
    })

    it('should call decrement', () => {
      const { enzymeWrapper, props } = setup();
      const monthPicker = enzymeWrapper.find('SovosIconButton').first();
      monthPicker.props().onClick();
      expect(enzymeWrapper.childAt(0).instance().state.month).toBe(new Date().getMonth() - 1);
      expect(enzymeWrapper.childAt(0).instance().state.year).toBe(new Date().getFullYear());

    })

    it('should call increment', () => {
      const { enzymeWrapper, props } = setup();
      const monthPicker = enzymeWrapper.find('SovosIconButton').last();
      monthPicker.props().onClick();
      expect(enzymeWrapper.childAt(0).instance().state.month).toBe(new Date().getMonth() + 1);
      expect(enzymeWrapper.childAt(0).instance().state.year).toBe(new Date().getFullYear());

    })

    it('should call handleDatePickerMonthChange', () => {
      const { enzymeWrapper, props } = setup2();
      const monthPicker = enzymeWrapper.find('MonthPicker');
      monthPicker.props().onChange(2018, 10);
      expect(enzymeWrapper.childAt(0).instance().state.month).toBe(11);
      expect(enzymeWrapper.childAt(0).instance().state.year).toBe(2018);
      expect(monthPicker.props().defaultLabel).toBe(2018);
    })

    it('should call decrement year', () => {
      const { enzymeWrapper, props } = setup2();
      const monthPicker = enzymeWrapper.find('SovosIconButton').first();
      monthPicker.props().onClick();

      expect(enzymeWrapper.childAt(0).instance().state.year).toBe(2017);

    })

    it('should call increment year', () => {
      const { enzymeWrapper, props } = setup2();
      const monthPicker = enzymeWrapper.find('SovosIconButton').last();
      monthPicker.props().onClick();

      expect(enzymeWrapper.childAt(0).instance().state.year).toBe(2019);

    })

  })
});
