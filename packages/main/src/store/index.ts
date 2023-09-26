import { configureStore } from "@reduxjs/toolkit";
import loginReducer, { loadLocalLogin } from "./modules/login";

// 创建一个 Redux
const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

// 统一在这里初始化一些缓存的数据
export function setupStore() {
  // 这里是缓存的菜单，程序加载会先调用这个
  store.dispatch(loadLocalLogin());
}

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store