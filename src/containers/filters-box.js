import React, { Fragment, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useTranslation } from "react-i18next";
import filterResource from "../resources/filter";
import Filters from "../models/Filters";
import Select from "../components/select";
import Slider from "../components/slider";
import STATUS from "../constants/status";

/**
 * @typedef {Object} Props
 *
 * @property {Function} onChange - Callback to notify a fitler change
 * @property {Object} value - The filters value
 */

/**
 * Create an application Filters
 *
 * The unique purpose of Filters component is to correctly position the logo
 *
 * @param {Props} props
 * @return {JSX.Element}
 */
function FiltersBox({ onChange, value }) {
  const [filters, setFilters] = useState({});
  const [status, setStatus] = useState(STATUS.LOADING);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    /**
     * Fetch the avaiable filters and manipulate the container status
     *
     * @async
     */
    async function fetchData() {
      setStatus(STATUS.LOADING);

      try {
        const { filters } = await filterResource.fetchAvailableFilters();
        const filtersDict = filters.reduce(
          (dict, filter) => ({ ...dict, [filter.id]: filter }),
          {},
        );

        setFilters(filtersDict);
        setStatus(STATUS.DATA);
      } catch (error) {
        setStatus(STATUS.ERROR);
      }
    }

    fetchData();
  }, []);

  /**
   * Create an object to group the onChange callbacks
   * This object provite a clean way to see which fields are manipulable
   *
   * @type {object}
   */
  const handleChange = useMemo(
    () => ({
      locale: (event) => {
        i18n.changeLanguage(event.target.value);
        return onChange("locale", event.target.value);
      },
      country: (event) => onChange("country", event.target.value),
      timestamp: (value) => onChange("timestamp", value),
      limit: (event, value) => onChange("limit", value),
      offset: (event, value) => onChange("offset", value),
    }),
    [i18n, onChange],
  );

  if (status === STATUS.ERROR) {
    return <Typography>Ocorreu um erro para carregar os filtros</Typography>;
  }

  if (status === STATUS.DATA) {
    const { locale, country, limit } = filters;

    return (
      <Fragment>
        <Grid justify="flex-end" spacing={3} container>
          <Grid item lg={4}>
            <Select
              key={locale.name}
              label={t("filters.locale")}
              options={locale.values}
              value={value.locale}
              onChange={handleChange.locale}
              hideNoOption
            />
          </Grid>
          <Grid item lg={4}>
            <Select
              key={country.name}
              label={t("filters.country")}
              options={country.values}
              value={value.country}
              onChange={handleChange.country}
            />
          </Grid>
          <Grid item lg={4}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                size="small"
                inputVariant="outlined"
                format="MM/dd/yyyy"
                label={t("filters.timestamp")}
                value={value.timestamp}
                onChange={handleChange.timestamp}
                fullWidth
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item lg={3}>
            <Slider
              label={t("filters.limit")}
              min={limit.validation.min}
              max={limit.validation.max}
              value={value.limit}
              onChange={handleChange.limit}
            />
          </Grid>
          <Grid item lg={3}>
            <Slider
              label={t("filters.offset")}
              value={value.offset}
              onChange={handleChange.offset}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Skeleton height={50} />
      <Skeleton height={50} />
    </Fragment>
  );
}

FiltersBox.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.instanceOf(Filters),
};

export default FiltersBox;
