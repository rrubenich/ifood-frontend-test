import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

/**
 * @typedef {Object} Props
 *
 * @property {JSX.Element} children - One or more PlaylistCard component
 */

/**
 * Create a Grid component to show the list of playlists
 *
 * @param {Props} props
 * @type {JSX.Element}
 */
function PlaylistGrid(props) {
  const { children } = props;

  /**
   * Checks if the received children property is an Array (and if it exists)
   *
   * If is the expected, wrapper all elements with Grid Item component
   * Otherwise just return the received property
   *
   * @type {JSX.Element}
   */
  const items = useMemo(() => {
    if (Array.isArray(children)) {
      return children.map((child) => (
        // @TODO: handle with react elements ids
        <Grid item key={child.id} xs={6} sm={4} md={3}>
          {child}
        </Grid>
      ));
    }

    return children;
  }, [children]);

  return (
    <Grid container spacing={4}>
      {items}
    </Grid>
  );
}

PlaylistGrid.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlaylistGrid;
