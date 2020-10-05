class Playlists {
  /**
   * Creates an instance of Playlist.
   *
   * @param {object} data
   * @memberof Playlist
   */
  constructor(data = { items: [] }) {
    /**
     * @property {string} message - The daily featured playlists message.
     */
    this.message = data.message;
    /**
     * @property {Array} items - The list of playlists.
     */
    this.items = data.items;
    /**
     * @property {number} limit - The maximum quantity of items.
     */
    this.limit = data.limit;
    /**
     * @property {number} total - The maximum quantity of items.
     */
    this.total = data.total;
    /**
     * @property {number} offset - The list offset.
     */
    this.offset = data.offset;
    /**
     * @property {Array} originalItems - A copy of the complete fetched playlist items.
     */
    this.originalItems = this.setupOriginalItems(
      data.originalItems,
      data.items,
    );
  }

  /**
   * Helper to change class values in a immutable way.
   * Every change will return a new instance of Playlists class.
   *
   * @param {string} field - Playlists attribute to update.
   * @param {any} value - Playlists value to update.
   *
   * @return {Playlists}
   * @memberof Playlists
   */
  set(field, value) {
    return new Playlists({ ...this, [field]: value });
  }

  /**
   * Filter the items by an attribute value.
   *
   * @param {string} field
   * @param {string} value
   *
   * @return {Playlists}
   * @memberof Playlists
   */
  filterBy(field, value) {
    if (field != null && value != null && Array.isArray(this.originalItems)) {
      const regexFilter = new RegExp(value.toUpperCase());

      return new Playlists({
        ...this,
        items: this.originalItems.filter((item) =>
          regexFilter.test(item[field].toUpperCase()),
        ),
      });
    }

    return this;
  }

  /**
   * Return the first filled array items to create a complete instance of items.
   *
   * @param {Array} originalItems
   * @param {Array} items
   *
   * @return {Array}
   * @memberof Playlists
   */
  setupOriginalItems(originalItems, items) {
    if (originalItems != null) {
      return originalItems;
    } else if (Array.isArray(items) && items.length > 0) {
      return items;
    }

    return null;
  }
}

export default Playlists;
