import React, { memo, useCallback } from "react"
import { RoomsWrapper } from "./style"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import RoomItem from "src/components/room-item"
import { useNavigate } from "react-router-dom"
import { changeDetailInfoAction } from "src/store/modules/detail"

export default memo(function EntireRooms() {
  /** 从redux获取roomList数据（网络请求相关的蒙版逻辑需要在redux中操作） */
  const { roomList, totalCount, isLoading } = useSelector(
    (state) => ({
      roomList: state.entire.roomList,
      totalCount: state.entire.totalCount,
      isLoading: state.entire.isLoading,
    }),
    shallowEqual
  )

  /** 事件处理 */
  // useCallback保证性能的优化
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // itemClick事件是从room-item中传来的
  const itemClickHandle = useCallback(
    (item) => {
      // console.log("itemClickHandle")

      dispatch(changeDetailInfoAction(item))
      navigate("/detail")

      // 接收来自room-item的itemData数据
      console.log(item)
    },
    [navigate, dispatch]
  )

  return (
    <RoomsWrapper>
      <div className="title">{totalCount}多处住宿</div>
      <div className="list">
        {roomList.map((item) => {
          return (
            <RoomItem itemData={item} itemWidth="20%" key={item._id} itemClick={itemClickHandle} />
          )
        })}
      </div>

      {isLoading && <div className="cover"></div>}
    </RoomsWrapper>
  )
})
