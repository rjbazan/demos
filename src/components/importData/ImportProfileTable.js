import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert';
import VatwareCircularProgress from 'material-ui/CircularProgress';

const profileGridColumns = [
  {
    title: 'Name',
    dataKey: 'Name',
    width: 300
  }, {
    title: 'File name',
    dataKey: 'FileName'
  }, {
    title: 'Type',
    dataKey: 'FileFormat',
    width: 150
  }, {
    title: '',
    width: 40,
    dataKey: 'moreOptions'
  }
];

const headerLabelStyle = {
  color: '#222222',
  fontWeight: 400,
  fontSize: 17,
  paddingBottom: 20
};

class ImportProfileTable extends React.Component {
  state = {
    hoveredRow: -1
  };

  handleRowSelection = (row) => {
    this.props.input.onChange(this.props.profiles[row].Profile_Id);
    if (this.props.onRowSelection) {
      this.props.onRowSelection(this.props.profiles[row].Guid);
    }
  };

  handleRowHover = hoveredRow => this.setState({ hoveredRow });

  handleRowHoverExit = () => this.setState({ hoveredRow: -1 });

  handleMoreVertClick = (event) => {
    event.stopPropagation();
  };

  render() {
    const { profiles, input: { value } } = this.props;
    return (
      <div>
        { Array.isArray(profiles) ?
          <Table fixedHeader onCellClick={ this.handleRowSelection } onRowHover={ this.handleRowHover } onRowHoverExit={ this.handleRowHoverExit } >
            <TableHeader displaySelectAll={ false } adjustForCheckbox={ false } style={ { border: 'none' } }>
              <TableRow style={ { border: 'none' } }>
                { profileGridColumns.map(column => (
                  <TableHeaderColumn
                    key={ column.dataKey }
                    style={ { width: column.width || 'auto', ...headerLabelStyle } }
                  >
                    {column.title}
                  </TableHeaderColumn>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody showRowHover displayRowCheckbox={ false }>
              { profiles.map((profile, index) => (
                <TableRow id={ `import-profile-grid-row-${index}` } key={ index } style={ { height: 40, backgroundColor: this.state.hoveredRow === index || value === profile.Profile_Id ? '#f7f7f7' : '#fff' } }>
                  { profileGridColumns.map(column => (
                    <TableRowColumn key={ column.dataKey } style={ { width: column.width || 'auto' } }>{
                      (column.dataKey !== 'moreOptions') ?
                        profile[column.dataKey] :
                        this.state.hoveredRow === index &&
                          <IconButton onClick={ this.handleMoreVertClick } style={ { padding: 0, width: 30, height: 30 } }>
                            <MoreVert color="#777" />
                          </IconButton>
                    }</TableRowColumn>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        : <VatwareCircularProgress />}
      </div>
    );
  }
}

ImportProfileTable.propTypes = {
  input: PropTypes.object,
  onRowSelection: PropTypes.func,
  profiles: PropTypes.arrayOf(PropTypes.shape({
    Profile_Id: PropTypes.number,
    Guid: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    map: PropTypes.shape({
      transformedFileType: PropTypes.string
    })
  }))
};


export default ImportProfileTable;
