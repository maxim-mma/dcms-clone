import React from 'react';
import PropTypes from 'prop-types';
import { injectGlobal } from 'react-emotion';
import DateTime from 'react-datetime';
import dateTimeStyles from 'react-datetime/css/react-datetime.css';
import moment from 'moment';

injectGlobal`
  ${dateTimeStyles}
`;

export default class DateControl extends React.Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    classNameWrapper: PropTypes.string.isRequired,
    setActiveStyle: PropTypes.func.isRequired,
    setInactiveStyle: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    includeTime: PropTypes.bool,
  };

  getFormats() {
    const { field, includeTime } = this.props;
    let timeFormat = field.get('timeFormat');
    if (typeof timeFormat === 'undefined') {
      timeFormat = !!includeTime;
    }
    if (timeFormat === true) {
      timeFormat = 'LT';
    }

    const date = field.get('dateFormat') || field.get('format') || true;
    // let time = timeFormat || !!includeTime;
    let time = timeFormat;
    let datetime =
      date && date !== true && time && time !== true
        ? date + ' ' + time
        : (typeof date === 'string' && date) || (typeof time === 'string' && time) || undefined;

    console.log(time, 'timeFormat', timeFormat, 'datetime', datetime);
    return { date, time, datetime };
  }

  formats = this.getFormats();

  componentDidMount() {
    const { value } = this.props;

    /**
     * Set the current date as default value if no default value is provided. An
     * empty string means the value is intentionally blank.
     */
    if (!value && value !== '') {
      setTimeout(() => {
        this.handleChange(new Date());
      }, 0);
    }
  }

  // Date is valid if datetime is a moment or Date object otherwise it's a string.
  // Handle the empty case, if the user wants to empty the field.
  isValidDate = datetime =>
    moment.isMoment(datetime) || datetime instanceof Date || datetime === '';

  handleChange = datetime => {
    const { onChange } = this.props;

    /**
     * Set the date only if it is valid.
     */
    if (!this.isValidDate(datetime)) {
      return;
    }

    /**
     * Produce a formatted string only if a format is set in the config.
     * Otherwise produce a date object.
     */
    if (this.formats.datetime) {
      const formattedValue = moment(datetime).format(this.formats.datetime);
      onChange(formattedValue);
    } else {
      const value = moment.isMoment(datetime) ? datetime.toDate() : datetime;
      onChange(value);
    }
  };

  onBlur = datetime => {
    const { setInactiveStyle } = this.props;

    if (!this.isValidDate(datetime)) {
      const parsedDate = moment(datetime);

      if (parsedDate.isValid()) {
        this.handleChange(datetime);
      } else {
        window.alert('The date you entered is invalid.');
      }
    }

    setInactiveStyle();
  };

  render() {
    const { value, classNameWrapper, setActiveStyle } = this.props;
    return (
      <DateTime
        dateFormat={this.formats.date}
        timeFormat={this.formats.time}
        value={moment(value, this.formats.datetime)}
        onChange={this.handleChange}
        onFocus={setActiveStyle}
        onBlur={this.onBlur}
        inputProps={{ className: classNameWrapper }}
      />
    );
  }
}
