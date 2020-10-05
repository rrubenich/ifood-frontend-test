import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import {
  KeyboardDateTimePicker,
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
 * @property {Function} onChange - Callback to notify a filter change;
 * @property {Function} onBatchChange - Callback to notify a batch filter change;
 * @property {Object} value - The filters value.
 */

/**
 * Create an application Filters.
 *
 * The unique purpose of Filters component is to correctly position the logo.
 *
 * @param {Props} props
 * @return {JSX.Element}
 */
function FiltersBox(props) {
  const { onChange, onBatchChange, value } = props;
  const [filters, setFilters] = useState({});
  const [status, setStatus] = useState(STATUS.LOADING);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    /**
     * Fetch the avaiable filters and manipulate the container status.
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
   * Create an object to group the onChange callbacks.
   * This object provite a clean way to see which fields are manipulable.
   *
   * @type {object}
   */
  const handleChange = useMemo(
    () => ({
      locale: (event) => {
        i18n.changeLanguage(event.target.value);
        onChange("locale", event.target.value);
      },
      country: (event) => onChange("country", event.target.value),
      timestamp: (value) => onChange("timestamp", value.toISOString()),
      limit: (event, value) => onBatchChange({ limit: value, offset: 0 }),
    }),
    [i18n, onChange, onBatchChange],
  );

  if (status === STATUS.ERROR) {
    return <Typography>{t("filters.error")}</Typography>;
  }

  if (status === STATUS.DATA) {
    const { locale, country, limit } = filters;

    return (
      <Grid spacing={3} container>
        <Grid item lg={3}>
          <Select
            key={locale.name}
            label={t("filters.locale")}
            options={locale.values}
            value={value.locale}
            onChange={handleChange.locale}
          />
        </Grid>
        <Grid item lg={3}>
          <Select
            key={country.name}
            label={t("filters.country")}
            options={country.values}
            value={value.country}
            onChange={handleChange.country}
          />
        </Grid>
        <Grid item lg={3}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
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
      </Grid>
    );
  }

  return (
    <Grid spacing={3} container>
      {Array.from(new Array(4)).map((item, index) => (
        <Grid key={index} lg={3} item>
          <Skeleton height={50} />
        </Grid>
      ))}
    </Grid>
  );
}

FiltersBox.propTypes = {
  onChange: PropTypes.func,
  onBatchChange: PropTypes.func,
  value: PropTypes.instanceOf(Filters),
};

export default FiltersBox;
