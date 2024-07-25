import React, { memo } from "react"
import PropTypes from "prop-types"
import { FooterWrapper } from "./style"
import IconMoreArrow from "src/assets/svg/icon_more_arrow"
import { useNavigate } from "react-router-dom"

const SectionFooter = memo(function SectionFooter(props) {
  const { name } = props

  let showMessage = "显示全部"
  if (name) {
    showMessage = ` 显示更多${name}房源`
  }

  /** 事件处理的逻辑：点击显示全部/更多跳转到详情页 */
  const navigate = useNavigate()
  function moreClickHandle() {
    navigate("/entire")
  }

  return (
    <FooterWrapper color={name ? "#00848A" : "#484848"}>
      <div className="info" onClick={moreClickHandle}>
        <span className="text">{showMessage}</span>
        <IconMoreArrow />
      </div>
    </FooterWrapper>
  )
})

SectionFooter.propTypes = {
  name: PropTypes.string,
}

export default SectionFooter
