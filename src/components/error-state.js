import React from "react";
import PropTypes from "prop-types";
import { Typography, Button, Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";

/**
 * @typedef {object} Props
 *
 * @property {string} message - The error state message.
 * @property {Function} onReloadClick - The callback called when the reload button is clicked.
 */

/**
 * Create an error state component.
 *
 * @param {Props} props
 * @return {JSX.Element}
 */
function ErrorState(props) {
  const { onReloadClick, message } = props;
  const { t } = useTranslation();

  return (
    <Box m={12} flexDirection="column">
      <Box display="flex" justifyContent="center">
        <Typography>{message}</Typography>
      </Box>
      <Box m={4} display="flex" justifyContent="center">
        <Button variant="contained" color="primary" onClick={onReloadClick}>
          {t("reload")}
        </Button>
      </Box>
    </Box>
  );
}

ErrorState.propTypes = {
  message: PropTypes.string,
  onReloadClick: PropTypes.func,
};

export default ErrorState;
