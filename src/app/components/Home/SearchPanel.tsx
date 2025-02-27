"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { useProductSearchNameFilterQuery } from "../../../../redux/features/products/productsAPI";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { redirect } from "next/navigation";

const SearchPanel = () => {
  const [searchValue, setSearchValue] = useState([]);
  const { data } = useProductSearchNameFilterQuery(undefined, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });
  const options: any[] = [];
  const product_data = data?.search_name;

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchValue) {
      redirect(`/products/${searchValue}`);
    }
  };

  {
    product_data &&
      product_data.forEach((item: any) => {
        options.push({ search_name: item.search_name });
      });
  }

  return (
    <div className="w-full py-5 text-black dark:text-white">
      <form onSubmit={handleSearch}>
        <div className="flex justify-center">
          <Autocomplete
            freeSolo
            disableClearable
            options={options.map((option) => option.search_name)}
            className="w-[70%] mr-3"
            onChange={(event, value) => setSearchValue(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search for your product"
                slotProps={{
                  input: {
                    ...params.InputProps,
                    type: "search",
                    endAdornment: (
                      <IconButton
                        aria-label="search-submit-button"
                        type="submit"
                        className="text-black dark:text-white"
                      >
                        <SearchIcon />
                      </IconButton>
                    ),
                  },
                }}
              />
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchPanel;
