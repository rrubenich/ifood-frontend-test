import React, { Fragment, useCallback, useState, useEffect } from "react";
import { Container, Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Header from "../components/header";
import Logo from "../components/logo";
import PlaylistCard from "../components/playlist-card";
import PlaylistGrid from "../components/playlist-grid";
import Search from "../components/search";
import STATUS from "../constants/status.js";
import Pagination from "../components/pagination";
import ErrorState from "../components/error-state";
import PlaylistHeader from "../components/playlist-header";
import FiltersBox from "../containers/filters-box";
import Filters from "../models/Filters";
import Playlists from "../models/Playlists";
import spotify from "../resources/spotify";
import filterQueryBuilder from "../libs/filter-query-builder";

const REFRESH_MILLISECONDS_INTERVAL = 30000;

/**
 * Compose the Home page.
 *
 * This component is responsible to manage the Playlists APIs data.
 *
 * @param {Props} props
 * @return {JSX.Element}
 */
function Home() {
  const [data, setData] = useState(new Playlists());
  const [token, setToken] = useState(null);
  const [query, setQuery] = useState(null);
  const [status, setStatus] = useState(STATUS.LOADING);
  const [shouldFilter, setShouldFilter] = useState(false);
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState(
    new Filters({
      locale: i18n.language,
      country: "BR",
      timestamp: null,
      limit: 20,
      offset: 0,
    }),
  );

  /**
   * Set the query value when the Search field change.
   *
   * @type {Function}
   */
  const handleChangeQuery = useCallback((event) => {
    setQuery(event.target.value);
    setShouldFilter(true);
  }, []);

  /**
   * Set the filter value when the FiltersBox container change.
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
   * Set the filter value when the FiltersBox fires a batch change.
   *
   * @type {Function}
   */
  const handleBatchChangeFilter = useCallback(
    (obj) => {
      setFilter(filter.merge(obj));
    },
    [filter],
  );

  /**
   * Fetch Playlists from API.
   *
   * @type {Function}
   */
  const handleFetchPlaylists = useCallback(async () => {
    try {
      const filterQuery = filterQueryBuilder(filter);
      const playlists = await spotify.fetchPlaylists(token, filterQuery);

      setData(new Playlists(playlists));
      setShouldFilter(true);
      setStatus(STATUS.DATA);
    } catch (error) {
      if (error.status === 401) {
        setToken(null);
      } else {
        setStatus(STATUS.ERROR);
      }
    }
  }, [filter, token]);

  /**
   * Effect hook to fetch the access Token.
   *
   * This hook is the first dispatched effect.
   * To fetch a new token, is necessary set null to token state.
   *
   * @type {Function}
   */
  useEffect(() => {
    async function fetchToken() {
      try {
        const accessToken = await spotify.fetchToken();

        setToken(accessToken);
      } catch (error) {
        setStatus(STATUS.ERROR);
      }
    }

    if (token == null) {
      fetchToken();
    }
  }, [token]);

  /**
   * Effect hook to fetch the playlists.
   *
   * Is called when the token or the filters are changed.
   * To avoid unnecessary calls, the token and filter values are valdiated.
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
   * every defined REFRESH_MILLISECONDS_INTERVAL const.
   *
   * The interval is updated when the token or the filters are changed.
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
   * Effect hook to filter data by name.
   *
   * Is called on every query or data change.
   * The shouldFilter state was created to avoid infinite loops with data dependency.
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
        <Box mt={1} mb={2}>
          <Box mb={3}>
            <Search
              onChange={handleChangeQuery}
              placeholder={t("search.placeholder")}
              value={query}
            />
          </Box>
          <FiltersBox
            value={filter}
            onChange={handleChangeFilter}
            onBatchChange={handleBatchChangeFilter}
            total={data.total}
          />
        </Box>
      </Container>
      {status === STATUS.ERROR ? (
        <ErrorState
          message={t("playlists.error")}
          onReloadClick={handleFetchPlaylists}
        />
      ) : (
        <Container maxWidth="md">
          <PlaylistHeader
            message={data.message}
            loading={status === STATUS.LOADING}
          />
          <PlaylistGrid loading={status === STATUS.LOADING}>
            {data.items.map(({ id, name, images, description }) => (
              <PlaylistCard
                key={id}
                id={id}
                name={name}
                image={images[0].url}
                description={description}
              />
            ))}
          </PlaylistGrid>
          <Box display="flex" pt={4} pm={6} justifyContent="flex-end">
            <Pagination
              pageSize={filter.limit}
              offset={filter.offset}
              itemsTotal={data.total}
              onChange={handleChangeFilter}
              shape="rounded"
            />
          </Box>
        </Container>
      )}
    </Fragment>
  );
}

export default Home;
