import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  getHomeGoodPriceData,
  getHomeHighScoreData,
  getHomeDiscountData,
  getHomeHotRecommendData,
  getHomeLongforData,
  getHomePlusData,
} from "@/services"

// payload那里有第二个参数store可以传，store又可以被解构为{dispatch，getState}
export const fetchHomeDataAction = createAsyncThunk("fetchdata", (payload, { dispatch }) => {
  // const state = getState()
  // getHomeGoodPriceData(state.home.page).then(res => {

  getHomeGoodPriceData().then((res) => {
    // 直接派发，不经过下面的extraReducer
    dispatch(changeGoodPriceInfoAction(res))
  })
  getHomeHighScoreData().then((res) => {
    dispatch(changeHighScoreInfoAction(res))
  })
  getHomeDiscountData().then((res) => {
    dispatch(changeDiscountInfoAction(res))
  })
  getHomeHotRecommendData().then((res) => {
    dispatch(changeRecommendInfoAction(res))
  })
  getHomeLongforData().then((res) => {
    dispatch(changeLongforInfoAction(res))
  })
  getHomePlusData().then((res) => {
    dispatch(changePlusInfoAction(res))
  })
})

const homeSlice = createSlice({
  name: "home",
  initialState: {
    // page: 1,
    goodPriceInfo: {},
    highScoreInfo: {},
    discountInfo: {},
    recommendInfo: {},
    longforInfo: {},
    plusInfo: {},
  },
  reducers: {
    changeGoodPriceInfoAction(state, { payload }) {
      state.goodPriceInfo = payload
    },
    changeHighScoreInfoAction(state, { payload }) {
      state.highScoreInfo = payload
    },
    changeDiscountInfoAction(state, { payload }) {
      state.discountInfo = payload
    },
    changeRecommendInfoAction(state, { payload }) {
      state.recommendInfo = payload
    },
    changeLongforInfoAction(state, { payload }) {
      state.longforInfo = payload
    },
    changePlusInfoAction(state, { payload }) {
      state.plusInfo = payload
    },
  },
  // Error: The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback'   extraReducers: {
  // 并且builder写法的提示更好
  // extraReducers: {
  //   // 中括号，计算属性名
  //   [fetchHomeDataAction.fulfilled](state, { payload }) {
  //     console.log(payload)
  //     state.goodPriceInfo = payload
  //   },
  // },

  // 老师课上的extraReducers的内容注释掉仍可以获取上数据
  // extraReducers:
  // (builder) => {
  //   builder.addCase(fetchHomeDataAction.fulfilled, (state, { payload }) => {
  //     console.log(payload)
  //     state.goodPriceInfo = payload
  //     // 使用 builder.addCase 来处理 fetchHomeDataAction.fulfilled 的状态，将 payload 中的 goodPriceInfo 和 highScoreInfo 分别更新到 state 中
  //     // gpt给的解决方案，否则报错
  //     state.highScoreInfo = payload.highScoreInfo
  //     state.discountInfo = payload.discountInfo
  //   })
  // },
})

export const {
  changeGoodPriceInfoAction,
  changeHighScoreInfoAction,
  changeDiscountInfoAction,
  changeRecommendInfoAction,
  changeLongforInfoAction,
  changePlusInfoAction,
} = homeSlice.actions

export default homeSlice.reducer
