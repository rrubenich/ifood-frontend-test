class Filters {
  /**
   * Creates an instance of available filters for Spotify featured playlist.
   *
   * Here I chose to keep the entity simple,
   * creating only attributes that we will show.
   *
   * @param {object} data
   * @memberof Filters
   */
  constructor(data = {}) {
    /**
     * @property {object} locale - The locale option filter.
     */
    this.locale = data.locale;
    /**
     * @property {object} country - The country option filter.
     */
    this.country = data.country;
    /**
     * @property {string} timestamp - A date formatted string to set the timestamp filter.
     */
    this.timestamp = data.timestamp;
    /**
     * @property {string} limit - A integer number to set the limit filter.
     */
    this.limit = data.limit;
    /**
     * @property {number} offset - A integer number to set the offset filter.
     */
    this.offset = data.offset;
  }

  /**
   * Helper to change class values in a immutable way.
   * Every change will return a new instance of Filters class.
   *
   * @param {string} field - Filters attribute to update;
   * @param {any} value - Filters value to update.
   *
   * @return {Filters}
   * @memberof Filters
   */
  set(field, value) {
    return new Filters({ ...this, [field]: value });
  }

  /**
   * Helper to merge an object to class values.
   * This method helps when more than one value need to be set.
   *
   * @param {object} obj - Filters attribute to update.
   *
   * @return {Filters}
   * @memberof Filters
   */
  merge(obj) {
    return new Filters({ ...this, ...obj });
  }
}

export default Filters;
