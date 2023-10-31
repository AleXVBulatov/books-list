import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setTitleFilter, selectTitleFilter, resetFilters } from "../../redux/slices/filterSlice.js";

import "./Filter.scss";

const Filter = () => {
  const dispatch = useDispatch();

  const titleFilter = useSelector(selectTitleFilter);

  const handleTitleFilterChange = (event) => {
    dispatch(setTitleFilter(event.target.value));
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

        <button type="button" onClick={handleBtnResetFilters}>
          Reset filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
