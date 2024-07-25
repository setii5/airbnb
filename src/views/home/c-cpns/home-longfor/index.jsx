import React, { memo } from "react"
import PropTypes from "prop-types"
import SectionHeader from "src/components/section-header"
import LongForItem from "src/components/longfor-item/imdex"
import { LongforWrapper } from "./style"
import ScrollView from "src/base-ui/scroll-view"

const HomeLongfor = memo(function (props) {
  const { infoData } = props

  return (
    <LongforWrapper>
      <SectionHeader title={infoData.title} subtitle={infoData.subtitle} />
      <div className="longfor-list">
        <ScrollView>
          {infoData.list.map((item) => {
            return <LongForItem itemData={item} key={item.city} />
          })}
        </ScrollView>
      </div>
    </LongforWrapper>
  )
})

HomeLongfor.propTypes = {
  infoData: PropTypes.object,
}

export default HomeLongfor
