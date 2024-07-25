import { configureStore } from "@reduxjs/toolkit"
import mainReducer from "./modules/main"
import homeReducer from "./modules/home"
import entireReducer from "./modules/entire"
import detailReducer from "./modules/detail"

const store = configureStore({
  reducer: {
    // 通过createSlice配置的reducer
    home: homeReducer,
    // 通过普通方式配置的reducer
    entire: entireReducer,
    detail: detailReducer,
    main: mainReducer,
  },
})

export default store
