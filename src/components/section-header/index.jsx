import React, { memo } from "react"
import PropTypes from "prop-types"
import { HeaderWrapper } from "./style"

const SectionHeader = memo(function SectionHeader(props) {
  // const { title, subtitle = "默认子标题的数据" } = props
  // 没设置默认值，没传数据的时候subtitle就是undefined,下面判断不成立，自然不展示subtitle
  const { title, subtitle  } = props

  return (
    <HeaderWrapper>
      <h2 className="title">{title}</h2>
      {/* <div className="subtitle">{subtitle}</div> */}
      {/* 严谨写法：如果压根没有传过来subtitle */}
      {subtitle && <h2 className="subtitle">{subtitle}</h2>}
    </HeaderWrapper>
  )
})

SectionHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}

export default SectionHeader
