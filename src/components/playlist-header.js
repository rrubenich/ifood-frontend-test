import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@material-ui/lab";

/**
 * @typedef {object} Props
 *
 * @property {string} loading - Defines if the component is a loading state
 * @property {string} message - The dynamic Playlist message
 */

/**
 * Create the Playlist list Header
 *
 * @param {Props} props
 * @return {JSX.Element}
 */
function PlaylistHeader(props) {
  const { loading, message } = props;
  const { t } = useTranslation();

  if (loading) {
    return (
      <Fragment>
        <Skeleton width={300} height={60} />
        <Skeleton width={200} height={20} />
      </Fragment>
    );
  }

  return (
    <Box mt="2rem" mb="2rem">
      <Typography variant="h4">{message}</Typography>
      <Typography variant="body1">{t("playlists.description")}</Typography>
    </Box>
  );
}

PlaylistHeader.defaultProps = {
  loading: false,
};

PlaylistHeader.propTypes = {
  message: PropTypes.string,
  loading: PropTypes.bool,
};

export default PlaylistHeader;
