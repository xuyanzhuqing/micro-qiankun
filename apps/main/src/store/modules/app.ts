import { Language } from "@dnt/locale";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// 这里统一加载缓存的一些数据
export const loadLocalApp = createAsyncThunk(
  "app/loadLocalApp",
  (_, { dispatch }) => {
  }
);

const initialState = {
  language: Language.zh_CN
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeLngAction(state, action: PayloadAction<typeof initialState['language']>) {
      state.language = action.payload;
    },
  },
});

export const { changeLngAction } = appSlice.actions;

export default appSlice.reducer;
