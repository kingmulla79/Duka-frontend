/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { FC, useState } from "react";
import {
  Drawer,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  TextField,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { categoryClear } from "../../../../redux/features/products/productsSlice";
import Rating from "@mui/material/Rating";

type Props = {
  selectedCategory: string;
  setSelectedCategory: (route: string) => void;
  selectedRatings: any;
  setSelectedRatings: (route: any) => void;
  nameFilter: string;
  setNameFilter: (route: string) => void;
};
const Sidebar: FC<Props> = ({
  selectedCategory,
  setSelectedCategory,
  selectedRatings,
  setSelectedRatings,
  nameFilter,
  setNameFilter,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // True if screen is <600px
  const { categories } = useSelector((state: any) => state.products);
  const { category_id } = useSelector((state: any) => state.products);
  const dispatch = useDispatch();

  // Handle rating selection (toggle checkboxes)
  const handleRatingChange = (rating: any) => {
    setSelectedRatings((prev: any) =>
      prev.includes(rating)
        ? prev.filter((r: any) => r !== rating)
        : [...prev, rating]
    );
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 230,
        flexShrink: 0,
        top: "80px",
        height: "calc(100% - 64px)",
        display: { xs: "none", sm: "block" }, // Hide on xs (<600px), show on sm+
        "& .MuiDrawer-paper": {
          width: 230,
          top: "80px",
          height: "calc(100% - 64px)",
        },
      }}
    >
      <Box sx={{ width: 230, p: 2 }}>
        {/* Title */}
        <Typography variant="h6" gutterBottom>
          Filter Options
        </Typography>

        {/* Name Filter */}
        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          size="small"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Categories - Radio Group */}
        <Typography variant="subtitle1">Categories</Typography>
        <FormControl component="fieldset" sx={{ pl: 2 }}>
          <RadioGroup
            value={parseInt(selectedCategory)}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <FormControlLabel
              value={""}
              control={<Radio />}
              label={"All"}
              onClick={() => dispatch(categoryClear())}
              checked={selectedCategory == ""}
            />
            {categories.map((item: any) => (
              <FormControlLabel
                key={item.category_id}
                value={item.category_id}
                control={<Radio />}
                label={item.category_name}
                checked={parseInt(selectedCategory) === item.category_id}
              />
            ))}
          </RadioGroup>
        </FormControl>

        {/* Ratings - Checkbox Group */}
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Ratings
        </Typography>
        <Box sx={{ pl: 2 }}>
          {[5, 4, 3, 2, 1].map((rating) => (
            <FormControlLabel
              key={rating}
              control={
                <Checkbox
                  checked={selectedRatings.includes(rating)}
                  onChange={() => handleRatingChange(rating)}
                />
              }
              label={<Rating name="read-only" value={rating} readOnly />}
            />
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
