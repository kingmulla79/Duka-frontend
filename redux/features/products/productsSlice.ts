/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface IItems {
  id: string;
  name: string;
  category_id: number;
  prod_desc: string;
  rating: number;
  stock: number;
  prod_public_id: string;
  prod_url: string;
  search_name: string;
  timestamp: string;
  date: string;
  price: number;
  qty: number;
}

interface ICart {
  items: { [key: string]: IItems };
  totalQty: number;
  totalPrice: number;
}

interface IProductState {
  products: string;
  categories: string;
  category_id: string;
  cart: ICart;
}

const loadCartState = () => {
  if (typeof window !== "undefined") {
    const savedState = localStorage.getItem("cart");
    return savedState
      ? JSON.parse(savedState)
      : {
          products: "",
          categories: "",
          category_id: "",
          cart: { items: {}, totalPrice: 0, totalQty: 0 },
        };
  } else {
    return {
      products: "",
      categories: "",
      category_id: "",
      cart: { items: {}, totalPrice: 0, totalQty: 0 },
    };
  }
};

const initialState = loadCartState();

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    allProductsRequest: (state, action) => {
      state.products = action.payload.products;
    },
    updateProducts: (state) => {
      state.products = "";
    },
    allCategories: (state, action) => {
      state.categories = action.payload.product_categories;
    },
    categorySelect: (state, action) => {
      state.category_id = action.payload;
    },
    categoryClear: (state) => {
      state.category_id = "";
    },
    addItem: (state, action: PayloadAction<IItems>) => {
      const {
        id,
        name,
        price,
        category_id,
        prod_desc,
        rating,
        stock,
        prod_public_id,
        prod_url,
        search_name,
        timestamp,
        date,
      } = action.payload;
      if (state.cart.items[id]) {
        state.cart.items[id].qty += 1;
      } else {
        state.cart.items[id] = {
          id,
          name,
          price,
          category_id,
          prod_desc,
          rating,
          stock,
          prod_public_id,
          prod_url,
          search_name,
          timestamp,
          date,
          qty: 1,
        };
      }
      state.cart.totalQty += 1;
      state.cart.totalPrice += price;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.cart.items[id]) {
        const { qty, price } = state.cart.items[id];
        state.cart.totalQty -= qty;
        state.cart.totalPrice -= price * qty;
        delete state.cart.items[id];
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; qty: number }>
    ) => {
      const { id, qty } = action.payload;
      if (state.cart.items[id]) {
        const difference = qty - state.cart.items[id].qty;
        state.cart.totalQty += difference;
        state.cart.totalPrice += difference * state.cart.items[id].price;
        state.cart.items[id].qty = qty;
      }
    },
    clearCart: (state) => {
      state.cart.items = {};
      state.cart.totalQty = 0;
      state.cart.totalPrice = 0;
    },
  },
});

export const {
  allProductsRequest,
  updateProducts,
  allCategories,
  categorySelect,
  categoryClear,
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
} = productsSlice.actions;

export default productsSlice.reducer;
