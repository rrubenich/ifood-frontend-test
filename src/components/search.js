import React, { useMemo, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { TextField, IconButton, InputAdornment } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

/**
 * @typedef {Object} Props
 *
 * @property {Function} onChange - Callback called when the field text is changed
 * @property {string} value - The Search Box Input value
 */

/**
 * Compose a Search Box component
 *
 * @param {Props} props
 * @return {JSX.Element}
 */
function Search(props) {
  const { value } = props;
  const inputRef = useRef(null);

  /**
   * Simulate a native input change when the clear button is clicked
   *
   * This strategy dispatch change event and avoids the creation of
   * a specific prop to clear the input
   *
   * @type {Function}
   */
  const handleOnClear = useCallback(() => {
    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    ).set;
    nativeInputValueSetter.call(inputRef.current, "");

    const event = new Event("input", { bubbles: true });
    inputRef.current.dispatchEvent(event);
  }, []);

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
            <ClearIcon onClick={handleOnClear} />
          </IconButton>
        </InputAdornment>
      );
    }

    return null;
  }, [handleOnClear, value]);

  return (
    <TextField
      size="small"
      name="search"
      color="primary"
      variant="outlined"
      value={value}
      inputRef={inputRef}
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
  value: PropTypes.string,
};

export default Search;
