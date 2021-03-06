import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { Slider as MUISlider, Tooltip } from "@material-ui/core";

/**
 * @typedef {Object} Props
 *
 * @property {string} label - The component label.
 */

/**
 * @typedef {Object} ValueLabelProps
 *
 * @property {string} children - The Tooltip message;
 * @property {string} value - The component title.
 */

/**
 * Render a Tooltip to show the Slider value.
 *
 * @param {ValueLabelProps} props - Tooltip component props.
 * @type {Function}
 */
function renderValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip open={true} enterTouchDelay={0} placement="bottom" title={value}>
      {children}
    </Tooltip>
  );
}

/**
 * Create a Slider with InputNumber component.
 *
 * @param {Props} props
 * @type {JSX.Element}
 */
function Slider(props) {
  const { label } = props;

  return (
    <Fragment>
      <Typography variant="body2">{label}</Typography>
      <MUISlider ValueLabelComponent={renderValueLabelComponent} {...props} />
    </Fragment>
  );
}

Slider.propTypes = {
  label: PropTypes.string,
};

export default Slider;
