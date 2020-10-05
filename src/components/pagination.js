import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Pagination as MUIPagination } from "@material-ui/lab";

/**
 * @typedef {Object} Props
 *
 * @property {number} itemsTotal - Total number of items
 * @property {number} pageSize - API PageSize
 * @property {number} offset - The selected offset
 */

/**
 * Create a specific use pagination component according
 * the Spotify API attributes
 *
 * @param {Props} props
 * @type {JSX.Element}
 */
function Pagination(props) {
  const { pageSize, offset, itemsTotal, onChange, ...restProps } = props;

  /**
   * Calculates the selected page
   *
   * @type {number}
   */
  const selectedPage = useMemo(() => {
    if (pageSize > offset) {
      return 1;
    }

    return Math.ceil(offset / pageSize + 1);
  }, [pageSize, offset]);

  /**
   * Calculates the total of pages
   *
   * @type {number}
   */
  const totalPages = useMemo(() => {
    if (pageSize > itemsTotal) {
      return 1;
    }

    return Math.ceil(itemsTotal / pageSize);
  }, [pageSize, itemsTotal]);

  /**
   * Wrap the onChange function to set the specific Spotify's API offset field
   *
   * @type {Function}
   */
  const handleChangeFilter = useCallback(
    (event, page) => onChange("offset", (page - 1) * pageSize),
    [onChange, pageSize],
  );

  return (
    <MUIPagination
      page={selectedPage}
      count={totalPages}
      shape="rounded"
      onChange={handleChangeFilter}
      {...restProps}
    />
  );
}

Pagination.propTypes = {
  pageSize: PropTypes.number,
  offset: PropTypes.number,
  itemsTotal: PropTypes.number,
  onChange: PropTypes.func,
};

export default Pagination;
