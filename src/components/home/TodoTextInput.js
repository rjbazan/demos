import React, { Component } from 'react';
const TodoTextInput = ({ newTodo, onSave, ...rest}) => {
  return <input {...rest} />;
}
export default TodoTextInput;
