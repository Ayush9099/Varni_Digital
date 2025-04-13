"use client";
import { configureStore } from "@reduxjs/toolkit";
import selectionSlice from "../slices/selectionSlice";
import cartSlice from "../slices/cartSlice";
import extraSlice from "../slices/extraSlice";
import adminSlice from "../slices/adminSlice";
import loginSignUpSlice from "../slices/loginSignUpSlice";
import panelSlice from "../slices/panelSlice";
import materialSlice from "../slices/materialSlice";
import sizeSlice from "../slices/sizeSlice";
import accessoriesSlice from "../slices/accessoriesSlice"
import colorSlice from "../slices/colorSlice"

export function makeStore() {
  return configureStore({
    reducer: {
      selectionData: selectionSlice,
      cartData: cartSlice,
      extraSlice: extraSlice,
      adminSlice: adminSlice,
      loginSignUpSlice: loginSignUpSlice,
      panel: panelSlice,
      material : materialSlice,
      size : sizeSlice,
      accessories : accessoriesSlice,
      color : colorSlice,
    },
  });
}
export const store = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
