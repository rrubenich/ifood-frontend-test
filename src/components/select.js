import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  Select as MUISelect,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";

/**
 * @typedef {Object} Props
 *
 * @property {string} label - The input label
 * @property {Array} options - An array with selectable options
 */

/**
 * @typedef {Object} OptionProps
 *
 * @property {string} name - The option label
 * @property {string} value - The option value
 */

/**
 * Isolates a function only for rendering the item
 *
 * @param {OptionProps} option - A option object to be rendered
 * @return {JSX.Element}
 */
function renderOption({ name, value, key }) {
  return (
    <MenuItem key={key || value} value={value}>
      {name}
    </MenuItem>
  );
}

/**
 * Compose a Select component
 *
 * @param {Props} props
 * @type {JSX.Element}
 */
function Select(props) {
  const { label, options } = this.props;

  /**
   * Renders the Select options
   *
   * @type {JSX.Element}
   */
  const renderOptions = useMemo(() => {
    if (Array.isArray(options)) {
      return options.map(renderOption);
    }

    return null;
  }, [options]);

  return (
    <FormControl variant="outlined" size="small" fullWidth>
      <InputLabel>{label}</InputLabel>
      <MUISelect label={label} {...props}>
        {renderOption({ name: "Nenhum", value: null, key: "none" })}
        {renderOptions}
      </MUISelect>
    </FormControl>
  );
}

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
};

export default Select;
