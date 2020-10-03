/**
 * @TODO comment this
 *
 * @namestace filter
 */
const filter = (function () {
  /**
   * @TODO comment this
   *
   * @memberof filter
   * @instance
   */
  const _fetchAvailableFilters = async () => {
    const path = `http://www.mocky.io/v2/5a25fade2e0000213aa90776`;
    const result = await fetch(path, { method: "GET" });
    const data = await result.json();

    return data;
  };

  return {
    fetchAvailableFilters: _fetchAvailableFilters,
  };
})();

export default filter;
