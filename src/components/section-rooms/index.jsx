import React, { memo } from "react"
import PropTypes from "prop-types"

import RoomItem from "../room-item"
import { RoomsWrapper } from "./style"

const SectionRooms = memo(function (props) {
  // 解构的时候没有解构出来就先给一个空数组
  const { roomList = [], itemWidth } = props

  return (
    <RoomsWrapper>
      {roomList.slice(0, 8)?.map((item) => {
        return <RoomItem itemData={item} itemWidth={itemWidth} key={item.id} />
      })}
    </RoomsWrapper>
  )
})

SectionRooms.propTypes = {
  roomList: PropTypes.array,
}

export default SectionRooms
