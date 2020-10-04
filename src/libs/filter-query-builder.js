/**
 * Create a query string to filter Spotify's playlist data
 *
 * @param {Filter} filters - An object with the data filters
 * @return {string} A string query to append to spotify fetch path
 */
function filterQueryBuilder(filters) {
  if (filters != null && typeof filters === "object") {
    let first = true;

    return Object.keys(filters).reduce((query, filter) => {
      if (filters[filter] != null) {
        if (first) {
          first = false;

          return `?${filter}=${filters[filter]}`;
        }

        query = `${query}&${filter}=${filters[filter]}`;
      }

      return query;
    }, "");
  }

  return "";
}

export default filterQueryBuilder;
