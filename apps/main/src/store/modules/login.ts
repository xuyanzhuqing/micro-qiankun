import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DntPureMenuProps } from 'routes/type'
// 这里统一加载缓存的一些数据
export const loadLocalLogin = createAsyncThunk(
  "login/loadLocalLogin",
  (_, { dispatch }) => {
    const menus = sessionStorage.getItem("menus");
    if (menus) {
      dispatch(changeMenusAction(JSON.parse(menus)));
    }
  }
);

interface LoginState {
  menus: DntPureMenuProps[]
}

const initialState: LoginState = {
  menus: []
}

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    changeMenusAction(state, action: PayloadAction<DntPureMenuProps[]>) {
      // 把数据存到redux里面，有点类似vuex
      state.menus = action.payload;
      sessionStorage.setItem("menus", JSON.stringify(action.payload));
    },
  },
});

export const { changeMenusAction } = loginSlice.actions;

export default loginSlice.reducer;
