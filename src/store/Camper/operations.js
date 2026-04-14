import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ page = 1, limit = 6, filters = {} }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({
        page,
        limit,
      });
      const response = await axios.get(`${API_URL}?${params.toString()}`);
      
      let filteredItems = response.data.items;

      const normalize = (value) =>
        value?.toString().toLowerCase().replace(/[^a-z0-9]/g, "");

      if (filters.location) {
        filteredItems = filteredItems.filter((item) =>
          item.location?.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (Array.isArray(filters.equipment) && filters.equipment.length > 0) {
        filteredItems = filteredItems.filter((item) =>
          filters.equipment.every((filterValue) => {
            const normalizedFilter = normalize(filterValue);
            if (normalizedFilter === "ac") return item.AC;
            if (normalizedFilter === "automatic") return item.transmission?.toLowerCase() === "automatic";
            if (normalizedFilter === "kitchen") return item.kitchen;
            if (normalizedFilter === "tv") return item.TV;
            if (normalizedFilter === "bathroom") return item.bathroom;
            return false;
          })
        );
      }

      if (filters.vehicleType) {
        filteredItems = filteredItems.filter(
          (item) => normalize(item.form) === normalize(filters.vehicleType)
        );
      }

      return {
        items: filteredItems,
        total: response.data.total,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);