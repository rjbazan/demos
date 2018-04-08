import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from './Home';

function setup() {
  const props = {
    addTodo: jest.fn()
  }
  const enzymeWrapper = shallow(<Home {...props} />);
  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('Home', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup()
      expect(enzymeWrapper.find('header').hasClass('App-header')).toBe(true)
      expect(enzymeWrapper.find('h1').text()).toBe('Welcome to React')
      expect(enzymeWrapper.find('img').length).toBe(1)
    });
    it('should call addTodo if length of text is greater than 0', () => {
      const { enzymeWrapper, props } = setup()
      const button = enzymeWrapper.find('button')

      expect(enzymeWrapper.instance().state.open).toBe(false);

      button.simulate('click');
      expect(enzymeWrapper.instance().state.open).toBe(true);

    })
  })
})
