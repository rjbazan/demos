import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { isNil } from 'lodash';

import Suggestion from './suggestion';

class Suggestions extends React.Component {

  componentDidUpdate() {
    if (!isNil(this.props.focusedSuggestion)) {
      this.scrollToSuggestion();
    }
  }


  setFocusedSuggestion = (ref) => {
    this.focusedSuggestion = ref && ref.item;
  }

  handleMouseMove = (event, index) => {
    const { movementX, movementY } = event.nativeEvent;

    if (movementX || movementY) {
      this.props.onSuggestionHover(index);
    }
  }

  handleMouseLeave = () => {
    this.props.onSuggestionHover(null);
  }

  scrollToSuggestion = () => {
    const { focusedSuggestion, list } = this;
    const listRect = list.getBoundingClientRect();
    const suggestionRect = focusedSuggestion.getBoundingClientRect();

    if (suggestionRect.bottom > listRect.bottom) {
      list.scrollTop = (
        focusedSuggestion.offsetTop +
        (focusedSuggestion.clientHeight -
        list.clientHeight)
      );
    } else if (suggestionRect.top < listRect.top) {
      list.scrollTop = focusedSuggestion.offsetTop;
    }
  }

  renderSuggestion = (suggestion, index) => {
    const { props } = this;
    const isFocused = props.focusedSuggestion === index;

    return (
      <Suggestion
        className={ classNames({
          suggestion: true,
          'suggestion--focused': isFocused
        }) }
        index={ index }
        key={ suggestion }
        onClick={ props.onSelection }
        onMouseMove={ this.handleMouseMove }
        ref={ isFocused && this.setFocusedSuggestion }
        searchTerm={ props.searchTerm }
        suggestion={ suggestion }
        suggestionRenderer={ props.suggestionRenderer }
      />
    );
  }

  render() {
    return (
      <ul
        className={ 'suggestions' }
        ref={ (ref) => { this.list = ref; } }
        onMouseLeave={ this.handleMouseLeave }
      >
        {this.props.suggestions.map(this.renderSuggestion)}
      </ul>
    );
  }
}

Suggestions.defaultProps = {
  styles: {
    suggestions: 'react-search-bar__suggestions',
    suggestion: 'react-search-bar__suggestion',
    focusedSuggestion: 'react-search-bar__suggestion--focused'
  }
};

Suggestions.propTypes = {
  focusedSuggestion: PropTypes.number,

  onSuggestionHover: PropTypes.func.isRequired,

  suggestions: PropTypes.array.isRequired
};

export default Suggestions;
