import React, { memo, useState } from "react"
import PropTypes from "prop-types"
import { TabsWrapper } from "./style"
import classNames from "classnames"
import ScrollView from "src/base-ui/scroll-view"

const SectionTabs = memo(function SectionTabs(props) {
  // 如果传来的是undefined，可以给个空数组作为默认值
  const { tabNames = [], tabClick } = props
  const [currentIndex, setCurrentIndex] = useState(0)
  tabNames.push("abc","cba")
  tabNames.push("nba")

  function itemClickHandle(index, item) {
    // console.log(index)
    setCurrentIndex(index)

    tabClick(index, item)
  }

  return (
    <TabsWrapper>
      <ScrollView>
        {/* {tabNames.slice(0,4).map((item, index) => { */}
        {tabNames.map((item, index) => {
          return (
            <div
              className={classNames("item", { active: index === currentIndex })}
              key={index}
              onClick={(e) => itemClickHandle(index, item)}
            >
              {item}
            </div>
          )
        })}
      </ScrollView>
    </TabsWrapper>
  )
})

SectionTabs.propTypes = {
  tabNames: PropTypes.array,
}

export default SectionTabs
