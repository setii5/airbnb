import React, { memo, useRef, useState } from "react"
import { HeaderWrapper, SearchAreaWrapper } from "./style"
import HeaderLeft from "./c-cpns/header-left"
import HeaderCenter from "./c-cpns/header-center"
import HeaderRight from "./c-cpns/header-right"
import { shallowEqual, useSelector } from "react-redux"
import classNames from "classnames"
import useScrollPosition from "src/hooks/useScrollPosition"
import { ThemeProvider } from "styled-components"

export default memo(function AppHeader() {
  /** 定义组件内部的状态 */
  const [isSearch, setIsSearch] = useState(false)

  /** 从redux中获取数据 */
  const { headerConfig } = useSelector(
    (state) => ({
      headerConfig: state.main.headerConfig,
    }),
    shallowEqual
  )
  const { isFixed, topAlpha } = headerConfig
  // console.log(isFixed)

  /** 监听滚动的监听 */
  const { scrollY } = useScrollPosition()
  // console.log(scrollY)
  const prevY = useRef(0)
  // 在正常的情况下（搜索框没有弹出来），不断记录值
  if (!isSearch) prevY.current = scrollY
  // 在弹出搜索功能的情况，滚动的距离大于之前记录的距离的30
  if (isSearch && Math.abs(scrollY - prevY.current) > 30) setIsSearch(false)

  /** 搜索栏透明度的逻辑 */
  const isAlpha = topAlpha && scrollY === 0

  return (
    <ThemeProvider theme={{isAlpha}}>
      <HeaderWrapper className={classNames({ fixed: isFixed })}>
        <div className="content">
          <div className="top">
            <HeaderLeft />
            <HeaderCenter
              isSearch={isAlpha || isSearch}
              searchBarClick={(e) => setIsSearch(true)}
            />
            <HeaderRight />
          </div>
          <SearchAreaWrapper isSearch={isAlpha || isSearch}></SearchAreaWrapper>
        </div>

        <div className="search-area"></div>

        {/* 点击搜索框面板展开动画后，其他部分出现蒙版 */}
        {isSearch && <div className="cover" onClick={(e) => setIsSearch(false)}></div>}
      </HeaderWrapper>
    </ThemeProvider>
  )
})
