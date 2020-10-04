import React from "react";
import PropTypes from "prop-types";
import { Toolbar } from "@material-ui/core";

/**
 * @typedef {object} Props
 *
 * @property {JSX.Element} logo
 */

/**
 * Create an application Header
 *
 * The unique purpose of Header component is to correctly position the logo
 *
 * @param {Props} props
 * @return {JSX.Element}
 */
function Header(props) {
  const { logo } = props;

  return <Toolbar>{logo}</Toolbar>;
}

Header.propTypes = {
  logo: PropTypes.node,
};

export default Header;
