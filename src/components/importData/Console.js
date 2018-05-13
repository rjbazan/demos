import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from 'material-ui/LinearProgress';
import IconButton from 'material-ui/IconButton';
import Cancel from 'material-ui/svg-icons/navigation/cancel';

const progressBarStyle = {
  height: 15,
  border: '1px solid deepskyblue'
};

const containerStyle = {
  padding: '0px 50px'
};

const Console = ({ lines, log, handleCancel, id }) => (
  <div style={ containerStyle }>
    <hr />
    <span><b>{log.FileSettings.Filename}</b>
      <IconButton
        onTouchTap={ () => { handleCancel(id); } }
      >
        <Cancel />
      </IconButton>
    </span>
    {lines.map((line, index) => {
      if (index === 0 || index === 11) {
        return (
          <LinearProgress
            id="upload-progress"
            key={ index }
            max={ 100 }
            mode="determinate"
            style={ progressBarStyle }
            value={ line.Progress }
          />
        );
      }
      return (
        <div key={ index }>
          <span>{line.Text}</span>
        </div>
      );
    })}
    <hr />
  </div>
);

Console.propTypes = {
  lines: PropTypes.array,
  log: PropTypes.object,
  id: PropTypes.string,
  handleCancel: PropTypes.func
};

Console.defaultProps = {
  lines: [],
  log: { FileSettings: {} }
};

export default Console;
