import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'decap-cms-ui-next';

export default class StringControl extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    forID: PropTypes.string,
    title: PropTypes.bool,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.string,
    placeholder: PropTypes.string,
    inline: PropTypes.bool,
    value: PropTypes.node,
    error: PropTypes.bool,
    errors: PropTypes.array,
    classNameWrapper: PropTypes.string.isRequired,
    setActiveStyle: PropTypes.func.isRequired,
    setInactiveStyle: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: '',
  };

  // The selection to maintain for the input element
  _sel = 0;

  // The input element ref
  _el = null;

  // NOTE: This prevents the cursor from jumping to the end of the text for
  // nested inputs. In other words, this is not an issue on top-level text
  // fields such as the `title` of a collection post. However, it becomes an
  // issue on fields nested within other components, namely widgets nested
  // within a `markdown` widget. For example, the alt text on a block image
  // within markdown.
  // SEE: https://github.com/decaporg/decap-cms/issues/4539
  // SEE: https://github.com/decaporg/decap-cms/issues/3578
  componentDidUpdate() {
    if (this._el && this._el.selectionStart !== this._sel) {
      this._el.setSelectionRange(this._sel, this._sel);
    }
  }

  handleChange = e => {
    this._sel = e.target.selectionStart;
    this.props.onChange(e.target.value);
  };

  render() {
    const { forID, title, label, description, status, placeholder, inline, value, error, errors } =
      this.props;

    return (
      <TextField
        ref={el => {
          this._el = el;
        }}
        title={title}
        name={forID}
        label={label}
        description={description}
        status={status}
        placeholder={placeholder}
        inline={inline}
        value={value || ''}
        onChange={this.handleChange}
        error={error}
        errors={errors}
      />
    );
  }
}
