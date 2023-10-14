"use client";
import React from "react";
import { Filter } from "lucide-react";
import { category as options } from "@/constants/categories";

const FilterSection = ({
  searchQuery,
  setSearchQuery,
  selectedCategories,
  setSelectedCategories,
  toggleCategory,
}: any) => {
  return (
    <div>
      <div className="sidebar w-[90%] sticky top-20">
        <div className="widget user_widget_search rounded-md shadow-md p-2">
          <h2 className="text-center flex items-center justify-center">
            <span className="mr-1 text-[#13a0ef] ">
              {/* <FaFilter size={23} /> */}
              <Filter size={23} />
            </span>
            Filters
          </h2>
          <form
            id="user_wiget_search_form"
            className="user_wiget_search_form"
            method="GET"
          >
            <div className="form-group mb-1">
              <label
                htmlFor="search"
                className="mt-2 text-base font-semibold"
              >
                Services
              </label>
              <br />
              <input
                type="text"
                className="w-[80%] border rounded-sm p-1 text-sm"
                id="user_name"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="e.g Search Services..."
              />
            </div>
            <div className="form-group mt-3">
              <label
                htmlFor="user_gender"
                className="text-base font-semibold"
              >
                Category
              </label>
              {options?.map((c: any) => (
                <div key={c}>
                  <label className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      // checked={selectedGenres.includes(
                      //   category.toLowerCase()
                      // )}
                      checked={selectedCategories.includes(
                        c
                      )}
                      onChange={() => toggleCategory(c)}
                      // value={category}
                      // onChange={handleGenreChange}
                    />
                    <span className="custom-control-indicator"></span>
                    <span className="custom-control-description ml-1 my-1">
                      {c}
                    </span>
                  </label>
                </div>
              ))}
            </div>

            <div className="form-group mt-3 w-[80%] p-1">
              <label
                htmlFor="price_range"
                className="text-base font-semibold"
              >
                Price Range
              </label>
              <div className="flex justify-between mt-2">
                <br />
                <input
                  type="text"
                  className="w-[80%] border rounded-sm p-1 text-sm"
                  id="user_name"
                  // value={searchQuery}
                  // onChange={handleSearch}
                  placeholder="From"
                />

                <input
                  type="text"
                  className="w-[80%] border rounded-sm p-1 text-sm ml-3"
                  id="user_name"
                  // value={searchQuery}
                  // onChange={handleSearch}
                  placeholder="To"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
