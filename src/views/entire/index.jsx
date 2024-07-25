import React, { memo, useEffect } from "react"
import { EntireWrapper } from "./style"
import EntireFilter from "./c-cpns/entire-filter"
import EntireRooms from "./c-cpns/entire-rooms"
import EntirePagination from "./c-cpns/entire-pagination"
// import { getEntireRoomList } from "src/services/modules/entire"
import { useDispatch } from "react-redux"
import { fetchRoomListAction } from "src/store/modules/entire/actionCreators"
import { changeHeaderConfigAction } from "src/store/modules/main"
import AppHeader from "src/components/app-header"

export default memo(function Entire() {
  // 发送网络请求，获取数据，并且保存当前的页面等等
  // 最简单的方法：usEffect()来模拟生命周期
  // useEffect(() => {
  //   getEntireRoomList(0).then((res) => {
  //     // 打印结果
  //     console.log(res)
  //   })
  // }, [])
  // 还是推荐一起放到redux中处理

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchRoomListAction())
    dispatch(changeHeaderConfigAction({ isFixed: true, topAlpha: false }))
  }, [dispatch])

  return (
    <EntireWrapper>
      <AppHeader />
      <EntireFilter />
      <EntireRooms />
      <EntirePagination />
    </EntireWrapper>
  )
})
