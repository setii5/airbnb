import React, { memo } from "react"
import Pagination from "@mui/material/Pagination"

import { PaginationWrapper } from "./style"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import {
  // changeCurrentPageAction,
  fetchRoomListAction,
} from "src/store/modules/entire/actionCreators"

export default memo(function EntirePagination() {
  const { totalCount, currentPage, roomList } = useSelector(
    (state) => ({
      totalCount: state.entire.totalCount,
      currentPage: state.entire.currentPage,
      roomList: state.entire.roomList,
    }),
    // 加上shallowEqual优化性能，前后对比不同才渲染
    shallowEqual
  )

  // 小算法：必须掌握
  const totalPage = Math.ceil(totalCount / 20)
  const startCount = currentPage * 20 + 1 // 0页 第1条， 1页 第21条
  const endCount = (currentPage + 1) * 20 //0页 第20条， 1页 第40条

  // 事件处理的逻辑
  const dispatch = useDispatch()
  function pageChangeHandle(event, pageCount) {
    console.log(pageCount)

    // 翻页回到顶部的逻辑
    window.scrollTo(0, 0)

    // 更新最新的页码: redux => currentPage
    // dispatch(changeCurrentPageAction(pageCount - 1)) //从第一页开始所以要减掉1
    dispatch(fetchRoomListAction(pageCount - 1))
  }

  return (
    <PaginationWrapper>
      {!!roomList.length && (
        <div className="info">
          {/* 组件中的颜色自己在css中覆盖，而不是修改全局主题色 */}
          <Pagination count={totalPage} color="primary" onChange={pageChangeHandle} />
          {/* currentPage: 0页 1-20条数据 */}
          {/* currentPage: 1页 21-40条数据 */}
          <div className="desc">
            第 {startCount} - {endCount}个房源，共超过{totalCount}个
          </div>
        </div>
      )}
    </PaginationWrapper>
  )
})
