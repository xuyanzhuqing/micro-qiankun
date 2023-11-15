/**
 * 微服务公共 state
 */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// 这里统一加载缓存的一些数据
export const loadLocalShare = createAsyncThunk(
  "share/loadLocalApp",
  (_, { dispatch }) => {
  }
);

export type ShareState = {
  auth: string[];
  language: string;
}

const initialState: ShareState = {
  auth: [],
  language: 'zh_CN'
}

const shareSlice = createSlice({
  name: "share",
  initialState,
  reducers: {
    changeAuthAction(state, action: PayloadAction<typeof initialState['auth']>) {
      state.auth = action.payload;
    },
    changeLngAction(state, action: PayloadAction<typeof initialState['language']>) {
      state.language = action.payload;
    },
  },
});

export const { changeAuthAction } = shareSlice.actions;

export default shareSlice.reducer;
