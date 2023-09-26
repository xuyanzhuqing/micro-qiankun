import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { MenuProps } from "antd";
// 这里统一加载缓存的一些数据
export const loadLocalLogin = createAsyncThunk(
  "login/loadLocalLogin",
  (_, { dispatch }) => {
    const menus = localStorage.getItem("menus");
    if (menus) {
      dispatch(changeMenusAction(JSON.parse(menus)));
    }
  }
);

interface LoginState {
  menus: MenuProps['items']
}

const initialState: LoginState = {
  menus: []
}

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    changeMenusAction(state, action: PayloadAction<MenuProps['items']>) {
      // 把数据存到redux里面，有点类似vuex
      state.menus = action.payload;
      localStorage.setItem("menus", JSON.stringify(action.payload));
    },
  },
});

export const { changeMenusAction } = loginSlice.actions;

export default loginSlice.reducer;
