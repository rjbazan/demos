import PropTypes from 'prop-types';
import React from 'react';

class Suggestion extends React.Component {


  handleClick = () => {
    this.props.onClick(this.props.suggestion);
  }

  handleMouseMove = (event) => {
    this.props.onMouseMove(event, this.props.index);
  }

  render() {
    const { props } = this;

    return (
      <li // eslint-disable-line
        className={ props.className }
        key={ props.suggestion }
        ref={ (ref) => { this.item = ref; } }
        onClick={ this.handleClick }
        onMouseMove={ this.handleMouseMove }
        role="button"
      >
        {props.suggestionRenderer(props.suggestion, props.searchTerm)}
      </li>
    );
  }
}

Suggestion.propTypes = {

  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func.isRequired,
  suggestion: PropTypes.string.isRequired,

};

export default Suggestion;
