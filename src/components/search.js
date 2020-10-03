import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { TextField, IconButton, InputAdornment } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

/**
 * @typedef {Object} Props
 *
 * @property {Function} onChange - Callback called when the field text is changed
 * @property {Function} onClear - Callback called when the clear icon button is clicked
 * @property {string} value - The Search Box Input value
 */

/**
 * Compose a Search Box component
 *
 * @param {Props} props
 * @return {JSX.Element}
 */
function Search(props) {
  const { onClear, value } = props;

  /**
   * Renders the clear icon button when the component receives a value
   *
   * @type {JSX.Element}
   */
  const endAdornment = useMemo(() => {
    if (value !== "") {
      return (
        <InputAdornment>
          <IconButton size="small">
            <ClearIcon onClick={onClear} />
          </IconButton>
        </InputAdornment>
      );
    }

    return null;
  }, [onClear, value]);

  return (
    <TextField
      size="small"
      name="search"
      color="primary"
      variant="outlined"
      value={value}
      InputProps={{ endAdornment }}
      fullWidth
      {...props}
    />
  );
}

Search.defaultProps = {
  value: "",
};

Search.propTypes = {
  onClear: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default Search;
