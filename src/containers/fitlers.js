import React, { Fragment, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import filterResource from "../resources/filter";
import Filter from "../models/Filter";
import Select from "../components/select";
import Slider from "../components/slider";

/**
 * @typedef {Object} Props
 *
 * @property {Function} onChange - Callback to notify a fitler change
 * @property {Object} value - The filters value
 */

/**
 * Enum for display data status.
 *
 * @readonly
 * @enum {string}
 */
const STATUS = {
  LOADING: "LOADING",
  DATA: "DATA",
  ERROR: "ERROR",
};

/**
 * Create an application Filters
 *
 * The unique purpose of Filters component is to correctly position the logo
 *
 * @param {Props} props
 * @return {JSX.Element}
 */
function Filters({ onChange, value }) {
  const [avaiableFilters, setAvailableFilters] = useState({});
  const [status, setStatus] = useState(STATUS.LOADING);

  useEffect(() => {
    async function fetchData() {
      setStatus(STATUS.LOADING);

      try {
        const { filters } = await filterResource.fetchAvailableFilters();
        const filtersDict = filters.reduce(
          (dict, filter) => ({
            ...dict,
            [filter.id]: filter,
          }),
          {},
        );

        setAvailableFilters(filtersDict);

        setStatus(STATUS.DATA);
      } catch (error) {
        setStatus(STATUS.ERROR);
      }
    }

    fetchData();
  }, []);

  const handleChange = useMemo(
    () => ({
      locale: (event) => onChange("locale", event.target.value),
      country: (event) => onChange("country", event.target.value),
      timestamp: (value) => onChange("timestamp", value),
      limit: (event, value) => onChange("limit", value),
      offset: (event, value) => onChange("offset", value),
    }),
    [onChange],
  );

  const { locale, country, timestamp, limit, offset } = avaiableFilters;

  if (status === STATUS.DATA) {
    return (
      <Fragment>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <Select
              key={locale.name}
              label={locale.name}
              options={locale.values}
              value={value.locale}
              onChange={handleChange.locale}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Select
              key={country.name}
              label={country.name}
              options={country.values}
              value={value.country}
              onChange={handleChange.country}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Slider
              label={limit.name}
              value={value.limit}
              min={limit.validation.min}
              max={limit.validation.max}
              onChange={handleChange.limit}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                size="small"
                inputVariant="outlined"
                format="MM/dd/yyyy"
                label={timestamp.name}
                value={value.timestamp}
                onChange={handleChange.timestamp}
                fullWidth
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Slider
              label={offset.name}
              value={value.offset}
              onChange={handleChange.offset}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }

  return "test";
}

Filters.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.instanceOf(Filter),
};

export default Filters;
