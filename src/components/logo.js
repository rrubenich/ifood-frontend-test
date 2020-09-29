import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";

/**
 * A style Typography component to set the primary theme color
 *
 * @type {import("styled-components").ThemedStyledFunction}
 */
const StyledTypography = styled(Typography)`
  ${({ theme }) => `
    color: ${theme.palette.primary.main};
  `}
`;

/**
 * Simple text based component for showing Spotifood logo
 *
 * @type {JSX.Element}
 */
function Logo() {
  return (
    <StyledTypography component="h1" variant="h6">
      Spotifood
    </StyledTypography>
  );
}

export default Logo;
