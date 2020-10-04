import React, { Fragment, useCallback, useState, useEffect } from "react";
import { Container, Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Header from "../components/header";
import Logo from "../components/logo";
import PlaylistCard from "../components/playlist-card";
import PlaylistGrid from "../components/playlist-grid";
import Search from "../components/search";
import spotify from "../resources/spotify";
import FiltersBox from "../containers/filters-box";
import Filters from "../models/Filters";
import Playlists from "../models/Playlists";
import filterQueryBuilder from "../libs/filter-query-builder";
import PlaylistHeader from "../components/playlist-header";

const REFRESH_MILLISECONDS_INTERVAL = 5000;

/**
 * Compose the Home page
 *
 * This component is responsible to manage the Playlists APIs data
 *
 * @param {Props} props
 * @return {JSX.Element}
 */
function Home() {
  const [data, setData] = useState(new Playlists());
  const [token, setToken] = useState(null);
  const [query, setQuery] = useState(null);
  const [shouldFilter, setShouldFilter] = useState(false);
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState(
    new Filters({
      locale: i18n.language,
      country: null,
      timestamp: null,
      limit: null,
      offset: null,
    }),
  );

  /**
   * Set the query value when the Search field change
   *
   * @type {Function}
   */
  const handleChangeQuery = useCallback((event) => {
    setQuery(event.target.value);
    setShouldFilter(true);
  }, []);

  /**
   * Set the filter value when the FiltersBox container change
   *
   * @type {Function}
   */
  const handleChangeFilter = useCallback(
    (field, value) => {
      setFilter(filter.set(field, value));
    },
    [filter],
  );

  /**
   * Fetch Playlists from API
   *
   * @type {Function}
   */
  const handleFetchPlaylists = useCallback(async () => {
    const filterQuery = filterQueryBuilder(filter);
    const playlists = await spotify.fetchPlaylists(token, filterQuery);

    setData(new Playlists(playlists));
    setShouldFilter(true);
  }, [filter, token]);

  /**
   * Effect hook to fetch the access Token
   *
   * This hook is the first dispatched effect
   * To fetch a new token, is necessary set null to token state
   *
   * @type {Function}
   */
  useEffect(() => {
    async function fetchToken() {
      const accessToken = await spotify.fetchToken();

      setToken(accessToken);
    }

    if (token == null) {
      fetchToken();
    }
  }, [token]);

  /**
   * Effect hook to fetch the playlists
   *
   * Is called when the token or the filters are changed
   * To avoid unnecessary calls, the token and filter values are valdiated
   *
   * @type {Function}
   */
  useEffect(() => {
    if (token != null && filter != null) {
      handleFetchPlaylists();
    }
  }, [handleFetchPlaylists, filter, token]);

  /**
   * Effect hook to create the automatic data fetch
   * every defined REFRESH_MILLISECONDS_INTERVAL const
   *
   * The interval is updated when the token or the filters are changed
   *
   * @type {Function}
   */
  useEffect(() => {
    const interval = setInterval(
      async () => handleFetchPlaylists(),
      REFRESH_MILLISECONDS_INTERVAL,
    );

    return () => clearInterval(interval);
  }, [handleFetchPlaylists, filter, token]);

  /**
   * Effect hook to filter data by name
   *
   * Is called on every query or data change
   * The shouldFilter state was created to avoid infinite loops with data dependency
   *
   * @type {Function}
   */
  useEffect(() => {
    if (shouldFilter && query != null) {
      setData(new Playlists(data).filterBy("name", query));
      setShouldFilter(false);
    }
  }, [data, shouldFilter, query]);

  return (
    <Fragment>
      <Container maxWidth="lg">
        <Header logo={<Logo />} />
      </Container>
      <Container maxWidth="md">
        <Box mt="1rem" mb="2rem">
          <Box mb="1.5rem">
            <Search
              onChange={handleChangeQuery}
              placeholder={t("search.placeholder")}
              value={query}
            />
          </Box>
          <FiltersBox value={filter} onChange={handleChangeFilter} />
        </Box>
      </Container>
      <Container maxWidth="md">
        <PlaylistHeader message={data.message} loading={data.message == null} />
        <PlaylistGrid loading={data.message == null}>
          {data.items.map(({ id, name, images, description }) => (
            <PlaylistCard
              key={id}
              name={name}
              image={images[0].url}
              description={description}
            />
          ))}
        </PlaylistGrid>
      </Container>
    </Fragment>
  );
}

export default Home;
