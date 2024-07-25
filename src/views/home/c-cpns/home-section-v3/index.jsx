import React, { memo } from "react"
import PropTypes from "prop-types"
import { SectionV3Wrapper } from "./style"
import SectionHeader from "src/components/section-header"
import RoomItem from "src/components/room-item"
import ScrollView from "src/base-ui/scroll-view"
import SectionFooter from "src/components/section-footer"

const HomeSectionV3 = memo(function HomeSectionV3(props) {
  const { infoData } = props

  return (
    <SectionV3Wrapper>
      <SectionHeader title={infoData.title} subtitle={infoData.subtitle} />
      <div className="room-list">
        <ScrollView>
          {infoData.list.map((item) => {
            return <RoomItem key={item.id} itemData={item} itemWidth="20%" />
          })}
        </ScrollView>
      </div>
      {/* 如果有不一样的footer才在这里另外传值 */}
      {/* <SectionFooter name="plus" footerClick={}/> */}
      <SectionFooter name="plus" />
    </SectionV3Wrapper>
  )
})

HomeSectionV3.propTypes = {
  infoData: PropTypes.object,
}

export default HomeSectionV3
