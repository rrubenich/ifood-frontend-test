import React from "react";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";

/**
 * @typedef Props
 * @type {Object}
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
function Header({ logo }) {
  return <Toolbar>{logo}</Toolbar>;
}

Header.propTypes = {
  logo: PropTypes.node,
};

export default Header;
