import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setTitleFilter, // action add filter title
  setAuthorFilter, // action add filter author
  setOnlyFavouriteFilter, // action add filter author
  resetFilters, // action reset filters
  selectTitleFilter, // state filter title
  selectAuthorFilter, // state filter author
  selectOnlyFavouriteFilter, // state filter onlyFavourite
} from "../../redux/slices/filterSlice.js";

import "./Filter.scss";

const Filter = () => {
  const dispatch = useDispatch();

  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavouriteFilter = useSelector(selectOnlyFavouriteFilter);

  const handleTitleFilterChange = (event) => {
    dispatch(setTitleFilter(event.target.value));
  };

  const handleAuthorFilterChange = (event) => {
    dispatch(setAuthorFilter(event.target.value));
  };

  const handleOnlyFavouriteFilterChange = () => {
    dispatch(setOnlyFavouriteFilter());
  };

  const handleBtnResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input type="text" placeholder="Filter by title..." value={titleFilter} onChange={handleTitleFilterChange} />
        </div>
        <div className="filter-group">
          <input type="text" placeholder="Filter by author..." value={authorFilter} onChange={handleAuthorFilterChange} />
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" checked={onlyFavouriteFilter} onChange={handleOnlyFavouriteFilterChange} />
            Only Favourite
          </label>
        </div>
        <button type="button" onClick={handleBtnResetFilters}>
          Reset filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
