/**
 * Create a module to provide methods to fetch the Spotify data.
 *
 * Using Revealing Module pattern we can expose only what is needed
 * and keep a clean coding.
 *
 * @namestace spotify
 */
const spotify = (function () {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

  /**
   * Fetch the user API Token
   *
   * @memberof spotify
   * @instance
   */
  const _fetchToken = async () => {
    const path = "https://accounts.spotify.com/api/token";

    const result = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    });

    if (result.ok) {
      const { access_token } = await result.json();

      return access_token;
    }

    throw result;
  };

  /**
   * Fetch the user API Token.
   *
   * @memberof spotify
   * @param {string} token
   * @param {string} query
   * @instance
   */
  const _fetchPlaylists = async (token, query = "") => {
    const path = `https://api.spotify.com/v1/browse/featured-playlists${query}`;

    const result = await fetch(path, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    if (result.ok) {
      const { message, playlists } = await result.json();

      return { ...playlists, message };
    }

    throw result;
  };

  return {
    fetchToken: _fetchToken,
    fetchPlaylists: _fetchPlaylists,
  };
})();

export default spotify;
