import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MonthPicker from '../MonthPicker';
import theme from '../../../sovos-theme';

const muiTheme = getMuiTheme(theme);

function setup(props) {
  const enzymeWrapper = mount(<MonthPicker {...props} />, {
    context: { muiTheme }
  });

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('MonthPicker', () => {
    it('should render self and subcomponents', () => {
      const obj = {
        month: 'February',
        year: 2018,
        defaultLabel: 'February',
        onChange: jest.fn(),
        isYearPicker: false,
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        years: [2018, 2017, 2016, 2015, 2014],
      }
      const { enzymeWrapper } = setup(obj);

      expect(enzymeWrapper.find('MonthPicker').length).toBe(1);
      expect(enzymeWrapper.find('#calendar-popover').length).toBe(1);
    });

    it('should call handleRequestClose', () => {
      const obj = {
        month: 'February',
        year: 2018,
        defaultLabel: 'February',
        onChange: jest.fn(),
        isYearPicker: false,
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        years: [2018, 2017, 2016, 2015, 2014],
      }
      const { enzymeWrapper, props } = setup(obj);
      const popOver = enzymeWrapper.find('#calendar-popover');
      popOver.props().onRequestClose();
      expect(enzymeWrapper.childAt(0).instance().state.open).toBe(false);
    })

    it('should call handlePopoverOpen', () => {
      const obj = {
        month: 'February',
        year: 2018,
        defaultLabel: 'February',
        onChange: jest.fn(),
        isYearPicker: false,
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        years: [2018, 2017, 2016, 2015, 2014],
      }
      const { enzymeWrapper, props } = setup(obj);
      const flatButton = enzymeWrapper.find('button').first();
      flatButton.simulate('click')
      expect(enzymeWrapper.childAt(0).instance().state.open).toBe(true);
    })


  })
});
