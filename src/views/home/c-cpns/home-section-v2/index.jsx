import PropTypes from "prop-types"
import React, { memo, useState, useCallback } from "react"

import { SectionV2Wrapper } from "./style"
import SectionHeader from "src/components/section-header"
import SectionTabs from "src/components/section-tabs"
import SectionRooms from "src/components/section-rooms"
import SectionFooter from "src/components/section-footer"

const HomeSectionV2 = memo(function HomeSectionV2(props) {
  /** 从props中获取数据 */
  const { infoData } = props

  /** 定义内部的state */
  //   const initialName = Object.keys(infoData.dest_list ?? {})[0] ?? ""
  // 确保有值所以不需要那么多逻辑判断了
  const initialName = Object.keys(infoData.dest_list)[0]
  const [name, setName] = useState(initialName)
  //   console.log(name)
  const tabNames = infoData.dest_address?.map((item) => item.name)
  //   使用useEffect方法会造成组件渲染三次
  //   useEffect(() => {
  //     setName("xxx")
  //   }, [infoData])

  /** 事件处理函数 */
  const tabClickHandle = useCallback(function (index, name) {
    setName(name)
  }, [])

  return (
    <SectionV2Wrapper>
      <SectionHeader title={infoData.title} subtitle={infoData.subtitle} />
      <SectionTabs tabNames={tabNames} tabClick={tabClickHandle} />
      <SectionRooms roomList={infoData.dest_list?.[name]} itemWidth="33.3333%" />
      <SectionFooter name={name}/>
    </SectionV2Wrapper>
  )
})

HomeSectionV2.propTypes = {
  infoData: PropTypes.object,
}

export default HomeSectionV2
