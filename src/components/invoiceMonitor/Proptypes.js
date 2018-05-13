import PropTypes from 'prop-types';

export const ColumnsObject = PropTypes.shape({
  IsGreedyColumn: PropTypes.bool,
  IsVisible: PropTypes.bool,
  MetaData1: PropTypes.any,
  MetaData2: PropTypes.any,
  Name: PropTypes.string,
  ObjectPath: PropTypes.string
});

export const InvoiceArray = PropTypes.arrayOf(PropTypes.shape({
  Key: PropTypes.string,
  Value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}));

export const ActionsArray = PropTypes.arrayOf(PropTypes.shape({
  Code: PropTypes.string,
  Description: PropTypes.string,
  Label: PropTypes.string
}));

export const CommentsArray = PropTypes.arrayOf(PropTypes.shape({
  Comment: PropTypes.string,
  CommentTimestamp: PropTypes.string,
  FileName: PropTypes.any,
  FileUrl: PropTypes.string,
  FormattedPostedTimestamp: PropTypes.string,
  Id: PropTypes.number,
  PostedTimestamp: PropTypes.string,
  PostedTimestampToDisplay: PropTypes.string,
  TimeZoneId: PropTypes.string,
  UserName: PropTypes.string,
  UserSurname: PropTypes.string
}));
