import React from 'react'

// See README for discussion of chai, enzyme, and sinon
import { mount } from 'enzyme'

// In this file we're doing an integration test. Thus we need to hook up our
// form component to Redux and Redux-Form. To do that, we need to create the
// simplest redux store possible that will work with Redux-Form.
import { SovosThemeProvider } from 's1-ui'
import { reducer as formReducer } from 'redux-form'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import ImportDataForm from '../ImportDataForm';
import validate from '../ImportDataFormValidation'

describe("ImportDataForm", () => {
	let store
  let onSubmit
  let handleSubmit
	let subject
	beforeEach(() => {
		store = createStore(combineReducers({ form: formReducer }))
    onSubmit = jest.fn((e) => 'asd')
    handleSubmit = jest.fn().mockReturnValue(Promise.resolve())
		const props = {
      onSubmit,
      validate,
      handleSubmit
		}
		// With redux-form v5, we could do <ImportDataForm store={store}/>.
		// However, with redux-form v6, the Field component we use is itself
		// connected to the redux store. Therefore, we must put the store into
		// context. To do that, we use <Provider/>.
		subject = mount(
			<Provider store={store}>
				<SovosThemeProvider>
				  <ImportDataForm {...props}/>
        </SovosThemeProvider>
			</Provider>
		)
	})

	it("calls onSubmit", () => {
		const form = subject.find('form')
		const input = subject.find('input').first()
		// Our form, when connected to Redux-Form, won't submit unless it's
		// valid. Thus, we type a first name here to make the form's inputs,
		// and thus the form, valid.
		input.simulate('change', { target: { value: 'Joe' } })
    form.simulate('submit')
    //expect(form.props().onSubmit).toHaveBeenCalledWith('asd');
    expect(handleSubmit).toBeCalledWith();

	})
})