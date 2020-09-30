import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
} from "@material-ui/core";

/**
 * @typedef {Object} Props
 *
 * @property {string} name - The playlist title
 * @property {string} image - An URL to render the playlist cover
 * @property {string} description - A description to describle the playlist
 */

/**
 * Set a 100% height to show all cards in a perfect line and the display flex
 * to organize inner components
 *
 * @type {import("styled-components").ThemedStyledFunction}
 */
const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

/**
 * Set grow factor 1 to assign all container space to description area
 *
 * @type {import("styled-components").ThemedStyledFunction}
 */
const StyledCardContent = styled(CardContent)`
  grow: 1;
`;

/**
 * Adding 100% of padding in the Material.CardMedia the image will be shown as a square
 *
 * @type {import("styled-components").ThemedStyledFunction}
 */
const StyledCardMedia = styled(CardMedia)`
  padding-top: 100%;
`;

/**
 * Compose the Spotifood Playlist Card component
 *
 * The Material styled is kept, only a few sizing and position adjusts are made
 *
 * @param {Props} props
 * @type {JSX.Element}
 */
function PlaylistCard({ name, description, image }) {
  /**
   * Checks if an image is passed as prop, otherwise renders an Material.Spinner component
   *
   * @type {JSX.Element}
   */
  const media = useMemo(() => {
    if (image != null) {
      return <StyledCardMedia image={image} title={name} />;
    }

    return <CircularProgress />;
  }, [image, name]);

  return (
    <StyledCard>
      <CardActionArea>
        {media}
        <StyledCardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {description}
          </Typography>
        </StyledCardContent>
      </CardActionArea>
    </StyledCard>
  );
}

PlaylistCard.defaultProps = {
  description: "",
};

PlaylistCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  description: PropTypes.string,
};

export default PlaylistCard;
