import * as actionTypes from "./constants"
import { getEntireRoomList } from "src/services/modules/entire"

export const changeCurrentPageAction = (currentPage) => ({
  type: actionTypes.CHANGE_CURRENT_PAGE,
  currentPage,
})

export const changeRoomListAction = (roomList) => ({
  type: actionTypes.CHANGE_ROOM_LIST,
  roomList,
})

export const changeTotalCountAction = (totalCount) => ({
  type: actionTypes.CHANGE_TOTAL_COUNT,
  totalCount,
})

export const changeIsLoadingAction = (isLoading) => ({
  type: actionTypes.CHANGE_IS_LOADING,
  isLoading,
})

export const fetchRoomListAction = (page = 0) => {
  // return一个新的函数,可以接受两个参数：dispatch,state
  //   return (dispatch) => {
  //     getEntireRoomList(0).then((res) => {
  //       console.log(res)
  //     })
  //   }

  //用async/await更优雅
  // return async (dispatch, getState) => {
  return async (dispatch) => {
    //0.修改currentPage
    dispatch(changeCurrentPageAction(page))

    // 1.根据页码获取最新的数据
    // const currentPage = getState().entire.currentPage
    // console.log(currentPage)
    // const res = await getEntireRoomList(currentPage * 20) //页码不能写死为0或者其他页码数，注意偏移量

    // 蒙版效果需要在发起网络请求的时候，只能在redux中，页面只是拿取数据
    dispatch(changeIsLoadingAction(true))
    const res = await getEntireRoomList(page * 20) //页码不能写死为0或者其他页码数，注意偏移量
    // 网络请求结束后，关闭loading蒙版
    dispatch(changeIsLoadingAction(false))

    // 拿一下数据
    // 2.获取到最新的数据，保存redux的store中
    const roomList = res.list
    const totalCount = res.totalCount

    dispatch(changeRoomListAction(roomList))
    dispatch(changeTotalCountAction(totalCount))
  }
}
