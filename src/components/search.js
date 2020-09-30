import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import { IconButton, InputAdornment } from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";

/**
 * @typedef {Object} Props
 *
 * @property {Function} onChange - Called when the field text is changed.
 * @property {Function} onClear - Called when the clear icon button is clicked.
 * @property {string} value - The Search Box Input value.
 */

/**
 * Compose a Search Box component
 *
 * @param {Props} props
 * @type {JSX.Element}
 */
function Search({ onChange, onClear, value }) {
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
      placeholder="Busque por nome da playlist"
      value={value}
      onChange={onChange}
      InputProps={{ endAdornment }}
      fullWidth
    />
  );
}

Search.defaultProps = {
  value: "",
};

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default Search;
