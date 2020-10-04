import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

/**
 * @typedef {Object} Props
 *
 * @property {string} loading - Defines if the component is a loading state
 * @property {JSX.Element} children - One or more PlaylistCard component
 */

/**
 * Create a Grid component to show the list of playlists
 *
 * @param {Props} props
 * @type {JSX.Element}
 */
function PlaylistGrid(props) {
  const { loading, children } = props;

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
        <Grid key={child.id} xs={6} sm={4} md={3} item>
          {child}
        </Grid>
      ));
    }

    return children;
  }, [children]);

  if (loading) {
    return (
      <Grid container spacing={4}>
        {Array.from(new Array(6)).map((item, index) => (
          <Grid key={index} xs={6} sm={4} md={3} item>
            <Skeleton variant="rect" height={140} />
            <Skeleton height={40} />
            <Skeleton width="60%" />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={4}>
      {items}
    </Grid>
  );
}

PlaylistGrid.defaultProps = {
  loading: false,
};

PlaylistGrid.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
};

export default PlaylistGrid;
