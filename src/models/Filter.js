class Filter {
  /**
   * Creates an instance of available filters for Spotify featured playlist
   *
   * Here I chose to keep the entity simple,
   * creating only attributes that we will show
   *
   * @param {object} data
   * @memberof Filter
   */
  constructor(data = {}) {
    /**
     * @property {object} locale - The locale option filter
     */
    this.locale = data.locale || null;
    /**
     * @property {object} country - The country option filter
     */
    this.country = data.country;
    /**
     * @property {string} timestamp - A date formatted string to set the timestamp filter
     */
    this.timestamp = data.timestamp;
    /**
     * @property {string} limit - A integer number to set the limit filter
     */
    this.limit = data.limit || 0;
    /**
     * @property {number} offset - A integer number to set the offset filter
     */
    this.offset = data.offset || 0;
  }

  /**
   * Helper to change class values in a immutable way.
   * Every change will return a new instance of Filter class
   *
   * @param {string} field - Filter attribute to update
   * @param {any} value - Filter value to update
   *
   * @return {Filter}
   * @memberof Filter
   */
  set(field, value) {
    return new Filter({ ...this, [field]: value });
  }
}

export default Filter;
